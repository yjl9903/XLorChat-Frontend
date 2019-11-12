<template>
  <section class="hero is-success is-bold is-fullheight">
    <div class="hero-head">
      <navbar></navbar>
    </div>
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="columns is-multiline">
          <h1 class="column is-full title">Enjoy Chatting</h1>
          <h2 class="column is-full subtitle">基于 WebSocket 的在线聊天室</h2>
          <div class="column is-full buttons">
            <b-button type="is-light" outlined @click="start"
              >立即开始</b-button
            >
            <b-button type="is-light" outlined tag="router-link" to="register"
              >注册</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import navbar from '@/components/navbar.vue';

export default {
  name: 'home',
  components: {
    navbar
  },
  computed: mapState({
    uid: state => state.user.uid
  }),
  methods: {
    start() {
      if (this.uid !== null) {
        this.$router.push('/chat');
      } else {
        this.$router.push('/login');
      }
    }
  }
};
</script>
