import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false, trickle: false, easing: 'ease', speed: 300, trickleSpeed: 200 });
export default {
  start: () => {
    NProgress.start();
  },
  done: () => {
    NProgress.done();
  }
};
