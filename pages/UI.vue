<template lang="pug">
.Wrap

  <divider title="Цвет" />

  ResizeVertical.m_auto(height="200px")
    #palette
      each clr in ['#F44336','#1E88E5','#FDD835', '#CDD9ED']
        figure
          div(
            style="background-color:"+clr
          )
          figcaption #{clr}

    hr
    #palette
      each clr in ['#1976d2','rgb(220, 0, 78)', '#ff1493']
        figure
          div(
            style="background-color:"+clr
          )
          figcaption #{clr}

    hr
    #palette
      each clr in ['#ed5565','#26a69a','#3498db','#ff9800','#477dca','#dee2e6','#C7CEDE','#3c4858','#34495e','#568DA6']
        figure
          div(
            style="background-color:"+clr
          )
          figcaption #{clr}

  <divider title="Spacing" />
  Spacing

  div(
    v-for="v,k in { s2:0.75, s1:0.85,  base:1,   x1:1.125, x2:1.5, x3:1.75, x4:2.25, x5:3, x6:4 }"
    :style="`font-size: ${v}rem`"
  )
    b [{{k}}]
    | Headline





  Buttons_group

  Buttons


  hr


  <divider title="UiSelect" />
  UiSelectTest

  <divider title="Card" />
  .flex
    .mr_5
      .Tag nav>a
      nav.Card_list(style="display: inline-grid")
        each link in ['Mark as important','Create event','Restore contacts']
          a(href="#")= link
        a.active(href="#") Lorem ipsum
    .mr_5
      .Tag ul>li
      ul.Card_list(style="display: inline-grid")
        li.active На Волне Yum.fm
        each item in ['Радио Best FM','Радио ENERGY','Rock FM 95.2','Радио ПАССАЖ','Радио Maximum','Авторадио','Зайцев FM']
          li #{item}
    div
      .Tag nav>a
      nav.Card_list(style="display: inline-grid")
        each item in [1,2,3,4,5]
          a(href="#") link_#{item}

  hr

  .H1 Статусы
  #palette
    figure(
      v-for="(clr,key) in {success:'#03a9f4',danger:'#ec4758',warning:'#f7a54a',primary:'#18a689',info:'#21b9bb'}"
    )
      div(
        :style="`background-color:${clr}`"
      )
      figcaption
        p {{clr}}
        b(
          :style="`color:${clr}`"
        ) {{key}}
    //- dl
    //-   dt {{clr}}
    //-   dd {{key}}

  each Clr in ['success', 'danger', 'warning', 'primary', 'info']
    p(class=`${Clr}`) Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam tempore dolor accusantium unde reprehenderit, inventore ad alias. In nam minima ea at. Ipsa esse perferendis odit, quisquam porro eligendi quis.


  <divider title="Shadow" />
  Shadow


  //- UI
  UiTest




  <divider title="Input_Prepend" />
  Input_Prepend(
    size=''
    prepend="prepend"
    value="value"
  )
  | &emsp;
  Input_Prepend(
    prepend="$"
    value="500"
  )
  | &emsp;
  Input_Prepend(
    size='xl'
    prepend="WTF"
    value="100 500"
  )


  <divider title="Popover" />
  Popover(
    label="Popover"
  )
    p Вы не можете гарантировать, что AJAX-запрос не будет разрешен (resolve) перед моментом монтирования компонента. Если да, то это будет означать, что вы пытаетесь выполнить setState над демонтированным компонентом, который не только не работает, но и сам React будет ругаться на вас. Делайте AJAX-запросы в componentDidMount, чтобы гарантировать, что есть компонент для обновления.
  | &emsp;
  Popover(
    label="Popover"
  )
    p
      input.lg(value="value")
    .flex.x_end
      .sm.btn.fill Сохранить
  | &emsp;
  Popover(
    label="Popover"
  )
    table
      tr
        each _,i in Array(3)
          th thead_#{i+1}
      each _,i in Array(3)
        tr
          each _,i in Array(2)
            td data_#{i+1}
          td
            Input_Switch
    .flex.x_end
      .sm.btn.fill Сохранить


  <divider title="Input_ReadonlyTgl" />
  p @dblclick=ReadonlyTgl
  Input_ReadonlyTgl()
  <divider title="Input_Star" />
  p @click=toggle
  Input_Star()

  <divider title="Input_Number" />

  Input_Number(
    :em="8"
    size="sm"
    :start="100500"
  )
  | &emsp;
  Input_Number(
    :start="50"
  )
  | &emsp;
  Input_Number(
    :start="20"
    :em="12"
    maxlength="2"
  )
  | &emsp;
  Input_Number(
    size="lg"
    :start="100500"
  )
  | &emsp;
  Input_Number(
    size="xl"
    :em="5"
    maxlength="2"
    :start="11"
  )
  <divider title="Input_Switch" />
  p Разрешить Просматривать &nbsp;
    Input_Switch
  p Разрешить Удалять &nbsp;
    Input_Switch
  .table-responsive
    table.table_distance
      tr
        each _,i in Array(5)
          th thead_#{i+1}
      each _,i in Array(3)
        tr
          each _,i in Array(4)
            td data_#{i+1}
          td
            Input_Switch

  <divider title="Dropdown" />
  Dropdown
    .btn.lg(slot="btn") Dropdown Card
    .Card
      img(
        height="160"
        src="https://picsum.photos/240/160?image="+1051
      )
      .flex.y_center.x_end
        .btn.flat.red action
        .btn.ml_3 ОК
  Dropdown
    .btn.lg(slot="btn") Dropdown table
    table.table_distance
      tr
        each _,i in Array(5)
          th thead_#{i+1}
      each _,i in Array(3)
        tr
          each _,i in Array(5)
            td data_#{i+1}
  Dropdown(
    openTo="toLeft"
  )
    .btn.lg(slot="btn") Dropdown table toLeft
    table.table_distance
      tr
        each _,i in Array(5)
          th thead_#{i+1}
      each _,i in Array(3)
        tr
          each _,i in Array(5)
            td data_#{i+1}

  Dropdown
    .btn.lg(slot="btn") Dropdown menu
    nav.Card_list
      each link in ['Список игроков','Список пользователей','Mark as important','Create event','Restore contacts']
        a(href="#")= link
      a.active(href="#") Lorem ipsum

  Dropdown
    .btn.lg(slot="btn") Dropdown BigSelect_many
    BigSelect_manyTest


  <divider title="BigSelect_many" />
  BigSelect_manyTest

  <divider title="Pagination" />
  PaginationTest



  <divider title="Calendar" />
  Calendar_period
  hr
  span Input Date &nbsp;
    InpDate
  span &nbsp; Input Month &nbsp;
    InpMonth
  hr.hr_1
  .Flex_wr
    .col
      Calendar
    .col
      Calendar_month

  <divider title="Modal" />
  ModalTest
  <divider title="Expander" />
  ExpanderTest





  <divider title="Иконки" />
  Icons
  br
  hr
  br


