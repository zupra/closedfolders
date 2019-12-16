<template lang="pug">
//- :placeholder="data.placeholder",
input(
  :value="data.value"
  @input="$emit('input',$event.target.value)"
)
</template>

<script>
export default {
  //props: ['placeholder', 'value']
  props: {
    data: {
      type: Object,
      default: () => ({
        // placeholder: 'placeholder',
        value: 'value'
      })
    }
  }
}
</script>

