
'use strict'

var categorys = require('../static.config').categorys
var posts = require('../cache/datacache').posts
var docrsp = require('../static.config').docrsp
var marked = require('marked')
var assign = require('react/lib/Object.assign');

module.exports = {
	isCategory: function(arg){
		var ids = []
		for (var i = 0; i < categorys.length; i++) {
			ids.push(categorys[i].id)
		}
		var index = ids.indexOf(arg)
		return index >= 0 ? index : null
	},

	witchCategory: function(arg){
		for (var i = 0; i < categorys.length; i++) {
			if (categorys[i].id == arg) {
				return categorys[i].id
				break
			} else{
				for (var j = 0; j < posts.length; j++) {
					if (posts[j].id == arg) {
						return posts[j].category
						break
					}
				}
			}
		}
	},

	fetchMarkdown: function(src, cb) {

		var url = docrsp + '/' + src + '.md'
		var rest = fetch(url)

		rest.then(function(response) {
	    return response.text()
	  }).then(function(body) {
	    cb(body)
	  })
	},


	parseMarkdown: function(src, cb) {

		var tmp$1 = src.split('end-->')
		var tmp$2 = tmp$1[0].split('<!--begin')
		var tmp$3 = '{' + tmp$2[1].replace(/[\n]/ig, '') + '}'
		var data = JSON.parse(tmp$3)
		
		require('highlight.js/styles/vs.css')
		require('../assets/md-github.css')

		marked.setOptions({
		  highlight: function(code) {
		    return require('highlight.js').highlightAuto(code).value;
		  }
		})

		assign(data, {body: '<div class="markdown-body">' + marked(tmp$1[1]) + '</div>'})
		cb(data)
	},

	getHTMLFontSize: function(){},

	aniLeng: function(lengstart, lengend, time){
		var ftp = 60
		var _timer = setInterval(function(){
			if (lengstart >= lengend) {
				clearInterval(_timer)
			}
			lengstart += (lengend - lengstart) / ftp
		}, time / ftp)
		return lengstart
	}
} 
