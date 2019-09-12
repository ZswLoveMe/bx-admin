<template>
  <div class='tinymce'>
    <editor :id='tinymceID' v-model='tinymceHtml' :init='init'></editor>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/media'
export default {
  name: "zsw-rich-text",
  components: {Editor},
  data () {
    return {
      tinymceHtml: null,
      tinymceID:"",
      init: {
        height: 400,
        plugins: 'link lists image  code table colorpicker textcolor wordcount contextmenu',
        toolbar:'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code media  | removeformat',   // 富文本的自带的功能
        branding: false,
        images_upload_handler(blobInfo, success, failure){
          let formdata = new FormData()
          formdata.set('file', blobInfo.blob())
          let config = {
            headers:{"Accept": "application/json"}
          };
          // axios.post('/atom/uploadFile/uploadPublicFile',  formdata ,config).then(res => {
          //   success(res.data.rspData.allUrl)
          // }).catch(res => {
          //   failure('error')
          // })
        }
      }
    }
  },
  props:{
    value:{
      type:String
    },
    settingHeight:{
      type:[String,Number],
      default:400
    },
    tinymce:{
      type:String,
      default:"tinymceTJ"
    }
  },
  watch: {
    value:function(newValue) {
      this.tinymceHtml = newValue
    },
    settingHeight:function(newValue){
      this.init.height = newValue
    },
    tinymceHtml:function(newValue){
      this.$emit("input",newValue)
    }
  },
  created () {
    this.tinymceID = new Date().getTime() + "id";
    tinymce.init({})
  }
}
</script>
