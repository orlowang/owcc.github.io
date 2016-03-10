var menu = document.querySelector('.menu-icon'),
		side = document.querySelector('.site-left'),
		body = document.querySelector('section.paper');

menu.addEventListener('touchstart', function() {
	var point = side.id
	side.style.marginLeft = 0

	switch (point) {
		case 'opened':
			side.style.boxShadow = 'none'
			side.style.marginLeft = '-200px'
			body.style.overflow = 'auto'
			side.setAttribute('id', 'closed')
			menu.classList.remove('on')
			body.style.webkitFilter = 'none'
			break;
		default:
			body.style.webkitFilter = 'blur(5px)'
			side.style.boxShadow = '10px 0 20px rgba(0,0,0,.3)'
			side.style.marginLeft = 0
			body.style.overflow = 'hidden'
			side.setAttribute('id', 'opened')
			menu.classList.add('on')
			break;
	}
})