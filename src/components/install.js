import { HelloWorld, MyRili } from './index';

const install = function(Vue) {
  Vue.component(HelloWorld.name, HelloWorld);
  Vue.component(MyRili.name, MyRili);
};
export default {
  install
};