</template>

<script>
import UiSelectTest from '~/components/Select/UiSelectTest.vue'
import BigSelect_manyTest from '~/components/Select/BigSelect_manyTest.vue'
import ModalTest from '~/components/Modal/ModalTest.vue'
import ExpanderTest from '~/components/Dropdown/ExpanderTest.vue'

import Dropdown from '~/components/Dropdown/Dropdown.vue'


import PaginationTest from '~/components/Pagination/PaginationTest.vue'
import Input_Switch from '~/components/Input/Input_Switch.vue'


import Input_Number from '~/components/Input/Input_Number.vue'
import Calendar from '~/components/Calendar/Calendar.vue'
import InpDate from '~/components/Calendar/InpDate.vue'
import InpMonth from '~/components/Calendar/InpMonth.vue'
import Calendar_month from '~/components/Calendar/Calendar_month.vue'
import Calendar_period from '~/components/Calendar/Calendar_period.vue'

import Input_Star from '~/components/Input/Input_Star.vue'
import Input_ReadonlyTgl from '~/components/Input/Input_ReadonlyTgl.vue'
import Input_Prepend from '~/components/Input/Input_Prepend.vue'

import CarouselTest from '~/components/Slider/CarouselTest.vue'
import Popover from '~/components/Dropdown/Popover.vue'


import Spacing from '~/components/z_Ui/Spacing.vue'
import Shadow from '~/components/z_Ui/Shadow.vue'
import Divider from '~/components/z_Ui/Divider.vue'
import Icons from '~/components/z_Ui/Icons.vue'
import Buttons from '~/components/z_Ui/Buttons.vue'
import Buttons_group from '~/components/z_Ui/Buttons_group.vue'
import ResizeVertical from '~/components/z_Ui/ResizeVertical.vue'
import UiTest from '~/components/UiTest.vue'



export default {
  // layout: 'lite',
  layout: 'ui',
  components: {
    Input_Number,
    PaginationTest,

    ModalTest,
    ExpanderTest,
    BigSelect_manyTest,
    Dropdown,

    Calendar,
    InpDate,
    InpMonth,
    Calendar_month,
    Calendar_period,
    UiSelectTest,

    Input_Switch,
    Input_Star,
    Input_ReadonlyTgl,
    Input_Prepend,
    CarouselTest,
    Popover,

    // =====
    UiTest,
    Buttons,
    Buttons_group,
    Icons,
    Divider,
    Shadow,
    Spacing,
    ResizeVertical
  }
}
</script>

<style lang="stylus">
#palette
  display flex
  flex-wrap wrap
  // justify-content center
  text-align center
  figure
    margin 1em
  div
    width 5em
    height 4em\


.marginspacing
  &_el
    background-color: rgb(254, 252, 191)
  &_bg
    background #b9f
    shadow()
    border 1px dotted red
    //&+&
    margin 10px

</style>
