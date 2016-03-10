var menu = document.querySelector('.menu-icon'),
		side = document.querySelector('.site-left'),
		body = document.querySelector('body>.wrapper');
console.log(menu)
menu.addEventListener('touchstart', function() {
	var point = side.getAttribute('open')
	side.style.marginLeft = 0

	switch (point) {
		case 'opened':
			body.style.width = '100%'
			side.style.marginLeft = '-200px'
			side.setAttribute('open', 'closed')
			break;
		default:
			body.style.width = 'calc(100% + 200px)'
			side.style.marginLeft = 0
			side.setAttribute('open', 'opened')
			break;
	}
})