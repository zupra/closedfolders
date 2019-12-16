<template lang="pug">
svg(
  xmlns='http://www.w3.org/2000/svg',
  width='32', height='24', viewBox='0 0 24 24',
  fill="#3498db"
)
  path(
    v-if="open"
    key="close"
    d='M19,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,4 4,4H10L12,6H19C20.1,6 21,6.9 21,8H21L4,8V18L6.14,10H23.21L20.93,18.5C20.7,19.37 19.92,20 19,20Z'
  )
  path(
    v-else
    key="open"
    d='M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18C2,19.1 2.9,20 4,20H20C21.1,20 22,19.1 22,18V8C22,6.89 21.1,6 20,6Z'
  )
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  }
}
</script>
