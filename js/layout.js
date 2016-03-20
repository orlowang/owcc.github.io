var _hhit, _width = window.screen.width,
		menu   = document.querySelector('.menu-icon'),
		side   = document.querySelector('.site-left'),
		body   = document.querySelector('section.paper'),
		title  = document.querySelector('section.title>span'),
		actn   = document.querySelector('section.title>.action'),
		head   = document.querySelector('.post-header');

_hhit = head != null ? window.getComputedStyle(head).height : NaN

menu.addEventListener('touchstart', function() {
	side.setAttribute('id', side.id == 'opened' ? 'closed' : 'opened')
})

body.addEventListener('scroll', function() {
	if (_width <= 1000 && _hhit != NaN) {
		if (title) title.style.opacity = body.scrollTop >= parseInt(_hhit) ? 1 : 0
		if (actn.childElementCount >= 1) actn.style.width = body.scrollTop >= parseInt(_hhit) ? '50px' : 'auto'
	}

	if (window.screen.width >1000 && actn.childElementCount >= 1) {
		actn.style.transform = body.scrollTop > 0 ? 'translateY(-40px)' : 'translateY(0)'
	}
})
