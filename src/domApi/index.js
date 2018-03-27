class $Q {
	/**
	 * 选择器
	 * @param  {String} str 需要选取的对象
	 * @return {Dom}     element 对象
	 */
	query(str) {
		if (str instanceof HTMLElement) {
			return str
		}
		var slice = Array.prototype.slice, el;
		
		if (str.indexOf('.') > -1) {
			el = slice.call(document.getElementsByClassName(str.replace(/\./, '')))
		} else if (str.indexOf('#') > -1) {
			el = document.getElementById(str.replace(/#/, ''))
		} else {
			el = slice.call(document.getElementsByTagName(str))
		}
		return el
	}

	getAttr() {
		return this.query(el).getAttribute(attr)
	}

	addAttr(el, class_active, attr = "class") {
		let class_name = el.getAttribute(attr); // this.query(el)
		if (class_name.indexOf(class_active) < 0) {
			class_name = class_name.concat(' ' + class_active)
			this.query(el).setAttribute(attr, class_name)
		}
		return this
	}

	removeAttr(el, class_active, attr = "class") {
		let class_name = el.getAttribute(attr); // this.query(el)
		class_name     = class_name.replace(' ' + class_active, '')
		this.query(el).setAttribute(attr, class_name)
		return this
	}

	replaceAttr(el, start, end, attr = "class") {
		let class_name = el.getAttribute(attr) // this.query(el)
		class_name     = class_name.replace(start, end)
		this.query(el).setAttribute(attr, class_name)
		return this
	}

	/**
	 * 阻止默认事件 兼容模式 点击事件
	 * @param  {Dom}   el Dom 对象
	 * @param  {Function} fn 回调函数
	 * @return {[type]}      [description]
	 */
	on(el, type, fn) {
		var dom = this.query(el)
		if (dom.addEventListener) {
			dom.addEventListener(type, fn, false)
		} else if(dom.attachEvent) {
			dom.attachEvent('on' + type, fn)
		} else {
			dom[`on${type}`] = fn
		}
	}

	/**
	 * 事件委托方法
	 * @param  {String}   el     父类
	 * @param  {String}   chilEl 子类
	 * @param  {Function} fn     回调函数
	 * @return {[type]}          [description]
	 */
	delegate(el, chilEl, fn) {
		this.query(el).onclick = function(ev) {
			var e = ev || window.event;
			let target = e.target || e.srcElement
			while (target !== el) {
				// statement
				if (target.nodeName.toLowerCase() === chilEl) {
					fn(target)
					break;
				}
				target = target.parentNode;
			}
		}
	}
}

export default $Q