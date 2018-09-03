<template>
  <Page class="page">
    <ActionBar class="action-bar" :title="viewPost.title" v-if="viewPost">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.push('/home')"/>
    </ActionBar>
    <StackLayout>
      <Button textWrap=true :text="viewPost.url"/>
      <!-- <Button class="btn btn-primary" @tap="$router.back()" text="Tap me!"/> -->
      <Label class="text-center">{{viewPost.descendants}} comments</Label>
      <ListView class="list-group" for="item in posts" @itemTap="$router.push('/hello')">
        <v-template>
          <PostListItem :item="item" />
        </v-template>
      </ListView>
    </StackLayout>
  </Page>
</template>

<script>

  // import CommentListItem from '@/components/CommentListItem'
  import PostListItem from '@/components/PostListItem'
  export default {
    components: {
      PostListItem
    },
    computed: {
      viewPost(){
        console.log('VIEW POST COMPUTED')
        console.log(this.$store.getters.viewPost)
        return this.$store.getters.viewPost
      },
      posts(){
        return this.$store.getters.posts
      }
    },
    created: function () {
      console.log('testing')
      this.fetchComments()
    },
    methods: {
      fetchComments(){
        console.log('FETCHING COMMENTS')
      }
    }
  };
</script>

<style scoped>
  .hello-world {
    margin: 20;
  }
</style>
