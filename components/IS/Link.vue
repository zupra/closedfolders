<template lang="pug">
  NLink.btn.outline.blue(
    :title="`перейти ${data.to}/${data.id}`"
    :to="`${data.to}/${data.id}`"
  ) {{data.id}}
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({
        to: '/',
        id: 'id'
      })
    }
  }
}
</script>
