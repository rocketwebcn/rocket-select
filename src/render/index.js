import ElEvent from '../event';

class Render extends ElEvent {
	constructor() {
		super()
	}
	formateString(str, data) {
		return str.replace(/\{\{(\w+)\}\}/g, function(match, key) {
			if (key === 'active') {
				return data.index === 0 ? ' active' : ''
			}
			return typeof data[key] === undefined ? '' : data[key]
		})
	}

	createEl(id) {
		var str = id.replace(/#/, '');
		var result = '';

		if (this.config.headList) {
			result = this.config.headList.map(val => `<li class="item">${val}</li>`).join('')
			console.log('result', result)
		}

		this.query(id).innerHTML = `
			<div class="rocket__select-box">
				<div class="rocket__select-after">
					<input type="text" autocomplete="off" class="rocket__select-input" id="input-${str}">
				</div>
				<div class="rocket__select-body" id="rs_${str}-p">
					<ul class="rocket__select-title">${result}</ul>
					<ul class="rocket__select-list" id="rs_${str}"></ul>
				</div>
			</div>`
	}

	updateEl(data, tpls) {
		// 默认的模板或者是用户的模板
		tpls = tpls ? tpls : '{{name}}'
		var tpl = `<li class = "rocket__select-item{{active}}" data-index="{{index}}">${tpls}</li>`
		var html = '';
		data = Array.isArray(data) ? data : [];
		if (data.length) {
			data.forEach((val, i)=>{
				val.index = i;
				html += this.formateString(tpl, val)
			})
		} else {
			html = '<li class = "rocket__null">暂无数据...</li>';
		}

		return html
	}

	render(data, id, tpls) {
		this.query(`#rs_${id}`).innerHTML = this.updateEl(data, tpls)
	}
}

export default Render