<template lang="pug">

li
  //- первый LI
  .startTreeItem(
    v-if="model.startItem"
  )
    startTreeItem_icon
    | &nbsp; {{ model.name }} &nbsp;

    .flex.y_center(
      v-if="!isFolder"
    )
      //- i.mark создать
      //- pre {{ productObj }}
      select(
        v-model="new_Page.addType"
        :class="{'is-invalid': !new_Page.addType}"
      )
        option.bold(:value="''") выбрать шаблон
        option(
          v-for="option,k in types"
          :value="k"
        ) {{option}}
      | &nbsp;
      input(
        placeholder="PageName"
        v-model="new_Page.addChildName"
      )
      | &nbsp;
      .btn(
        :disabled="Object.values(new_Page).includes('')"
        @click="addChild({name: new_Page.addChildName, type: new_Page.addType})"
      ) Создать

  //- UL UL LI
  .TreeItem(
      v-else
      :class="{isFolder: isFolder}"
    )
    b.TreeItem_row(@click="toggle")
      IsFolder_icon(
        v-if="isFolder"
        :open="open"
      )
      .TreeItem_rowName {{ model.name }}


    // ACTIONS
    .flex.y_center
      .TreeItem_id (tpl: {{model.type}})
      | &nbsp;
      // template(v-if="!isFolder")
      Dropdown
        .btn_icon.red(
          slot="btn"
        )
          img(src="~static/icon/del.svg")
        .Dropdown_body
          p Удалить ?
          .sm.btn.fill.red(
            @click="EDIT({pageid: model.pageid}); $el.click()"
          ) Удалить
        | &nbsp;
      Dropdown(v-if="model.level < 2 && !model.no_list && !isFolder")
        .sm.btn.outline.blue(
          slot="btn"
          slot-scope="{open}"
          :class="{green:open}"
        ) Добавить блок
        .Dropdown_body
          //- pre {{model}}
          .form-group
            .field
              select(
                v-model="new_Page.addType"
                :class="{'is-invalid': !new_Page.addType}"
              )
                option.bold(:value="''") дочерний шаблон
                option(
                  v-for="option,k in {gallery: 'Галерея',html: 'HTML'}"
                  :value="k"
                ) {{option}}
            input.lg(
              placeholder="PageName"
              v-model="new_Page.addChildName"
            )
          .flex.x_end
            .sm.btn.fill.green(
              :disabled="Object.values(new_Page).includes('')"
              @click="addChild({parentid: model.pageid, name: new_Page.addChildName, type: new_Page.addType}); $el.click()"
            ) Добавить
      | &emsp;
      NLink.btn.sm(
        :to="`/content/pages/${model.pageid}`",
      ) редактировать


  ul.subFolder(
    v-if="isFolder",
    v-show="model.startItem || open"
  )
    PagesTree(
      v-for="(model, idx) in model.list",
      :key="idx",
      :countryid="countryid"
      :model="model"
      @tree="$emit('tree', $event)"
    )
    li
      Dropdown
        .btn.outline.blue(
          slot="btn"
          slot-scope="{open}"
          :class="[{green:open},{sm:!model.startItem}]"
          v-text="model.startItem ? 'Добавить страницу' : 'Добавить блок'"
        )
        .Dropdown_body
          // pre {{model}}
          // v-if="model.startItem"
          .form-group
            .field
              select(
                v-model="new_Page.addType"
                :class="{'is-invalid': !new_Page.addType}"
              )
                option.bold(
                  :value="''"
                  v-text="model.startItem ? 'выбрать шаблон' : 'дочерний шаблон'"
                )
                //-
                option(
                  v-for="option,k in computed_types"
                  :value="k"
                ) {{option}}
            input.lg(
              placeholder="PageName"
              v-model="new_Page.addChildName"
            )
          .flex.x_end
            //- :disabled="model.startItem && !new_Page.addType"
                @click="addChild({name: new_Page.addChildName, ...model.startItem ? {type: new_Page.addType} : {parentid: model.pageid} }); $el.click()"
                @click="addChild({name: new_Page.addChildName, type: new_Page.addType}); $el.click()"

            .sm.btn.fill.green(
              :disabled="Object.values(new_Page).includes('')"
              @click="addChild({name: new_Page.addChildName, ...model.startItem ? {type: new_Page.addType} : {parentid: model.pageid, type: new_Page.addType} }); $el.click()"
            ) Добавить

