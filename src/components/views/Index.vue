<template>
  <div class="container">
    <div class="container-main">
      <div class="left-menu">
        <div class="main-menu">
          <div class="main-nav-logo">
            <img :src="navLogo" alt="">
            <span class="user-name">钟思文</span>
          </div>
          <ul>
            <li v-for="item in menuList" :key="item.id">
              <i class="el-icon-s-home"></i>
              {{item.label}}
              <span class="el-icon-arrow-right" v-show="item.children">  </span>
            </li>
          </ul>
        </div>

      </div>
      <div class="right-box">
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'idnex',
    data() {
      return {
          navLogo:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          menuList:[
            {label:'仪表盘',id:1},
            {label:'文章',id:2,children:[{label:'写文章',id:'21',parentId:2},{label:'所有文章',id:'22',parentId:2},{label:'所有文章',id:'23',parentId:2}]},
            {label:'评论',id:3},
            {label:'用户',id:4},
            {label:'设置',id:5,children: [{label:'导航菜单',id:51,parentId:5},{label:'图片轮播',id:52,parentId:5}]}
          ]
      }
    }
  }
</script>
<style lang="scss" scoped>
  .container {
    min-width: 1366px;
    height: 100%;

    .container-main {
      height: 100%;
      display: flex;
      flex-direction: row;

      .left-menu {
        background-color: #46A976;
        height: 100%;
        .main-menu{
          .main-nav-logo{
            height: 200px;
            background-color: #fff;
            .user-name{
              display: block;
              width: 100%;
            }
          }
        }
      }

      .right-box {
        background-color: pink;
        height: 100%;
        flex: 1;
      }
    }
  }
</style>
