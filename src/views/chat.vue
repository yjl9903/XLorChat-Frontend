<template>
  <div id="chat" class="container">
    <div class="columns fullheight">
      <div class="column is-3">
        <b-menu>
          <b-menu-list label="会话">
            <b-menu-item
              v-for="(g, id) in userGroup"
              :key="id"
              :active="id === 0"
              :label="getGroupName(g)"
              @click="
                connect(
                  g,
                  id
                )
              "
            ></b-menu-item>
          </b-menu-list>
        </b-menu>
      </div>
      <div class="column is-9 fullheight">
        <chat-card
          v-if="selected !== -1"
          ref="card"
          :user="user"
          :messages.sync="allmsg[selected]"
          :name="selected === -1 ? '' : getGroupName(userGroup[selected])"
        />
        <div v-else class="card fullheight"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatCard from '@/components/chatcard.vue';
import store from '../store';
import { wsURL } from '../config';
import { mapState } from 'vuex';

export default {
  name: 'chat',
  components: {
    ChatCard
  },
  data: () => ({
    selected: -1,
    allws: [],
    allmsg: []
  }),
  computed: mapState({
    user: state => state.user,
    userGroup: state => state.group
  }),
  watch: {
    userGroup(nV) {
      if (nV.length === 0) {
        this.allws.splice(0, this.allws.length);
        this.allmsg.splice(0, this.allmsg.length);
        return;
      }
      let flag = this.allws.length;
      for (let l = flag; l < nV.length; l++) {
        this.allws.push(null);
        this.allmsg.push([]);
      }
      if (flag) {
        this.connect(this.userGroup[0], 0);
      }
    }
  },
  methods: {
    getGroupName(g) {
      const s = [];
      for (const user of g.members) {
        if (this.user.uid === user.uid) continue;
        s.push(user.name);
      }
      return s.join(', ');
    },
    async connect(group, id) {
      if (this.selected === id) return;
      this.selected = id;
      if (this.allws[id] === null) {
        this.allws[id] = new WebSocket(wsURL + String(group.gid));
      }
      this.$nextTick(() => {
        this.$refs.card.connect(group, this.allws[id]);
      });
    }
  },
  async created() {
    try {
      await this.$store.dispatch('getGroup');
    } catch (error) {}

    this.allws.splice(0, this.allws.length);
    this.allmsg.splice(0, this.allmsg.length);
    for (let i = 0; i < this.userGroup.length; i++) {
      this.allws.push(null);
      this.allmsg.push([]);
    }
    if (this.userGroup.length > 0) {
      this.connect(this.userGroup[0], 0);
    }
  },
  beforeRouteEnter(to, from, next) {
    if (store.getters.isLogin) {
      next();
    } else {
      next('/');
    }
  }
};
</script>

<style>
#chat {
  height: calc(100% - 64px) !important;
}

@media screen and (max-width: 1023px) {
  #chat {
    padding: 0 12px;
  }
}
</style>
