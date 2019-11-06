<template>
  <b-modal :active.sync="isImageModalActive">
    <div class="card">
      <header class="card-header">
        <h1 class="card-header-title">创建会话 - 您的用户 ID 是 {{uid}}</h1>
      </header>
      <div class="card-content">
        <div>
          <b-field label="请输入用户 ID">
            <b-taginput
              v-model="members"
              open-on-focus
              icon="label"
              placeholder="用户 ID (按回车确认,退格删除上一个)"
              :before-adding="beforeAdding"
            >
            </b-taginput>
          </b-field>
          <b-button type="is-success" @click="create">创建</b-button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import User from '../services/users';

export default {
  name: 'create-group',
  data: () => ({
    isImageModalActive: false,
    members: [],
    uid: 0
  }),
  created() {
    this.uid = User.getUser().uid;
  },
  methods: {
    open() {
      this.isImageModalActive = true;
    },
    beforeAdding(tag) {
      try {
        const id = Number(tag);
        if (id <= 0) return false;
        if (id === this.uid) return false;
        return true;
      } catch (err) {
        return false;
      }
    },
    async create() {
      try {
        await User.createGroup(this);
        this.isImageModalActive = false;
      } catch (err) {
        this.$buefy.snackbar.open({
          duration: 5000,
          message: '创建失败',
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
