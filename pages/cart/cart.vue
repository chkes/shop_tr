<template>
	<view class="box">
		<view class="content">
			<view class="goods_block_wrap" v-for="(item,i) in shopCartList" :key="i">
				<view class="select_box">
					<u-checkbox @change="checkboxChange" :name="item.id" v-model="item.is_checked" shape="circle">
					</u-checkbox>
				</view>
				<view class="goods_detail">
					<view class="left_img">
						<u-image mode="heightFix" width="100%" height="160rpx" :src="item.goods.cover_url"></u-image>
					</view>
					<view class="right_text">
						<view class="top">
							<view class="title">{{item.goods.title}}</view>
							<view class="category">{{item.goods.description}}</view>
						</view>
						<view class="bottom">
							<view class="price">$ {{item.goods.price}}</view>
							<view class="num">
								<view @click="delGoodsNum(item.id,item.num,item.goods.stock)">-</view>
								<view>{{item.num}}</view>
								<view @click="addGoodsNum(item.id,item.num,item.goods.stock)">+</view>
							</view>
							<view class="del">
								<u-icon name="close" @click="delGoods(item.id)"></u-icon>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
		<view class="sum_wrap">
			<view class="sum_box">
				<view class="check">
					<u-checkbox name="all" v-model="allselect" shape="circle">
						全选
					</u-checkbox>
				</view>

				<view class="sum_price u-p-r-10">
					<view class="text">总价格：</view>
					<view class="price">￥{{priceSum}}</view>
				</view>
				<view class="btn">
					<u-button class="u-p-l-30 u-p-r-30 u-m-r-10" type="error" size="medium" shape="circle">去结算</u-button>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				// 购物车列表
				shopCartList: [],
				// 被选中的购物车
				select_id: [],
				delKey: true
			};
		},
		// 计算属性
		computed: {
			// 计算 总价
			priceSum() {
				return this.shopCartList.filter(item => item.is_checked).reduce((sum, item) => {
					return sum + Number(item.num) * Number(item.goods.price)
				}, 0)
			},
			// 计算全选
			allselect: {
				get() {
					return this.shopCartList.every(item => {
						return item.is_checked
					})
				},
				set(val) {
					// 调用全新/全不选接口
					this.checkAll(val)
				}

			}
		},
		methods: {
			// 监控check变化
			async checkboxChange(e) {
				const {
					value,
					name
				} = e
				const idArr = new Array();
				// 先把已经选中的商品id存入idArr内
				this.shopCartList.forEach((item) => {
					if (item.is_checked) {
						idArr.push(item.id)
					}
				})
				if (!value) {
					//选中状态，点击后变成false
					idArr.splice(idArr.indexOf(name), 1)
					console.log(idArr)
					await this.$u.api.isCheck(idArr)
				} else {
					//没选中中状态，点击后变成true
					idArr.push(name)
					console.log(idArr)
					await this.$u.api.isCheck(idArr)
				}
			},
			// 
			async getCart() {
				//获取购物车列表
				let shopCartList = await this.$u.api.getCart()
				// 赋值购物车
				this.shopCartList = shopCartList.data
				console.log(this.shopCartList)
			},
			// 删除商品
			async delGoods(id) {
				if (!this.delKey) return
				this.delKey = false
				await this.$u.api.delShopCart(id)
				this.$u.toast('移除成功')
				// 重新调取购物车数据
				setTimeout(() => {
					this.delKey = true
				}, 1000)
				this.getCart()


			},
			// 添加购物车数量
			async addGoodsNum(id, num, stock) {
				if (stock == 0) return this.$u.toast('库存不足')
				await this.$u.api.editgoodsNum(id,
					num + 1
				)
				// 重新调取购物车数据
				await this.getCart()
			},
			// 删除购物车数量
			async delGoodsNum(id, num, stock) {
				if (num <= 1) return
				await this.$u.api.editgoodsNum(id,
					num - 1
				)
				//重新调取购物车数据
				await this.getCart()
			},
			// 全选按钮变化
			async checkAll(val) {
				// 准备获取各个购物车id参数
				let idArr = []
				if (!val) {
					// 全选点击（变全不选）
					idArr = []
					await this.$u.api.isCheck(idArr)
				} else {
					// 全不选选点击（变全选）
					this.shopCartList.forEach((goods) => {
						idArr.push(goods.id)
					})
					await this.$u.api.isCheck(idArr)
				}
				// 最后重新调用获取商品数据更新
				this.getCart()
			}
		},
		 async onShow() {
			this.getCart()
			const res = await this.$u.api.getGoodsCollect()
			console.log(res)
		}
	}
</script>

<style lang="scss">
	// page {
	// 	padding-bottom: 50rpx;
	// }


.box{
	padding-bottom: 50px;
	position: relative;
	.sum_wrap {
		position: fixed;
		left: 0;
		/* #ifdef H5 */
		bottom: 50px;
		/* #endif */
		/* #ifndef H5*/
		bottom: 0rpx;
		/* #endif*/
	
		background-color: #f7f7fa;
		width: 100%;
	
		.sum_box {
			display: flex;
			padding: 10rpx 0;
	
			.check {
				flex: 4;
				display: flex;
				align-items: center;
				justify-content: center;
	
	
			}
	
			.sum_price {
				flex: 9;
				display: flex;
				align-items: center;
				justify-content: flex-end;
	
				.text {
					font-size: 14rpx;
				}
	
				.price {
					font-size: 30rpx;
					color: #d63b60;
					font-weight: 700;
				}
			}
	
			.btn {
				flex: 3;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	
	}
	.content {
		.goods_block_wrap {
			display: flex;
	
			.select_box {
				flex: 2;
				display: flex;
				justify-content: center;
				align-items: center;
			}
	
			.goods_detail {
				flex: 9;
				display: flex;
				padding: 20rpx;
				background-color: #fafafa;
	
				.left_img {
					flex: 2;
				}
	
				.right_text {
					flex: 8;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding-left: 15rpx;
	
					.top {
						display: flex;
						flex-direction: column;
						justify-content: center;
	
						.title {
							font-weight: 600;
						}
	
						.category {
							font-weight: 400;
							color: #838383;
						}
					}
	
					.bottom {
						display: flex;
	
						.price {
							flex: 2;
							font-weight: 600;
							color: #d90021;
							display: flex;
							justify-content: center;
							align-items: center;
						}
	
						.num {
							padding: 0 50rpx;
							flex: 4;
							display: flex;
							justify-content: space-between;
	
							view {
								font-size: 29rpx;
								height: 50rpx;
								margin-left: 5rpx;
								display: flex;
								justify-content: center;
								align-items: center;
								flex: 3;
								background-color: #f2f2f2;
							}
						}
	
						.del {
							flex: 2;
							display: flex;
							align-items: center;
							color: #d90021;
						}
					}
				}
			}
		}
	}
}
	
</style>
