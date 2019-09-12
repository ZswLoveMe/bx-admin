<template>
    <div class="EditArticle">
         <zsw-rich-text :value="value" :settingHeight="height" :tinymce="tinymce"></zsw-rich-text>
    </div>
</template>

<script>
  export default {
    name: "EditArticle",
    data(){
      return{
        value:'',
        tinymce:'edit-article-zsw',
        height:400
      }
    }
  }
</script>

<style scoped>

</style>
