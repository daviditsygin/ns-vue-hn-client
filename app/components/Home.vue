<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Hacker News Test"/>

    <!-- <StackLayout>
      <Button class="btn btn-primary" @tap="$router.push('/counter')">Counter!</Button>
      <Button class="btn btn-primary" @tap="$router.push('/hello')">Hello World</Button>
    </StackLayout> -->

    <!-- <ListView for="item in this.$store.state.listOfItems" @itemTap="onItemTap">
      <v-template>
        <Label :text="item.text" />
      </v-template>
    </ListView> -->

    <ListView class="list-group" for="item in posts" @itemTap="$router.push('/hello')">
      <v-template>
        <PostListItem :item="item" />
      </v-template>
    </ListView>


  </Page>
</template>

<script>

import PostListItem from '@/components/PostListItem'
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: 'Home',
  components: {
    PostListItem
  },
  created: function () {
    console.log('testing')
    this.fetchItems()
  },
  computed: {
		posts(){
      return this.$store.getters.posts
    }
	},
  methods: {
    fetchItems() {
      this.$http.getJSON("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty").then(result => {
        console.log(result.length)
        result.forEach((p) => {
          // console.log(p)
          this.$store.commit('addPostToList', p)
          this.resolvePost(p)
        })
      }, error => {
        console.log(error);
      });
    },
    resolvePost(p){
      
      this.$http.getJSON("https://hacker-news.firebaseio.com/v0/item/"+p+".json?print=pretty").then(result => {
        // console.log(result)
        // this.$store.postList[p].text = 
        // Vue.set(this.$store.postList, p, {text: result.title})
        this.$store.commit('updatePost', result)
      }, error => {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>
  @media screen and (max-width: 768px) {
    .main-hero{
      padding-top: 50px;
    }
  }

  @media screen and (min-width: 767px), print {
    .main-hero{
      padding-top: 150px;
    }
  }
  .main-hero{
    background: #f2f3f6;
  }
</style>
