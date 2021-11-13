<template>
	<view>
		<view class="u-search-box u-p-20">
			<u-search :clearabled="true" @custom="search" placeholder="日照香炉生紫烟" v-model="keyword" @clear="clearSearch">
			</u-search>
		</view>

		<view class=" u-text-center p-10">
			<u-tabs :list="listTabs" bar-width="100" item-width="160" :current="currentTabs" @change="changeTabs">
			</u-tabs>
		</view>

		<!-- 展示 -->

		<u-row gutter="16" class="">
			<!-- goods.length !==0 ? goods  为了撑开骨架屏 -->
			<u-col span="6" v-for="(goods,i) in goodsList " :key="i">
				<goods-card :goods="goods"></goods-card>
			</u-col>
		</u-row>

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
				// 当前的分类id
				categoryId: '',
				// 当前分类的页数
				current_page: 1,
				// 搜索的值
				keyword: '',
				// 当前是否处于搜索状态
				searchStatus: 0
			}
		},
		methods: {
			// 获取分类的详细数据
			async getcategory() {
				const params = {
					category_id: this.searchStatus == 0 ? this.categoryId : '',
					page: this.page,
					title: this.keyword
				}
				console.log(params)
				if (this.currentTabs === 1) params.sales = 1
				if (this.currentTabs === 2) params.recommend = 1
				if (this.currentTabs === 3) params.new = 1
				// 分类数据
				const res = await this.$u.api.category(params)
				// 判断是否为搜索模式
				if (this.searchStatus == 0) {
					this.goodsList = [...this.goodsList, ...res.goods.data]
				} else {
					this.goodsList = res.goods.data
				}

				// 商品页数
				this.page = res.goods.current_page
				console.log(res)
			},
			// Tab标题切换
			changeTabs(index) {
				// 获取当前tab页参数
				this.currentTabs = index;
				console.log(this.currentTabs)
				// 重置goods数组
				this.goodsList = []
				// 请求
				this.getcategory()
			},
			// 上拉加载更多
			onReachBottom() {
				this.page += 1;
				this.getcategory()
			},
			// 搜索商品
			search() {
				this.page = 1
				this.searchStatus = 1
				this.getcategory()

			},
			// 清楚商品搜索
			clearSearch() {
				this.page = 1
				this.keyword = ''
				this.searchStatus = 0
				this.goodsList = []
				this.getcategory()

			}
		},
		async created() {
			// const currentPage = await getCurrentPages()
			// const id = currentPage[currentPage.length - 1].options.id
			// this.categoryId = id
		},
		onLoad(e) {
			this.categoryId = e.id
			this.getcategory()
		}
	}
</script>

<style>

</style>
