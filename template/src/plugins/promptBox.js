//请求成功
import { Message } from "element-ui";
const message = {
  success(val) {
    Message.success(val);
  },
  error(val) {
    Message.error(val);
  },
  warning(val) {
    Message.warning(val);
  },
  info(val) {
    Message.info(val);
  }
}
export default message;