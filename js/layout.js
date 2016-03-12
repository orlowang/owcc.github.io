var menu  = document.querySelector('.menu-icon'),
		side  = document.querySelector('.site-left'),
		body  = document.querySelector('section.paper'),
		title = document.querySelector('section.title>span'),
		head  = document.querySelector('.post-header');

menu.addEventListener('touchstart', function() {
	menu.addEventListener('touchend', handle)
})

body.addEventListener('scroll', function() {
	var headHight = window.getComputedStyle(head).height;

	title.style.opacity = body.scrollTop >= parseInt(headHight) ? 1 : 0
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