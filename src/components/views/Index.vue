<template>
  <div class="container">
    <div class="container-main">
      <div class="left-menu">
        <div class="main-menu">
          <div class="main-nav-logo">
            <div class="logo">
              <el-avatar :size="100" :src="navLogo"></el-avatar>
            </div>
            <span class="user-name">霹雳火 * 刘美</span>
          </div>
          <ul>
            <li v-for="(item,index) in menuList" :key="item.id" @click="openMenu(item)">
              <i :class="iconList[index]"></i>
              <span class="content">{{item.label}}</span>
              <span class="el-icon-arrow-right" v-show="item.children">  </span>
            </li>
          </ul>

        </div>
        <transition name="sub-menu-fade" v-if="subMenuFlag">
          <div class="submenu">
            <div class="title">
              <span>{{subTitle}}</span>
            </div>
            <el-menu
              v-if="subMenuList.length > 0"
              text-color="#000"
              active-text-color="#000"
              background-color="#F4FCF8"
            >
              <el-menu-item :index="sub.id.toString()" v-for="sub in subMenuList" :key="sub.id" @click="openMenu(sub)">
                <span slot="title">{{sub.label}}</span>
              </el-menu-item>
            </el-menu>
          </div>
        </transition>
      </div>
      <div class="right-box">
        <!--头部面包屑-->
        <nav class="box-header">

          <div class="nav-left">
            <ul>
              <li class="firs-title">
                <el-tag @click="toPandect">总览</el-tag>
              </li>
              <li v-if="$routerHistory.canBack">
                <el-tabs v-model="routeTab"
                         type="card"
                         @tab-remove="removeTab"
                         @tab-click="clickTab()"
                         closable

                >
                  <el-tab-pane
                    v-for="(item, index) in routerHistory"
                    :key="item.name"
                    :name="item.name"
                  >
                      <span slot="label">
                        {{item.label}}
                      </span>
                  </el-tab-pane>
                </el-tabs>
              </li>
            </ul>
          </div>
          <div class="nav-right">
            <ul>
              <li>
                <i class="el-icon-s-custom"></i>
                个人中心
              </li>
              <li @click="outLogin">
                <i class="el-icon-switch-button"></i>
                退出
              </li>
            </ul>
          </div>
        </nav>
        <section class="route-view-box">
          <keep-alive :include="routerCacheArr">
            <router-view></router-view>
          </keep-alive>
        </section>
      </div>
    </div>

  </div>
</template>
<script>
  import {outLogin} from "@/api/api"
  export default {
    name: "idnex",
    watch: {
      $route(route) {
        this.$routerHistory._history.map(item =>{
          this.routerCacheArr.push(item.name)
        })
        this.routerCacheArr =[...new Set(this.routerCacheArr)]
        this.routerHistory = this.$routerHistory._history
        this.routeTab =route.name
      }
    },
    data() {
      return {
        navLogo: "/static/img/avatar_1.jpg",
        menuList: [
          {
            label: "文章",
            id: 2,
            value:'Article',
            children: [{label: "写文章", id: "21", parentId: 2,value:'EditArticle'}, {label: "所有文章", id: "22", parentId: 2,value:'AllArticle'}, {
              label: "分类目录",
              id: "23",
              parentId: 2,
              value:'Catalog'
            }]
          },
          {label: "评论", id: 3, value: "Comment"},
          {label: "用户", id: 4, value: "User"},
          {label: "设置", id: 5, children: [{label: "导航菜单", id: 51, parentId: 5}, {label: "图片轮播", id: 52, parentId: 5}]}
        ],
        subTitle: "",
        subMenuList: [],
        iconList: ["el-icon-location-information", "el-icon-s-platform", "el-icon-s-custom", "el-icon-s-promotion"],
        subMenuFlag: false,
        tags: [],
        routerHistory: [],
        /*需要缓存数据的页面*/
        routerCacheArr: ['Pandect'],
        routeTab: "Comment"
      }
    },
    methods: {
      openSubMenu(sub){
        console.log('sub：', sub)
      },
      openMenu(item) {
        //如果有子项就打开子项 如果没有子项 跳转到对应窗口
        if (item.children) {
          setTimeout(function () {
            this.subMenuFlag = true
            this.subTitle = item.label
            this.subMenuList = item.children
          }.bind(this), 200)
        } else {
          this.subMenuFlag = false
          console.log(item)
          if(item.parentId){
            this.subMenuFlag = true
          }
          this.$router.push({name: item.value, params: {label: item.label}})
        }
      },
      toPandect() {
        this.$router.push({name: "Pandect", params: {label: "总览"}})
      },
      removeTab(targetName) {
        if( this.routerHistory.length >= 1){
          //删除历史记录  回退到上一级
          let tabs = this.routerHistory
          let activeTab = this.routeTab
          let params = {}
          let lastParams ={}
          if (activeTab ===  targetName) {
            tabs.forEach((tab,index) => {
              if (tab.name === targetName) {
                params = tab
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  lastParams = nextTab
                  activeTab = nextTab.name;
                }
              }
            } )
          }
          this.routeTab = activeTab;
          this.routerHistory = tabs.filter(tab => tab.name !== targetName);
          this.$routerHistory.pop(params)
          setTimeout(function () {
            if(this.routerHistory.length == 0 ){
              this.toPandect()
            }else{
              this.$router.push({name:lastParams.name, params: {label: lastParams.label}})
            }
          }.bind(this),200)
        }

      },
      clickTab() {
        let obj = {}
        console.log(this.routerHistory)
        this.routerHistory.map(history =>{
          if( this.routeTab  == history.name){
            obj = history
          }
      })
        if(obj){
          this.$router.push({name: this.routeTab, params: obj})
        }
      },
      outLogin(){
        outLogin()
      }

    },
    created() {
      //页面加载跳转到当前页面
      this.$nextTick(() => {
        this.toPandect()

      })
    },
    mounted() {
    }
  }
