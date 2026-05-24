function initializeNaba() {
	
	$("a[data-gal^='prettyPhoto']").prettyPhoto({
		theme:'light_square', 
		autoplay_slideshow: false, 
		overlay_gallery: false, 
		show_title: true,
	});
	
	//FitVids for fluid width videos
	if( $.fn.fitVids ) {
		$('.media.video').fitVids();
	}
	
	// Tweets Widget
	if( $.fn.tweet ) {
		$('.tweet-stream').tweet({
			username: "mannatstudio",
			modpath: 'twitter/',
			count: 2,
			template: "{text}{time}",
			loading_text: 'loading twitter feed...'
		});
	}
	
	// Hide #back-top first
	//$("#back-top").hide();		
	// fade in #back-top
	$(function () {
		
		// scroll body to 0px on click
		$('#back-top a').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});	
	
	var $container = $('#content');
		$container.isotope({
			filter: '*',
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false,
			}
		});
		$('#portolfio-filter a').click(function () {
			$('#portolfio-filter a').removeClass('active');
			$(this).addClass('active');
			return false;
		});
		$('#portolfio-filter a').click(function () {
			var selector = $(this).attr('data-filter');
			$container.isotope({
				filter: selector,
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false,
	
				}
			});
			return false;
		});
	
	//Revolution Slider
	//Revolution Slider
	if( $.fn.revolution ) {

		$( '.fullwidthbanner' ).revolution({
			delay: 6000, 
			startheight: 500, 
			fullWidth: 'on', 
			shadow:3,
			
			onHoverStop:"on",
			hideThumbs:200,
			navigationType:"bullet",
			navigationStyle:"none",
			navigationArrows:"verticalcentered",
			
			touchenabled:"on",

			navOffsetHorizontal:1,
			navOffsetVertical:11,
			
		});
	}
	
	
	// Flickrfeed
	if( $.fn.jflickrfeed ) {
		$('.flickr-stream ul').jflickrfeed({
			qstrings: {
				id: '52617155@N08'
			}, 
			limit: 12, 
			itemTemplate: '<li><a href="{{link}}" title="{{title}}" target="_blank"><img src="{{image_s}}" alt="{{title}}" /></a></li>'
		});
	}
	
	$('.social-icons a, .tooltips').tooltip({
		placement: 'bottom',
		});	
		
	$(".text-rotater .rotate").textrotator({
        animation: "spin",
        speed: 1500
   	});
	
	jQuery('header nav').meanmenu({
		meanScreenWidth: "767",	
		meanMenuClose: "X",
		meanMenuCloseSize: "15px",
	});
	
	
	$('.sf-menu').superfish({ 
		delay:       500,
		animation:   {opacity:'show',height:'show'},
		speed:       'fast',
		autoArrows:  false,
		dropShadows: false,
	});
	
	$(".accordion-group").each(function(){
			var that = $(this);
			$(this).find(".accordion-heading a").on("click", function() {
				that.parent().find(".accordion-heading a.active").removeClass("active");
				$(this).toggleClass("active"); 
			});
	  });
	jQuery("ul.ts-accordion li").each(function(){
		if(jQuery(this).index() > 0){
			jQuery(this).children(".accordion-content").css('display','none');
		}else{
			jQuery(this).find(".accordion-title").addClass('active');
		}				
		jQuery(this).children(".accordion-title").bind("click", function(){
			jQuery(this).addClass(function(){
				if(jQuery(this).hasClass("active")) return "";
				return "active";
			});
			jQuery(this).siblings(".accordion-content").slideDown();
			jQuery(this).parent().siblings("li").children(".accordion-content").slideUp();
			jQuery(this).parent().siblings("li").find(".active").removeClass("active");
		});
	});
	
	
	$(".hover_img").on('mouseover',function(){
				var info=$(this).find("img");
				info.stop().animate({opacity:0.47},500);
				$(".preloader").css({'background':'none'});
			}
		);
		$(".hover_img").on('mouseout',function(){
				var info=$(this).find("img");
				info.stop().animate({opacity:1},500);
				$(".preloader").css({'background':'none'});
			}
		);	
		
	$(".client-box img").css({"opacity": "0.5"});
	$(".client-box img").hover(function() {
		$(this).stop().animate({opacity: 1, top: "-5px",}, 300 );
	},
	function() {
		$(this).stop().animate({opacity: 0.5, top: "0",}, 300 );
	});

								
	function isScrolledIntoView(id)
	{
		var elem = "#" + id;
		var docViewTop = $(window).scrollTop();
		var docViewBottom = docViewTop + $(window).height();
	
		if ($(elem).length > 0){
			var elemTop = $(elem).offset().top;
			var elemBottom = elemTop + $(elem).height();
		}

		return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)
		  && (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop) );
	}

	
	
	function sliding_horizontal_graph(id, speed){
		//alert(id);
		$("#" + id + " li span").each(function(i){
			var j = i + 1; 										  
			var cur_li = $("#" + id + " li:nth-child(" + j + ") span");
			var w = cur_li.attr("title");
			cur_li.animate({width: w + "%"}, speed);
		})
	}
	
	function graph_init(id, speed){
		$(window).scroll(function(){
			if (isScrolledIntoView(id)){
				sliding_horizontal_graph(id, speed);
			}
			else{
				//$("#" + id + " li span").css("width", "0");
			}
		})
		
		if (isScrolledIntoView(id)){
			sliding_horizontal_graph(id, speed);
		}
	}
	
	graph_init("services-graph", 1000);
	
	//=================================== TABS AND TOGGLE ===================================//
	//jQuery tab
	jQuery(".tab-content").hide(); //Hide all content
	jQuery("ul.tabs li:first").addClass("active").show(); //Activate first tab
	jQuery(".tab-content:first").show(); //Show first tab content
	//On Click Event
	jQuery("ul.tabs li").click(function() {
		jQuery("ul.tabs li").removeClass("active"); //Remove any "active" class
		jQuery(this).addClass("active"); //Add "active" class to selected tab
		jQuery(".tab-content").hide(); //Hide all tab content
		var activeTab = jQuery(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
		jQuery(activeTab).fadeIn(200); //Fade in the active content
		return false;
	});
	
	//jQuery toggle
	jQuery(".toggle_container").hide();
	jQuery("h2.trigger").click(function(){
		jQuery(this).toggleClass("active").next().slideToggle("slow");
	});
	
	

};
/* =Document Ready Trigger
-------------------------------------------------------------- */
jQuery(document).ready(function(){

	initializeNaba();

});
/* END ------------------------------------------------------- */


