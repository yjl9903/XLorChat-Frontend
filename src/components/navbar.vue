<template>
  <b-navbar wrapper-class="container" transparent :shadow="!!background">
    <template slot="brand">
      <b-navbar-item @click="start">
        <p class="title">Chat</p>
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item v-if="isLogin && background" class="buttons">
        <b-navbar-dropdown label="信息">
          <b-navbar-item>用户 ID : {{ uid }}</b-navbar-item>
          <b-navbar-item>用户昵称 : {{ user.name }}</b-navbar-item>
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
import { mapState } from 'vuex';
import createGroup from './creategroup';

export default {
  name: 'navbar',
  components: {
    createGroup
  },
  data: () => ({}),
  computed: mapState({
    user: state => state.user,
    uid: state => state.user.uid,
    isLogin: state => !!state.user.uid
  }),
  methods: {
    async logout() {
      await this.$store.dispatch('logout');
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