</script>


<style lang="scss" scoped>
  /* 面包屑导航 Start */
  .el-tabs {

    /deep/ .el-tabs__nav {
      border: 0px;
    }

    /deep/ .el-tabs__item {
      border: 0px;
    }

  }

  /* 面包屑导航 End */

  .container {
    min-width: 1366px;
    height: 100%;
    color: #ebeef5;
    background-color: #F4F7F9;

    .container-main {
      height: 100%;
      display: flex;
      flex-direction: row;

      .left-menu {
        display: flex;
        background-color: #46A976;
        height: 100%;

        .main-menu {
          .main-nav-logo {
            position: relative;
            height: 150px;
            background-color: #A9D3CF;
            text-align: center;

            .logo {
              padding: 10px;

              > img {
                display: inline-block;
              }
            }

            .user-name {
              width: 100%;
              padding: 10px 0;
              position: absolute;
              display: block;
              top: 110px;
              left: 50%;
              transform: translateX(-50%);
              font-size: 14px;

            }
          }

          > ul {
            padding: 0;
            list-style: none;
            font-size: 14px;
            width: 100%;

            > li {
              position: relative;
              width: 100%;
              height: 45px;

              &:hover {
                background-color: #A9D3CF;
                cursor: pointer;
              }

              > i {
                position: absolute;
                display: inline-block;
                width: 15px;
                height: 15px;
                left: 20px;
                top: 50%;
                transform: translateY(-50%);
              }

              .content {
                padding-left: 50px;
                line-height: 45px;

              }

            }
          }
        }

        .submenu {
          background-color: #F4FCF8;

          .title {
            position: relative;
            height: 55px;
            text-align: center;
            line-height: 55px;
            color: #000;
            margin-bottom: 10px;

            &:after {
              content: '';
              position: absolute;
              display: inline-block;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
              width: 100px;
              height: 2px;
              border-bottom: 1px solid #ccc;
            }
          }
        }

        /deep/ .el-menu {
          border-right: 0px;
        }
      }

      .right-box {
        background-color: #F4F7F9;
        height: 100%;
        margin: 0 25px;
        flex: 1;
        display: flex;
        flex-direction: column;

        .box-header {
          width: 100%;
          height: 40px;
          display: flex;
          flex-direction: row;

          .nav-left {
            flex: 1;

            > ul {
              position: relative;
              margin: 0;
              list-style: none;
              padding-left: 110px;

              .firs-title {
                position: absolute;
                left: 0;
                top: 0px;
                width: 100px;
                height: 40px;

                > /deep/ .el-tag {
                  width: 100px;
                  display: inline-block;
                  border: none;
                  height: 100%;
                  color: black;
                  line-height: 40px;
                  font-size: 14px;
                  background-color: #F4F7F9;
                }
              }

              li {
                position: relative;
                display: inline-block;
                height: 100%;
                text-align: center;
                cursor: pointer;
                height: 100%;
              }
            }
          }

          .nav-right {
            ul {
              padding: 0;
              margin: 0;
              list-style: none;

              > li {
                color: #46A976;
                display: inline-block;
                width: 150px;
                line-height: 40px;
                height: 100%;
                font-size: 16px;
                text-align: center;
                cursor: pointer;

              }
            }
          }
        }

        .route-view-box {
          flex: 1;
          width: 100%;
          background-color: #fff;
          margin-bottom: 15px;
        }
      }
    }

  }
</style>
