<template lang="pug">

.btn_icon(
  title="сохранить изменения"
  @click="Fn(JSON.stringify(rowData))"
)
  //- img(src="~static/icon/edit_tr.svg")
  img(src="~static/icon/edit.svg")

</template>
<script>
export default {
  props: {
    Fn: {
      type: Function,
      default: () => console.log('Клик EDIT')
    },
    rowData: {
      type: Object,
      default: null
    }
  }
}
</script>