$(document).ready(function(){
	jQuery("#contact_form").validate({
		meta: "validate",
		submitHandler: function (form) {
			
			var s_name=$("#name").val();
			var s_lastname=$("#lastname").val();
			var s_email=$("#email").val();
			var s_phone=$("#phone").val();
			var s_comment=$("#comment").val();
			$.post("contact.php",{name:s_name,lastname:s_lastname,email:s_email,phone:s_phone,comment:s_comment},
			function(result){
			  $('#sucessmessage').append(result);
			});
			$('#contact_form').hide();
			return false;
		},
		/* */
		rules: {
			name: "required",
			
			lastname: "required",
			// simple rule, converted to {required:true}
			email: { // compound rule
				required: true,
				email: true
			},
			phone: {
				required: true,
			},
			comment: {
				required: true
			}
		},
		messages: {
			name: "Please enter your name.",
			lastname: "Please enter your last name.",
			email: {
				required: "Please enter email.",
				email: "Please enter valid email"
			},
			phone: "Please enter a phone.",
			comment: "Please enter a comment."
		},
	}); /*========================================*/
});


//STYLE SWITICHING SCRIPT
	$(document).ready(function () {
		$(".color-scheme a").click(function () {
			$('link.alt').attr('href', $(this).attr('rel'));
			return false;
		});
		imgPathStart = "images/pattern/";
		imgPathEnd = new Array("pattern0.png","pattern1.png","pattern2.png","pattern3.png","pattern4.png","pattern5.png","pattern6.png","pattern7.png","pattern8.png","pattern9.png");
		imgPathEnd2 = new Array("0.jpg","1.jpg");
	
		$(".background-selector li img").click(function() {
			backgroundNumber = $(this).attr("data-nr");
			$("body").css({background:"url('"+imgPathStart+imgPathEnd[backgroundNumber]+"')"});
		});
		
		 $('.wrapwide img, .wrapboxed img').click(function() {
			 backgroundNumber = $(this).attr("data-nr");
		 	$("body").css("background", "transparent url('"+imgPathStart+imgPathEnd2[backgroundNumber]+"') no-repeat fixed center center");
		  });
	});
	
	$(document).ready(function () {		
		$('.switch-button').click(function () {	
			if ($(this).is('.open')) {
				$(this).addClass('closed');
				$(this).removeClass('open');
				$('.styleswitcher').animate({
					'left': '-222px'
				});
			} else {
				$(this).addClass('open');
				$(this).removeClass('closed');
				$('.styleswitcher').animate({
					'left': '0px'
				});
			}	
		});
	});


jQuery(window).scroll(function() { 
		// Intro Wrap
		jQuery('.has-animation:in-viewport').each(function() {
			da = jQuery(this).attr('data-animation');
			jQuery(this).addClass(da);
		});
		
});