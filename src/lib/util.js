
'use strict'

var categorys = require('../cache/datacache').categorys
var fetch = require('whatwg-fetch')
var docrsp = require('../static.config').docrsp
var marked = require('marked')

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
	},

	fetchMarkdown: function fetchData(src, cb) {

		let url = `${docrsp}/${src}.md`
		let rest = fetch(url)

		rest.then(function(response) {
	    return response.text()
	  }).then(function(body) {
	    cb(body)
	  })
	},


	parseMarkdown: function parse(src, cb) {

		let tmp$1 = src.split('end-->')
		let tmp$2 = tmp$1[0].split('<!--begin')
		let tmp$3 = '{' + tmp$2[1].replace(/[\n]/ig, '') + '}'
		let data = JSON.parse(tmp$3)

		require('highlight.js/styles/vs.css')
		require('../assets/md-github.css')

		marked.setOptions({
		  highlight: function (code) {
		    return require('highlight.js').highlightAuto(code).value;
		  }
		})

		Object.assign(data, {body: `<div class="markdown-body">${marked(tmp$1[1])}</div>`})
		cb(data)
	}
} 
