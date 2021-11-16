<template>
	<view>
		<!-- 		<u-navbar :is-back="false" title="　" :border-bottom="false">
			<view class="u-flex u-row-right" style="width: 100%;">
				<view class="camera u-flex u-row-center">
					<u-icon name="camera-fill" color="#000000" size="48"></u-icon>
				</view>
			</view>
		</u-navbar> -->
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30 u-p-t-30">
			<view class="u-m-r-10 avator-body">
				<u-avatar :src="vuex_user.avatar_url"  size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20 ">{{vuex_user.name}}</view>
				<view class="u-font-14 u-tips-color">熊熊号:{{vuex_user.email}}</view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="scan" color="#969799" size="28"></u-icon>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" v-if="this.vuex_token" title="个人信息" @click="changeUserInfo"></u-cell-item>
				<u-cell-item icon="setting" v-else title="登录" @click="login"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item v-if="this.vuex_token" icon="rmb-circle" title="所有订单"></u-cell-item>
				<u-cell-item v-if="this.vuex_token" icon="star" title="商品收藏"></u-cell-item>
				<u-cell-item v-if="this.vuex_token" icon="map" title="收货地址"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="设置"></u-cell-item>
				<u-cell-item v-if="this.vuex_token" icon="reload" title="退出登录" @click="outLogin"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic: 'https://uviewui.com/common/logo.png',
				show: true
			}
		},
		onLoad() {
			// 判断是否登录
			// if (!this.$u.utils.isLogin()) return
		},
		methods: {
			// 登录
			login(){
				uni.redirectTo({
					type:'redirectTo',
					url:"/pages/auth/login"
				})
			},
			// 进入修改个人信息页面
			changeUserInfo() {
				this.$u.route({
					type: 'navigateBack',
					url: 'pages/user/userInfo',
					delta:-1
				})
			},
			// 退出登录
			async outLogin(){
				// 退出登录接口
				await this.$u.api.logout()
				
				setTimeout(() => {
					//	清楚token
					this.$u.vuex('vuex_token',null)
					this.$u.vuex('vuex_user',{})
					// 跳转到首页
					this.$u.route({
						type:'reLaunch',
						url:'pages/my/my'
					})
				},1500)
				
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ededed;
	}

	.camera {
		width: 54px;
		height: 44px;

		&:active {
			background-color: #ededed;
		}
	}

	.user-box {
		background-color: #fff;
	}
	.avator-body{
		width: 70px;
		height: 70px;
	}
</style>
