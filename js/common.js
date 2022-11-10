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
	var headerHide;
	var statusHide;
	$html.animate({scrollTop:0}, 100);

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
		$html.animate({scrollTop : posTop}, 1000, 'easeInOutExpo');
	});
	
	// main video autoplay;
	$('#vid').get(0).play();

	// gnb, header area position-top change
	$(window).on('scroll', function(e){
		let scrollTop = $(this).scrollTop();
		if(scrollTop > 0){
			$('.gnb-top, .header').addClass('off');
		}else {
			$('.gnb-top, .header').removeClass('off');
		}

		if(scrollTop > $(this).height() - 5){
			$('.header').removeClass('black');
		}else {
			$('.header').addClass('black');
		}

		// second area animation
		if($('.second').offset().top == scrollTop){
			$('.second .inner').addClass('on');
			$('.second .inner-cont').removeClass('on');
			$('.bar em').addClass('on');
			$('.cover-img').addClass('on');
			$('.cover.tit').addClass('on');
			headerHide = setTimeout(function(){
				$('.header').addClass('on');
			}, 1500);
		}else{
			$('.second .inner-cont').addClass('on');
			// $('.second .inner').removeClass('on');
			// $('.cover.bar em').removeClass('on');
			// $('.cover-img').removeClass('on');
			// $('.cover.tit').removeClass('on');
			$('.header').removeClass('on');
			clearTimeout(headerHide);
		}
			
		// status bar control
		let wHeight = $(window).height();
		// 두번째 섹션이 화면에 가득 찰 때 2.1초 후에 status-wrap 안보이게
		if(scrollTop == $('.second').offset().top){
			statusHide = setTimeout(function(){
				$('.status-wrap').removeClass('on');
			},1500);
		}else {
			clearTimeout(statusHide);
		}

		// 스크롤탑 값이 두번째 섹션 ~ 세번째 섹션 - 윈도우창 높이/2 : status-wrap이 보이게, status-bar 높이 50%
		// 세번째 섹션 - 윈도우창 높이/2 이상 : status-wrap이 보이게, status-bar 높이 100%
		// 그 외에는 status-wrap 안 보이게
		if(scrollTop >= $('.second').offset().top && scrollTop < $('.third').offset().top - wHeight/2){
			$('.status-wrap').addClass('on');
			$('.status-bar').removeClass('on2');
			$('.status-bar').addClass('on1');
		}else if(scrollTop >= $('.third').offset().top - wHeight/2){
			$('.status-wrap').addClass('on');
			$('.status-bar').removeClass('on1');
			$('.status-bar').addClass('on2');
		}else {
			$('.status-wrap').removeClass('on');
			$('.status-bar').removeClass('on1');
		}

		// 스크롤탑이 세번째 섹션에 들어오면 (그 이상일 때) top btn 보이게
		if(scrollTop >= $('.content').eq(2).offset().top){
			$('.top').css('opacity', '1');
		}else{
			$('.top').css('opacity', '0');
		}
	});

	// second area video play
	$('.main-cont-inner ul li').hover(function(){
		$(this).find('video').get(0).play();
	}, function(){
		$(this).find('video').get(0).pause();
	});

	// media area gallery slide autoplay
	let i = 1;
	setInterval(function(){
		$('.swiper-slide').removeClass('on');
		$('.swiper-slide').eq(i).addClass('on');
		i++;
		if(i == 3){ i = 1 }
	},3000);

	// go to top
	$('.top').click(function(){
		$('html, body').animate({scrollTop: 0}, 300);
		page = 1;
	});

});

