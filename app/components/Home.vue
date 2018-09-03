<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Home"/>

    <RadListView for="item in posts" pullToRefresh="true" @pullToRefreshInitiated="refresh" @itemTap="openPost" class="list-group">
      <ListViewLinearLayout v-tkListViewLayout scrollDirection="Vertical" />
      <PullToRefreshStyle indicatorColor="red" indicatorBackgroundColor="blue"/>
      <v-template name="header">
        <StackLayout padding="10 10 10 10">
          <Label class="c-white text-center h3" text="Top Stories" />
        </StackLayout>
      </v-template>
      <v-template name="footer">
        <StackLayout>
          <Button @tap="loadMore" >Load more...</Button>
        </StackLayout>
      </v-template>
      <v-template>
        <PostListItem :item="item" />
      </v-template>
    </RadListView>
    <!-- <StackLayout>
      <Button class="btn btn-primary" @tap="$router.push('/counter')">Counter</Button>
      <Button class="btn btn-primary" @tap="$router.push('/post')">Hello World</Button>

      <ListView class="list-group" for="item in posts" @itemTap="openPost">
        <v-template>
          <PostListItem :item="item" />
        </v-template>
      </ListView>

    </StackLayout> -->
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
  data () {
    return {
      postIndex: 0,
      postLimit: 30
    };
  },
  methods: {
    fetchItems(args) {
      this.$http.getJSON("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty").then(result => {
        result = result.splice(this.postIndex, this.postLimit)
        if (args){
          console.log('in args')
          args.object.notifyPullToRefreshFinished()
        }
        console.log(result.length)
        var idx = this.postIndex
        result.forEach((p) => {
          this.$store.commit('addPostToList', {id: p, idx: idx})
          this.resolvePost(p, idx)
          idx++
          console.log(idx)
        })
        this.postIndex += this.postLimit
        console.log(this.postIndex)
      }, error => {
        console.log(error)
      });
    },
    resolvePost(p, idx){
      this.$http.getJSON("https://hacker-news.firebaseio.com/v0/item/"+p+".json?print=pretty").then(result => {
        this.$store.commit('updatePost', {post: result, idx: idx})
      }, error => {
        console.log(error)
      });
    },
    refresh(args){
      this.postIndex = 0
      this.$store.commit('clearList')
      this.fetchItems(args)
    },
    openPost(event){
      console.log(this.$route.path)
      this.$store.commit('setViewPost', event.item)
      this.$router.push('/post')
      console.log(this.$route.path)
    },
    loadMore(args){
      this.fetchItems()
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
