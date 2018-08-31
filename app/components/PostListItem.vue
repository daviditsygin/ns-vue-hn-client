<template>
    <GridLayout class="list-group-item" rows="auto, *" columns="*, 6*">
        <Label row="0" col="0" :text="item.score" class="list-group-item-text" v-if="item"/>
        <Label row="0" col="1" :text="item.title" class="list-group-item-heading" v-if="item" />
        <Label row="1" col="1" :text="item.by+' · '+ item.descendants +' comments'" class="list-group-item-text" v-if="item"/>
    </GridLayout>
</template>

<script>

export default {
  name: 'PostListItem',
  mounted: function () {
  },
  props: ['item']
}
</script>