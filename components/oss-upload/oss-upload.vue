<template>
	<u-upload :action="action" max-count="1" :before-upload="beforeUpload" :show-progress="false" :form-data="formData"
		:multiple="false" width="140" height="140" @on-success="upSuccess" </u-upload>
</template>

<script>
	let _this = {}
	export default {
		name: "oss-upload",
		data() {
			return {
				// 演示地址，请勿直接使用
				action: '',
				formData: {},
				upFileName: ""
			}
		},
		created() {
			_this = this
		},
		methods: {
			/* 
			 **上传前的钩子
			 * 在小程序中 this可能会丢失  bilibili.com/video/BV1vh411B7Sb?p=51&spm_id_from=pageDriver
			 */
			async beforeUpload(index, list) {
				const {
					file
				} = list[0]
				console.log(1)
				// 获取文件名
				// 如果h5
				// #ifdef H5
				const fileName = file.name
				// #endif
				// 如果 不是h5   比如微信小程序
				// #ifndef H5
				const fileName = file.path
				// #endif
				// 处理唯一的文件名
				const suffix = fileName.slice(fileName.lastIndexOf('.'))
				// 生成随机 字符串 拼上文件名防止重复
				const upFileName = _this.$u.guid(20) + suffix
				_this.upFileName = upFileName

				console.log(fileName)
				// 获取osstoken
				const ossToken = await _this.$u.api.ossToken()
				// 设置上传域名
				_this.action = ossToken.host

				// 额外的上传参数
				_this.formData = {
					'key': upFileName, // 上传后的文件名
					'policy': ossToken.policy,
					'OSSAccessKeyId': ossToken.accessid,
					'success_action_status': '200', //让服务端返回200,不然，默认会返回204
					'signature': ossToken.signature,
				}
				console.log(ossToken)
				return true;

			},
			//上传成功后发射事件给父组件 (带图片key参数)
			async upSuccess() {
				this.$emit("upSuccess", this.upFileName)
			},

		}
	}
</script>

<style>

</style>
