import './style/app'
import configObj from './config'
import Render from './render'
import axios from 'axios'

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
	listContent: [],
	change(val) {
		axios.post(`http://192.168.73.253:38080/clinic-web/doctor/searchItem/listWestMedicine?token=c452f978-caa1-4a8d-871e-ab826f9fa319&md5id=e0ca6632c0c662b4b41b533b1f42317e&q=${val}`)
		.then((r) => {
			console.log(r)
		}).catch(err => {

		})
	}
})
