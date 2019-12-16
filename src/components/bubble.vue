<template>
  <div style="position: relative">
    <p v-if="group" :class="['name', self ? 'has-text-right' : 'has-text-left']">{{ message.user.name }}</p>
    <img v-if="!self" class="avatar" :src="gravatarUrl">
    <div :class="self ? 'main-bubble-right' : 'main-bubble-left'">
      <p class="bubble" :class="[self ? 'has-text-right' : 'has-text-left']">
        <i :class="self ? 'bubble-right' : 'bubble-left'"></i>
        <span v-if="message.message.text">{{ message.message.text }}</span>
        <canvas
          v-else
          ref="cvs"
          :width="width"
          :height="height"
        ></canvas>
      </p>
    </div>
    <img v-if="self" class="avatar" :src="gravatarUrl">
  </div>
</template>

<script>
import gravatar from 'gravatar';

export default {
  name: 'bubble',
  props: {
    message: Object,
    self: Boolean,
    group: Boolean
  },
  data: () => ({
    height: 260,
    width: 300
  }),
  computed: {
    gravatarUrl() {
      return gravatar.url(this.message.user.email);
    }
  },
  mounted() {
    if (this.message.message.image) {
      const image = new Image();
      image.src = this.message.message.image;
      image.onload = () => {
        const ctx = this.$refs.cvs.getContext('2d');
        ctx.drawImage(image, 0, 0);

        const scale = this.height / image.height;
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.save();
        ctx.translate(this.width / 2 - image.width / 2 * scale, this.height / 2 - image.height / 2 * scale);
        ctx.scale(scale, scale);
        ctx.drawImage(image, 0, 0);
        ctx.restore();
      };
    }
  }
};
</script>

<style>
.main-bubble-right {
  width: calc(100% - 50px);
  margin-right: 20px;
  display: inline-block;
}
.main-bubble-left {
  width: calc(100% - 50px);
  margin-left: 50px;
  display: inline-block;
}

.bubble {
  position: relative;
  margin-bottom: 10px;
}
.bubble > span,
.bubble > canvas {
  display: inline-block;
  background: #ddd;
  padding: 10px;

  border-radius: 5px;
}

.bubble > .bubble-right {
  position: absolute;
  width: 0px;
  height: 0px;
  color: rgb(221, 221, 221);
  border-width: 10px 10px 10px 15px;
  border-style: solid;
  border-color: transparent transparent transparent currentcolor;
  left: 100%;
  top: 0.7em;
}
.bubble > .bubble-left {
  position: absolute;
  width: 0px;
  height: 0px;
  color: rgb(221, 221, 221);
  border-width: 10px 15px 10px 10px;
  border-style: solid;
  border-color: transparent currentcolor transparent transparent;
  right: 100%;
  top: 0.7em;
}

.name {
  font-size: 0.8em;
}

.avatar {
  position: absolute;
  margin-top: 0.5em;
  border-radius: 50%;
  max-width: 30px;
  max-height: 30px;
}
</style>
