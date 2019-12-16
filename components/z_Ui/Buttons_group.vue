<template lang="pug" functional>
section
  <divider title="Buttons_group" />
  fieldset
    .Tag button-group
    .flex.y_center.mb_3
      .button-group
        each _,i in Array(3)
          div.btn.fill.lite item_#{i+1}
      | &emsp;
      .button-group.lg
        each _,i in Array(3)
          div.btn.fill.lite item_#{i+1}
      | &emsp;
      .button-group.xl
        each _,i in Array(3)
          div.btn.fill.lite item_#{i+1}
    p
      .button-group
        each _,i in Array(3)
          div.btn.flat item_#{i+1}
    p
      .button-group
        each _,i in Array(3)
          div.btn.flat.red item_#{i+1}
    p
      .button-group
        each _,i in Array(3)
          div.btn.flat.green item_#{i+1}
    p
      .button-group
        each _,i in Array(3)
          div.btn.flat.orange item_#{i+1}
    p
      .button-group
        each _,i in Array(3)
          div.btn item_#{i+1}
    p
      .button-group
        each _,i in Array(3)
          div.btn.fill.green item_#{i+1}

    .flex.y_center.mb_3
      .button-group
        div.btn.fill item_1
        div.btn.fill.red item_1
        div.btn.fill.orange item_2
      | &emsp;
      .button-group.lg
        div.btn.fill item_1
        div.btn.fill.red item_1
        div.btn.fill.orange item_2
      | &emsp;
      .button-group.xl
        div.btn.fill item_1
        div.btn.fill.red item_1
        div.btn.fill.orange item_2
</template>
