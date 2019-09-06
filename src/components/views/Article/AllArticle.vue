<template>
  <el-container class="all-article">
    <div class="title">
      <h1>所有文章</h1>
      <el-button type="info" size="mini">写文章</el-button>
    </div>

  </el-container>
</template>

<script>
  export default {
    name: "AllArticle"
  }
</script>

<style scoped lang="scss">
  .all-article {
    color: black;
    padding: 15px;

    .title {
      height: 30px;
      h1 {
        display: inline-block;
        font-weight: 500;
        line-height: 30px;
      }

      button {
        margin-left: 10px;
      }
    }
  }

</style>
