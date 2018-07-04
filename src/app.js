import './style/app'
import configObj from './config'
import Render from './render'
// import axios from 'axios'

/* RocketAuToComplete
-- version 1.0.1
-- copyright 2018-07-04 
-- licensed under the MIT
-- author 韩广金 
-- EnglishName king
--
-- https://github.com/rocketwebcn/rocket-select
--
*/

class RocketAuToComplete extends Render {
	constructor(obj = {}) {
		super()
		this.config = Object.assign(configObj, obj)
		this.selectList = []
		this.index = 0;

		this.init()
	}

	setData(arr) {
		var str = this.config.el.replace(/#/, '')
		this.selectList = (Array.isArray(arr) ? arr : [])
		this.index = 0;
		this.render(this.selectList, str, this.config.tpl)
	}

	init() {
		var str = this.config.el.replace(/#/, '')
		this.createEl(this.config.el)
		this.keyCode(str)
		this.inputHandle(str)
		this.setData(this.config.listContent)
		this.clickHandle(str)
	}
}

window.RocketAuToComplete = RocketAuToComplete

// new RocketAuToComplete({
// 	el: '#app',
// 	listContent: [],
// 	change(val) {
// 		axios.get('https://randomuser.me/api', {
// 			params: {
// 				results: 10,
// 				page: 1,
// 				q: val
// 			}
// 		}).then((res) => {

// 			// console.log(res.data.results)
// 			this.setData(res.data.results)
// 		})
// 		// console.log(val);

// 		// console.log(this.setData)
		
// 	},
// 	selectHandle(val) {
// 		console.log(val)
// 	}	
// })
