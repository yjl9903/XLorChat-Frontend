<template>
  <div class="card fullheight">
    <header class="card-header" ref="header">
      <h1 class="card-header-title">{{ name }}</h1>
    </header>
    
    <div class="card-content" :style="height" v-chat-scroll>
      <p v-for="(item, id) in messages" :key="id"
        :class="[item.user.uid === user.uid ? 'has-text-right' : 'has-text-left']"
        >{{ item.message }}</p>
    </div>

    <footer class="card-footer" ref="footer">
      <div class="card-footer-item">
        <div class="columns is-multiline fullwidth">
          <div class="column is-full">
            <b-field class="fullwidth">
              <b-input type="textarea" ref="text" v-model="text"></b-input>
            </b-field>
          </div>
          <div class="column has-text-right" style="padding-top: 0">
            <b-button size="is-small" type="is-success" @click="submit">发送</b-button>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'chat-card',
  props: {
    name: String, user: Object
  },
  data: () => ({
    height: {
      height: '0px',
      overflowX: 'hidden',
      overflowY: 'auto'
    },
    messages: [],
    text: '',
    group: null, ws: null
  }),
  methods: {
    calHeight() {
      const aH = this._vnode.elm.offsetHeight;
      const hH = this.$refs.header.offsetHeight;
      const fH = this.$refs.footer.offsetHeight;
      this.height.height = `${aH - hH - fH}px`;
    },
    connect(group, ws) {
      this.$refs.text.focus();
      this.calHeight();
      this.group = group;
      this.ws = ws;
      ws.addEventListener('open', () => {});
      ws.addEventListener('message', ({ data }) => {
        data = JSON.parse(data);
        this.messages.push(data);
      });
      ws.addEventListener('close', () => {});
    },
    submit() {
      if (!this.ws) return ;
      this.ws.send(this.text);
      this.text = '';
      this.$refs.text.focus();
    }
  },
  mounted() {
    window.addEventListener('resize', function() {
      this.calHeight();
    }.bind(this));
  }
}
</script>

<style>
textarea {
  resize: none !important;
}

pre::-webkit-scrollbar {
  width: 0.4rem;
  height: 0.4rem;
}
pre::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.26);
}
</style>