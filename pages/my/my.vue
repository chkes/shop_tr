<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		onLoad(){
			// 判断是否登录
			if(!this.$u.utils.isLogin()) return
		}
	}
</script>

<style lang="scss">

</style>
