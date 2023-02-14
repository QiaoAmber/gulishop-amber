<template>
  <div class="outer">
    <!-- 三级分类导航 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--面包屑导航-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <span href="#">全部结果</span>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="$route.params.keyword">
              {{ $route.params.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-if="$route.query.categoryName">
              {{ $route.query.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <li class="with-x" v-if="searchInfo.trademark">
              {{ searchInfo.trademark.split(":")[1] }}
              <i @click="removeTrademark">×</i>
            </li>
            <li
              class="with-x"
              v-if="searchInfo.props.length > 0"
              v-for="(prop, index) in searchInfo.props"
              :key="index"
            >
              {{ prop.split(":")[1] }}
              <i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!-- 搜索器 -->
        <SearchSelector
          @addTrademark="addTrademark"
          @addAttrSearch="addAttrSearch"
        />

        <!--商品展示区-->
        <div class="details clearfix">
          <!-- 列表操作区 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: orderType === 1 }">
                  <a href="javascript:;" @click="changeOrder(1)"
                    >综合
                    <i
                      class="iconfont icon-arrow-up-bold"
                      v-if="orderArrow === 'desc' && orderType === 1"
                    ></i>
                    <i
                      class="iconfont icon-arrowdown"
                      v-if="orderArrow === 'asc' && orderType === 1"
                    ></i>
                  </a>
                </li>
                <li :class="{ active: orderType === 2 }">
                  <a href="javascript:;" @click="changeOrder(2)"
                    >价格
                    <i
                      class="iconfont icon-arrow-up-bold"
                      v-if="orderArrow === 'desc' && orderType === 2"
                    ></i>
                    <i
                      class="iconfont icon-arrowdown"
                      v-if="orderArrow === 'asc' && orderType === 2"
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="'/detail/' + goods.id">
                      <img :src="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="'/detail/' + goods.id">{{
                      goods.title
                    }}</router-link>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            v-if="goodsInfoList.totalPages > 0"
            :pageNo="searchInfo.pageNo"
            :pageSize="searchInfo.pageSize"
            :total="goodsInfoList.total"
            :totalPage="goodsInfoList.totalPages"
            :continuePage="5"
            @changePage="changePage"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector";

export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      searchInfo: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        keyword: "",
        order: "1:desc",
        pageNo: 5,
        pageSize: 5,
        props: [],
        trademark: "",
      },
    };
  },
  methods: {
    changePage(page) {
      this.searchInfo.pageNo = page;
      this.postGoodsInfo();
    },
    changeOrder(type) {
      this.searchInfo.order = `${type}:${
        this.orderArrow === "desc" ? "asc" : "desc"
      }`;
      this.searchInfo.pageNo = 1;
      this.postGoodsInfo();
    },
    removeProp(index) {
      this.searchInfo.props.splice(index, 1);
      this.searchInfo.pageNo = 1;
      this.postGoodsInfo();
    },
    removeTrademark() {
      this.searchInfo.trademark = "";
      this.searchInfo.pageNo = 1;
      this.postGoodsInfo();
    },
    removeKeyword() {
      this.searchInfo.pageNo = 1;
      let location = { name: "search", query: this.$route.query };
      this.$router.push(location);
      this.$bus.$emit("deleteKeyword", true);
    },
    removeCategoryName() {
      this.searchInfo.pageNo = 1;
      let location = { name: "search", params: this.$route.params };
      this.$router.replace(location);
    },
    postGoodsInfo() {
      this.$store.dispatch("postGoodsInfoAsync", this.searchInfo);
    },
    paramsHandler() {
      let { category1Id, category2Id, category3Id, categoryName } =
        this.$route.query;
      let { keyword } = this.$route.params;
      let searchParams = {
        ...this.searchInfo,
        category1Id,
        category2Id,
        category3Id,
        categoryName,
        keyword,
      };
      Object.keys(searchParams).forEach((key) => {
        if (searchParams[key] === "") {
          delete searchParams[key];
        }
      });
      this.searchInfo.pageNo = 1;
      this.searchInfo = searchParams;
    },
    addTrademark(tm) {
      this.searchInfo.pageNo = 1;
      this.searchInfo.trademark = `${tm.tmId}:${tm.tmName}`;
      this.postGoodsInfo();
    },
    addAttrSearch(attr, attrVal) {
      let content = `${attr.attrId}:${attrVal}:${attr.attrName}`;
      const flag = this.searchInfo.props.some((item) => item === content);
      if (!flag) {
        this.searchInfo.props.push(content);
      }
      this.searchInfo.pageNo = 1;
      this.postGoodsInfo();
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.paramsHandler();
        this.postGoodsInfo();
      },
    },
  },
  computed: {
    ...mapGetters(["attrsList", "trademarkList", "goodsList"]),
    ...mapState({
      goodsInfoList: (state) => state.search.goodsInfoList,
    }),
    orderType() {
      return this.searchInfo.order.split(":")[0] / 1;
    },
    orderArrow() {
      return this.searchInfo.order.split(":")[1];
    },
  },
  mounted() {
    this.postGoodsInfo();
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
