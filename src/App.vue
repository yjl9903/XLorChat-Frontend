<template>
  <div id="app">
    <router-view name="home" />
    <navbar v-if="$route.path !== '/'" background />
    <div class="content"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import navbar from '@/components/navbar.vue';

export default {
  name: 'app',
  components: {
    navbar
  },
  data: () => ({}),
  computed: mapState({
    user: state => state.user
  }),
  async created() {
    await this.$store.dispatch('getInfo');
  }
};
</script>

<style>
#app,
body,
html {
  height: 100%;
}

.fullheight {
  height: 100%;
}

.fullwidth {
  width: 100%;
}
</style>
