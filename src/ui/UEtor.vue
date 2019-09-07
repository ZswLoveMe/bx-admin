<template>
  <div id="UEtor">
    <script id="editor" type="text/plain"></script>
  </div>
</template>

<script>
  export default {
    name: "UEtor",
    data(){
      return{
        editor:null
      }
    },
    props:{
      defaultMsg:{type:String},
      config:{type:Object}
    },
    mounted(){
      const _this = this
      _this.editor = UE.getEditor('editor',_this.config)
    },
    methods:{
      getUEContent(){
        //获取内容方法
        return this.editor.getContent()
      }
    },
    destroyed() {
      return this.editor.destroy()
    }
  }
</script>

<style scoped>

</style>
