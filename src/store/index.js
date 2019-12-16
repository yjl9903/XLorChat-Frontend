import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import axios from 'axios';
import router from '../router';

import { baseURL } from '../config';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

Vue.use(Vuex);

export const UpdateUser = 'updateUser';
export const PushGroup = 'pushGroup';
export const ClearGroup = 'clearGroup';

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: {
      uid: null,
      name: '',
      email: ''
    },
    group: []
  },
  getters: {
    isLogin: state => !!state.user.uid
  },
  mutations: {
    [UpdateUser](state, { uid = null, name = '', email = '' }) {
      state.user.uid = uid;
      state.user.name = name;
      state.user.email = email;
    },
    [PushGroup](state, arr) {
      for (const g of arr) state.group.push(g);
    },
    [ClearGroup](state) {
      state.group.splice(0, state.group.length);
    }
  },
  actions: {
    async getInfo({ commit }) {
      try {
        const { data } = await api.get('/user');
        commit(UpdateUser, data);
      } catch(err) {
        commit(UpdateUser, {});
        commit(ClearGroup);
        router.push('/');
      }
    },
    async register({ commit }, form) {
      const { data } = await api.post('/user/register', form);
      commit(UpdateUser, data);
    },
    async login({ commit }, form) {
      const { data } = await api.post('/user/login', form);
      commit(UpdateUser, data);
    },
    async logout({ commit }) {
      await api.get('/user/logout');
      commit(UpdateUser, {});
      commit(ClearGroup);
    },
    async getGroup({ commit }) {
      const { data } = await api.get('/user/group');
      commit(ClearGroup);
      commit(PushGroup, data);
    },
    async createGroup({ commit }, { members }) {
      const { data } = await api.post('/user/create', {
        members
      });
      commit(PushGroup, [data]);
    }
  }
});
