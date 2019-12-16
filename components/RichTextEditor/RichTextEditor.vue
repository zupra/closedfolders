<template lang="pug">
div

  //- h3 RichTextEditor
  //- small {{ html }}

  editor-menu-bar(:editor='editor')
    .menubar(
      slot-scope='{ commands, isActive }'
    )
      ._child_m_1
        .btn_icon(:class="{ 'green': isActive.bold() }", @click='commands.bold')
          Bold_icon
        .btn_icon(:class="{ 'green': isActive.italic() }", @click='commands.italic')
          Italic_icon
        .btn_icon(:class="{ 'green': isActive.strike() }", @click='commands.strike')
          Strike_icon
        .btn.fill(:class="{ 'green': isActive.underline() }", @click='commands.underline')
          Underline_icon
        span |

        .btn.fill(:class="{ 'green': isActive.paragraph() }", @click='commands.paragraph')
          | текст(Р)
        .btn.fill(:class="{ 'green': isActive.heading({ level: 2 }) }", @click='commands.heading({ level: 2 })')
          | H2
        .btn.fill(:class="{ 'green': isActive.heading({ level: 3 }) }", @click='commands.heading({ level: 3 })')
          | H3
        .btn_icon(:class="{ 'green': isActive.bullet_list() }", @click='commands.bullet_list')
          Ul_icon
        .btn_icon(:class="{ 'green': isActive.ordered_list() }", @click='commands.ordered_list')
          Ol_icon

        .btn.outline(
          :class="{ 'green': isActive.table() }",
          @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })"
        ) Создать Таблицу

        .btn.outline(@click='commands.horizontal_rule')
          | Линия
        span |
        //- UNDO REDO
        .btn.fill.orange(@click='commands.undo')
          | ↶
        .btn.fill.orange(@click='commands.redo')
          | ↷
        //-
          .btn.fill.red(@click='clearContent')
            | Очистить
        span |
        .btn.flat.green(
          v-if="!htmlStr"
          @click='setContent'
        )
          | Начать текст

      ._child_m_1(
        v-if="isActive.table()"
      )
        .btn.outline(
          @click="commands.deleteTable"
        ) Удалить Таблицу
        .btn.outline(
          @click="commands.addColumnBefore"
        ) Колонку слева
        .btn.outline(
          @click="commands.addColumnAfter"
        ) Колонку справа
        .btn.outline(
          @click="commands.deleteColumn"
        ) Удалить колонку
        span |
        .btn.outline(
          @click="commands.addRowBefore"
        ) Ряд сверху
        .btn.outline(
          @click="commands.addRowAfter"
        ) Ряд снизу
        .btn.outline(
          @click="commands.deleteRow"
        ) Удалить ряд

        span |
        .btn.outline(
          @click="commands.toggleCellMerge"
        ) Объединить ячейки


  editor-content.editor__content(:editor='editor')

</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'

import Bold_icon from '~/components/RichTextEditor/Bold_icon.vue'
import Italic_icon from '~/components/RichTextEditor/Italic_icon.vue'
import Strike_icon from '~/components/RichTextEditor/Strike_icon.vue'
import Underline_icon from '~/components/RichTextEditor/Underline_icon.vue'
import Ul_icon from '~/components/RichTextEditor/Ul_icon.vue'
import Ol_icon from '~/components/RichTextEditor/Ol_icon.vue'

import {
  // Blockquote,
  // CodeBlock,
  // TodoItem,
  // TodoList,
  // Code,
  // HardBreak,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  //
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from 'tiptap-extensions'

export default {
  components: {
    EditorContent,
    EditorMenuBar,
    //ICONS
    Bold_icon,
    Italic_icon,
    Strike_icon,
    Underline_icon,
    Ul_icon,
    Ol_icon
  },
  props: {
    htmlStr: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editor: null,
      linkUrl: null,
      html: ''
    }
  },
  created() {
    this.editor = new Editor({
      extensions: [
        // new Blockquote(),
        // new CodeBlock(),
        // new HardBreak(),
        // new TodoItem(),
        // new TodoList(),
        // new Code(),

        new Table({
          resizable: true
        }),
        new TableHeader(),
        new TableCell(),
        new TableRow(),
        //
        new BulletList(),
        new Heading({ levels: [1, 2, 3] }),
        new HorizontalRule(),
        new OrderedList(),
        new ListItem(),
        new Bold(),
        new Italic(),
        new Link(),
        new Strike(),
        new Underline(),
        new History()
      ],
      content: this.htmlStr,
      onUpdate: ({ getHTML }) => {
        // this.html = getHTML()
        this.$emit('html', getHTML())
      }
    })
  },
  beforeDestroy() {
    this.editor && this.editor.destroy()
  },
  methods: {
    /*
    showLinkMenu(attrs) {
      this.linkUrl = attrs.href
      this.linkMenuIsActive = true
      this.$nextTick(() => {
        this.$refs.linkInput.focus()
      })
    },
    hideLinkMenu() {
      this.linkUrl = null
      this.linkMenuIsActive = false
    },
    setLinkUrl(command, url) {
      command({ href: url })
      this.hideLinkMenu()
      this.editor.focus()
    },

    clearContent() {
      this.editor.clearContent(true)
      this.editor.focus()
    },
    */
    setContent() {
      // you can pass a json document
      this.editor.setContent(
        {
          type: 'doc',
          content: []
        },
        true
      )
      // HTML string is also supported
      // this.editor.setContent('<p>This is some inserted text. 👋</p>')
      this.editor.focus()
      // this.$notice(
      //   'Режим ввода "С НУЛЯ"',
      //   'Вернуть сброшенный текст можно только до сохранения - F5 или CTRL+R',
      //   'warning'
      // )
    }
  }
}
</script>

<style lang="stylus">
.editor__content
  box-shadow 0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08)
  border-radius .3em
  background #FFF
  color #47494e
  padding 1em
  border 1px solid #CCC
  overflow-y auto
  min-height 12em
  position relative
  resize vertical // both
  overflow hidden
  &:after
    content ""
    position absolute
    right 0
    bottom 0
    height 24px
    width 24px
    cursor move
    background url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'><path d='M22,22H20V20H22V22M22,18H20V16H22V18M18,22H16V20H18V22M18,18H16V16H18V18M14,22H12V20H14V22M22,14H20V12H22V14Z'/></svg>"), linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 50%, #3498db 51%)
  ol, ul
    padding-left 1.4rem
    list-style-position initial
  ul
    list-style circle
  th, td
    border 1px solid #dee2e6
    p
      margin-bottom 0
  .selectedCell
    background aliceblue // #f5f5f5

.ProseMirror
  // background #EEE
  outline #EEE
</style>
