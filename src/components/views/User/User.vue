<template>
  <el-container class="user-wrapper">
    <el-header>
      <zsw-title>用户</zsw-title>
    </el-header>
    <el-main>
      <el-aside width="200px">
        <div class="add-user">
          <el-form label-position="top" label-width="80px" :model="userForm">
            <el-form-item label="邮箱">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item label="别名">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" >添加</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-aside>
      <section class="user-table">
        <!---->
      </section>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: "User",
    data(){
      return{
        userForm:{
          email:null,
          alias:null
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-container {
    width: 100%;
    height: 100%;

    .el-header, .el-footer {
      color: #333;
      line-height: 60px;
    }

    .el-main {
      display: flex;
      flex-direction: row;
      color: #333;
      padding: 15px;


      .el-aside {
        flex: 1;
        color: #333;
        height: 100%;
        .add-user{
          padding: 15px;
          font-size: 18px;
          color: black;
          /deep/ .el-form-item__label{
            height: 40px;
            color: #000000;
            font-size: 16px;
          }
        }
      }

      .user-table {
        flex: 2;
        background-color: pink;

      }
    }

  }


</style>
