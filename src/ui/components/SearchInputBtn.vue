<template>
  <el-input :style="'width:'+width+'px'" :placeholder="placeholder" v-model.trim="currentValue"
            clearable @keyup.enter.native="searchClick" @clear="searchClick" v-bind="$attrs">
    <slot v-if="!defaultBtn" name="append" slot="append"></slot>
    <el-button v-else
               :icon="(btnText&&!searchIcon)?'':'el-icon-search'"
               class="input-with-button"
               slot="append"
               @click="searchClick" style="color: black">
      {{btnText||''}}
    </el-button>
  </el-input>
</template>

<script>
  export default {
    name: "SearchInputBtn",
    props: {
      value: {
        type: [String, Number],
        default: ''
      },
      placeholder: {
        type: String,
        default: '请输入内容'
      },
      //按钮文字
      btnText: {
        type: String
      },
      //默认统一宽度
      width: {
        type: [String, Number],
        default: '320'
      },
      // 是否显示搜索图标
      searchIcon: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        currentValue: '',
        // 是否显示默认的搜索图标
        defaultBtn: true
      }
    },
    methods: {
      searchClick(event) {
        console.log(event)
        this.$emit('click', event);
      }
    },
    created() {
      this.currentValue = this.value;
      //如果使用者给了自定义标签
      if (this.$slots['append'] && this.$slots['append'].length > 0) {
        this.defaultBtn = false;
      }
    },
    watch: {
      value(val) {
        this.currentValue = val;
      },
      currentValue(newValue) {
        this.$emit('input', newValue);
        this.currentValue = newValue;
      }
    }
  }
</script>

<style scoped lang="scss">
  /deep/ .el-input-group__append, .el-input-group__prepend{
    border:1px solid #46A976;
    background-color: #46A976;
  }
  /deep/ .el-input-group__append button.el-button{
    border-radius: 0;
  }
  /deep/ .el-button [class*=el-icon-]+span{
    margin-left:0px;
  }
</style>

