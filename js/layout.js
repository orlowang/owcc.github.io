var menu = document.querySelector('.menu-icon'),
		side = document.querySelector('.site-left'),
		body = document.querySelector('section.paper');
console.log(menu)
menu.addEventListener('touchstart', function() {
	var point = side.getAttribute('open')
	side.style.marginLeft = 0

	switch (point) {
		case 'opened':
			side.style.boxShadow = 'none'
			side.style.marginLeft = '-200px'
			body.style.overflow = 'auto'
			side.setAttribute('open', 'closed')
			break;
		default:
			side.style.boxShadow = '10px 0 20px rgba(0,0,0,.3)'
			side.style.marginLeft = 0
			body.style.overflow = 'hidden'
			side.setAttribute('open', 'opened')
			break;
	}
})