import './style/app'
import configObj from './config'
import Render from './render'

class RocketAuToComplete extends Render {
	constructor(obj = {}) {
		this.config = Object.assign(configObj, obj)

		this.init()
	}

	init() {
		console.log('我是初始化方法')
	}
}

var rt = RocketAuToComplete()
