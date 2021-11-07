<template>
	<view >
		<!-- 轮播图 -->
		<u-swiper name="img_url" :list="slides" autoplay @click="toSwiperDetail"></u-swiper>
		<!--  分类 -->
		<!-- 		<view >
			<u-row gutter="16">
				<u-col span="3" v-for="(item,i) in catitems" :key="i" >
					<view @click="navClickHandle(item.name)" class="u-flex u-row-center u-p-10">
						<image class="cat_img" mode="widthFix" :src="item.image_src"></image>
					</view>
				</u-col>
			</u-row>
		</view> -->
		<!-- 楼层 -->
		<!-- 		<view>
			<u-row gutter="16">
				<u-col span=""></u-col>
			</u-row>
		</view>
		<view class="u-text-center u-m-t-10">
			<u-tabs class="tabs-wrap" item-width="160" bar-width="100" :list="listTabs" :current="currentTabs"
				@change="changeTabs"></u-tabs>
		</view> -->
		<!-- tabs -->
		<view class=" u-text-center p-10">
			<u-tabs :list="listTabs" bar-width="100" item-width="160" :current="currentTabs" @change="changeTabs">
			</u-tabs>
		</view>

		<!-- 展示 -->

		<u-row gutter="16" class="u-skeleton">
			<!-- goods.length !==0 ? goods  为了撑开骨架屏 -->
			<u-col span="6" v-for="goods in goodsList.length !==0 ? goodsList :  4"  :key="goods.id">
				<goods-card :goods="goods"></goods-card>
			</u-col>

		</u-row>

		<!--引用组件 骨架屏 -->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	export default {		
		data() {
			return {
				// tabs数组
				listTabs: [{
					name: '默认'
				}, {
					name: '销量'
				}, {
					name: '推荐'
				}, {
					name: '最新',
					count: 5
				}],
				// 当前tabs
				currentTabs: 0,
				src: "https://oss.shop.eduwork.cn/product/2020-0820-5f3e16f27f829.png",
				// 商品数组
				goodsList: [],
				// page当前页数
				page: 1,
				// 轮播图数组
				slides: [],
				// 骨架屏控制
				loading: true
			};
		},
		methods: {
			// Tab标题切换
			changeTabs(index) {
				// 获取当前tab页参数
				this.currentTabs = index;
				console.log(this.currentTabs)
				// 重置goods数组
				this.goodsList = []
				// 请求
				this.getData()
			},
			// 点击轮播图跳转
			toSwiperDetail(index) {
				const {
					goods_id
				} = this.slides[index]
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_detail=' + goods_id,
				});
			},
			// 请求轮播图数据
			async getData() {
				// 骨架屏开始
				this.loading = true
				// 请求参数
				const params = {
					page: this.page,
				}
				if (this.currentTabs === 1) params.sales = 1
				if (this.currentTabs === 2) params.recommend = 1
				if (this.currentTabs === 3) params.new = 1
				// 请求轮播图数据
				const res = await this.$u.api.index(params)
				// 骨架屏end
				this.loading = false
				// 轮播图赋值
				this.slides = res.slides
				// 商品赋值
				this.goodsList = [...this.goodsList, ...res.goods.data]
				// 商品页数
				this.page = res.goods.current_page
			},
			// 上拉加载更多
			onReachBottom() {
				this.page += 1;
				this.getData()
			}
		},
		onLoad() {
			this.getData()
			// console.log(this.vuex_version)
			// 	this.$u.vuex('vuex_n',"tom")
			// 	// 在 index.js设置vuex_n
			// 	console.log(this.vuex_n)

		}

	}
</script>

<style lang="scss" scoped>
	
</style>
