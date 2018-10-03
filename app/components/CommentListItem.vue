<template>
    <GridLayout class="list-group-item" rows="auto, *" columns="*" :padding="'5 0 5 5'" v-if="item">
        <Label row="0" col="0" :text="item.by" class="list-group-item-text" :padding="'0 0 0 '+(item.level*5)" v-if="item"/>
        <HtmlView row="1" col="0" :html="'<body>'+item.text+'</body>'" class="list-group-item-text" color="#000000" :margin="'0 0 0 '+(item.level*5)" v-if="item"/>
    </GridLayout>
</template>

<script>

export default {
  name: 'CommentListItem',
  mounted: function () {
  },
  props: ['item']
}
</script>