<template lang="pug">
fieldset
  legend UiSelect

  .flex.x_sb
    pre {{options}}
    p selectedOption:
      pre {{selectedOption}}


    .Flex_col
      .col
        .Tag size="sm"
        UiSelect(
          :options="options",
          size="sm"
          @option="OnSelect($event)"
        )
      .col
        .Tag base
        UiSelect(
          :options="options",
          @option="OnSelect($event)"
        )
      .col
        .Tag size="lg"
        UiSelect(
          :options="options",
          size="lg"
          @option="OnSelect($event)"
        )
      .col
        .Tag size="xl + ripple"
        UiSelect(
          :ripple="true"
          :options="options",
          size="xl"
          @option="OnSelect($event)"
        )

</template>

<script>
const options = [
  {
    label: 'Чак Норрис',
    value: 1
  },
  {
    label: 'Ванона Райдер',
    value: 2
  },
  {
    label: 'Саня сказал убрать',
    value: 3
  },
  {
    label: 'Лара Крофт',
    value: 4
  }
]

import UiSelect from '~/components/Select/UiSelect.vue'
export default {
  components: {
    UiSelect
  },
  data() {
    return {
      selectedOption: null,
      options: options
    }
  },
  methods: {
    OnSelect(VAL) {
      this.selectedOption = this.options.filter(item => item.value == VAL)
    }
  }
}
</script>
