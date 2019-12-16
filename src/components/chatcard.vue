<template>
  <div class="card fullheight">
    <header class="card-header" ref="header">
      <h1 class="card-header-title">{{ name }}</h1>
    </header>

    <div class="card-content" :style="height" v-chat-scroll>
      <bubble
        v-for="(item, id) in messages"
        :key="id"
        :message="item"
        :self="item.user.uid === user.uid"
        :group="group.members.length > 2"
      ></bubble>
    </div>

    <footer class="card-footer" ref="footer">
      <div class="card-footer-item">
        <div class="columns is-multiline fullwidth">
          <div class="column is-full">
            <b-field class="fullwidth">
              <b-input
                type="textarea"
                ref="text"
                v-model="text"
                @keyup.ctrl.enter.native="submit"
              ></b-input>
            </b-field>
          </div>
          <div class="column has-text-right" style="padding-top: 0">
            <b-upload size="is-small" v-model="file" style="float: left">
              <a class="button is-primary">
                <span>图片</span>
              </a>
            </b-upload>
            <span
              class="file-name is-inline-block"
              v-if="file"
              style="float: left;"
            >
              {{ file.name }}
            </span>
            <b-button type="is-success" @click="submit">发送</b-button>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import bubble from './bubble';
import { fileToBase64 } from '../util';

export default {
  name: 'chat-card',
  components: {
    bubble
  },
  props: {
    name: String,
    user: Object,
    messages: Array
  },
  data: () => ({
    file: null,
    height: {
      height: '0px',
      overflowX: 'hidden',
      overflowY: 'auto'
    },
    text: '',
    group: null,
    ws: null,
    openHandle: null,
    messageHandle: null,
    closeHandle: null
  }),
  methods: {
    calHeight() {
      const aH = this._vnode.elm.offsetHeight;
      const hH = this.$refs.header.offsetHeight;
      const fH = this.$refs.footer.offsetHeight;
      this.height.height = `${aH - hH - fH}px`;
    },
    connect(group, ws) {
      this.calHeight();

      if (this.ws) {
        this.ws.removeEventListener('open', this.openHandle);
        this.ws.removeEventListener('message', this.messageHandle);
        this.ws.removeEventListener('close', this.closeHandle);
      }

      this.$refs.text.focus();
      this.group = group;
      this.ws = ws;

      this.openHandle = () => {};
      this.messageHandle = ({ data }) => {
        data = JSON.parse(data);
        data.message = JSON.parse(data.message);
        this.messages.push(data);
      };
      this.closeHandle = () => {};
      ws.addEventListener('open', this.openHandle);
      ws.addEventListener('message', this.messageHandle);
      ws.addEventListener('close', this.closeHandle);
    },
    async submit() {
      if (!this.ws) return;
      if (this.file) {
        const msg = {
          image: await fileToBase64(this.file, text => {
            this.$buefy.snackbar.open({
              duration: 5000,
              message: text,
              type: 'is-danger',
              position: 'is-top',
              actionText: '关闭',
              queue: false
            });
          })
        };
        this.ws.send(JSON.stringify(msg));
        this.file = null;
      } else if (this.text.length !== 0) {
        const msg = { text: this.text };
        this.ws.send(JSON.stringify(msg));
        this.text = '';
      }
      this.$refs.text.focus();
    }
  },
  mounted() {
    window.addEventListener(
      'resize',
      function() {
        this.calHeight();
      }.bind(this)
    );
  }
};
</script>

<style>
textarea {
  resize: none !important;
}

.card-content::-webkit-scrollbar {
  width: 0.8rem;
  height: 0.4rem;
}
.card-content::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.26);
}
</style>
