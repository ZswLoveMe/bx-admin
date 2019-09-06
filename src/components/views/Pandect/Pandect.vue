<template>
  <div class="pandect-wrapper">
    <div class="on-pandect-wrapper">
      <div>
        <h1>One Belt, One Road</h1>
        <p>Thoughts, stories and ideas.</p>
        <p><el-button  type="info" >写文章</el-button></p>
      </div>
    </div>
    <div class="pandect-content">
      <div class="statistics">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">站点内容统计：</h3>
          </div>
          <ul class="list-group">
            <li class="list-group-item"><strong>{{this.contentStatistics.countArticle.article}}</strong>篇文章（<strong>{{this.contentStatistics.countArticle.draft}}</strong>篇草稿）
            </li>
            <li class="list-group-item"><strong>{{this.contentStatistics.count}}</strong>个分类</li>
            <li class="list-group-item"><strong>{{this.contentStatistics.comment.commentCount}}</strong>条评论（<strong>{{this.contentStatistics.comment.toAudit}}</strong>条待审核）
            </li>
          </ul>
        </div>
      </div>
      <div id="myChart"></div>
    </div>
  </div>
</template>

<script>


  export default {
    name: "Pandect",
    data() {
      return {
        option: {
          title: {
            text: "站点内容统计",
            x: "left"
          },
          tooltip: {
            trigger: "item"
          },
          legend: {
            type: "scroll",
            orient: "vertical",
            right: 10,
            top: 20,
            bottom: 20,
            data: ["文章", "分类", "评论"],
            selected: {
              文章: true,
              分类: true,
              评论: true
            }
          },
          series: [
            {
              name: "统计",
              type: "pie",
              radius: "65%",
              center: ["40%", "50%"],
              data: [
                {name: "文章", value: 12},
                {name: "分类", value: 11},
                {name: "评论", value: 23}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        },
        contentStatistics: {
          countArticle: {
            article: 995,
            draft: 226
          },
          classifyCount: {count: 4},
          comment: {
            commentCount: 7,
            toAudit: 4
          }
        }
      }
    },
    methods: {
      drawLine() {
        console.log("this.$echarts：", this.$echarts)
        let chart = document.getElementById("myChart")
        let myChart = this.$echarts.init(chart)
        myChart.setOption(this.option)
      }
    },
    activated() {
      this.$nextTick(() => {
        this.drawLine()
      })
    }

  }
</script>


<style scoped lang="scss">
  .pandect-wrapper {
    padding: 15px;
    display: flex;
    flex-direction: column;

    .on-pandect-wrapper {
      width: 100%;
      border-radius: 10px;
      color: black;
      height: 400px;
      text-align: center;
      background-color: #eeeeee;
      >div{
          margin: 100px auto;
        h1{
          font-size: 34px;
        }
        p{
          font-size: 20px;
          line-height: 40px;
        }
      }
    }

    .pandect-content {
      margin-top: 10px;
      height: 300px;

      .statistics {
        border: 1px solid #ccc;
        border-radius: 15px;
        background-color: #eeeeee;
        width: 400px;
        color: black;
        float: left;

        .panel {
          width: 100%;
          .panel-heading {
            padding-left: 15px;
            border-bottom: 1px solid #ccc;
            line-height: 40px;
            height: 40px;
            .panel-title {
              font-size: 18px;
              color: #303133;
              font-weight: normal;
            }
          }

          .list-group {
            width: 100%;
            background-color: #fff;
            border-bottom-right-radius: 15px;
            border-bottom-left-radius: 15px;
            .list-group-item {
              padding-left: 15px;
              list-style: none;
              border-bottom: 1px solid #ccc;
              line-height: 40px;
              height: 40px;
              &:last-child{
                border: none;
              }
            }

          }

        }
      }

      #myChart {
        float: right;
        width: 60%;
        height: 100%;
      }
    }


  }


</style>
