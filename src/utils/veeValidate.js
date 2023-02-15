import Vue from "vue";
import { extend, configure, ValidationProvider, ValidationObserver } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import zh_CN from "vee-validate/dist/locale/zh_CN.json";

const config = {
  defaultMessage: "{_field_} 是无效"
};
configure(config);
for (let rule in rules) {
  extend(rule, {
    ...rules[rule],
    message: zh_CN.messages[rule]
  });
}

extend("phone", {
  message: (field) => {
    return field + "手机格式错误";
  },
  validate: (value) => {
    return /^\w{6,20}$/.test(value);
  }
});
extend('code', {
  message: (field) => {
    return field + '验证码错误';
  },
  validate: (value) => {
    return value.length === 6 && /^\d{6}$/.test(value);
  },
});
extend("password", {
  message: (field) => {
    return field + "密码格式错误";
  },
  validate: (value) => {
    return /^\w{6,20}$/.test(value);
  }
});
extend("agree", {
  message: (field) => {
    return field + "必须同意";
  },
  validate: (value) => {
    return value;
  }
});

// 注册全局组件
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);