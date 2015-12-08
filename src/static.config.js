var cfg = require('../github.config.js');

module.exports = {
	author: {
		name: 'Mark Wang',
		photo: 'psb.jpg'
	},
	category: [
		{
			id: 'chat',
			title: '生活杂谈',
			profile: '生活杂谈'
		},
		{
			id: 'hcie',
			title: 'HCIE设计与探索',
			profile: 'HCIE设计与探索'
		},
		{
			id: 'code',
			title: '代码实例应用',
			profile: '代码实例应用'
		},
		{
			id: 'prj',
			title: '自己的几个工程',
			profile: '自己的几个工程'
		}
	],
	docrsp: 'https://raw.githubusercontent.com/'+cfg.name+'/'+cfg.gpname+'/'+cfg.postbranch+'/'+cfg.postdir,
	posts:[
		{
			id: 'about',
			title: 'A knight of The Republic —— About me'
		},
		{
			id: 'wallace',
			title: '威廉·华莱士',
			profile: '一个充满传奇色彩的人物。他的基本情况，正史没有准确的记载，关于他早年经历的所有说法都源于后人流传的口头文学，找不到可靠的佐证',
			bgimg: '#536dfe'
		},
		{
			id: 'doc2',
			title: 'doc2'
		},
		{
			id: 'doc3',
			title: 'doc3'
		},
		{
			id: 'sho',
			title: 'Shoがぃた',
			profile: '在2003年六月的《POWER GRIP 100 "IT\'S SHOWTIME" 》中，他正式出道。当时还没有成立COAT WEST，所以首次的摄影是在COAT到大阪探星的面试车上完成的。',
			bgimg: '#e5a200'
		}
	]
};
