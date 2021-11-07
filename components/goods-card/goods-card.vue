<template>
	<navigator class="goods_item" url="">
					<u-image class="u-skeleton-fillet" width="100%" height="300rpx" :src="goods.cover_url"></u-image>

					<view class="title u-line-1 u-skeleton-rect">{{goods.title ? goods.title : '商品名称'}}</view>

					<view class="p-b u-flex u-row-between ">
						<view class="price u-skeleton-rect">$ {{goods.price ? goods.price : '60'}}</view>
						<view class="buypeopel u-skeleton-rect">0 人付款</view>
					</view>
	</navigator>
</template>

<script>
	export default {
		name:"goods-card",
		props:{
			  goods: {
			      type: Object,
				  default() {
					  return{}
				  }
			  }
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
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

			.price {
				font-size: 30rpx;
				color: #ff2d4a;
				width:40%;
			}

			.buypeopel {
				color: #aba8ab;
				width:40%;
			}
		}

	}
</style>
