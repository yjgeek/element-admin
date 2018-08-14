export default {
    //api验证指令
    auth: {
        bind(el, binding, vnode) {
            let data = binding.value;
            let bool = true;
            if (typeof data == 'string') {
                data = [data]
            }
            for (let item of data.values()) {
                let val = '/api/admin/' + item;
                if (GLOBAL.vm.auth.includes(val)) {
                    bool = false;
                    break;
                }
            }
            if (bool) {
                el.remove();
            }
        }
    }
}