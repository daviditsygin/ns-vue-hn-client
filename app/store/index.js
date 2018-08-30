import Vue from 'nativescript-vue';
import Vuex from 'vuex';
// import request from 'request';
import * as http from "http";
import counter from './modules/counter';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    counter,
  },
  state: {
    postList: {}
  },
  mutations: {
    addPostToList (state, newPost){
      // state.postList.splice(newPost, 1, {text: newPost})
      Vue.set(state.postList, newPost, {score: 0, title: 'Loading data...'})
      // state.[] = 
      // console.log(state.postList)
      // console.log('ADD POST TO LIST')
    },
    updatePost (state, post){
      // state.postList.splice(newPost, 1, {text: newPost})
      Vue.set(state.postList, post.id, post)
      // state.[] = 
      // console.log(state.postList)
      // console.log('ADD POST TO LIST')
    }
  },
  getters: {
    posts(state){
      const posts = Object.values(state.postList)
      return posts
    }
  },
  strict: (TNS_ENV === 'debug'),
});
// console.log(http)
console.log('starting')
Vue.prototype.$store = store;
Vue.prototype.$http = http;
export default store;
