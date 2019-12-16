<template lang="pug" functional>
section
  <divider title="Buttons" />
  fieldset
    legend Button
    ._child_m_2
      button base button
      button(disabled) button disabled
      button.btn(type="reset") [type=reset]
      button.btn(type="submit") [type=submit]

    .Tag fill/mod
    ._child_m_1
      each styl in ['btn fill lite','btn fill red','btn fill green','btn fill orange','btn']
        div(class=""+styl) #{styl}

    .Tag ICON + fill/mod
    ._child_m_1
      each styl in ['btn','btn fill red','btn fill green','btn fill orange']
        div(class=""+styl)
          img.icon(src="~static/img/spinner_btn.svg")
          | #{styl}
    ._child_m_1
      //- each icon in ['user-plus','alert-triangle','bell','gift']
      .btn(v-for="icon in ['user-plus','alert-triangle','bell','gift','camera','phone-call']")
        img.icon(:src="'https://icongr.am/feather/'+icon+'.svg?size=18&color=ffffff'")
        | icon {{icon}}

    ._child_m_1
      .btn.lg(v-for="icon in ['align-justify','dollar-sign','mail','paperclip']")
        img.icon(:src="'https://icongr.am/feather/'+icon+'.svg?size=22&color=ffffff'")
        | icon {{icon}}

    .Tag btn_icon

    each styl in ['','red','green','orange']
      ._child_m_2
        .btn_icon(
          class=""+styl,
          v-for="icon in ['settings','eye-hide','cursor-hand-click','tree-view','process-on-vm']"
        )
          img.icon(:src="'https://icongr.am/clarity/'+icon+'.svg?size=24&color=ffffff'")

</template>
