<template>
  <div id="chat" class="container">
    <div class="columns fullheight">
      <div class="column is-3">
        <b-menu v-if="user">
          <b-menu-list label="会话">
            <b-menu-item v-for="(g, id) in userGroup" 
              :key="id" :active="id === 0"
              :label="getGroupName(g)"
              @click="connect(g, id)"></b-menu-item>
          </b-menu-list>
        </b-menu>
      </div>
      <div class="column is-9 fullheight">
        <chat-card v-if="selected !== -1" ref="card"
          :user="user"
          :messages.sync="allmsg[selected]"
          :name="selected === -1 ? '' : getGroupName(userGroup[selected])" />
      </div>
    </div>
  </div>
</template>

<script>
import ChatCard from '@/components/chatcard.vue';
import PubSub from 'pubsub-js';
import User from '../services/users';
import { wsURL } from '../config';

export default {
  name: 'chat',
  components: {
    ChatCard
  },
  data: () => ({
    user: null,
    userGroup: [],
    selected: -1,
    allws: [],
    allmsg: []
  }),
  methods: {
    async init() {
      this.userGroup = await User.getGroup();
      this.allws = [];
      for (let i = 0; i < this.userGroup.length; i++) {
        this.allws.push(null);
        this.allmsg.push([]);
      }
      if (this.userGroup.length > 0) {
        this.connect(this.userGroup[0], 0);
      }
    },
    getGroupName(g) {
      const s = [];
      for (const user of g.members) {
        if (this.user.uid === user.uid) continue;
        s.push(user.name);
      }
      return s.join(', ');
    },
    async connect(group, id) {
      if (this.selected === id) return ;
      this.selected = id;
      if (this.allws[id] === null) {
        this.allws[id] = new WebSocket(wsURL + String(group.gid));
      }
      this.$nextTick(() => {
        this.$refs.card.connect(group, this.allws[id]);
      });
    }
  },
  created() {
    const user = User.getUser();
    if (user) {
      this.user = user;
      this.init();
    }
    PubSub.subscribe('login', (msg, data) => {
      this.user = data;
      this.init();
    });
  }
}
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