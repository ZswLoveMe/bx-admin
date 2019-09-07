<template>
  <el-container class="all-article">
    <el-header style="height: 30px">
      <div class="title">
        <h1>所有文章</h1>
        <el-button type="info" size="mini">写文章</el-button>
      </div>
    </el-header>
    <el-main>
      <div class="search-box">
        <div class="search-wrapper">
          <el-select v-model="categoryValue" placeholder="请选择">
            <el-option
              v-for="item in categoryOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="statusValue" placeholder="请选择">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <search-input-btn :searchIcon="true" :value="key" @click="handleSearch"></search-input-btn>
        </div>
        <div class="content">
          <el-table :data="articleData"
                    ref="articleTable"
                    border
                    width="100%"
                    v-loading="articleLoading">

          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="标题"
            :min-width="120"
            prop="title"
          >
          </el-table-column>
          <el-table-column
            label="作者"
            :min-width="120"
            prop="userName"
          >
          </el-table-column>
          <el-table-column
            label="分类"
            :min-width="120"
          >
            <template slot-scope="{row,index}">
                <span v-if="row.category == 1">未分类</span>
                <span v-if="row.category == 2">奇趣事</span>
                <span v-if="row.category == 3">会生活</span>
                <span v-if="row.category == 4">爱旅行</span>
            </template>
          </el-table-column>
          <el-table-column
            :min-width="120"
            label="发表时间"
          >
            <template slot-scope="{row}">
              {{row.created|format}}
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            :min-width="120"
          >
            <template slot-scope="{row,index}">
              <span v-if="row.status == 'drafted'"> 草稿</span>
              <span v-if="row.status == 'published'"> 已发布</span>
              <span v-if="row.status == 'trashed'"> 回收站</span>
            </template>
          </el-table-column>
          <el-table-column
            label="编辑"
            :min-width="120"
          >
            <template slot-scope="{row,index}">
              <el-button size="small" icon="el-icon-edit">
                编辑
              </el-button>
              <el-button type="danger" size="small" icon="el-icon-delete">
                删除
              </el-button>
            </template>
          </el-table-column>
          </el-table>
        </div>

      </div>
    </el-main>
    <el-footer>
    <Pagination :page-index.sync="pageIndex"
                :page-size.sync="pageSize"
                :total="total"
                @change="handleQuery"
    ></Pagination>
    </el-footer>
  </el-container>
</template>

<script>
  import SearchInputBtn from "../../../ui/SearchInputBtn"
  import Pagination from "../../../ui/Pagination"
  import {formatDate} from '@/utils/formatDate'
  import {pageQuery} from "../../../api/atomTestApi/atom"

  export default {
    name: "AllArticle",
    components: {SearchInputBtn,Pagination},
    filters:{
      format(val){
        let date = new Date(val)
        return formatDate(date,'yyyy年M月d h:m:s')
      }
    },
    data() {
      return {
        categoryValue: 0,
        categoryOptions: [
          {
            value: 0,
            label: "所有分类"
          },
          {
            value: 1,
            label: "未分类"
          },
          {
            value: 2,
            label: "奇趣事"
          },
          {
            value: 3,
            label: "会生活"
          },
          {
            value: 4,
            label: "爱旅行"
          }
        ],
        statusValue: "allstate",
        statusOptions: [
          {
            value: "allstate",
            label: "所有状态"
          },
          {
            value: "drafted",
            label: "草稿"
          },
          {
            value: "published",
            label: "已发布"
          },
          {
            value: "trashed",
            label: "回收站"
          }
        ],
        key: "",
        articleData: [
          {
            title:'师姐你好',
            userName:'岁月',
            category:1,
            created: Date.now(),
            status:'drafted'
          },
          {
            title:'不必在乎我是谁',
            userName:'岁月',
            category:2,
            created: Date.now(),
            status:'drafted'
          }
        ],
        articleLoading: false,
        pageIndex: 1,
        pageSize: 10,
        total: null,
      }

    },
    methods: {
      handleSearch(event) {
        console.log("我被调用了")
      },
      handleQuery(){
        let params = {
          PageSize:this.pageSize,
          currentPage:this.pageIndex,
          cid:5,
        }
        pageQuery(params).then(res =>{
          this.total  = res.totalCount
        })
      }
    },
    activated() {
     this.handleQuery()
    }

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
        vertical-align: bottom;
      }

      button {
        margin-left: 10px;
        height: 25px;
      }
    }

    .search-box {
      .search-wrapper {
        /deep/ .el-select {
          margin-right: 15px;
          width: 150px;
        }
      }
      .content{
        margin-top: 15px;
      }
    }

  }

</style>
