<template>
  <div id="app">
    <router-view name="home" />
    <navbar v-if="$route.path !== '/'" background />
    <div class="content"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import PubSub from 'pubsub-js';

import navbar from '@/components/navbar.vue';
import User from './services/users';

export default {
  name: 'app',
  components: {
    navbar
  },
  data: () => ({
    user: null
  }),
  async created() {
    try {
      this.user = await User.updateUser();
    } catch (err) {
      this.user = null;
    } finally {
      PubSub.publish('showNavbar');
    }
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
