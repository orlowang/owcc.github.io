var cfg = require('../github.config.js')

module.exports = {
	author: {
		name: 'Orlo Wang',
		photo: 'src/assets/psb.jpg'
	},
	homeset: {
		title: 'Stay Hungry, Stay Foolish.',
		subtitle: '',
		bgphoto: '#ffffff&src/assets/bgimg000.jpg'
	},
	categorys: [
		{
			id: 'mess',
			title: 'Tittle-Tattle',
			subtitle: '鲁迅说，战士的日常生活，是并不全部可歌可泣的，然而又无不和可歌可泣相关联，这才是实际上的战士。现如今，能够带着许些幸福感安稳下来的真不容易，我觉得我们都是战士!',
			bgphoto: '#EA1010&'
		},
		{
			id: 'hcie',
			title: 'SomethingAboutH-CIE',
			subtitle: '我现在岗位是再不能普通的前端工程师，然而却正在奔着全栈开发的沼泽地探进，人机交互是一个我非常喜欢的课题。',
			bgphoto: '#9f499b'
		},
		{
			id: 'coding',
			title: 'Coooooding',
			subtitle: '如果还有什么东西让我喜忧参半，那便莫过于写代码了......',
			bgphoto: '#536DFE'
		},
		{
			id: 'prj',
			title: 'SomeOfMyPROJECT',
			subtitle: '这里放着一些自己突发奇想想要写点什么的小玩意儿，都是兴趣所致，能力有限，还要看到的人多多指点才有的进步。如果能为人所用，我甚是开心。',
			bgphoto: '#0F9D58'
		},
	],
	docrsp: 'https://raw.githubusercontent.com/'+cfg.name+'/'+cfg.gpname+'/'+cfg.postbranch+'/'+cfg.postdir,
}
