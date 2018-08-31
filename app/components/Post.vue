<template>
  <Page class="page">
    <ActionBar class="action-bar" :title="viewPost.title" v-if="viewPost">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.push('/home')"/>
    </ActionBar>
    <StackLayout class="hello-world">
      <Label class="body" textWrap=true :text="viewPost.url"/>
      <Button class="btn btn-primary" @tap="$router.back()" text="Tap me!"/>
    </StackLayout>
  </Page>
</template>

<script>
  export default {
    computed: {
      viewPost(){
        console.log('VIEW POST COMPUTED')
        console.log(this.$store.getters.viewPost)
        return this.$store.getters.viewPost
      }
    }
  };
</script>

<style scoped>
  .hello-world {
    margin: 20;
  }

  Label {
    color: red;
  }
</style>
