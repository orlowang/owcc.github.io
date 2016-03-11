var menu = document.querySelector('.menu-icon'),
		side = document.querySelector('.site-left'),
		body = document.querySelector('section.paper');

menu.addEventListener('touchstart', function() {
	menu.addEventListener('touchend', handle)
})

function handle() {
	var point = side.id

	switch (point) {
		case 'opened':
			side.style.marginLeft = '-200px'
			menu.style.right = '-44px'
			side.setAttribute('id', 'closed')
			side.style.boxShadow = 'none'
			body.style.overflow = 'auto'
			break;
		default:
			side.style.boxShadow = '10px 0 20px rgba(0,0,0,.3)'
			side.style.marginLeft = 0
			body.style.overflow = 'hidden'
			side.setAttribute('id', 'opened')
			menu.style.right = 0
			break;
	}
}