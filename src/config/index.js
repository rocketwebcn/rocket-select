export default {
	el: '', // 挂载位置 必须为id
	index: 0,
	tpl: '', // 用户自定义模板位置
	listContent: [],
	headList: null, // 下拉框的表头 
	clearVal: true, // 是否清空输入框
	change(val) {
		// this.listContent.filter(value => value === val)
		// console.log(val, this.listContent.filter(value => value.name === val ? value : ''))
		throw new Error('如果需要异步请求，请重写此方法')
	},
	selectHandle(val) {
		console.log('54545645646', val)
		throw new Error('请在参数中重写selectHandle方法')
	}
}