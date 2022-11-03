'use strict';

$(function(){
	// mousewheel control
	window.addEventListener("wheel", function(e){
		e.preventDefault();
		},{passive : false}
	);

	var $html = $('html');
	var page = 1;
	var lastPage = $(".content").length;
	$html.animate({scrollTop:0},10);

	$(window).on("wheel", function(e){
		if($html.is(":animated")) return;
		if(e.originalEvent.deltaY > 0){
			if(page == lastPage) return;
			page++;
		}else if(e.originalEvent.deltaY < 0){
			if(page == 1) return;
			page--;
		}
		var posTop = (page-1) * $(window).height();
		$html.animate({scrollTop : posTop});
	});
	
	// main video autoplay;
	// $('#vid').get(0).play();

	// gnb, header area position-top change
	$(window).on('scroll', function(){
		if($(this).scrollTop() > 0){
			$('.gnb-top, .header').addClass('off');
		}else {
			$('.gnb-top, .header').removeClass('off');
		}

		if($(this).scrollTop() > $(this).height() - 5){
			$('.header').removeClass('black');
		}else {
			$('.header').addClass('black');
		}
	});
});

