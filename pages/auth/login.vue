<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录小熊商城</view>
			<input class="u-border-bottom " v-model="email" placeholder="请输入邮箱" />
			<input class="u-border-bottom" type="number" v-model="password" placeholder="请输入密码" />
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">登录</button>
			<view class="alternative">
				<view class="password">找回密码</view>
				<view class="issue" @tap="toRegister">注册</view>
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
				email: '',
				password: ""
			}
		},
		computed: {
			inputStyle() {
				let style = {};
				// 验证密码是否存在
				if (this.$u.test.email(this.email) && this.password) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
			}
		},
		methods: {
			async submit() {
				// 验证密码
				if (!this.$u.test.email(this.email) || !this.password) return
				const params = {
					email: this.email,
					password: this.password
				}
				// 登录请求
				const loginRes = await this.$u.api.authLogin(params)
				// 存储用户token
				this.$u.vuex("vuex_token", loginRes.access_token)
				this.$u.toast('登陆成功')
				// 得到用户信息并存储
				this.$u.utils.getUserInfo()
				// 登录之后跳转到来源页
				const backPage = uni.getStorageSync('backPage') || 'pages/home/home'
				console.log(backPage)
				setTimeout(() => {
					console.log(1)
					this.$u.route({
						type: 'reLaunch',
						url: backPage
					})
				}, 1500)
			},
			// 前往注册页面
			toRegister() {
				this.$u.route({
					type: 'navigateTo',
					url: 'pages/auth/register'
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
