<template lang="pug">
// select(:multiple='multi')
select(
  @change="$emit('input',$event.target.value)"
)
  //- option(
  //-   v-if="!data.value"
  //-   :value="null"
  //- ) НЕ ЗАДАНО
  //- option(
  option(
    v-for='(option,idx) in data.options',
    :key='idx'
    :selected="option.value == data.value"
    :value="option.value"

  ) {{option.name}}

</template>

<script>
export default {
  /*
  props: ['multi', 'options', 'value']
  options: [
    {
      name
      value
    }
  ]
  */
  props: {
    data: {
      type: Object,
      default: () => ({
        options: null,
        value: null
      })
    }
  }
}
</script>
