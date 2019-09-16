<template>
    <el-container>
      <el-header>
        <div class="">
          <zsw-title>写文章</zsw-title>
        </div>
      </el-header>
      <div class="EditArticle">
        <el-form>
          <div class="left-content">
            <div class="left-title">
                <el-form-item label="标题">
                  <el-input v-model="articleFrom.title"></el-input>
                </el-form-item>
            </div>
           <el-form-item>
             <zsw-rich-text :value="articleFrom.value" :settingHeight="height" :tinymce="tinymce"></zsw-rich-text>
           </el-form-item>
          </div>
          <div class="right-content"></div>
        </el-form>
      </div>
    </el-container>
</template>

<script>
  export default {
    name: "EditArticle",
    data(){
      return{
        tinymce:'edit-article-zsw',
        height:600,
        articleFrom:{
          value:'',
          title:''
        }

      }
    }
  }
</script>

<style scoped lang="scss">
  .el-container {
    width: 100%;
    height: 100%;
    .EditArticle{
      width: 100%;
      height: 100%;
      padding-left: 15px;

      .el-form{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        .left-content{
          flex: 1;
          height:100%;
          display: flex;
          flex-direction: column;
          .left-title{
            height: 120px;
          }
          .tinymce{
            flex: 1;
          }
        }
        .right-content{
          width: 500px;
          background-color: #ee9900;
          margin-right: 15px;
        }
      }

  }


}
</style>
