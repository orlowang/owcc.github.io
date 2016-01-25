
var fs = require('fs')
var del = require('del')
var gitcfg = require('./github.config')
var cfg = require('./src/static.config')

fs.readdir(gitcfg.postdir, function(err, files){
	if (err) { console.log(err) } else{
		var _post = []
		for (var file in files) {
			var _file = fs.readFileSync(__dirname + '/' + gitcfg.postdir + '/' + files[file], 'utf-8')
			var tmp$1 = _file.split('end-->')
			var tmp$2 = tmp$1[0].split('<!--begin')
			var tmp$3 = '{' + tmp$2[1].replace(/[\n]/ig, '') + '}'
			var data = JSON.parse(tmp$3)
			data.id = files[file].split('.')[0]
			_post.push(data)
		}

		_post.sort(function(a,b){
			return b.publishtime.replace(/\//g, '') - a.publishtime.replace(/\//g, '')
		})

		del.sync(__dirname + '/src/cache/posts.js')
		fs.writeFile(__dirname + '/src/cache/posts.js', 'module.exports = {\n  posts: ' + JSON.stringify(_post) + '\n}\n', (err) => {
		  if (err) throw err;
		  console.log('Posts data is saved!');
		})
	}
})
