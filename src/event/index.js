import DomApi from '../domApi';
import throttle from '../util/util'
// 73.253
class HandleChange extends DomApi {
	constructor() {
		super()
		this.inputDom = ''
	}

	keyCode(el) {
		this.query(`#input-${el}`).onkeyup = (e) => {
			var e = event || window.event || arguments.caller.arguments[0];
			switch (e.keyCode) {
				case 38:
					this.up(el)
					break;
				case 40:
					this.down(el)
					break;
				case 13:
					this.enter(el)
					break;
				default:
					this.changeHandle(el)
					break;
			}
		}
	}

	up(el) {
		var obj = this.config
		if (obj.index <= 0) return;
		this.elFlag(obj, el, -1)
	}

	down(el) {
		var len = this.config.listContent.length - 1;
		var obj = this.config;
		if (obj.index >= len) return;
		this.elFlag(obj, el, 1)
	}

	elFlag(obj, el, num) {
		var elList = document.querySelectorAll(`#rs_${el} > .rocket__select-item`), str = 'active';
		this.removeAttr(elList[obj.index], str)
		obj.index += num
		this.addAttr(elList[obj.index], str)
	}

	enter(el) {
		throttle(this.delayEnter, {
			context: this,
			args: [el]
		})
	}

	delayEnter(el) {
		var obj = this.config
		var active = obj.listContent[obj.index];
		if (typeof active === 'object') {
			this.inputDom.value = active.name
			obj.selectHandle(this.inputDom.value)
			// this.inputDom.value = ''
			this.inputDom.blur()
		}
	}

	inputHandle(el) { 
		var slide = this.query(`#rs_${el}-p`)
		if (!this.inputDom) {
			this.inputDom = this.query(`#input-${el}`)
		}

		this.on(`#input-${el}`, 'focus', (e) => {
			this.addAttr(slide, 'rocket-show')
		})

		this.on(`#input-${el}`, 'blur', (e) => {
			// 延时100毫秒 主要解决点击先被屏蔽掉了
			setTimeout(() => {
				this.removeAttr(slide, 'rocket-show')
			}, 100)
		})
	}

	changeHandle() {
		this.inputVal = this.inputDom.value
	}

	clickHandle(id) {
		this.delegate(this.query(`#rs_${id}`), 'li', (e) => {
			var i = parseInt(this.getAttr(e, 'data-index'));
			var elList = document.querySelectorAll(`#rs_${id} > .rocket__select-item`);
			var obj = this.config, str = 'active';
			var active = obj.listContent[i];

			this.removeAttr(elList[obj.index], str)
			obj.index = i
			this.addAttr(elList[obj.index], str)
			this.inputDom.value = active.name
			obj.selectHandle(active)
		})
	}

	get inputVal() {
		return this.inputVal
	}

	set inputVal(val) {
		this.config.change(this.inputDom.value)
		return val
	}
}

export default HandleChange