</template>

<script>
import Input_Switch from '~/components/Input/Input_Switch.vue'
import Dropdown from '~/components/Dropdown/Dropdown.vue'

import IsFolder_icon from '~/components/Tree/IsFolder_icon.vue'
import startTreeItem_icon from '~/components/Tree/startTreeItem_icon.vue'

export default {
  name: 'PagesTree',
  components: {
    startTreeItem_icon,
    IsFolder_icon,
    Input_Switch,
    Dropdown
  },
  inject: ['types', 'productObj'],
  props: {
    countryid: {
      type: Object,
      default: () => {
        countryid: 1
      }
    },
    model: {
      type: [Array, Object],
      default: null // requared: true
    }
  },
  data() {
    return {
      new_Page: {
        addChildName: '',
        addType: ''
      },
      open: false
    }
  },
  computed: {
    isFolder() {
      return this.model.list && this.model.list.length
    },
    computed_types() {
      const childTemplate = {
        gallery: 'Галерея',
        html: 'HTML'
      }
      return this.model.no_list || this.model.level == 1
        ? childTemplate
        : this.types
    }
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    addList_addChild(postData) {
      if (!this.isFolder) {
        this.$set(this.model, 'list', [])
        this.addChild(postData)
        this.open = true
      }
    },

    async addChild(postData) {
      try {
        const { data } = await this.$axios.$post('/content/pages/add', {
          ...postData,
          ...this.countryid,
          productid: this.productObj.productid
        })
        this.$emit('tree', postData)
        this.new_Page.addChildName = ''
        this.new_Page.addType = ''
      } catch ({ response }) {
        this.$notice('ОШИБКА', response.data.message, 'danger')
      }
    },
    // delete
    async EDIT(postData, action = 'delete') {
      try {
        let { data } = await this.$axios.$post(`/content/pages/${action}`, {
          ...postData,
          productid: this.productObj.productid
        })
        this.$emit('tree', postData)
      } catch ({ response }) {
        this.$notice('ОШИБКА', response.data.message, 'danger')
      }
    }
  }
}
</script>

<style lang="stylus">
$LH = 3em;

#Tree {
  user-select: none;
  margin: 1em 0 3em;
}

.startTreeItem {
  padding-bottom: 1em;
  font-size: 1.4em;
}

.TreeItem {
  line-height: initial;
  height: $LH;

  &_id {
    font-weight: normal;
    font-size: small;
    margin: 0 0.4em;
  }

  /*
  &_rowName
    margin-right .7em
    // margin-left .3em
  */
}

.startTreeItem, .TreeItem, .TreeItem_row {
  display: flex; // inline-flex
  align-items: center;
}

.isFolder {
  .TreeItem_row {
    cursor: pointer;
  }

  &:hover {
    color: #477dca;
  }
}

.subFolder {
  margin-left: 0.8em;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: -($LH / 3);
    bottom: ($LH / 2);
    left: -1px;
    border-left: 1px solid #C7CEDE;
  }

  li {
    padding: 0 $LH - 40%;
    line-height: $LH;
    position: relative;

    &:hover {
      background: #f9f0e2;
    }

    &:before {
      content: '';
      position: absolute;
      top: ($LH / 2);
      left: 0;
      width: ($LH / 2);
      border-top: 1px solid #C7CEDE;
      margin-top: -1px;
    }
  }
}
</style>
