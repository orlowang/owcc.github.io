var cfg = require('../github.config.js')

module.exports = {
	author: {
		name: 'Orlo Wang',
		photo: 'psb.jpg'
	},
	homeset: {
		title: 'Stay Hungry, Stay Foolish.',
		subtitle: '让你对成功的渴望像你身体的每个细胞之于氧气的渴望一般强烈；不要让“聪明”羁绊你前进的脚步。......',
		bgphoto: '#ffffff&bgimg000.jpg'
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
			subtitle: 'Human-Computer Interaction Experience(H-CIE)，我现在的职业只是一个再不能普通的前端开发师。但人机交互体验是一个大课题，只要有操作机器的地方就有用户体验，往大了说，这是一门如何自然而本能的使用工具的学问。对了，最近特别喜欢VR/AR设备，要是能买到Hololens就好了。',
			bgphoto: '#9f499b'
		},
		{
			id: 'coding',
			title: 'Coooooding',
			subtitle: 'Coooooding...debug... 其实编码是一件很有趣也很痛苦的事情：有趣在于我很享受这个创作的过程；痛苦在于我不得不靠编码维持生计，而编码所得的收入往往让我陷入不堪，想看的世界看不了。',
			bgphoto: '#536DFE'
		},
		{
			id: 'prj',
			title: 'SomeOfMyPROJECT',
			subtitle: '这里放着一些自己突发奇想想要写点什么的小玩意儿，都是兴趣所致，品相好不好(质量高不高)，还要看到的人多多指点才有的进步。如果能为人所用，我甚是开心。',
			bgphoto: '#0F9D58'
		},
	],
	docrsp: 'https://raw.githubusercontent.com/'+cfg.name+'/'+cfg.gpname+'/'+cfg.postbranch+'/'+cfg.postdir,
}
