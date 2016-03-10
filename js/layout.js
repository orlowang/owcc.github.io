var menu = document.querySelector('.menu-icon'),
		side = document.querySelector('.site-left');
console.log(menu)
menu.addEventListener('touchstart', function() {
	var point = side.getAttribute('open')
	side.style.marginLeft = 0

	switch (point) {
		case 'opened':
			side.style.marginLeft = '-200px'
			side.setAttribute('open', 'closed')
			break;
		default:
			side.style.marginLeft = 0
			side.setAttribute('open', 'opened')
			break;
	}
})