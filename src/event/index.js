import DomApi from '../domApi';
import throttle from '../util/util'

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
		if (this.index <= 0) return;
		this.elFlag(el, -1)
	}

	down(el) {
		var len = this.selectList.length - 1;
		if (this.index >= len) return;
		this.elFlag(el, 1)
	}

	elFlag(el, num) {
		var elList = document.querySelectorAll(`#rs_${el} > .rocket__select-item`), str = 'active';
		this.removeAttr(elList[this.index], str)
		this.index += num
		this.addAttr(elList[this.index], str)
	}

	enter(el) {
		throttle(this.delayEnter, {
			context: this,
			args: [el]
		})
	}

	delayEnter(el) {
		var obj = this.config
		var active = this.selectList[obj.index];
		if (typeof active === 'object') {
			if (obj.clearVal) {
				this.inputDom.value = ''
				this.setData([])
			} else {
				this.inputDom.value = active.name
			}
			obj.selectHandle(active)
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
			var str = 'active';
			var active = this.selectList[i];

			this.removeAttr(elList[this.index], str)
			this.index = i
			this.addAttr(elList[this.index], str)
			if (this.config.clearVal) {
				this.inputDom.value = ''
				this.setData([])
			} else {
				this.inputDom.value = active.name
			}
			this.config.selectHandle(active)
		})
	}

	get inputVal() {
		return this.inputVal
	}

	set inputVal(val) {
		this.config.change.call(this, this.inputDom.value)
		return val
	}
}

export default HandleChange