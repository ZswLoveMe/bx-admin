<template>
    <div class="EditArticle">
          <UEtor :config="config" :defaultMsg="defaultMsg" ref="ue"></UEtor>
    </div>
</template>

<script>
  import UEtor from "../../../ui/UEtor"
  export default {
    name: "EditArticle",
    components: {UEtor},
    data(){
      return{
        config:{
          initialFrameWidth:1038,
          initialFrameHeight:350
        },
        defaultMsg:''
      }
    }
  }
</script>

<style scoped>

</style>
