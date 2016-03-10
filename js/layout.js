var menu = document.querySelector('.menu-icon'),
		side = document.querySelector('.site-left'),
		body = document.querySelector('section.paper');

menu.addEventListener('touchstart', function() {
	var point = side.id
	side.style.marginLeft = 0

	switch (point) {
		case 'opened':
			side.style.marginLeft = '-200px'
			side.style.boxShadow = 'none'
			body.style.overflow = 'auto'
			side.setAttribute('id', 'closed')
			break;
		default:
			side.style.boxShadow = '10px 0 20px rgba(0,0,0,.3)'
			side.style.marginLeft = 0
			body.style.overflow = 'hidden'
			side.setAttribute('id', 'opened')
			break;
	}
})