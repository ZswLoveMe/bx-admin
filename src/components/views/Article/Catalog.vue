<template>
  <el-container class="catalog">
    <el-main>
      <div class="left-content">
        <zsw-title>分类目录<span class="hint" slot="hint">添加新分类目录</span></zsw-title>

        <el-form :model="catalogFrom">
          <el-form-item label="名称">
            <el-input v-model="catalogFrom.name" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="别名">
            <el-input v-model="catalogFrom.alias" placeholder="请输入别名"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="catalogFrom.nickName" placeholder="请输入别名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="right-content">
        <el-table
          width="100%"
          style="margin-top: 60px"
          :data="catalogTable"
          border
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
          >
          </el-table-column>
          <el-table-column
            prop="alias"
            label="别名"
          >
          </el-table-column>
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: "Catalog",
    data() {
      return {
        catalogFrom: {
          name: null,
          alias: null,
          nickName:null
        },
        catalogTable: [
          {
            alias: "allCatalog",
            name: "所有分类"
          },
          {
            alias: "uncategorized",
            name: "未分类"
          },
          {
            alias: "funny",
            name: "奇趣事"
          },
          {
            alias: "living",
            name: "会生活"
          },
          {
            alias: "travel",
            name: "爱旅行"
          }
        ]
      }
    },
    methods:{
      handleEdit(){

      },
      handleDelete(){

      },
      onSubmit(){

      }
    }
  }
</script>

<style scoped lang="scss">
  .catalog {
    width: 100%;

    .el-main {
      display: flex;
      flex-direction: row;

      .left-content {
        width: 600px;
        margin-right: 15px;

        .hint {
          color: #ccc;
          font-size: 14px;
          margin-left: 15px;
        }
      }

      .right-content {
        flex: 1;
      }
    }

  }
</style>
