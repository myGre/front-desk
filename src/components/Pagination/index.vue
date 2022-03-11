<template>
  <div class="pagination">
    <button :disabled = 'pageNo == 1' @click="$emit('getPageNo', pageNo - 1)">上一页</button>
    <button v-show="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)" :class="{arcive: pageNo==1}" >1</button>
    <button v-show="startNumAndEndNum.start > 2">···</button>

    <button v-for="(page, index) in startNumAndEndNum.end" :key="index" v-show="page >= startNumAndEndNum.start" @click="$emit('getPageNo', page)" :class="{arcive: pageNo==page}" >{{page}}</button>

    <button v-show="startNumAndEndNum.end < totaiSum - 1">···</button>
    <button v-show="startNumAndEndNum.end != totaiSum" @click="$emit('getPageNo', totaiSum)" :class="{arcive: pageNo == totaiSum}" >{{ totaiSum }}</button>
    <button :disabled='pageNo == totaiSum'  @click="$emit('getPageNo', pageNo + 1)" >下一页</button>

    <button style="margin-left: 30px">共 {{ totai }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "totai", "continues"],
  computed: {
    // 总页数
    totaiSum() {
      return Math.ceil(this.totai / this.pageSize);
    },
    startNumAndEndNum() {
      let { pageNo, pageSize, continues, totaiSum } = this;
      let start = 0;
      let end = 0;
      // 如果总页数小于pageSize
      if (totaiSum < pageSize) {
        start = 1;
        end = totaiSum;
      } else {
        // 如果页数正常
        start = pageNo - parseInt(continues/2);
        end = pageNo + parseInt(continues/2);
        if (start < 1) {
            start = 1
            end = continues
        }
        if (end > totaiSum) {
            end = totaiSum
            start = totaiSum - continues + 1
        }
      }
      return {start,end}
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
  .arcive{
    background-color: skyblue;
}
}
</style>