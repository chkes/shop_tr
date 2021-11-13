const install = (Vue,vm) => {
	/**
	* 是否登录
	*/
   const isLogin = () => {
	   //  如果没有 token，跳转到登录页面
	   const token  = vm.vuex_token
	   if(!token){
		// 来自哪个页面
		const currentPage = getCurrentPages().pop()
		
		const {options,route} = currentPage
		const optionsKey = Object.keys(options)
		let params = ''
		if(optionsKey.length !== 0){
			params = optionsKey.reduce((pre,current)=> {
				return pre + current + '=' + options[current] + '&'
			},'?').slice(0,-1)
		}
		console.log(params)
		
		// 来源于存到缓存
		uni.setStorageSync('backPage',route +params)
	   	vm.$u.toast('请登录')
	   	setTimeout(() => {
	   		uni.redirectTo({
	   			type:'redirect',
	   			url:"../auth/login"
	   		})
	   	},1500)
		return false
	   }
	   return true
   }
	/*
	* 请求用户信息
	*/
   const getUserInfo = async() =>{
	   // 请求用户信息
	   const userInfo = await vm.$u.api.userInfo()
	   // 存储用户信息
	   vm.$u.vuex("vuex_user", userInfo)
   }
	vm.$u.utils={
		isLogin,
		getUserInfo
	}
}


   // 封装弹框方法
   // uni.$showMsg = function(title = '数据请求失败！',duration =1500){
   // 	uni.showToast({
   // 		title,
   // 		duration,
   // 		icon:'none'
   // 	})
   // }

export default {
	install
}