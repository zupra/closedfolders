<template lang="pug">
section
  fieldset

    .Tag flat/mod
    ._child_m_1
      each styl in ['btn flat','btn flat blue','btn flat red','btn flat green','btn flat orange']
        div(class=""+styl) #{styl}


    .Flex_wr.x_se
      //- each img in ['1053','1051','1054','1057']
      .Card.mb_3
        img(
          height="160"
          src="https://picsum.photos/240/160?image="+1053
        )
        .p_1.flex.y_center.x_end
          .btn.flat action
          .btn.fill.ml_3 удалить
      .Card.mb_3(v-for="v,k in {red:1051, green:1054, orange:1057}")
        img(
          height="160"
          :src="`https://picsum.photos/240/160?image=${v}`"
        )
        .p_1.flex.y_center.x_end
          .btn.flat(:class="k") action
          .btn.ml_3.fill(:class="k") ОК




    .Tag outline/mod
    ._child_m_1
      each styl in ['btn outline','btn outline blue','btn outline red','btn outline green','btn outline orange']
        div(class=""+styl) #{styl}

    .Tag size/mod
    ._child_m_1
      each styl in ['btn xl','btn lg','btn','btn sm']
        div(class=""+styl) #{styl}
    ._child_m_1
      each styl in ['btn xl','btn lg','btn','btn sm']
        .condensed(class=""+styl) #{styl}
    each mod in ['fill lite','fill red','fill green','fill orange']
      ._child_m_1
        each styl in ['btn xl','btn lg','btn','btn sm']
          div(class=`${mod} ${styl}`) #{styl} #{mod}
      .condensed._child_m_1
        each styl in ['btn xl','btn lg','btn','btn sm']
          div(class=`${mod} ${styl}`) #{styl} #{mod}
    each mod in ['outline','outline blue','outline red','outline green','outline orange']
      ._child_m_1
        each styl in ['btn xl','btn lg','btn','btn sm']
          div(class=`${mod} ${styl}`) #{styl} #{mod}
      .condensed._child_m_1
        each styl in ['btn xl','btn lg','btn','btn sm']
          div(class=`${mod} ${styl}`) #{styl} #{mod}


    //- .Tag size/mod + compressed(.condensed)
    //- .condensed
    //-   ._child_m_1
    //-     each styl in ['btn xl','btn lg','btn','btn sm']
    //-       div(class=""+styl) #{styl}
    //-   each mod in ['fill lite','fill red','fill green','fill orange']
    //-     ._child_m_1
    //-       each styl in ['btn xl','btn lg','btn','btn sm']
    //-         div(class=`${mod} ${styl}`) #{styl} #{mod}
    //-   each mod in ['outline','outline blue','outline red','outline green','outline orange']
    //-     ._child_m_1
    //-       each styl in ['btn xl','btn lg','btn','btn sm']
    //-         div(class=`${mod} ${styl}`) #{styl} #{mod}


    .Tag disabled
    ._child_m_1
      each styl in ['btn fill lite','btn fill red','btn fill green','btn fill orange','btn']
        div(class=""+styl, disabled) #{styl} disabled
    ._child_m_1
      each styl in ['btn fill red lg','btn fill red sm','btn outline lg','btn outline sm','btn outline green lg']
        div(class=""+styl, disabled) #{styl} disabled


  <divider title="Checkbox-Radio" />
  fieldset
    legend Checkbox, Radio
    .Tag checkbox
    each _,i in Array(3)
      label
        input(type='checkbox', name='checkbox', value=''+(i+1) )
        | Option #{i+1}

    label
      input(type='checkbox', name='checkbox', value='4', checked)
      | Checked

    .Tag radio
    each _,i in Array(3)
      label
        input(type='radio', name='radio', value=''+(i+1) )
        | Option #{i+1}
    label
      input(type='radio', name='radio', value='4', checked)
      | Checked


    hr.hr_1
    h1 checked-block

    h3 radio
    .flex.y_center.mb_3
      .checked-block
        each _,i in Array(4)
          label
            input(type='radio', name='radio', value=''+(i+1) )
            span.ripple Option #{i+1}
      | &emsp;
      .checked-block.lg
        each _,i in Array(4)
          label
            input(type='radio', name='radio', value=''+(i+1) )
            span.ripple Option #{i+1}
      | &emsp;
      .checked-block.xl
        each _,i in Array(4)
          label
            input(type='radio', name='radio', value=''+(i+1) )
            span.ripple Option #{i+1}

    h3 checkbox
    .checked-block
      each _,i in Array(4)
        label
          input(type='checkbox', name='radio', value=''+(i+1) )
          span.ripple Option #{i+1}


    .Tag .checked-group checkbox
    fieldset
      legend checked-group checkbox
      .checked-group
        each _,i in Array(23)
          label
            input(type='checkbox', name='checkbox', value=''+(i+1) )
            span.ripple Option #{i+1}

    .Tag .checked-group radio
    fieldset
      legend checked-group radio
      .checked-group
        each _,i in Array(23)
          label
            input(type='radio', name='radio', value=''+(i+1) )
            span.ripple Option #{i+1}



  <divider title="Input-EL" />
  fieldset
    legend Input EL
    ._child_m_1
      select
        each option in ['red','green','orange','lite','circle']
          option #{option}
      input(value='Read-only value', readonly)
      input(placeholder='*Required')
      input(disabled, placeholder='*disabled')

    .Tag size/mod
    ._child_m_1
      each styl in ['lg','','sm']
        select(class=""+styl)
          each option in ['red','green','orange','lite','circle']
            option #{option}
    ._child_m_1
      each styl in ['lg','','sm']
        input(placeholder="input "+styl, class=""+styl)
      input(disabled, placeholder='*disabled', class="sm")
      input(disabled, placeholder='*disabled', class="lg")

    .Tag 'color', 'date', 'datetime', 'datetime-local', 'email', 'number', 'range', 'search', 'tel', 'time', 'url', 'month', 'week'
    ._child_m_1
      input(type='color' pattern="#[a-f0-9]{6}" title="hexadecimal color" placeholder="#000000")
      each type in ['color','date','datetime','datetime-local','email','number','range','search','tel','time','url','month','week', 'file','password']
        label #{type}
          input(type=""+type)




  fieldset
    legend form-group
    .Flex_wr
      .form-group.col.fr_25
        input.Search(type='text')
        select(multiple)
          each option in ['red','green','orange','lite','circle']
            option #{option}
        select
          each option in ['red','green','orange','lite','circle']
            option #{option}
        textarea
        input(placeholder='*Required')
        input(disabled, placeholder='*disabled')
        each _,i in Array(3)
          label
            input(type='radio', name='radio', value=''+(i+1) )
            | Option #{i+1}
        label
          input(type='radio', name='radio', value='4', checked)
          | Checked
        input(disabled, placeholder='*disabled')
        button button

      .col.fr_75
        h2 Flex Form
        .Flex_wr._child_m_1
          input.col(placeholder='Input width 1/2')
          input.col(placeholder='Input width 1/2')
        .Flex_wr._child_m_1
          .col(style="flex-basis: 210px;align-self:center")
            each _,i in Array(3)
              label
                input(type='radio', name='radio', value=''+(i+1) )
                | Option #{i+1}
            label
              input(type='radio', name='radio', value='4', checked)
              | Checked

          input.col(placeholder='Input')
        .Flex_wr._child_m_1
          input.col.fr_25(placeholder='Input width 1/4')
          input.col.fr_50(placeholder='Input width 1/2')
          input.col.fr_25(placeholder='Input width 1/4')
        .Flex_wr._child_m_1
          input.col.fr_75(placeholder='Input width 3/4')
          div
            button base button

  <divider title="Table" />
  h1 Table

  .Tag base table
  .table-responsive
    table
      tr
        each _,i in Array(5)
          th thead_#{i+1}
      each _,i in Array(3)
        tr
          each _,i in Array(4)
            td data_#{i+1}
          td.td_buttonGroup
            .button-group
              each styl,i in ['btn','btn fill red','btn fill green','btn fill orange']
                div(class=""+styl) action#{i+1}


  .Tag table_hovered
  .table-responsive
    table.table_hovered
      tr
        each _,i in Array(5)
          th thead_#{i+1}
      each _,i in Array(2)
        tr
          each _,i in Array(5)
            td data_#{i+1}

  .Tag table_col
  .table-responsive
    table.table_col
      tr
        each _,i in Array(5)
          th thead_#{i+1}
      each _,i in Array(2)
        tr
          each _,i in Array(5)
            td data_#{i+1}
  .Tag table_distance table_hovered
  .table-responsive
    table.table_distance.table_hovered
      tr
        each _,i in Array(5)
          th thead_#{i+1}
      each _,i in Array(3)
        tr
          each _,i in Array(5)
            td data_#{i+1}
  .Tag table_striped
  .table-responsive
    table.table_striped
      tr
        each _,i in Array(5)
          th thead_#{i+1}
      each _,i in Array(5)
        tr
          each _,i in Array(5)
            td data_#{i+1}
  <divider title="Typography" />
  h1 Typography

  .Card.px_4.py_2
    .Tag textList
    ol.textList
      li Lorem ipsum dolor sit amet consectetur
      li Lorem ipsum dolor sit amet consectetur
      li Lorem ipsum dolor sit amet consectetur
      ol
        li Lorem ipsum dolor sit amet consectetur
        li Lorem ipsum dolor sit amet consectetur
        li Lorem ipsum dolor sit amet consectetur
    ul.textList
      li Lorem ipsum dolor sit amet consectetur
      li Lorem ipsum dolor sit amet consectetur
      li Lorem ipsum dolor sit amet consectetur

    //Text
    .Tag h1
    h1 Lorem ipsum dolor sit amet quos dolorem recusandae deleniti quasi
    .Tag h2
    h2 Lorem ipsum dolor sit amet quos dolorem recusandae deleniti quasi
    .Tag h3
    h3 Lorem ipsum dolor sit amet quos dolorem recusandae deleniti quasi
    .Tag h4
    h4 Lorem ipsum dolor sit amet quos dolorem recusandae deleniti quasi
    .Tag h5
    h5 Lorem ipsum dolor sit amet quos dolorem recusandae deleniti quasi
    .Tag p
    p Lorem ipsum dolor &nbsp
      span.Tag b
      | <b>sit amet consectetur</b>
      span.Tag /b
      | &nbsp adipisicing elit . &nbsp
      span.Tag em
      | <em>Blanditiis explicabo</em>
      span.Tag /em
      | &nbsp porro, &nbsp
      span.Tag s
      | <s>voluptatum laborum</s>
      span.Tag /s
      | &nbsp cumque molestiae quibusdam accusamus sed, quam sint ducimus libero distinctio? Dolore laborum, &nbsp
      span.Tag strong
      | <strong>quos dolorem</strong>
      span.Tag /strong
      | &nbsp recusandae deleniti quasi.
    p Lorem ipsum dolor sit, amet consectetur <a href="#">link</a> adipisicing elit. Voluptate non <a href="#">ab dicta iure</a> quibusdam deserunt assumenda nulla commodi accusamus numquam, aliquam veniam saepe accusantium nostrum?
    hr
    p Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque facere soluta quia enim incidunt, et possimus deleniti natus esse, assumenda tempore. Cupiditate recusandae impedit est voluptate deleniti ab, doloremque minima.  Minus quo odio dolore deleniti eos facere distinctio reprehenderit, architecto quos, nam similique a eaque quas at quis? Cumque alias totam nemo!
    p Nisi ipsam consequuntur qui suscipit voluptatem at mollitia ipsum, ab dolorum omnis doloribus ratione numquam cum in fuga nulla modi illo earum. Vitae tempora, sint dolore omnis architecto earum rem incidunt laboriosam perferendis, pariatur deserunt quis quasi at voluptatem voluptas? Error et praesentium numquam. Maiores laudantium voluptates ea? Blanditiis ullam vel veritatis non reiciendis veniam atque perspiciatis aliquam. Tempore, rem quos!
    p Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, totam! Nemo quibusdam suscipit perspiciatis illo nesciunt, labore quidem, laudantium quam, vero asperiores modi doloribus delectus nobis quo a. Ratione, doloribus.Delectus adipisci repudiandae, deserunt, cumque laborum vero quae ad doloremque molestias harum veritatis, eveniet ducimus? Distinctio asperiores, doloremque alias, animi nemo praesentium quaerat quis ipsam porro, ab aut eveniet provident!Odio quia, consequatur illum doloremque molestias suscipit esse. Autem voluptatum eius quae recusandae illum eligendi sunt nisi obcaecati atque officiis ad magni, ea fugit possimus quidem, velit ipsum quod tempora?Repellat eos quo numquam dolore ipsam quaerat, labore est. Doloribus atque quod omnis provident voluptatibus debitis maiores maxime dolores beatae, reprehenderit possimus excepturi. Eius ab similique laboriosam, maiores reiciendis modi!Sapiente recusandae assumenda eligendi maiores, ab odio nam? Cupiditate pariatur ipsa placeat, quidem reprehenderit accusantium vero architecto deserunt repellendus sapiente, animi rerum autem quas ut. Assumenda perspiciatis sequi reiciendis quos.
</template>
<script>
import Divider from '~/components/z_Ui/Divider.vue'
export default {
  components: {
    Divider
  }
}
</script>
