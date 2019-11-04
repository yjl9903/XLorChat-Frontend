import PubSub from 'pubsub-js';

import api from './index';

let user = null;

async function register({ username, password, name, email }) {
  const { data } = await api.post('/user/register', {
    username, password, name, email
  });
  user = data;
  PubSub.publish('login', data);
  return data;
}

async function login({ username, password }) {
  const { data } = await api.post('/user/login', { username, password });
  user = data;
  PubSub.publish('login', data);
  return data;
}

async function logout() {
  await api.get('/user/logout');
  user = null;
  PubSub.publish('logout');
  return true;
}

async function updateUser() {
  const { data } = await api.get('/user');
  user = data;
  PubSub.publish('login', data);
  return data;
}

function getUser() {
  return user;
}

async function getGroup() {
  const { data } = await api.get('/user/group');
  return data;
}

const UserService = {
  register,
  login,
  logout,
  updateUser,
  getUser,
  getGroup
};

export default UserService;
