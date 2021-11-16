<template>
	<view>
		<navigator class="goods_item">
			<u-image class="u-m-b-30 u-text-center u-skeleton-fillet" mode="heightFix" width="100%" height="350rpx"
				:src="goods.cover_url"></u-image>

			<view class="title u-line-1 u-skeleton-rect">{{goods.title ? goods.title : '商品名称'}}</view>

			<view class="p-b u-flex u-row-between u-p-t-30">
				<view class="price u-skeleton-rect">$ {{goods.price ? goods.price : '60'}}</view>
				<view class="stock">库存 {{goods.stock}}</view>
				<view class="buypeopel u-skeleton-rect"> 销量 {{goods.sales}}</view>
			</view>
		</navigator>
		<view class=" u-text-center ">
			<u-tabs :list="listTabs" bar-width="60" item-width="30%" :current="currentTabs" @change="changeTabs">
			</u-tabs>
		</view>
		<view class="tab1  " v-if="currentTabs == 0" >
			<view class="position u-p-20 u-content">
				<u-parse :html="goods.details"></u-parse>
			</view>
		</view>
		<view v-if="currentTabs == 2" class="tab1">
			<u-row gutter="16" class="u-skeleton">
				<u-col span="6" v-for="goods in goodsList " :key="goods.id">
					<goods-card :goods="goods"></goods-card>
				</u-col>

			</u-row>
		</view>
		<view class="botton-tab-wrap">
			<view class="tabbox">
				<block v-if="is_collect">
					<view class="star" @click="collect ">
						<view class="iconfont icon-shoucang"></view>
						<view >收藏</view>
					</view>
				</block>
				<block v-else>
					<view class="star z-red" @click="collect">
						<view class="iconfont icon-shoucang1"></view>
						<view  class="">已收藏</view>
					</view>
				</block>

				<view class="shop"  @click="toShopCart ">
					<view class=" iconfont icon-gouwuche"></view>
					<view>购物车</view>
				</view>
				<view class="joinshopcurt u-p-r-10">
					<u-button type="warning" @click="joinCart" shape="circle" >加入购物车</u-button>
					
				</view>
				<view class="pay">
					<u-button  type="error" shape="circle">立即购买</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {

			return {
				// 传过来的商品id
				goodsId: '',
				// 商品数据
				goods: {},
				// 商品评论
				commentList: {},
				goodsInfo: {},
				goodsList: [{}, {}, {}, {}],
				listTabs: [{
					name: '商品详情'
				}, {
					name: '商品评论'
				}, {
					name: '商品推荐'
				}],
				currentTabs: 0,
				// 骨架屏控制
				loading: true,
				// 商品是否收藏
				is_collect:0
			}
		},
		methods: {
			// 	请求商品数据
			async getGoodsDetail(id) {
				// 获取商品详情
				const goodsDetail = await this.$u.api.goodsDetail(id)
				// 赋值
				this.goodsInfo = goodsDetail
				// 赋值 当前商品信息
				this.goods = goodsDetail.goods
				// 赋值 评价
				this.commentList = goodsDetail.goods.comments
				//	赋值 推荐商品
				this.goodsList = goodsDetail.like_goods
				if (this.vuex_token){
					// 赋值 商品收藏
					this.is_collect = goodsDetail.goods.is_collect
				}	
			},
			// 改变收藏状态
			async collect(){
				if (this.vuex_token){
					// 请求 当前商品是否收藏
					await this.$u.api.goodsCollects(this.goodsId)
					// 收藏成功
					if(!this.is_collect)this.$u.toast('取消收藏')
					if(this.is_collect)this.$u.toast('收藏成功')
					
					this.is_collect = !this.is_collect
				}	else{
					this.$u.toast('请先登录')
				}
				
			},
			// joinCart
			async joinCart(){
				// 判断是否登录
				if (!this.$u.utils.isLogin()) return 
				// 参数
				const params = {
					goods_id:this.goodsId
				}
				await this.$u.api.joinCart(params)
				//	提示
				this.$u.toast('加入成功')
			},
			// 跳转到购物车页面
			toShopCart(){
				this.$u.route({
					type:'reLaunch',
					url:'pages/cart/cart'
				})
			},
			// Tab标题切换
			changeTabs(index) {
				// 获取当前tab页参数
				this.currentTabs = index;

			},
		},
		async created() {
			// 获取用户id
			const currentPage = await getCurrentPages()
			const id = currentPage[currentPage.length - 1].options.id
			this.goodsId = id
			this.getGoodsDetail(this.goodsId)
		},
		onLoad(option) {
		}
	}
</script>

<style lang="scss" scoped>

	.tab1{
		overflow: hidden;
		padding-bottom: 50px;
		.position{
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.goods_item {
		padding: 20rpx;
		box-shadow: 0 12rpx 20rpx 0 rgba(0, 0, 0, .1);

		.title {
			margin: 10rpx 0;
			font-size: 40rpx;
			font-weight: 800;
			width: 100%;
		}

		.p-b {
			padding: 0 20rpx;

			.price {
				font-size: 30rpx;
				font-weight: 700;
				color: #c63550;
			}
			.stock{
				color: #686868;
				font-weight: 500;
			}
			.buypeopel {
				color: #686868;
				font-weight: 500;
			}
	}

	}
	.botton-tab-wrap{
		position: fixed;
		bottom: 0;
		right: 0;
		width: 100%;
		padding: 15rpx;
		background-color: #f7f7f7;
		.tabbox{
			display: flex;
			justify-content: center;
			align-items: center;
			.star,.shop{
			flex: 5;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
			.joinshopcurt,.pay{
				flex: 4;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				
			}
		}
	}
</style>
