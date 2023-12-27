
$(document).ready(function() {
    $('.mobile-menu').click(function(){
		$('.header_block').slideToggle();
		//.toggleClass('flex-view');
   });	
   
   // close Menu  outside click on mobile
   if($(window).width() < 768){
	$(document).mouseup(function (e) {
		var menuwrap = jQuery('.menu_wrap');
		if (!menuwrap.is(e.target) && menuwrap.has(e.target).length === 0) {
			$('.header_block').slideUp();
		}
	});
   }
    $('.global-search a').click(function(){
		$('.global-search').toggleClass('expend');
   });
	 
 
 // $(window).scroll(function() {
//		var vh = $(window).scrollTop();
//		if (vh >= 100) {
//			$("body").addClass('fixed');
//
//		} else {
//			$("body").removeClass('fixed')
//		}
//
//	})
	
	 $(".recent_statics,.skipmain").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top - $('.header').height()
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
       // window.location.hash = hash;
      });
    } // End if
  });
   	

if($('.tabslider').length > 0 ){
jQuery('.tabslider').each(function(){
  
  $('.tabslider').owlCarousel({
      loop:true,
	  nav:true,
	  dots:false,
      margin:30,
      responsiveClass:true,
      responsive:{
          0:{
              items: 1
          },
		  567:{
              items: 2
          },
          960:{
            items: 3
          }
      }
  });
})
}

var currentLang = $('.current-lang').text();
$('.current_lang').text(currentLang);

$('.media_tab a').click(function(e){
	e.preventDefault();
	$('.media_tab a').removeClass('active');
	$(this).addClass('active');
	var targetBtn = $(this).attr('href');
	$('.tab_block').hide()
	$(targetBtn).show();
	
})

/*$('.cbox span,.tnum').counterUp({
			delay: 10,
			time: 1000
});*/
$(".fancybox").fancybox();
 if($('.home').length > 0 ){
	$('.menu a').not('.olink').click(function(e){
		e.preventDefault();
		var trigger = jQuery(this);
		$('.menu a').removeClass('active');
		trigger.addClass('active');
		
		var target = this.hash;
		var pos = jQuery(target).offset().top;
		//console.log(pos)
		jQuery('html, body').animate({
			scrollTop: pos - jQuery('.header').height() +5
		});	
		if($(window).width() <767){ 
			$('.header_block').hide();
			}
	})
	
		var target = window.location.hash;
		if(target.length){
		var pos = jQuery(target).offset().top;
		  jQuery('html, body').animate({
				scrollTop: pos - jQuery('.header').height()+5
			}); 
		}
 }



if($('.home').length > 0 ){
  jQuery(document).on("scroll", function(event){
	  jQuery('.menu a').not('.olink').each(function() {
		// console.log('555')
	  event.preventDefault();
      var currLink = jQuery(this);
	 
      var scrollPos = jQuery(document).scrollTop();
      var refElement = jQuery(currLink.attr("href"));
	 // console.log(refElement);
        if (refElement.offset().top - jQuery('.header').height() <= scrollPos) {
            jQuery('.menu a').removeClass("active");
            currLink.addClass("active");
			jQuery('.menu-icon').html(currLink.text());
         } else {
            currLink.removeClass("active");
          }
      });
	  
	  });
}

//ACCORDION BUTTON ACTION (ON CLICK DO THE FOLLOWING)
  $('.accordion h3').click(function() {
		
		  
		//NO MATTER WHAT WE CLOSE ALL OPEN SLIDES
	
			$('.accordion h3').removeClass('on');
			$('.acc_content').slideUp('normal');
			//$(this).next('.acc_content').slideDown('normal');
	
		
        
		//IF THE NEXT SLIDE WASN'T OPEN THEN OPEN IT
		if($(this).next().is(':hidden') == true) {
			
			//ADD THE ON CLASS TO THE BUTTON
			$(this).addClass('on');
			//$(this).find('i').switchClass( "fa-plus-circle", "fa-minus-circle");
			  
			//OPEN THE SLIDE
			$(this).next().slideDown('normal');
		 } 
		  
	 });
	  

	
	/********************************************************************************************************************
	CLOSES ALL S ON PAGE LOAD
	********************************************************************************************************************/	
	$('.acc_content').hide();
	$('.show').show();

$('.inner_accordian h4').on('click', function(){ 
	$(this).next('.inner_content').slideToggle();
	$(this).toggleClass('expend');
})

});
