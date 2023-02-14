<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cart, index) in cartInfoList"
          :key="index"
        >
          <li v-for="item in cart.cartInfoList" :key="item.id">
            <ul class="shopInfo">
              <li class="cart-list-con1">
                <input
                  type="checkbox"
                  name="chk_list"
                  :checked="item.isChecked === 1"
                  @click="changeCheck(item)"
                />
              </li>
              <li class="cart-list-con2">
                <img :src="item.imgUrl" />
                <div class="item-msg">{{ item.skuName }}</div>
              </li>
              <li class="cart-list-con4">
                <span class="price">{{ item.skuPrice }}</span>
              </li>
              <li class="cart-list-con5">
                <a
                  href="javascript:void(0)"
                  class="mins"
                  @click="changeSkuNum(item, -1)"
                  >-</a
                >
                <input
                  autocomplete="off"
                  type="text"
                  :value="item.skuNum"
                  minnum="1"
                  class="itxt"
                />
                <a
                  href="javascript:void(0)"
                  class="plus"
                  @click="changeSkuNum(item, +1)"
                  >+</a
                >
              </li>
              <li class="cart-list-con6">
                <span class="sum">{{ item.skuNum * item.skuPrice }}</span>
              </li>
              <li class="cart-list-con7">
                <a
                  href="javascript:void(0)"
                  class="sindelet"
                  @click="deleteItem(item.skuId)"
                  >删除</a
                >
                <br />
                <a href="#none">移到收藏</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllCheck"
          @change="changeAllCheck"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAllCheckedItem">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ totalNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalSum }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import login from "@/views/Login";

