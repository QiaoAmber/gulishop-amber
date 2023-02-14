<template>
  <div class="fr page">
    <div class="sui-pagination clearfix">
      <ul>
        <li
          class="prev"
          @click="$emit('changePage', pageNo - 1)"
          :class="{ disabled: pageNo === 1 }"
        >
          <a href="javascript:;">«上一页</a>
        </li>
        <li
          :class="{ active: pageNo === 1 }"
          v-if="page.start !== 1"
          @click="$emit('changePage', 1)"
        >
          <a href="javascript:;">1</a>
        </li>
        <li class="dotted" v-if="page.start > 2">
          <span>...</span>
        </li>
        <li
          v-for="num in page.end"
          :key="num"
          v-if="num >= page.start"
          :class="{ active: pageNo === num }"
          @click="$emit('changePage', num)"
        >
          <a href="#">{{ num }}</a>
        </li>
        <li class="dotted" v-if="page.end < totalPage"><span>...</span></li>
        <li @click="$emit('changePage', totalPage)">
          <a
            href="javascript:;"
            v-if="page.end < totalPage"
            :class="{ active: totalPage === pageNo }"
            >{{ totalPage }}</a
          >
        </li>
        <li
          class="next"
          @click="$emit('changePage', pageNo + 1)"
          :class="{ disabled: pageNo === totalPage }"
        >
          <a href="javascript:;">下一页»</a>
        </li>
      </ul>
      <div>
        <span>共{{ totalPage }}页&nbsp;</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "totalPage", "continuePage"],
  data() {
    return {
      isActive: this.pageNo === 1 ? "none" : "auto",
    };
  },
  computed: {
    page() {
      let start, end;
      const diff = Math.floor(this.continuePage / 2);
      start = this.pageNo - diff;
      end = this.pageNo + diff;
      if (this.totalPage <= this.continuePage) {
        end = this.totalPage;
        start = 1;
      }
      if (start < 1) {
        const diff = 1 - start;
        start += diff;
        end += diff;
      }
      if (end > this.totalPage) {
        const diff = end - this.totalPage;
        end -= diff;
        start -= diff;
      }

      return { start, end };
    },
  },
};
</script>

<style scoped lang="less">
.page {
  width: 740px;
  height: 66px;
  overflow: hidden;
  float: right;

  .sui-pagination {
    margin: 18px 0;

    ul {
      margin-left: 0;
      margin-bottom: 0;
      vertical-align: middle;
      width: 490px;
      float: left;

      li {
        line-height: 18px;
        display: inline-block;

        a {
          position: relative;
          float: left;
          line-height: 18px;
          text-decoration: none;
          background-color: #fff;
          border: 1px solid #e0e9ee;
          margin-left: -1px;
          font-size: 14px;
          padding: 9px 18px;
          color: #333;
        }

        &.active {
          a {
            background-color: #fff;
            color: #e1251b;
            border-color: #fff;
            cursor: default;
          }
        }

        &.prev {
          a {
            background-color: #fafafa;
          }
        }

        &.disabled {
          a {
            color: pink;
            pointer-events: none;
          }
        }

        &.dotted {
          span {
            margin-left: -1px;
            position: relative;
            float: left;
            line-height: 18px;
            text-decoration: none;
            background-color: #fff;
            font-size: 14px;
            border: 0;
            padding: 9px 18px;
            color: #333;
          }
        }

        &.next {
          a {
            background-color: #fafafa;
          }
        }
      }
    }

    div {
      color: #333;
      font-size: 14px;
      float: right;
      width: 241px;
      line-height: 40px;
    }
  }
}
</style>
