
'use strict'

var categorys = require('../static.config').categorys
var posts = require('../cache/datacache').posts
var docrsp = require('../static.config').docrsp
var marked = require('marked')
var assign = require('react/lib/Object.assign')

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

	starsAnimate: function(dot, w, h){
		(function(){
			var canvas = document.querySelector('canvas')
	    var ctx = canvas.getContext('2d')
		  canvas.width = dot != undefined && dot.width != undefined ? dot.width : window.innerWidth
		  canvas.height = dot != undefined && dot.height != undefined ? dot.height : window.innerHeight
		  ctx.lineWidth = .3
		  ctx.strokeStyle = (new Color()).style

		  var mousePosition = {
		    x: 30 * canvas.width / 100,
		    y: 30 * canvas.height / 100
		  }

		  var dots = {
		    nb: 170 || dot.nb,
		    distance: 70 || dot.distance,
		    d_radius: 70 || dot.radius,
		    array: []
		  }

		  function colorValue(min) {
		  	var val = between(Math.floor(Math.random() * 255 + min), 0, 255)
		    return val
		  }

		  function between(n, a, b) {
		  	var _n
		  	if (a < b) {
		  		_n = n
		  		if (n < a) { _n = a }
		  		if (n > b) { _n = b }
		  		return _n
		  	}
		  }
		  
		  function createColorStyle(r,g,b) {
		    return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)'
		  }
		  
		  function mixComponents(comp1, weight1, comp2, weight2) {
		    return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2)
		  }
		  
		  function averageColorStyles(dot1, dot2) {
		    var color1 = dot1.color
		    var color2 = dot2.color
		    
		    var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius)
		    var g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius)
		    var b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius)
		    
		    return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b))
		  }
		  
		  function Color() {
		  	var gray = dot != undefined && dot.gray != undefined ? dot.gray : false
		    var min = dot != undefined && dot.minColor != undefined ? dot.minColor : 0
		    this.r = colorValue(min)
		    this.g = gray ? this.r : colorValue(min)
		    this.b = gray ? this.r : colorValue(min)
		    this.style = createColorStyle(this.r, this.g, this.b)
		  }

		  function Dot(){
		    this.x = Math.random() * canvas.width
		    this.y = Math.random() * canvas.height

		    this.vx = -.5 + Math.random()
		    this.vy = -.5 + Math.random()

		    this.radius = Math.random() * 2

		    this.color = new Color()
		  }

		  Dot.prototype = {
		    draw: function(){
		      ctx.beginPath()
		      ctx.fillStyle = this.color.style
		      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		      ctx.fill()
		    }
		  }

		  function createDots(){
		    for(var i = 0; i < dots.nb; i++){
		      dots.array.push(new Dot());
		    }
		  }

		  function moveDots() {
		    for(var i = 0; i < dots.nb; i++){

		      var dot = dots.array[i]

		      if(dot.y < 0 || dot.y > canvas.height){
		        dot.vx = dot.vx
		        dot.vy = - dot.vy
		      }
		      else if(dot.x < 0 || dot.x > canvas.width){
		        dot.vx = - dot.vx
		        dot.vy = dot.vy
		      }
		      dot.x += dot.vx
		      dot.y += dot.vy
		    }
		  }

		  function connectDots() {
		    for(var i = 0; i < dots.nb; i++){
		      for(var j = 0; j < dots.nb; j++){
		        var i_dot = dots.array[i]
		        var j_dot = dots.array[j]

		        if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
		          if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
		            ctx.beginPath()
		            ctx.strokeStyle = averageColorStyles(i_dot, j_dot)
		            ctx.moveTo(i_dot.x, i_dot.y)
		            ctx.lineTo(j_dot.x, j_dot.y)
		            ctx.stroke()
		            ctx.closePath()
		          }
		        }
		      }
		    }
		  }

		  function drawDots() {
		    for(var i = 0; i < dots.nb; i++){
		      var dot = dots.array[i]
		      dot.draw()
		    }
		  }

		  function animateDots() {
		    ctx.clearRect(0, 0, canvas.width, canvas.height)
		    moveDots()
		    connectDots()
		    drawDots()

		    requestAnimationFrame(animateDots)	
		  }

		  document.querySelector('canvas').addEventListener('mousemove', function(e){
		    mousePosition.x = e.pageX
		    mousePosition.y = e.pageY
		  })

		  // document.querySelector('canvas').addEventListener('mouseleave', function(e){
		  //   mousePosition.x = canvas.width / 2
		  //   mousePosition.y = canvas.height / 2
		  // })

		  createDots()
		  requestAnimationFrame(animateDots)
		})()
	}
} 