export default {
  name: "ShopCart",
  mounted() {
    this.getCartInfo();
  },
  computed: {
    ...mapState({
      cartInfoList: (state) => state.cart.cartInfoList,
    }),
    ...mapGetters(["totalSum", "totalNum", "isAllCheck"]),
  },
  methods: {
    ...mapActions([
      "getCartIsCheckedAsync",
      "addToCart",
      "updateAllCheck",
      "deleteCartItemAsync",
      "deleteCartIsChecked",
    ]),
    getCartInfo() {
      this.$store.dispatch("getCartInfoAsync");
    },
    async changeCheck(cart) {
      try {
        const skuId = cart.skuId;
        const isChecked = cart.isChecked === 1 ? 0 : 1;
        const result = await this.getCartIsCheckedAsync({ skuId, isChecked });
        if (result === "ok") this.getCartInfo();
        else alert("修改失败");
      } catch (err) {
        alert("修改失败");
      }
    },
    async changeSkuNum(cart, num) {
      try {
        const skuId = cart.skuId;
        if (cart.skuNum + num < 1) num = 1 - cart.skuNum;
        const result = await this.addToCart({ skuId, skuNum: num });
        if (result === "ok") this.getCartInfo();
        else alert("修改失败");
      } catch (err) {
        alert("修改失败");
      }
    },
    async changeAllCheck() {
      const isCheck = this.isAllCheck ? 0 : 1;
      try {
        await this.updateAllCheck(isCheck);
        this.getCartInfo();
      } catch (err) {
        console.log(err);
      }
    },
    async deleteItem(skuId) {
      try {
        const result = await this.deleteCartItemAsync(skuId);
        if (result === "ok") {
          this.getCartInfo();
        } else {
          alert("修改失败");
        }
      } catch (err) {
        alert("修改失败！");
      }
    },
    async deleteAllCheckedItem() {
      try {
        await this.deleteCartIsChecked();
        this.getCartInfo();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 5%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 35%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 15%;
      }
    }

    .cart-body {
      margin: 15px 0;

      .cart-list {
        border-bottom: 1px solid #ddd;
        border-right: 1px solid #ddd;
        border-left: 1px solid #ddd;
        width: 1178px;
        margin-bottom: 30px;
        /*height:82px;*/ /*不能设置高度，如果描述内容过多会溢出，应该由内容撑开*/
        /*overflow: hidden;*/

        &:after {
          content: "";
          display: block;
          clear: both;
        }

        & > li {
          float: left;
          width: 100%;
          border-top: 1px solid #ddd;
          padding: 20px;
          box-sizing: border-box;

          .shopInfo {
            width: 100%;
            /*overflow: hidden;*/

            & > li {
              float: left;
            }

            .cart-list-con1 {
              width: 5%;
            }

            .cart-list-con2 {
              width: 35%;

              img {
                width: 82px;
                height: 82px;
                float: left;
              }

              .item-msg {
                float: left;
                width: 150px;
                margin: 0 10px;
                line-height: 18px;
              }
            }

            .cart-list-con4 {
              width: 15%;

              div {
                position: relative;

                .sales-promotion {
                  color: #e2231a;
                  display: inline-block;
                  width: 56px;
                  border: 1px solid #f9d2d3;
                  text-align: left;
                  line-height: 20px;
                  padding: 0 5px 0 5px;
                  cursor: pointer;
                  background: #fff;
                  text-decoration: none;
                  overflow: hidden;
                  position: relative;

                  b {
                    position: absolute;
                    right: 8px;
                    top: 8px;
                    width: 7px;
                    height: 4px;
                    overflow: hidden;
                    font-weight: bolder;
                    background: url(https://misc.360buyimg.com/user/cart/css/i/cart-icons-202004.png) -82px -3px;
                  }

                  &:hover {
                    color: #e2231a !important;
                  }
                }

                .promotion-tips {
                  position: absolute;
                  padding: 10px 14px 10px 10px;
                  width: 276px;
                  top: 19px;
                  box-shadow: 0 0 2px 2px #eee;
                  border: 1px solid #e4393c;
                  background: none repeat scroll 0 0 #fff;
                  text-align: left;
                  z-index: 99;

                  .promotion-tit {
                    position: absolute;
                    height: 19px;
                    line-height: 17px;
                    border: 1px solid #e4393c;
                    border-bottom: 0;
                    top: -20px;
                    left: -1px;
                    background: #fff;
                    color: #e2231a;
                    padding: 0 15px 0 8px;
                    cursor: pointer;
                    width: 43px;
                  }

                  .promotion-cont {
                    position: relative;
                    z-index: 99;
                    line-height: 23px;
                    width: 280px;

                    ul {
                      display: block;

                      li {
                        display: block !important;
                        padding: 2px 5px;

                        .input {
                          border: 1px solid #ddd;
                          cursor: pointer;
                          box-sizing: border-box;
                          padding: 0;
                        }
                      }
                    }

                    .op-btns {
                      margin-top: 20px;
                      text-align: center;

                      .select-promotion {
                        font-family: arial, Microsoft YaHei;
                        display: inline-block;
                        height: 25px;
                        line-height: 25px;
                        background-color: #e74649;
                        background-image: linear-gradient(
                          0deg,
                          #e74649 0,
                          #df3134
                        );
                        border-radius: 3px;
                        color: #fff;
                        font-size: 12px;
                        font-weight: 400;
                        padding: 0 10px;
                        vertical-align: middle;
                        cursor: pointer;
                        border: 0;
                        float: none;
                        transition: all 0.2s ease-out;
                      }

                      .cancel-promotion {
                        margin-left: 10px;
                        transition: all 0.2s ease-out;
                        display: inline-block;
                        height: 23px;
                        line-height: 23px;
                        background-color: #f2f2f2;
                        background-image: linear-gradient(
                          0deg,
                          #f2f2f2 0,
                          #f7f7f7
                        );
                        border-radius: 3px;
                        color: #323333;
                        font-size: 12px;
                        font-weight: 400;
                        padding: 0 9px;
                        vertical-align: middle;
                        cursor: pointer;
                        float: none;
                        border: 1px solid #e1e1e1;
                      }
                    }

                    .p-coupon-item {
                      display: block;
                      margin: 10px 0;
                      overflow: hidden;

                      .coupon-price {
                        border-color: rgb(231, 70, 73);
                        position: relative;
                        height: 29px;
                        line-height: 29px;
                        width: 54px;
                        float: left;
                        font-size: 0;
                        margin: 2px 10px 0 0;
                        border: 1px solid #f9d2d3;
                        text-align: center;
                        padding: 0 2px;

                        .txt {
                          font-size: 12px;
                          color: rgb(231, 70, 73);
                          font-weight: 700;
                        }
                      }

                      .coupon-msg {
                        float: left;
                        width: 200px;
                        line-height: 18px;
                        font-weight: 400;
                      }

                      .coupon-opbtns {
                        float: left;

                        .coupon-btn {
                          display: inline-block;
                          height: 25px;
                          line-height: 25px;
                          background-color: #e74649;
                          border-radius: 3px;
                          color: #fff;
                          font-size: 12px;
                          font-weight: 400;
                          padding: 0 10px;
                          vertical-align: middle;
                          cursor: pointer;
                          border: 0;
                          float: none;
                        }
                      }
                    }
                  }
                }
              }
            }

            .cart-list-con5 {
              width: 15%;

              .mins {
                border: 1px solid #ddd;
                border-right: 0;
                float: left;
                color: #666;
                width: 6px;
                text-align: center;
                padding: 8px;
              }

              input {
                border: 1px solid #ddd;
                width: 40px;
                height: 33px;
                float: left;
                text-align: center;
                font-size: 14px;
              }

              .plus {
                border: 1px solid #ddd;
                border-left: 0;
                float: left;
                color: #666;
                width: 6px;
                text-align: center;
                padding: 8px;
              }
            }

            .cart-list-con6 {
              width: 15%;

              .sum {
                font-size: 16px;
              }
            }

            .cart-list-con7 {
              width: 15%;

              a {
                color: #666;
              }
            }
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
