<template lang="pug">

.HERE_tabs.m_auto
  ul.tabList
    li(
      v-for="tab,i in ['Log in','Create account']",
      :class="{curr:i==TAB}",
      @click="TAB = i;"
    ) {{tab}}

  transition-group(tag="div" class="TAB_content" name="tab")
    form.TAB(
      key="0",
      v-show="TAB == 0"
      @submit.prevent
    )
      center
        .H2 Already registered?
        p enter your login and passpord 
          br
          | to access your files

      label.field email
        input.xl(

          v-model="loginData.login", 
          placeholder="email",
          name="email"
          autocomplete="on",
        )

      label.field Your password
        input.xl(
          type="password"
          v-model="loginData.pass",
          name="password"
          autocomplete="on",
        )

      center.mt_4
        .btn.xl.fill.green(
          @click="login"
        ) Log in

    form.TAB(key="1", v-show="TAB==1", @submit.prevent)
      center
        .H2 New user
        p Fill this simple form 
          br
          | to create personal account

      .flex_col(
        v-for="It in [1,2,3,4]"
      )
        label.field label
          input.lg(
            
            placeholder="WTF"
          )
      .center
        .btn.xl Create account



</template>


<script>
export default {
  layout: 'blank',
  data() {
    return {
      TAB: 0,
      loginData: {
        login: '',
        pass: ''
      },
      accountData: {}
    }
  },
  methods: {
    async login() {
      const response = await fetch(
        `https://closedfolders.com/api/2/check_user?email=${this.loginData.login}&pass=${this.loginData.pass}`
      )
      const result = await response.json()
      result.message
        ? this.$notice('', JSON.stringify(result), 'error')
        : this.$notice(result.token)
      //- console.log('result:', JSON.stringify(result))

      /** 
      const params = new URLSearchParams()
      params.append('login', this.loginData.login)
      params.append('pass', this.loginData.pass)

      const { data } = await this.$axios.$post(
        'https://closedfolders.com/api/2/check_user',
        params,
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        }
      )
      console.log(data)
      */

      /*
      *
      const formData = new FormData()
      formData.append('login', this.loginData.login)
      formData.append('pass', this.loginData.pass)
      try {
        const response = await fetch(
          'https://closedfolders.com/api/2/check_user',
          {
            method: 'POST',
            //- headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData
          }
        )
        const result = await response.json()
        console.log('Успех:', JSON.stringify(result))
      } catch (error) {
        console.error('Ошибка:', error)
      }
      */
    }
  }
}
</script>



<style lang="stylus">
//- @import "~@/components/Tabs/_tabs.styl"



.tab-enter-active
  transition all .4s ease

.tab-enter
  opacity 0
  transform translateY(10px)

.tab-enter-to
  opacity 1

.tab-leave-active
  display none


.tabList
  width 310px
  user-select: none
  display flex
  background #dee2e6
  box-shadow inset 0 -2px 5px rgba(#C7CEDE, .5)
  text-transform uppercase


  li+li
    border-left 1px solid #C7CEDE


  li
    //- flex 1
    text-align center
    cursor pointer
    padding .7rem 1rem
    font-weight bold
    color #477dca //#038377 //
    &.curr
      background #FFF




.tabList li
  &:nth-child(1)
    flex 1
  &:nth-child(2)
    flex 2


.TAB_content
  padding 1em 2em 1.6em
  background #FFF


</style>





