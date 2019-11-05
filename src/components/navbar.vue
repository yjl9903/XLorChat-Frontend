<template>
  <b-navbar wrapper-class="container" transparent :shadow="!!background">
    <template slot="brand">
      <b-navbar-item @click="start">
        <p class="title">Chat</p>
      </b-navbar-item>
    </template>
    <template slot="end" v-if="isEnd">
      <b-navbar-item v-if="isLogin && background" class="buttons">
        <b-button rounded type="is-success">创建会话</b-button>
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
import PubSub from "pubsub-js";
import User from "../services/users";

export default {
  name: "navbar",
  data: () => ({
    isEnd: false,
    isLogin: false
  }),
  created() {
    if (User.getUser()) {
      this.isEnd = true;
      this.isLogin = true;
    }
    PubSub.subscribe("showNavbar", () => (this.isEnd = true));
    PubSub.subscribe("login", () => (this.isEnd = true, this.isLogin = true));
    PubSub.subscribe("logout", () => (this.isEnd = true, this.isLogin = false));
  },
  methods: {
    async logout() {
      await User.logout();
      this.$router.push("/");
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
    }
  },
  props: {
    background: Boolean
  }
};
</script>

<style></style>
