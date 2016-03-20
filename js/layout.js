var menu   = document.querySelector('.menu-icon'),
		side   = document.querySelector('.site-left'),
		body   = document.querySelector('section.paper'),
		title  = document.querySelector('section.title>span'),
		head   = document.querySelector('.post-header');

menu.addEventListener('touchstart', function() {
	side.setAttribute('id', side.id == 'opened' ? 'closed' : 'opened')
})

head != null && body.addEventListener('scroll', function() {
	var headHight = window.getComputedStyle(head).height;
	title.style.opacity = body.scrollTop >= parseInt(headHight) ? 1 : 0
})

function getPDF(cls) {
	if (document.getElementById('pdfcont')) return;
	var content = document.querySelector(cls).innerHTML,
			wapper  = document.createElement('div'),
			bgcont  = document.createElement('div');
	var _date = new Date()
	wapper.innerHTML = '<p style="float:right;color:#eee;font-size:11px;">Print time: ' + _date + '</p>' + content + 'from: ' + window.location.href
	bgcont.appendChild(wapper)
	document.body.appendChild(bgcont)
	bgcont.setAttribute('id', 'pdfcont')
	bgcont.setAttribute('class', 'show')
}

function printPDF(elm) {
	 // elm.style.display = 'none'
	 console.log(elm)
	 
}
