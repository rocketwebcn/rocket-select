import DomApi from '../domApi';

class Render extends DomApi {
	formateString(str, data) {
		return str.replace(/\{\{(\w+)\}\}/g, function(match, key) {
			return typeof data[key] === undefined ? '' : data[key]
		})
	}

	createEl(id) {
		var tpl = `<div class="rocket__select-box">
						<div class="rocket__select-after">
							<input type="text" class="rocket__select-input">
						</div>
						<div class="rocket__select-body rocket-show" id="rs_${id}-p">
							<ul class="rocket__select-list" id="rs_${id}"></ul>
						</div>
					</div>`
	}

	updateEl(data, tpls) {
		// 默认的模板或者是用户的模板
		tpls = tpls ? tpls : '{{name}}'
		var tpl = `<li class = "rocket__select-item" date-index="{{index}}">${tpls}</li>`
		var html = '';
		if (Array.isArray(data)) {
			data.forEach((val, i)=>{
				val.index = i;
				html += this.formateString(tpl, val)
			})
		}

		return html
	}

	render(data, tpls, id) {
		this.query(`rs_${id}`).innerHTML = this.updateEl(data, tpls)
	}
}

export default Render