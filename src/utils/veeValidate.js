import Vue from "vue";
import { extend, configure, ValidationProvider, ValidationObserver } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import zh_CN from "vee-validate/dist/locale/zh_CN.json";

const config = {
  defaultMessage : "{_field_} 是无效",
}