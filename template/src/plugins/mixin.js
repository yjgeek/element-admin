import Icon from "components/IconFont";
import StrongDialog from "components/strongDialog";
export default {
  computed:{
    windowSize(){
      return this.$store.state.windowSize
    }
  },
  methods: {
    //通过api 检查是否有权限 api:String|Array
    checkAuth(api){
      let val = '/api/admin/';
      if (typeof api == 'string') {
        val = val + api;
        if (this.$auth.includes(val)) {
          return true;
        }
      }else if(api instanceof Array){
        for (let item of api.values()) {
          val = val + item;
          if (this.$auth.includes(val)) {
            return true;
          }
          val = '/api/admin/';
        }
      }
      return false;
    },
    //获取本地存储的值
    getLocalStorage(key, bool) {
      if (key) {
        if (localStorage[key]) {
          if (bool) {
            return JSON.parse(localStorage[key])
          } else {
            return localStorage[key]
          }
        } else {
          return false;
        }
      }
    },
    //存到本地存储的值
    setLocalStorage(key, data) {
      if (!key) {
        console.warn("key不能为空!")
        return false
      }
      if (typeof data === 'object') {
        localStorage[key] = JSON.stringify(data)
      } else {
        localStorage[key] = data
      }
    }
  },
  components: {
    Icon,
    StrongDialog
  }
}