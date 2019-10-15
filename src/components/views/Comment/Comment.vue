<template>
  <el-container>
    <el-main>
      <zsw-title>所有评论</zsw-title>
      <div class="main">
        <el-table
          :data="commentData"
          style="width: 100%"
          border
          fit
          max-height="600"
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
              <el-button type="danger" size="small" icon="el-icon-delete">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
    <el-footer>
      <zsw-pagination
        :page-index.sync="pageIndex"
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
        commentData: [
          {
            author: "小钟",
            email: "xiaozhong@1233",
            created: Date.now(),
            content: "这是一条没有感情的评论",
            status: "approved"
          },
          {
            author: "小钟",
            email: "xiaozhong@1233",
            created: Date.now(),
            content: "这是一条没有感情的评论",
            status: "held"
          },
          {
            author: "小钟",
            email: "xiaozhong@1233",
            created: Date.now(),
            content: "这是一条没有感情的评论",
            status: "rejected"
          },
          {
            author: "小钟",
            email: "xiaozhong@1233",
            created: Date.now(),
            content: "这是一条没有感情的评论",
            status: "trashed"
          }
        ],
        pageIndex:1,
        pageSize:10,
        total:12
      }
    },
    methods:{
      handleQuery(){

      }
    }

  }
</script>

<style scoped>
  .main {
    width: 100%;
    background-color: red;
  }

</style>
