import './style/app'
import configObj from './config'
import Render from './render'

class RocketAuToComplete extends Render {
	constructor(obj = {}) {
		super()
		this.config = Object.assign(configObj, obj)

		this.init()
	}

	init() {
		var str = this.config.el.replace(/#/, '')
		this.createEl(this.config.el)
		this.keyCode(str)
		this.inputHandle(str)
		this.render(this.config.listContent, str)
		this.clickHandle(str)
	}
}

var rt = new RocketAuToComplete({
	el: '#app',
	listContent: [
		{id: 1, name: 2},
		{id: 2, name: 3},
		{id: 1, name: 4},
		{id: 2, name: 5},
	]
})
