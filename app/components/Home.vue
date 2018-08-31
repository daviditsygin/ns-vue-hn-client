<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Hacker News"/>
    <RadListView for="item in posts" pullToRefresh="true" @pullToRefreshInitiated="fetchItems" @itemTap="openPost" class="list-group" backgroundColor="#303030">
      <ListViewLinearLayout v-tkListViewLayout scrollDirection="Vertical" />
      <PullToRefreshStyle indicatorColor="red" indicatorBackgroundColor="blue"/>
      <v-template name="header">
        <StackLayout padding="10 10 10 10">
          <Label class="c-white text-center h3" text="Top Stories" />
        </StackLayout>
      </v-template>
      <v-template name="footer">
        <StackLayout backgroundColor="#303030">
          <Label class="c-white h3" text="footer" />
        </StackLayout>
      </v-template>
      <v-template>
        <PostListItem :item="item" />
      </v-template>
    </RadListView>
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
    fetchItems(args) {
      this.$http.getJSON("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty").then(result => {
        console.log(result.length)
        result = result.splice(0, 30)
        if  (args){
          args.object.notifyPullToRefreshFinished()
        }
        
        result.forEach((p) => {
          this.$store.commit('addPostToList', p)
          this.resolvePost(p)
        })
      }, error => {
        console.log(error);
      });
    },
    resolvePost(p){
      
      this.$http.getJSON("https://hacker-news.firebaseio.com/v0/item/"+p+".json?print=pretty").then(result => {
        this.$store.commit('updatePost', result)
      }, error => {
        console.log(error);
      });
    },
    openPost(event){
      console.log(this.$route.path)
      this.$router.replace('/home');
      // this.$store.viewPost = event.item
      this.$store.commit('setViewPost', event.item)
      this.$router.push('/post')
      console.log(this.$route.path)
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
