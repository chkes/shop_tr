<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">注册账号</view>
			<input class="u-border-bottom " v-model="name" placeholder="请输入名称" />
			<input class="u-border-bottom " v-model="email" placeholder="请输入邮箱" />
			<input class="u-border-bottom " type="password" v-model="password" placeholder="请输入密码" />
			<input class="u-border-bottom " type="password" v-model="password_confirmation" placeholder="再次确认密码" />
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">注册</button>
			<view class="alternative">
				<view class="password">找回密码</view>
				<view class="issue" @tap="toLogin">返回登录</view>
			</view>
		</view>
		<view class="buttom u-m-t-100">
			<view class="hint">
				登录代表同意
				<text class="link">美团点评用户协议、隐私政策，</text>
				并授权使用您的美团点评账号信息（如昵称、头像、收获地址）以便您统一管理
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				email: '',
				password: "",
				password_confirmation:''
			}
		},
		computed: {
			inputStyle() {
				let style = {};
				// 验证注册信息是否填写完整
				if (this.$u.test.email(this.email) && this.password && this.name && this.password_confirmation) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
			}
		},
		methods: {
			async submit() {
				// 验证注册信息
				if (!this.$u.test.email(this.email) || !this.password || !this.password_confirmation || !this.name) return
				if (this.password !== this.password_confirmation ) return this.$u.toast('密码不一致')
				// 注册参数
				const params = {
					name:this.name,
					email: this.email,
					password: this.password,
					password_confirmation: this.password_confirmation
				}
				console.log(params)
				// 注册
				const registerRes = await this.$u.api.register(params)
				if(registerRes) return
				// 接口问题成功返回的是一个 空字符串
				// 注册之后跳转到登录页
				setTimeout(() => {
					console.log(1)
					this.$u.route({
						type:'reLaunch',
						url:'pages/auth/login'
					})
				},1500)		
			},
			// 前往登录页面
			toLogin(){

					this.$u.route({
						type:'navigateTo',
						url:'pages/auth/login'
					})

			}
		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		font-size: 28rpx;

		.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
				padding: 15rpx;
			}

			.tips {
				color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getCaptcha {
				background-color: rgb(253, 243, 208);
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.buttom {
			.loginType {
				display: flex;
				padding: 350rpx 150rpx 150rpx 150rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				padding: 20rpx 40rpx;
				font-size: 20rpx;
				color: $u-tips-color;

				.link {
					color: $u-type-warning;
				}
			}
		}
	}
</style>
