<template>
  <b-navbar wrapper-class="container" transparent :shadow="!!background">
    <template slot="brand">
      <b-navbar-item @click="start">
        <p class="title">Chat</p>
      </b-navbar-item>
    </template>
    <template slot="end" v-if="isEnd">
      <b-navbar-item v-if="isLogin && background" class="buttons">
        <b-navbar-dropdown label="信息">
          <b-navbar-item>用户 ID : {{ uid }}</b-navbar-item>
          <b-navbar-item>设置</b-navbar-item>
        </b-navbar-dropdown>
        <b-button rounded type="is-success" @click="open">创建会话</b-button>
        <create-group ref="modal"></create-group>
        <b-button @click="logout">退出</b-button>
      </b-navbar-item>
      <b-navbar-item v-else-if="isLogin" class="buttons">
        <b-button type="is-light" outlined @click="logout">退出</b-button>
      </b-navbar-item>
      <b-navbar-item v-else-if="background" class="buttons">
        <b-button tag="router-link" to="login">立即开始</b-button>
        <b-button type="is-success" tag="router-link" to="register"
          >注册</b-button
        >
      </b-navbar-item>
      <b-navbar-item v-else class="buttons">
        <b-button type="is-light" outlined tag="router-link" to="login"
          >立即开始</b-button
        >
        <b-button type="is-light" outlined tag="router-link" to="register"
          >注册</b-button
        >
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import PubSub from 'pubsub-js';
import User from '../services/users';
import createGroup from './creategroup';

export default {
  name: 'navbar',
  components: {
    createGroup
  },
  data: () => ({
    uid: 0,
    isEnd: false,
    isLogin: false
  }),
  created() {
    if (User.getUser()) {
      this.isEnd = true;
      this.isLogin = true;
      this.uid = User.getUser().uid;
    } else if (User.getOnce()) {
      this.isEnd = true;
    };
    PubSub.subscribe('showNavbar', () => (this.isEnd = true));
    PubSub.subscribe('login', () => {
      this.isEnd = true;
      this.isLogin = true;
      this.uid = User.getUser().uid;
    });
    PubSub.subscribe('logout', () => {
      this.isEnd = true;
      this.isLogin = false;
      this.uid = 0;
    });
  },
  methods: {
    async logout() {
      await User.logout();
      this.$router.push('/');
    },
    start() {
      if (this.isLogin) {
        if (this.$route.path !== '/chat') {
          this.$router.push('/chat');
        }
      } else {
        if (this.$route.path !== '/') {
          this.$router.push('/');
        }
      }
    },
    open() {
      this.$refs.modal.open();
    }
  },
  props: {
    background: Boolean
  }
};
</script>

<style></style>
