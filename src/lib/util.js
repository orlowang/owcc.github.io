
var categorys = require('../cache/datacache').categorys

module.exports = {
	isCategory: function isCategory(arg){
		var ids = []
		for (var i = 0; i < categorys.length; i++) {
			ids.push(categorys[i].id)
		}
		var index = ids.indexOf(arg)
		return index >= 0 ? index : null
	},
	witchCategory: function witchCategory(arg){
		for (var i = 0; i < categorys.length; i++) {
			if (categorys[i].id == arg) {
				return categorys[i].id
				break
			} else{
				for (var j = 0; j < categorys[i].posts.length; j++) {
					var post = categorys[i].posts
					if (post[j].id == arg) {
						return categorys[i].id
						break
					}
				}
			}
		}
	}
} 
