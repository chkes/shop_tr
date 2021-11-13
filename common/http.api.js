// /common/http.api.js

// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
// let indexUrl = '/api/index';

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 定义api属性
	vm.$u.api = {}
	// 首页
	vm.$u.api.index = (params = {}) => vm.$u.get("/api/index", params); // 获取首页信息
	// 商品
	vm.$u.api.goodsDetail = (id) => vm.$u.get(`/api/goods/${id}`); // 获取商品详情信息
	vm.$u.api.goodsCollects = (id) => vm.$u.post(`/api/collects/goods/${id}`); // 获取商品收藏信息
	// 分类
	vm.$u.api.category = (params) => vm.$u.get("/api/goods",params); // 获取分类列表
	
	// 购物车
	vm.$u.api.joinCart = (params) => vm.$u.post("/api/carts",params); // 加入购物车
	
	// 认证相关
	vm.$u.api.authLogin = (params = {}) => vm.$u.post("/api/auth/login", params); // 登录
	vm.$u.api.register = (params = {}) => vm.$u.post("/api/auth/register", params); // 注册
	vm.$u.api.logout = () => vm.$u.post("/api/auth/logout"); // 退出登录
	vm.$u.api.ossToken = () => vm.$u.get("/api/auth/oss/token"); // 获取上传token
	// 用户信息
	vm.$u.api.userInfo = () => vm.$u.get("/api/user"); //获取用户信息
	vm.$u.api.editUserInfo = (params = {}) => vm.$u.put("/api/user", params); //更改用户信息  name
	vm.$u.api.updateUserAvatar = params => vm.$u.patch("/api/user/avatar", params); //更改用户头像
	
}

export default {
	install
}
