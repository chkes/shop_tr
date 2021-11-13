<template>
	<view class="u-m-l-30 u-m-r-30">
		<u-form :model="form" ref="uForm" :error-type="errorType">
			<u-form-item label="姓名" prop="name" >
				<u-input placeholder="请输入姓名" v-model="form.name" />
			</u-form-item>
			<u-form-item label="头像">
				<oss-upload @upSuccess="upSuccess" class="a u-p-50"></oss-upload>
			</u-form-item>
		</u-form>
		<u-button @click="submit">提交</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 文字提示
				errorType: ['message'],
				form: {
					name: '',
					avatar: ''
				},
				rules: {
					name: [{
							required: true,
							message: '请输入姓名',
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change', 'blur'],
						},
						// 对name字段进行长度验证
						{
							min: 1,
							message: '简介不能少于5个字',
							trigger: 'change'
						},
					]
				}
			};
		},
		methods: {
			// 拿到子组件上传图片成功事件
			upSuccess(data) {
				// 图片上传成功后 保存图片key
				this.form.avatar = data
			},
			submit() {
				this.$refs.uForm.validate(async valid => {
					if (valid) {
						console.log('验证通过');
						
						//更换名称
						// 获取name
						const params = {
							name: this.form.name
						}
						console.log(params)
						// 更新用户信息
						await this.$u.api.editUserInfo(params)
						// 刷新请求用户信息
						this.$u.utils.getUserInfo()
						
						//更换头像
						if(this.form.avatar){
							// 请求api更新头像
							await this.$u.api.updateUserAvatar({
								avatar: this.form.avatar
							})
							// 更新用户缓存信息
							this.$u.utils.getUserInfo()
						}
						
						
						// 重定向到个人页面
						setTimeout(() => {
							this.$u.route({
								type: 'reLaunch',
								url: 'pages/my/my'
							})
						}, 2000)

					}
				});
			}
			// async onSuccess() {

			// 	// 移除预览区图片
			// 	//this.$refs.upload.remove(0)
				
			// }
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
			// 拿到用户的个人信息
			this.form.name = this.vuex_user.name
		}
	};
</script>
<style lang="scss" scoped>
	.a{background-color: red;}
</style>
