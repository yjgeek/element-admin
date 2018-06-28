<template>
  <div class="login-register">
    <div class="form" ref="aa">
      <div class="title">登&nbsp;&nbsp;&nbsp;&nbsp;录</div>
      <div class="content iconfont">
        <div class="login">
          <el-input placeholder="请输入用户名" @keyup.enter.native="onLogin" prefix-icon="icon-phone" v-model="login.account">
          </el-input>
          <p></p>
          <el-input placeholder="请输入密码" @keyup.enter.native="onLogin" type="password" prefix-icon="icon-pwd" v-model="login.password">
          </el-input>
          <p></p>
          <div class="code">
            <el-input placeholder="请输入验证码" @keyup.enter.native="onLogin" v-model="login.code">
            </el-input>
            <img :src="codeSrc" @click="getCode()" alt="点击获取">
          </div>
          <p></p>
          <el-row style="text-align: center">
            <el-button type="danger" @click="login.account='';login.password=''">重置</el-button>
            <el-button type="primary" @click="onLogin">登录</el-button>
          </el-row>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      codeSrc: '',
      login: {
        account: '',
        password: '',
        code: ''
      }
    }
  },
  methods:{
    onLogin(){
      this.$api["authLogin"](this.login).then(res=>{
        this.setLocalStorage('user', res);
        this.$router.push('/welcome');
      }).catch(e=>{
        this.getCode();
      })
    },
    getCode(){
      this.$api["authVerificationCode"]().then(res=>{
        this.codeSrc = res;
      })
    }
  },
  created(){
    this.getCode()
  }
}
</script>

<style lang="scss" scoped>
.login-register{
  background: url('/static/img/bg1.jpg');
  background-size: 100% 100%;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  p{
    margin: 15px 0;
  }
  .form{
    position: fixed;
    width: 35%;
    max-width: 450px;
    min-width: 400px;
    height: 550px;
    background: rgba(rgb(173, 209, 231), 0.4);
    right: 20px;
    top: 0;
    bottom: 0;
    margin: auto;
    border-radius: 2px;
    .title{
      color: #fff;
      text-align: center;
      font-size: 30px;
      height: 50px;
      font-family: '微软雅黑';
      line-height: 50px;
      
      
    }
    .code{
      display: flex;
      input{
        width: 70%;
      }
      img{
        cursor: pointer;
        margin-left: 5px;
        border-radius: 5px;
      }
    }
    .content{
      padding: 10px;
    }
  }
}
</style>
