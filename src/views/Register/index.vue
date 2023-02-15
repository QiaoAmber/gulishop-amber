<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <ValidationObserver v-slot="{invalid}">
      <div class="register">
        <h3>
          注册新用户
          <span class="go"
          >我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
        </h3>
        <div class="content">
          <label>手机号:</label>
          <validation-provider rules="required|phone" v-slot="{ errors }">
            <input
              type="text"
              placeholder="请输入你的手机号"
              v-model="phone"
              name="phone"
            />
            <span class="error-msg">{{ errors[0] }}</span>
          </validation-provider>
        </div>
        <div class="content">
          <label>验证码:</label>
          <validation-provider rules="required|code" v-slot="{ errors }">
            <input type="text" placeholder="请输入验证码" v-model="code" name="code" />
            <button :disabled="num > 0" @click="sendCodeHandler">
              发送{{ num > 0 ? `还需要${num}秒` : "成功" }}
            </button>
            <span class="error-msg">{{ errors[0] }}</span>
          </validation-provider>
        </div>
        <div class="content">
          <label>登录密码:</label>
          <validation-provider rules="required|password" v-slot="{ errors }">
            <input
              type="text"
              placeholder="请输入你的登录密码"
              v-model="passport"
              name="passport"
            />
            <span class="error-msg">{{ errors[0] }}</span>
          </validation-provider>
        </div>
        <div class="content">
          <label>确认密码:</label>
          <validation-provider rules="required|confirmed:password" v-slot="{ errors }">
            <input type="text" placeholder="请输入确认密码" v-model="passport2" name="passport2" />
            <span class="error-msg">{{ errors[0] }}</span>
          </validation-provider>
        </div>
        <div class="controls">
          <validation-provider rules="required|agree" v-slot="{errors}">
            <input name="m1" type="checkbox" v-model="isChecked" />
            <span>同意协议并注册《尚品汇用户协议》</span>
            <span class="error-msg">{{ errors[0] }}</span>
          </validation-provider>
        </div>
        <div class="btn">
          <button @click="registerHandler" :disabled="invalid">完成注册</button>
        </div>
      </div>
    </ValidationObserver>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import { getSendCode } from "@/api";

export default {
  name: "Register",
  data() {
    return {
      phone: "",
      code: "",
      passport: "",
      passport2: "",
      num: 0,
      isChecked: true
    };
  },
  methods: {
    async sendCodeHandler() {
      try {
        const result = await getSendCode(this.phone);
        if (result.code === 200) {
          this.code = result.data;
        }
        this.num = 10;
        // this.timeId = setTimeout(() => {
        //   console.log(this.num);
        //   if (this.num === 0) {
        //
        //     clearTimeout(this.timeId);
        //   } else {
        //     this.num--;
        //     console.log(this.num);
        //   }
        // }, 10000);
        this.timeId = setInterval(() => {
          if (this.num <= 0) clearInterval(this.timeId);
          else this.num--;
        }, 1000);
      } catch (err) {
        // clearTimeout(this.timeId);
        clearInterval(this.timeId);
        this.num = 0;
      }
    },
    async registerHandler() {
      const { phone, code, password, password2 } = this;
      if (phone && password && password === password2) {
        try {
          const result = await this.$store.dispatch("postRegisterAsync", {
            phone,
            code,
            password
          });
          if (result === "ok") {
            alert("注册成功");
            this.$router.push("/login");
          } else {
            alert("失败");
          }
        } catch (err) {
          alert("失败");
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
