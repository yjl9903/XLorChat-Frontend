<template>
  <div>
    <div class="content"></div>
    <div class="columns is-centered">
      <div class="content"></div>
      <div class="column is-half">
        <div class="card">
          <header class="card-header">
            <h2 class="card-header-title is-centered">登录</h2>
          </header>
          <div class="card-content">
            <b-field label="用户名">
              <b-input v-model="username"></b-input>
            </b-field>
            <b-field label="密码">
              <b-input
                @keyup.enter.native="login"
                v-model="password"
                type="password"
                password-reveal
              ></b-input>
            </b-field>
            <div class="buttons">
              <b-button expanded type="is-success" @click="login"
                >登录</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from '../services/users';

export default {
  name: 'chat-login',
  data: () => ({
    username: '',
    password: ''
  }),
  methods: {
    async login() {
      try {
        await User.login(this);
        this.$router.push('/chat');
      } catch (err) {
        this.$buefy.snackbar.open({
          duration: 5000,
          message: '登录失败',
          type: 'is-danger',
          position: 'is-top',
          actionText: '关闭',
          queue: false
        });
      }
    }
  }
};
</script>

<style></style>
