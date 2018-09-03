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
    postList: {},
    viewPost: {},
    comments: {}
  },
  mutations: {
    clearList(state){
      state.postList = {}
    },
    addPostToList (state, obj){
      Vue.set(state.postList, obj.idx, {id: obj.id, score: 0, title: 'Loading data...', descendants: 0})
    },
    updatePost (state, obj){
      Vue.set(state.postList, obj.idx, obj.post)
    },
    setViewPost(state, post){
      state.viewPost = post
    },
    addComment(state, obj){
      Vue.set(state.comments, obj.idx, {id: obj.id, text: 'Loading...', kids: {}})
    },
    updateComment(state, obj){
      Vue.set(state.comments, obj.idx, obj.comment)
    }
  },
  getters: {
    posts(state){
      return Object.values(state.postList)
    },
    comments(state){
      return Object.values(state.comments)
    },
    viewPost(state){
      return state.viewPost
    }
  },
  strict: (TNS_ENV === 'debug'),
});
// console.log(http)
console.log('starting')
Vue.prototype.$store = store;
Vue.prototype.$http = http;
export default store;
