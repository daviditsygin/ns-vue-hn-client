<template>
  <Page class="page">
    <ActionBar class="action-bar" :title="viewPost.title" v-if="viewPost">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.back()"/>
    </ActionBar>
    <StackLayout>
      <Button textWrap=true :text="viewPost.url"/>
      <Label class="text-center">{{viewPost.descendants}} comments</Label>
      <ListView class="list-group" for="item in nested_comments" @itemTap="$router.push('/hello')">
        <v-template>
          <CommentListItem :item="item" />
        </v-template>
      </ListView>
    </StackLayout>
      <!-- <ListView class="list-group" for="item in nested_comments" @itemTap="$router.push('/hello')">
        <v-template>
          <CommentListItem :item="item" />
        </v-template>
      </ListView> -->
  </Page>
</template>

<script>

  import CommentListItem from '@/components/CommentListItem'
  import Vue from 'nativescript-vue';
  import decode from 'unescape';
  export default {
    components: {
      CommentListItem
    },
    data () {
      return {
        ncomments: {}
      };
    },
    computed: {
      viewPost(){
        return this.$store.getters.viewPost
      },
      posts(){
        return this.$store.getters.posts
      },
      comments(){
        return this.$store.getters.comments
      },
      nested_comments(){
        var arr = []
        if (this.ncomments){
          Object.values(this.ncomments).forEach((c) => {
            arr.push(c)
            if (c.nested){
              this.pushNested(c, arr, 5)
            }
          })
        }
        return arr
      }
    },
    created: function () {
      this.fetchComments(this.viewPost.kids, this.ncomments)
    },
    methods: {
      pushNested(c, arr, level){
        Object.values(c.nested).forEach((n) => {
          if (!n.text){
            //not resolved
            return
          }
          else {
            n.level = level
            arr.push(n)
            if (n.nested){
              this.pushNested(n, arr, level+5)
            }
          }

        })
      },
      fetchComments(list, parent){
        console.log('FETCHING COMMENTS')
        var idx = 0
        list.forEach((comment) => {
          Vue.set(parent, idx, {})
          Vue.set(parent[idx], 'id', comment)
          this.resolveComment(idx, parent)
          idx++
        })
      },
      resolveComment(idx, parent){
        this.$http.getJSON("https://hacker-news.firebaseio.com/v0/item/"+parent[idx].id+".json?print=pretty").then(result => {
          result.text = decode(result.text)
          Vue.set(parent, idx, result)
          Vue.set(parent[idx], 'level', 0)
          if (result.kids){
            Vue.set(parent[idx], 'nested', {})
            this.fetchComments(parent[idx].kids, parent[idx].nested)
          }
          }, error => {
            console.log(error)
        });
      }
    }
  };
</script>

<style scoped>
  .hello-world {
    margin: 20;
  }
</style>
