export default {
	el: '', // 挂载位置 必须为id
	index: 0,
	tpl: '', // 用户自定义模板位置
	listContent: [],
	ajax() {
		throw new Error('如果需要异步请求，请重写此方法')
	},
	selectHandle() {
		return null
	}
}