<template>
  <el-container>
    <el-main>
      <zsw-title>所有评论</zsw-title>
      <div class="main">
        <el-table
          :data="commentData"
          style="width: 100%"
          border
          max-height="700"
        >
          <el-table-column
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            label="作者"
            prop="author"
          >
          </el-table-column>
          <el-table-column
            label="邮箱"
            prop="email"
          >
          </el-table-column>
          <el-table-column
            label="内容"
            prop="content"
          >
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
          >
            <template slot-scope="{row}">
              <span>{{row.status|getStatus}}</span>
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
              <el-button type="danger" size="small" icon="el-icon-delete" @click="delComment(row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
    <el-footer>
      <zsw-pagination
        :page-index.sync="currentPage"
        :page-size.sync="pageSize"
        :total="total"
        @change="handleQuery"
      >

      </zsw-pagination>
    </el-footer>
  </el-container>

</template>

<script>
  import {formatDate} from "../../../utils/formatDate"
  import {postRequest} from "../../../api/api"

  export default {
    name: "Comment",
    filters: {
      format(val) {
        let date = new Date(val)
        return formatDate(date, "yyyy年M月d h:m:s")
      },
      getStatus(val) {
        switch (val) {
          case "approved":
            return "已批准"
          case "held":
            return "未审核"
          case "rejected":
            return "未批准"
          case "trashed":
            return "丢弃"
        }
      }
    },
    data() {
      return {
        commentData: [],
        currentPage: 1,
        pageSize: 10,
        total: 12,
        loading:false
      }
    },
    methods: {
      handleQuery() {
        this.getData()
      },
      getData() {
        let params = {
          pageSize: this.pageSize,
          currentPage: this.currentPage
        }
        postRequest("comments/getAllComments", params).then(res => {
          console.log("res：", res)
          this.commentData = res.data.data
          this.total = res.data.total
        })
      },
      delComment(row){

      }
    },
    activated() {
      this.getData()
    }

  }
</script>

<style scoped>
  .main {
    width: 100%;
    background-color: red;
  }

</style>
