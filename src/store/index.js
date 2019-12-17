import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import axios from 'axios';
import router from '../router';
import { cloneDeep } from 'lodash';

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
export const PushMessage = 'pushMessage';
export const ClearMessage = 'clearMessage';

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: {
      uid: null,
      name: '',
      email: ''
    },
    group: [],
    message: []
  },
  getters: {
    isLogin: state => !!state.user.uid,
    msgHistory: state => g => {
      let i = 0;
      for (const { gid } of state.group) {
        if (g === gid) {
          const arr = [];
          for (const item of state.message[i]) {
            arr.push(cloneDeep(item));
          }
          return arr;
        }
        i++;
      }
      return [];
    }
  },
  mutations: {
    [UpdateUser](state, { uid = null, name = '', email = '' }) {
      state.user.uid = uid;
      state.user.name = name;
      state.user.email = email;
    },
    [PushGroup](state, arr) {
      const gidSet = new Set();
      for (const { gid } of state.group) {
        gidSet.add(gid);
      }
      for (const g of arr) { 
        if (gidSet.has(g.gid)) continue;
        state.group.push(g);
        state.message.push([]);
        gidSet.add(g.gid);
      }
    },
    [ClearGroup](state) {
      state.group.splice(0, state.group.length);
      state.message.splice(0, state.message.length);
    },
    [PushMessage](state, { gid, data }) {
      let i = 0;
      for (const item of state.group) {
        if (gid == item.gid) {
          state.message[i].push(data);
          break;
        }
        i++;
      }
    },
    [ClearMessage](state, gid) {
      let i = 0;
      for (const item of state.group) {
        if (gid == item.gid) {
          state.message[i].splice(0, state.message[i].length);
          break;
        }
        i++;
      }
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
