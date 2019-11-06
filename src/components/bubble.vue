<template>
  <p class="bubble" :class="[self ? 'has-text-right' : 'has-text-left']">
    <i :class="self ? 'bubble-right' : 'bubble-left'"></i>
    <span>{{ message.message }}</span>
  </p>
</template>

<script>
export default {
  name: 'bubble',
  props: {
    message: Object,
    self: Boolean
  },
  data: () => ({})
};
</script>

<style>
.bubble {
  position: relative;
  margin-bottom: 10px;
}
.bubble > span {
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
  top: calc(1em);
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
  top: calc(1em);
}
</style>
