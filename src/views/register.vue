<template>
  <div>
    <div class="content"></div>
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="card">
          <header class="card-header">
            <h2 class="card-header-title is-centered">注册</h2>
          </header>
          <div class="card-content">
            <b-field label="用户名">
              <b-input v-model="username"></b-input>
            </b-field>
            <b-field label="密码">
              <b-input v-model="password" type="password" password-reveal></b-input>
            </b-field>
            <b-field label="确认密码">
              <b-input v-model="password2" type="password" password-reveal></b-input>
            </b-field>
            <b-field label="昵称">
              <b-input v-model="name"></b-input>
            </b-field>
            <b-field label="邮箱">
              <b-input v-model="email"></b-input>
            </b-field>
            <div class="buttons">
              <b-button expanded type="is-success" @click="register">注册</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data: () => ({
    username: '', password: '', password2: '',
    name: '', email: ''
  }),
  methods: {
    register() {

    }
  }
}
</script>

<style>

</style>