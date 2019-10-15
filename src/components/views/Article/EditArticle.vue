<template>
  <el-container>
    <el-header>
      <div class="">
        <zsw-title>写文章</zsw-title>
      </div>
    </el-header>
    <div class="EditArticle">
      <el-form :model="articleFrom">
        <div class="left-content">
          <div class="left-title">
            <el-form-item label="标题:">
              <el-input v-model="articleFrom.title"></el-input>
            </el-form-item>
          </div>
          <el-form-item>
            <zsw-rich-text :value="articleFrom.value" :settingHeight="height" :tinymce="tinymce"></zsw-rich-text>
          </el-form-item>
        </div>
        <div class="right-content">
          <el-form-item label="别名:">
            <el-input placeholder="别名"></el-input>
          </el-form-item>

          <el-form-item label="特色图像:">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="articleFrom.fileList"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="状态:">
            <el-select v-model="articleFrom.statusValue" placeholder="请选择">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布时间:"><br>
            <el-date-picker
              v-model="articleFrom.date"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="所属分类:">
            <el-select v-model="articleFrom.categoryValue" placeholder="请选择">
              <el-option
                v-for="item in categoryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </el-container>
</template>

<script>
  export default {
    name: "EditArticle",
    data() {
      return {
        tinymce: "edit-article-zsw",
        height: 600,
        articleFrom: {
          value: "",
          title: "",
          fileList: [],
          statusValue: "allstate",
          date:'',
          categoryValue:0
        },
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
        ]
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList)
        this.articleFrom.fileList.splice(0, 1)
      },

      handleSuccess(response, file, fileList) {
        console.log(file)
        this.articleFrom.fileList.push(file)
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      }

    }
  }
</script>

<style scoped lang="scss">
  .el-container {
    width: 100%;
    height: 100%;

    .EditArticle {
      width: 100%;
      height: 100%;
      padding-left: 15px;

      .el-form {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;

        .left-content {
          flex: 1;
          height: 100%;
          margin-right: 15px;
          display: flex;
          flex-direction: column;

          .left-title {
            height: 120px;
          }

          .tinymce {
            flex: 1;
          }
        }

        .right-content {
          width: 500px;
          padding-le: 0 15px;
          margin-right: 15px;

          /deep/ .el-select {
            position: relative;
            display: block;
            .el-input__suffix{
              position: absolute;
              height: 40px;
              line-height: 120px;
            }
          }
        }
      }

    }


  }
</style>
