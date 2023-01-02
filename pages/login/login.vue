<template>
  <view>
    <view class="container">
      <view class="wrapper">
        <view class="left-top-sign">LOGIN</view>
        <view class="welcome">
          欢迎回来！
        </view>
        <view class="input-content">
          <view class="input-item">
            <text class="tit">邮箱号</text>
            <input  type="text" placeholder="请输入邮箱" v-model="email"/>
          </view>
          <view class="input-item">
            <text class="tit">密码</text>
            <input type="password"  placeholder="请输入密码" v-model="password"/>
          </view>
        </view>
        <button class="confirm-btn" @click="login" >登录</button>
        <view class="forget-section">
          忘记密码?
        </view>
      </view>
      <view class="register-section">
        还没有账号?
        <text >马上注册</text>
      </view>
    </view>
  </view>
</template>

<script>
  /**
    作者: lyy
    说明: 登录流程
    1. 收集表单项数据
    2. 前端验证
      1) 验证用户信息(账号，密码)是否合法
      2) 前端验证不通过就提示用户，不需要发请求给后端
      3) 前端验证通过了，发请求(携带账号, 密码)给服务器端
    3. 后端验证
      1) 验证用户是否存在
      2) 用户不存在直接返回，告诉前端用户不存在
      3) 用户存在需要验证密码是否正确
      4) 密码不正确返回给前端提示密码不正确
      5) 密码正确返回给前端数据，提示用户登录成功(会携带用户的相关信息)
  */
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    
    methods: {
      async login() {
        if (!this.email) {
          uni.$showMsg('邮箱不能为空')
          return;
        }
        
        if (!this.password) {
          uni.$showMsg('密码不能为空')
          return;
        }
        const info = {
          email: this.email,
          password: this.password,
        }
      
        const { data : res } = await uni.$http.get('/login',info)
        if (res.code === 200) {
          uni.$showMsg('登录成功')
          uni.setStorageSync('userInfo',JSON.stringify(res.profile))
          uni.switchTab({
            url: "/pages/personal/personal"
          })
        } else if (res.code === 400) {
          uni.$showMsg('手机号错误')
        } else if (res.code === 502) {
          uni.$showMsg('密码错误')
        } else {
          uni.$showMsg(res.message)
        }
      },
    }
  }
</script>

<style lang="scss">
/* pages/login/login.wxss */.wrapper{
  position:relative;
  z-index: 90;
  padding-bottom: 40rpx;
}

.left-top-sign{
  font-size: 120rpx;
  color: #f8f8f8;
  position:relative;
  left: -16rpx;
}

.welcome{
  position:relative;
  left: 50rpx;
  top: -90rpx;
  font-size: 46rpx;
  color: #555;
}


.input-content{
  padding: 0 60rpx;
}
.input-item{
  display:flex;
  flex-direction: column;
  align-items:flex-start;
  justify-content: center;
  padding: 0 30rpx;
  background:#f8f6fc;
  height: 120rpx;
  border-radius: 4px;
  margin-bottom: 50rpx;

}

.input-item:last-child{
  margin-bottom: 0;
}
.input-item .tit{
  height: 50rpx;
  line-height: 56rpx;
  font-size: 30rpx;
  color: #606266;
}
.input-item input{
  height: 60rpx;
  font-size: 30rpx;
  color: #303133;
  width: 100%;
}
.confirm-btn{
  width: 630rpx!important;
  height: 76rpx;
  line-height: 76rpx;
  border-radius: 50rpx;
  margin-top: 70rpx;
  background: #d43c33;
  color: #fff;
  font-size: 32rpx;
  padding: 0;
}
.confirm-btn2:after{
  border-radius: 100px;
}

.forget-section{
  font-size: 28rpx;
  color: #4399fc;
  text-align: center;
  margin-top: 40rpx;
}

.register-section{
  position:absolute;
  left: 0;
  bottom: 50rpx;
  width: 100%;
  font-size: 28rpx;
  color: #606266;
  text-align: center;

}
.register-section text{
  color: #4399fc;
  margin-left: 10rpx;
}
</style>
