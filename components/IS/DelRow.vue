<template lang="pug">
Dropdown(
  openTo="toLeft"
)
  .btn_icon.red(
    title="удалить запись"
    slot="btn"
  )
    img(src="~static/icon/del.svg")
  .Dropdown_body
    p Удалить ?
    //- @click="deleteImage({hallid: hall.hallid, fileid: img.fileid}); hall.images.splice(idx, 1)"
    .sm.btn.fill.red(
      @click.self="Fn(JSON.stringify(rowData)); $parent.$el.click();"
    ) Удалить
</template>


<script>
import Dropdown from '~/components/Dropdown/Dropdown.vue'
export default {
  components: {
    Dropdown
  },
  props: {
    Fn: {
      type: Function,
      default: () => console.log('Клик DEL')
    },
    rowData: {
      type: Object,
      default: null
    }
  }
}
</script>




