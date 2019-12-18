<template lang="pug">
.Page
  h1.mb_2 Your Account

  pre {{api}}

  .flex_col
    label.field(
      v-for="(V,K) in api"
    ) 
      | {{K}}
      input.lg(:value="V")

</template>

<script>
export default {
  data: () => ({
    api: {
      email: 'dima5447298@mail.ru',
      user_name: 'Zupra',
      address: null,
      zip: null,
      city: null,
      state: null,
      country: null,
      last_login: '2019-12-17 03:3,0:41',
      reg_date: '2019-12-16 04:53:27',
      canshare: '0',
      candownload: '0',
      canlogin: '0'
    }
  })
}
</script>

<style lang="stylus" scoped></style>
