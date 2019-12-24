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

      label.field Your email
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
        button.btn.xl.fill.green(
          typ="submit"
          @click="login"
        ) Log in

    form.TAB(key="1", v-show="TAB==1", @submit.prevent)
      center
        .H2 New user
        p Fill this simple form
          br
          | to create personal account

      .flex_col(
        v-for="V,K in signUpData"
      )
        label.field Your {{K}}
          input.lg(

            :placeholder="K"
          )
      .center
        button.btn.xl Create account



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
      signUpData: {
        name: '',
        email: '',
        password: '',
        invite: ''
      }
    }
  },
  created() {
    console.log('######socket', this.$socket)
  },
  methods: {
    async login() {
      const response = await fetch(
        `https://closedfolders.com/api/2/users_check?email=${this.loginData.login}&pass=${this.loginData.pass}`
      )
      const result = await response.json()

      if (result.token) {
        //- this.$store.commit('persist/logIn', result.token)
        console.log(result.token)
        localStorage.token = result.token

        //- this.$options.sockets.onopen = () => location.replace('/')

        location.replace('/')
      } else {
        this.$notice('', result.message.text, 'error')
      }
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
    color #a180da
    &.curr
      background #FFF

.tabList li
  &:nth-child(1)
    flex 1
  &:nth-child(2)
    flex 2



.HERE_tabs
  //- background: rgba(40,57,101,.9);
  box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);

.TAB_content
  padding 1em 2em 1.6em
  background #FFF
  //- background:url(https://raw.githubusercontent.com/khadkamhn/day-01-login-form/master/img/bg.jpg)
</style>
