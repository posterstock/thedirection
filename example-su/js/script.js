var loadFinish = false,
	mobileVer = false,
	tabletVer = false;

var softUnity = {
	init: function(){
		self = this;
		
		$(document).ready(function(){
			self.adaptiveVerCheck();
			self.preloader();

			self.common();
			self.header();
			self.headerMenu();
			self.footer();
			self.sectionFixedBottom();
			self.sectionType_2();
			self.sectionType_3();
			self.sectionType_4();
			self.sectionType_6();
			self.sectionType_7();
			self.sectionType_10();
			self.sectionType_16();
			self.sectionType_17();
			self.sectionType_20();
			self.sectionType_22();
			self.sectionType_30();
			self.sectionType_31();
			self.sectionType_34();
			self.sectionType_38();

			self.popUp();
			self.gTable();
			self.gForm();
			self.googleMap();
		});
	},
	adaptiveVerCheck: function(){
		var windowWidth = window.innerWidth;

		tabletVer = windowWidth < 1025 ? true : false;
		mobileVer = windowWidth < 1280 ? true : false;

		$(window).resize(function(){
			windowWidth = window.innerWidth;

			tabletVer = windowWidth < 1025 ? true : false;
			mobileVer = windowWidth < 1280 ? true : false;

			console.log(mobileVer);
		});
	},
	preloader: function() {
		if ($('.preloader')[0]) {
			TweenLite.to($('.preloader'), 0.4, {delay:0.2, opacity:0, display:'none', ease:Power1.easeInOut});
		}
	},
	common: function() {
		// sla
		if ($('.sla-for-logic')[0]) {
			$('body').addClass('sla-page');
		}
		// sla end
	},
	header: function() {
		if ($('header')[0]) {
			// if not at top
			var scrollOffset = -80;

			var fixedHeaderW = new Waypoint({
				element: $('body'),
				handler: function(direction) {
					if (direction == 'down') {
						$('header, body').addClass('not-at-top');
					} else {
						$('header, body').removeClass('not-at-top');
					}
				},
				offset: scrollOffset
			});
			// if not at top end

			// mobile menu
			var menuTL = new TimelineLite(),
			    menuToggle = false,
			    $menu = $('.header-mobile-menu'),
			    $header = $('header');

			var menuButtonTL = new TimelineLite(),
			    $menuButton = $('header .burger-button');

			menuTL
				.fromTo($menu, 0.001, {display:'none'}, {display:'block'})
				.fromTo($('.header-mobile-menu-background'), 0.4, {x:'100%'}, {x:'0%', ease:Power1.easeInOut}, 'first')
				.fromTo($('.header-mobile-menu-wrapper'), 0.4, {x:'100%'}, {x:'0%', ease:Power1.easeInOut}, 'first')
			menuTL.pause();

			menuTL.timeScale(1);

			menuButtonTL
			    .to($menuButton.find('.burger-button-line:nth-child(1)'), 0.6, {y:5, ease:Power3.easeIn},'together')
			    .to($menuButton.find('.burger-button-line:nth-child(2)'), 0.6, {y:-5, ease:Power3.easeIn},'together')
			    .set($menuButton.find('.burger-button-line:nth-child(1)'), {width:'100%'})
			    .set($menuButton.find('.burger-button-line:nth-child(2)'), {width:'100%'})
			    .to($menuButton.find('.burger-button-line:nth-child(1)'), 0.4, {rotationZ:45, ease:Power1.linear},'cross')
			    .to($menuButton.find('.burger-button-line:nth-child(2)'), 0.4, {rotationZ:-45, ease:Power1.linear},'cross');
			menuButtonTL.pause();

			menuButtonTL.timeScale(2);

			$menuButton.click(function(){
			    if(menuToggle==false) {
			        menuToggle = true;
			        menuButtonTL.play();
			        menuTL.play();

			        $header.addClass('mobile-menu-opened');
			    } else {
			        menuToggle = false;
			        menuTL.reverse();
			        menuButtonTL.reverse();

			        $header.removeClass('mobile-menu-opened');

			        $('.header-mobile-menu-secondary-screen-item').removeClass('active');
			    }
			});
			// mobile menu end

			// mobile menu screen change
			var $mobileMenuSecScreen = $('.header-mobile-menu-secondary-screen-item'),
				$mobileMenuMainScreenElement = $('.header-mobile-menu-home-screen .header-mobile-menu-main-menu-item'),
				$mobileMenuBackButton = $('.header-mobile-menu-main-el-back-button');

			$mobileMenuMainScreenElement.on('click', function(){
				$mobileMenuSecScreen.removeClass('active');

				$mobileMenuSecScreen.eq($(this).index()).addClass('active');
			});

			$mobileMenuBackButton.on('click', function(){
				$mobileMenuSecScreen.removeClass('active');
			});
			// mobile menu screen change end
		}
	},
	headerMenu: function(){
		if ($('.header-menu')[0]) {
			// general header menu logic
			var $headerMenuTagA = $('header .el-menu ul li a'),
				$headerMenuItem = $('.header-menu-item'),
				$headerMenuListOuter = $('.header-menu-list-outer'),
				$headerMenuTriangle = $('header .el-menu-triangle'),
				$headerMenuInteractiveElements = $('header .el-menu, .header-menu-list-outer'),
				currentItemHeight = 0;

			// initial setup
			var isFirstHover = true,
				isMouseOverInteractiveElements = false;

			$headerMenuTriangle.hide();
			// initial setup end

			$headerMenuTagA.hover(function(){
				var $this = $(this);

				$headerMenuTagA.addClass('menu-opened');

				$headerMenuTagA.removeClass('active');
				$this.addClass('active');

				$headerMenuItem.removeClass('active');
				$headerMenuItem.eq($this.parent('li').index()).addClass('active')

				showHeaderThings();

				isMouseOverInteractiveElements = true;
			}, function(){
				$headerMenuTagA.removeClass('menu-opened');
			});

			$headerMenuInteractiveElements.mouseenter(function(){
				if (isFirstHover == true) {
					isFirstHover = false;
				}

				isMouseOverInteractiveElements = true;
			});

			$headerMenuInteractiveElements.mouseout(function(){
				if ($('header .el-menu:hover').length == 0 && $('.header-menu-list-outer:hover').length == 0) {
				    isMouseOverInteractiveElements = false;
				    isFirstHover = true;
				    hideHeaderThings();
				}
			});

			function setTrianglePosition() {
				var activeHeaderMenuTagA = $('header .el-menu ul li a.active');

				var hoveredHeaderMenuTagA_PositionLeft = activeHeaderMenuTagA.position().left,
					positionX_forTriangle = hoveredHeaderMenuTagA_PositionLeft + $headerMenuTriangle.outerWidth(true) - 3 + activeHeaderMenuTagA.width() / 2;

				if (isFirstHover == true) {
					TweenLite.set($headerMenuTriangle, {x:positionX_forTriangle});
					TweenLite.fromTo($headerMenuTriangle, 0.4, {y:0, opacity:0}, {y:0, opacity:1, display:'block', ease:Power1.easeInOut});
				} else {
					TweenLite.to($headerMenuTriangle, 0.4, {x:positionX_forTriangle, ease:Power1.easeInOut});
				}
			}

			function setItemVisibility() {
				var $activeHeaderMenuItem = $('.header-menu-item.active');

				currentItemHeight = $activeHeaderMenuItem.height();

				if (isFirstHover == true) {
					TweenLite.set($headerMenuListOuter, {height:currentItemHeight});
					TweenLite.fromTo($headerMenuListOuter, 0.4, {rotationX:-10, opacity:0}, {rotationX:0, opacity:1, ease:Power1.easeInOut});
				} else {
					TweenLite.to($headerMenuListOuter, 0.4, {height:currentItemHeight, ease:Power1.easeInOut});
				}
			}

			function showHeaderThings() {
				setTrianglePosition();
				setItemVisibility();
			}

			function hideHeaderThings() {
				$headerMenuTagA.removeClass('active');
				$headerMenuItem.removeClass('active');

				TweenLite.to($headerMenuListOuter, 0.4, {rotationX:-10, opacity:0, ease:Power1.easeInOut});
				TweenLite.to($headerMenuTriangle, 0.4, {rotationX:-20, opacity:0, ease:Power1.easeInOut});
			}
			// general header menu logic end

			// item 2 header menu logic
			var $headerMenuItem_2_InnerLeftItem = $('.header-menu-item-2 .header-menu-item-part-1-item'),
				$headerMenuItem_2_InnerRightItem = $('.header-menu-item-2 .header-menu-item-part-2-item');

			$headerMenuItem_2_InnerLeftItem.hide();
			$headerMenuItem_2_InnerLeftItem.eq(0).show();

			$headerMenuItem_2_InnerRightItem.hover(function(){
				$headerMenuItem_2_InnerLeftItem.hide();

				$headerMenuItem_2_InnerLeftItem.eq($(this).index()+1).stop().fadeIn(300);
			}, function(){
				$headerMenuItem_2_InnerLeftItem.hide();

				$headerMenuItem_2_InnerLeftItem.eq(0).stop().fadeIn(300);
			});
			// item 2 header menu logic end

			// if inner item is hovered the triangle change its color
			var $innerItem = $('.header-menu-item-2 .header-menu-item-part-2-item:nth-child(1), .header-menu-item-3 .header-menu-item-part-2-item:nth-child(2), .header-menu-item-4 .header-menu-item-part-2-item:nth-child(3), .header-menu-item-5 .header-menu-item-part-2-item:nth-child(2)');
				
			$innerItem.hover(function(){
				$headerMenuTriangle.addClass('dif-color');
			}, function(){
				$headerMenuTriangle.removeClass('dif-color');
			});
			// if inner item is hovered the triangle change its color end
		}
	},
	footer: function(){
		if ($('footer')[0]) {
			var $copyEmailButton = $('#footer_copy_email_button'),
				emailToCopy = $copyEmailButton.data('email-to-copy'),
				copyEmailButtonTextOriginal = $copyEmailButton.data('text-original'),
				copyEmailButtonTextAfterAction = $copyEmailButton.data('text-after-action');

			$copyEmailButton.on('click', function(){
				$(this).find('.el-link-1-2-2 .g__text').text(copyEmailButtonTextAfterAction);

				const el = document.createElement('textarea');    // Create a <textarea> element
				el.value = emailToCopy;                           // Set its value to the string that you want copied
				el.setAttribute('readonly', '');                  // Make it readonly to be tamper-proof
				el.style.position = 'absolute';                   
				el.style.left = '-9999px';                        // Move outside the screen to make it invisible
				document.body.appendChild(el);                    // Append the <textarea> element to the HTML document
				const selected =              
				  document.getSelection().rangeCount > 0          // Check if there is any content selected previously
				    ? document.getSelection().getRangeAt(0)       // Store selection if found
				    : false;                                      // Mark as false to know no selection existed before
				el.select();                                      // Select the <textarea> content
				document.execCommand('copy');                     // Copy - only works as a result of a user action (e.g. click events)
				document.body.removeChild(el);                    // Remove the <textarea> element
				if (selected) {                                   // If a selection existed before copying
					document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
					document.getSelection().addRange(selected);   // Restore the original selection
				}
			});

			$copyEmailButton.mouseout(function(){
				$(this).find('.el-link-1-2-2 .g__text').text(copyEmailButtonTextOriginal);
			});
		}
	},
	sectionFixedBottom: function(){
		if ($('section.fixed-bottom')[0]) {
			$('body').css('padding-bottom', $('section.fixed-bottom').height() + 'px');

			$('section.fixed-bottom-2').hide();

			$('.button-for-section-fixed-bottom').on('click', function(){
				if ($(this).data('section-fixed-bottom-index') == '1') {
					$('section.fixed-bottom-1').fadeIn(300);
					$('section.fixed-bottom-2').fadeOut(300);
				}

				if ($(this).data('section-fixed-bottom-index') == '2') {
					$('section.fixed-bottom-1').fadeOut(300);
					$('section.fixed-bottom-2').fadeIn(300);
				}
			});
		}
	},
	sectionType_2: function(){
		if ($('section.type-2')[0]) {
			var $item = $('section.type-2 .item');

			$item.addClass('unhover');

			$item.hover(function(){
				$(this).removeClass('unhover');
			}, function(){
				$(this).addClass('unhover');
			});
		}
	},
	sectionType_3: function(){
		if ($('section.type-3')[0]) {
			tabsConstruct($('section.type-3 .g__tab_content-tab-item'), $('section.type-3 .g__tab_content-content-item'));
		}
	},
	sectionType_4: function(){
		if ($('section.type-4')[0]) {
			// $('section.type-4 .block-item-1-inner').stick_in_parent({offset_top:$('header').height() + 30});
		}
	},
	sectionType_6: function(){
		if ($('section.type-6')[0]) {
			var $item = $('section.type-6 .item'),
				$hoverField = $('section.type-6 .el-button-outer');

			$hoverField.hover(function(){
				$item.addClass('blur');
			}, function(){
				$item.removeClass('blur');
			});
		}
	},
	sectionType_7: function(){
		if ($('section.type-7')[0]) {
			tabsConstruct($('section.type-7 .g__tab_content-tab-item'), $('section.type-7 .g__tab_content-content-item'));

			var sliderDataMaxValue = $('section.type-7 .g__ui_slider-object').data('max-value');

			$('section.type-7 .g__ui_slider-object').slider({
		    	range: 'min',
		    	min: 1,
		    	max: sliderDataMaxValue,
		    	value: 1,
		    	animate: true,
				slide: function( event, ui ) {
					mntHours = parseInt(ui.value) + 1;
					calculate();
				}
			});
		}
	},
	sectionType_10: function(){
		if ($('section.type-10')[0]) {
			var $sliderControl = $('section.type-10 .el-slider-control-item');

			$('section.type-10 .el-slider-object').slick({
				infinite: true,
				arrows: false,
				speed: 400,
				slidesToShow: 2,
				slidesToScroll: 1,
				cssEase: 'cubic-bezier(.51,0,.37,.99)',
				responsive: [
				    {
						breakpoint: 1279,
						settings: {
							slidesToShow: 1
						}
				    }
				]
			});

			$sliderControl.on('click', function(){
				if ($(this).index() == 0) {
					$('section.type-10 .el-slider-object').slick('slickPrev');
				} else {
					$('section.type-10 .el-slider-object').slick('slickNext');
				}
			});
		}
	},
	sectionType_16: function(){
		if ($('section.type-16')[0]) {
			var $item = $('section.type-16 .block-item');

			$item.eq(0).addClass('active');

			$item.hover(function(){
				$item.removeClass('active');
				$(this).addClass('active');
			}, function(){
				
			});

			// additions for mobile
			$item.each(function(){
				var $title = $(this).find('.block-item-hover-part-el-title').text(),
					$number = $(this).find('.block-item-el-number').text().trim();

				var $mobileTab = $('<div class="block-item-mobile-tab"><div class="block-item-mobile-tab-text"><span>'+$number+'.</span> '+$title+'</div></div>');

				$mobileTab.insertBefore($(this));
			});

			// initial setup
			$('section.type-16 .block-item-mobile-tab').eq(0).addClass('active');

			if (mobileVer == true) {
				$('section.type-16 .block-item:not(".active")').hide();
			}
			// initial setup end

			$('section.type-16').on('click', '.block-item-mobile-tab', function(){
				var $this = $(this);

				if (!$this.hasClass('active')) {
					$('section.type-16').find('.block-item-mobile-tab').removeClass('active');
					$(this).addClass('active');

					$item.removeClass('active');
					$(this).next('.block-item').addClass('active');

					$item.stop().slideUp(300);
					$(this).next('.block-item').stop().slideDown(300);

					if ($this.hasClass('active')) {
						setTimeout(function(){
							$('html, body').stop().animate({
							    scrollTop: $this.offset().top - $('header').height() - 10
							}, 300);
						}, 300);
					}
				} else {
					$(this).removeClass('active');
					$(this).next('.block-item').removeClass('active');

					$(this).next('.block-item').stop().slideUp(300);
				}
			});
			// additions for mobile end
		}
	},
	sectionType_17: function(){
		if ($('section.type-17')[0]) {
			tabsConstruct($('section.type-17 .g__tab_content-tab-item'), $('section.type-17 .g__tab_content-content-item'));
		}
	},
	sectionType_20: function(){
		if ($('section.type-20')[0]) {
			var $sliderControl = $('section.type-20 .el-slider-control-item'),
				$totalSlides = $('section.type-20 .slider-middle-number-of-slides-indicator-total'),
				$currentSlide = $('section.type-20 .slider-middle-number-of-slides-indicator-current'),
				$topIndicatorItem = $('section.type-20 .slider-top-indicator-item'),
				$middleIndicatorItem = $('section.type-20 .slider-middle-indicator-item'),
				totalSlideCount = $('section.type-20 .slider-middle-slide').length;

			// initial setup
			$totalSlides.text(totalSlideCount);
			$currentSlide.text('1');

			$topIndicatorItem.eq(0).addClass('active');
			$middleIndicatorItem.eq(0).addClass('active');

			// triangle position
			var	$topListOuter = $('section.type-20 .slider-top-indicator-item-list'),
				$triangle = $('section.type-20 .el-slider-top-indicator-triangle');

			var activeTopIndicatorItemPositionLeft = $topIndicatorItem.eq(0).position().left,
				positionX_forTriangle = activeTopIndicatorItemPositionLeft + $triangle.outerWidth(true) - 28 + $topIndicatorItem.eq(0).width() / 2;

			TweenLite.to($triangle, 0.4, {x:positionX_forTriangle, ease:Power1.easeInOut});
			// triangle position end
			// initial setup end

			$('section.type-20 .slider-middle-object').slick({
				infinite: true,
				arrows: false,
				speed: 400,
				slidesToShow: 1,
				slidesToScroll: 1,
				cssEase: 'cubic-bezier(.51,0,.37,.99)'
			});

			$('section.type-20 .slider-middle-object').on('afterChange', function(slick, currentSlide) {
				var currentSlide = $('section.type-20 .slider-middle-object').slick('slickCurrentSlide'); 

				$currentSlide.text(currentSlide + 1);

				$topIndicatorItem.removeClass('active before-active');
				$middleIndicatorItem.removeClass('active before-active');

				$topIndicatorItem.eq(currentSlide).addClass('active');
				$topIndicatorItem.eq(currentSlide).prevAll().addClass('before-active');

				$middleIndicatorItem.eq(currentSlide).addClass('active');
				$middleIndicatorItem.eq(currentSlide).prevAll().addClass('before-active');

				if ($('section.type-20 .slider-middle-indicator-item-list-group-2')[0]) {
					if ($('section.type-20 .slider-middle-indicator-item-list-group-2').find($middleIndicatorItem).hasClass('active')) {
						$('section.type-20 .slider-middle-indicator-item-list-group-1').find($middleIndicatorItem).addClass('before-active');
					}
				}

				// triangle position
				var	$topListOuter = $('section.type-20 .slider-top-indicator-item-list'),
					$triangle = $('section.type-20 .el-slider-top-indicator-triangle');

				var activeTopIndicatorItemPositionLeft = $topIndicatorItem.eq(currentSlide).position().left,
					positionX_forTriangle = activeTopIndicatorItemPositionLeft + $triangle.outerWidth(true) - 28 + $topIndicatorItem.eq(currentSlide).width() / 2;

				TweenLite.to($triangle, 0.4, {x:positionX_forTriangle, ease:Power1.easeInOut});
				// triangle position end
			});

			$sliderControl.on('click', function(){
				if ($(this).index() == 0) {
					$('section.type-20 .slider-middle-object').slick('slickPrev');
				} else {
					$('section.type-20 .slider-middle-object').slick('slickNext');
				}

				// alert($('section.type-20 .slider-middle-object').slick('slickCurrentSlide'));
			});

			$('section.type-20 .slider-top-indicator-item, section.type-20 .slider-middle-indicator-item').on('click', function(){
				if ($(this).parents('.slider-middle-indicator-item-list-group-2')[0]) {
					var currentSlide = totalSlideCount - 1;
				} else {
					var currentSlide = $(this).index()
				}
				
				$currentSlide.text(currentSlide + 1);

				$('section.type-20 .slider-middle-object').slick('slickGoTo', currentSlide);

				$topIndicatorItem.removeClass('active before-active');
				$middleIndicatorItem.removeClass('active before-active');

				$topIndicatorItem.eq(currentSlide).addClass('active');
				$topIndicatorItem.eq(currentSlide).prevAll().addClass('before-active');

				$middleIndicatorItem.eq(currentSlide).addClass('active');
				$middleIndicatorItem.eq(currentSlide).prevAll().addClass('before-active');

				if ($('section.type-20 .slider-middle-indicator-item-list-group-2')[0]) {
					if ($('section.type-20 .slider-middle-indicator-item-list-group-2').find($middleIndicatorItem).hasClass('active')) {
						$('section.type-20 .slider-middle-indicator-item-list-group-1').find($middleIndicatorItem).addClass('before-active');
					}
				}
			});
		}
	},
	sectionType_22: function(){
		if ($('section.type-22')[0]) {
			var $itemVisiblePart = $('section.type-22 .block-item-visible-part');

			// initial setup
			$('section.type-22 .block-item-invisible-part').hide();
			// //$('section.type-22 .block-item-invisible-part').eq(0).show();

			// //$('section.type-22 .block-item').eq(0).addClass('active');
			// initial setup end

			$itemVisiblePart.on('click', function(){
				var $this = $(this);

				if ($(this).parents('.block-item').hasClass('active')) {
					$(this).parents('.block-item').find('.block-item-invisible-part').stop().slideUp(300);
					$(this).parents('.block-item').removeClass('active');
				} else {
					$itemVisiblePart.parents('.block-item').find('.block-item-invisible-part').stop().slideUp(300);
					$(this).parents('.block-item').find('.block-item-invisible-part').stop().slideDown(300);

					$itemVisiblePart.parents('.block-item').removeClass('active');
					$(this).parents('.block-item').addClass('active');
				}

				if ($(this).parents('.block-item').hasClass('active')) {
					setTimeout(function(){
						$('html, body').stop().animate({
						    scrollTop: $this.offset().top - $('header').height() - 10
						}, 300);
					}, 300);
				}
			});
		}
	},
	sectionType_30: function(){
		if ($('section.type-30')[0]) {
			var $section = $('section.type-30');

			$section.each(function(){
				var $tabButton = $(this).find('.tab-button-item'),
					$tabInfo = $(this).find('.tab-info-item'),
					$tabContainer = $(this).find('.tab-content');

				// initial setup
				$tabButton.eq(0).addClass('active');
				
				TweenLite.set($tabInfo, {visibility:'hidden', position:'absolute', top:'-1000vw', left:'-1000vw'});
				TweenLite.set($tabInfo.eq(0), {visibility:'visible', position:'relative', top:'0px', left:'0px'});
				// initial setup end

				$tabButton.on('click', function(){
					var $this = $(this);

					$tabButton.removeClass('active');
					$(this).addClass('active');

					$tabInfo.removeClass('active');
					$tabInfo.eq($(this).index()).addClass('active');

				    TweenLite.set($tabInfo, {visibility:'hidden', position:'absolute', top:'-1000vw', left:'-1000vw'});
				    TweenLite.set($tabInfo.eq($(this).index()), {visibility:'visible', position:'relative', top:'0px', left:'0px'});
				    TweenLite.fromTo($tabInfo.eq($(this).index()), 0.3, {opacity:0}, {opacity:1, ease:Power1.easeOut});

				    if ($this.hasClass('active')) {
				    	setTimeout(function(){
				    		$('html, body').stop().animate({
				    		    scrollTop: $this.parents('.tab-content').find('.tab-content-part-item-2').offset().top - $('header').height() - 10
				    		}, 300);
				    	}, 300);
				    }
				});
			});
		}
	},
	sectionType_31: function(){
		if ($('section.type-31')[0]) {
			var $filterItem = $('section.type-31 .filter-item');

			$filterItem.eq(0).addClass('active');

			$filterItem.on('click', function(){
				if ($(this).hasClass('active')) {
					$(this).removeClass('active');
				} else {
					$(this).addClass('active');
				}
			});
		}
	},
	sectionType_34: function(){
		if ($('section.type-34')[0]) {
			var sliderDataMaxValue = $('section.type-34 .g__ui_slider-object').data('max-value');

			$('section.type-34 .g__ui_slider-object').slider({
		    	range: 'min',
		    	min: 1,
		    	max: sliderDataMaxValue,
		    	value: 1,
		    	animate: true,
				slide: function( event, ui ) {
					corpLcns = parseInt(ui.value) + 1;
					setAddLic();
					calculate();
				}
			});
		}
	},
	sectionType_38: function(){
		if ($('section.type-38')[0]) {
			var $copyEmailButton = $('#section_copy_email_button'),
				emailToCopy = $copyEmailButton.data('email-to-copy'),
				copyEmailButtonTextOriginal = $copyEmailButton.data('text-original'),
				copyEmailButtonTextAfterAction = $copyEmailButton.data('text-after-action');

			$copyEmailButton.on('click', function(){
				$(this).find('.el-link-1-2-2 .g__text').text(copyEmailButtonTextAfterAction);

				const el = document.createElement('textarea');    // Create a <textarea> element
				el.value = emailToCopy;                           // Set its value to the string that you want copied
				el.setAttribute('readonly', '');                  // Make it readonly to be tamper-proof
				el.style.position = 'absolute';                   
				el.style.left = '-9999px';                        // Move outside the screen to make it invisible
				document.body.appendChild(el);                    // Append the <textarea> element to the HTML document
				const selected =              
				  document.getSelection().rangeCount > 0          // Check if there is any content selected previously
				    ? document.getSelection().getRangeAt(0)       // Store selection if found
				    : false;                                      // Mark as false to know no selection existed before
				el.select();                                      // Select the <textarea> content
				document.execCommand('copy');                     // Copy - only works as a result of a user action (e.g. click events)
				document.body.removeChild(el);                    // Remove the <textarea> element
				if (selected) {                                   // If a selection existed before copying
					document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
					document.getSelection().addRange(selected);   // Restore the original selection
				}
			});

			$copyEmailButton.mouseout(function(){
				$(this).find('.el-link-1-2-2 .g__text').text(copyEmailButtonTextOriginal);
			});
		}
	},
	popUp: function(){
		if ($('.pop-up')[0]) {
			function initPopUp(popUpClass) {
				if ($('.' + popUpClass)[0]) {
					// common pop up var a
					var $commonPopUp = $('.' + popUpClass),
						$commonPopUpInner = $commonPopUp.find('.pop-up-inner'),
						$commonPopUpButton = $('.' + popUpClass + '-button'),
						$closePopUpButton = $('.' + popUpClass + ' .close-button'),
						$configPopUpButton = $('.' + popUpClass + '-config'),
						isMouseOverContent = false,
						commonPopUpTL = new TimelineLite();

					commonPopUpTL.pause();
					commonPopUpTL
						.set($('html, body'), {overflow:'hidden'})
						.from($commonPopUp, 0.01, {visibility:'hidden', pointerEvents:'none'}, 'one')
						.fromTo($commonPopUp.find('.background'), 0.2, {opacity:0}, {opacity:1}, 'one')
						.from($commonPopUp.find('.content'), 0.3, {delay:0.1, rotationX:-10, opacity:0}, 'one');

					$commonPopUpButton.on('click', function(e){
						e.preventDefault();

						reachGoal('telephoneup');
						
						var animationProgress = commonPopUpTL.progress();

						if (animationProgress != 1) {
							commonPopUpTL.play();
						} else {
				            commonPopUpTL.reverse();
						}
					});

					$closePopUpButton.on('click', function(e){
						e.preventDefault();
console.log('close');
						var animationProgress = commonPopUpTL.progress();

						if (animationProgress != 1) {
							commonPopUpTL.play();
						} else {
				            commonPopUpTL.reverse();
						}
					});

					$configPopUpButton.on('click', function(e){
						e.preventDefault();
						
						$("#fb_config").val(e.target.id.slice(6));
						//console.log('config ' + e.target.id);
						
						var animationProgress = commonPopUpTL.progress();

						if (animationProgress != 1) {
							commonPopUpTL.play();
						} else {
				            commonPopUpTL.reverse();
						}
					});

					$commonPopUpInner.find('.content').hover(function(){
						isMouseOverContent = true;
					}, function(){
						isMouseOverContent = false;
					});

					$commonPopUpInner.on('click', function(){
						if (isMouseOverContent == false) {
							commonPopUpTL.reverse();
						}
						choose();
					});

					// overflow auto fix
					fixPopUpOverflowAuto();

					$(window).resize(function(){
						fixPopUpOverflowAuto();
					});

					function fixPopUpOverflowAuto() {
						var commonPopUpHeight = $commonPopUp.find('.content').outerHeight(true);

						if (commonPopUpHeight >= $(window).height()) {
							$commonPopUpInner.removeClass('middle');
							$commonPopUpInner.addClass('align-items-flex-start');
						} else {
							$commonPopUpInner.removeClass('align-items-flex-start');
							$commonPopUpInner.addClass('middle');
						}
					}
					// common pop up var a end
				}
			}

			initPopUp('form-pop-up');
			initPopUp('form-pop-up2');
			initPopUp('text-pop-up-1');
			initPopUp('text-pop-up-2');

			if ($('.form-pop-up')[0]) {
				// radio button action
				var $formPopUpRadio_1_Objects = $('.form-pop-up-radio-1-object'),
					$formPopUpRadio_1_Object = $('#form_pop_up_radio_1_object'),
					$formPopUpRadio_1_Content = $('#form_pop_up_radio_1_content');

				$formPopUpRadio_1_Content.hide();

				$formPopUpRadio_1_Objects.change(function(){
					if ($formPopUpRadio_1_Object.is(':checked')) {
						$formPopUpRadio_1_Content.slideDown(300);
					} else {
						$formPopUpRadio_1_Content.slideUp(300);
					}
				});
				// radio button action end

				// tel number input
				var input = document.querySelector("#form_pop_up_tel_input_object");
				
				//window.intlTelInput(input);
				// tel number input end
			}
		}
	},
	gTable: function(){
		if ($('.g__table')[0]) {
			var $table = $('.g__table');

			$table.each(function(){
				var rowCount = $(this).find('.g__table-row').length - 1;

				if (rowCount % 2 == 0) {
					$(this).addClass('var-reverse-color');
				}
			});
		}
	},
	gForm: function(){
		if ($('.g__form input')[0]) {
			// DEV. TIP: Just add "error" class for .g__form-input to mark the input with an error. It will override other classes like "verified" and "focus"

			// input state
			var $input = $('.g__form input, .g__form textarea');

			$input.focus(function(){
				var $this = $(this),
					$gFormInput = $this.parents('.g__form-input');

				if ($this.attr('type') != 'submit' && $this.attr('type') != 'file') {
					$gFormInput.addClass('focus');
				}
			});

			$input.focusout(function(){
				var $this = $(this),
					$gFormInput = $this.parents('.g__form-input');

				if ($this.attr('type') != 'submit' && $this.attr('type') != 'file') {
					$gFormInput.removeClass('focus');

					if ($this.val() != '') {
						$gFormInput.addClass('verified');
					} else {
						$gFormInput.removeClass('verified');
					}
				}
			});
			// input state end

			// switcher
			var $switcher = $('.g__switcher');

			$switcher.on('click', function(){
				if ($(this).hasClass('active')) {
					$(this).removeClass('active');
				} else {
					$(this).addClass('active');
				}
				calculate();
			});
			// switcher end

			// radio
			var $radioGroupItem = $('.g__radio_button_group-item');

			$radioGroupItem.each(function(){
				if ($(this).find('.g__radio_button_group-label > .g__radio_button_group-real').is(':checked')) {
					$(this).addClass('active');
				}
			});

			$radioGroupItem.on('click', function(){
				$(this).parents('.g__radio_button_group').find('.g__radio_button_group-item').removeClass('active');

				$(this).addClass('active');
				calculate();
			});
			// radio end

			// radio 2
			var $radioGroupItem_2 = $('.g__radio_button_group_2-item');

			$radioGroupItem_2.addClass('unhover');

			$radioGroupItem_2.each(function(){
				if ($(this).find('.g__radio_button_group_2-label > .g__radio_button_group_2-real').is(':checked')) {
					$(this).addClass('active');
					$(this).removeClass('unhover');
				}
			});

			$radioGroupItem_2.hover(function(){
				$(this).removeClass('unhover');
			}, function(){
				if (!$(this).hasClass('active')) {
					$(this).addClass('unhover');
				}
			});

			$radioGroupItem_2.on('click', function(){
				var $this = $(this);

				if ($(this).find('input[type="radio"]')[0]) {
					$(this).parents('.g__radio_button_group_2').find('.g__radio_button_group_2-item').removeClass('active');

					$(this).addClass('active');
				}

				if ($(this).find('input[type="checkbox"]')[0]) {
					if ($(this).find('input').is(':checked')) {
						$(this).addClass('active');
					} else {
						$(this).removeClass('active');
					}
				}
				setExpHour($this.attr('id'));
				calculate();
			});
			// radio 2 end
		}
	},
	googleMap: function(){
		if ($('.g__google_map')[0]) {
			new Waypoint({
			    element: $('.g__google_map'),
			    handler: function(direction) {
			        //googleMapInit();
			    },
			    offset: '100%'
			});

			function googleMapInit() {
				var $maps = $('.g__google_map');

				$maps.each(function(){
				    var map,
			        	googleMapInited = true;

			        var $map = $(this),
			            $markers = $map.find('.g__google_map-marker');

			        var args = {
			            zoom: 18,
			            center: new google.maps.LatLng(0, 0),
			            mapTypeId: google.maps.MapTypeId.ROADMAP,
			            scrollwheel: false,
				        styles: [{"featureType": "all", "elementType": "geometry.fill", "stylers": [{"weight": "2.00"} ] }, {"featureType": "all", "elementType": "geometry.stroke", "stylers": [{"color": "#9c9c9c"} ] }, {"featureType": "all", "elementType": "labels.text", "stylers": [{"visibility": "on"} ] }, {"featureType": "landscape", "elementType": "all", "stylers": [{"color": "#f2f2f2"} ] }, {"featureType": "landscape", "elementType": "geometry.fill", "stylers": [{"color": "#ffffff"} ] }, {"featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [{"color": "#ffffff"} ] }, {"featureType": "poi", "elementType": "all", "stylers": [{"visibility": "off"} ] }, {"featureType": "road", "elementType": "all", "stylers": [{"saturation": -100 }, {"lightness": 45 } ] }, {"featureType": "road", "elementType": "geometry.fill", "stylers": [{"color": "#eeeeee"} ] }, {"featureType": "road", "elementType": "labels.text.fill", "stylers": [{"color": "#7b7b7b"} ] }, {"featureType": "road", "elementType": "labels.text.stroke", "stylers": [{"color": "#ffffff"} ] }, {"featureType": "road.highway", "elementType": "all", "stylers": [{"visibility": "simplified"} ] }, {"featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{"visibility": "off"} ] }, {"featureType": "transit", "elementType": "all", "stylers": [{"visibility": "off"} ] }, {"featureType": "water", "elementType": "all", "stylers": [{"color": "#46bcec"}, {"visibility": "on"} ] }, {"featureType": "water", "elementType": "geometry.fill", "stylers": [{"color": "#c8d7d4"} ] }, {"featureType": "water", "elementType": "labels.text.fill", "stylers": [{"color": "#070707"} ] }, {"featureType": "water", "elementType": "labels.text.stroke", "stylers": [{"color": "#ffffff"} ] } ]
				    }

			        map = new google.maps.Map($map[0], args);

			        map.markers = [];

			        $markers.each(function(){
			            if ($(this).data('lat') != '' || $(this).data('lng') != '') {
			                add_marker($(this), map);
			            }
			        });

			        center_map(map, $markers);
				});

		        function add_marker($marker, map) {
		            var latlng = new google.maps.LatLng($marker.data('lat'), $marker.data('lng')),
		            	mapMarkerUrl = $marker.data('image');

		             var image = {
		            	url: mapMarkerUrl
		            };

		            var marker = new google.maps.Marker({
		                position: latlng,
		                map: map,
		                icon: image
		            });

		            map.markers.push(marker);
		        }

		        function center_map(map, markers) {
		            var bounds = new google.maps.LatLngBounds();
		            var $CoorA = [];

		            markers.each(function () {
		                $CoorA.push($(this));
		            });

		            $.each(map.markers, function (i, marker) {
		            	if (tabletVer == true || mobileVer == true) {
		            		var latlng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
		            	} else {
		            		var latlng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
		            	}
		                

		                $CoorA[i].data('lat', marker.position.lat());
		                $CoorA[i].data('lng', marker.position.lng());

		                bounds.extend(latlng);
		            });

		            if (map.markers.length == 1) {
		                map.setCenter(bounds.getCenter());
		                map.setZoom(17);
		            } else {
		                map.fitBounds(bounds);
		            }
		        }

		        function center_map_by_marker(map, obj) {
		            var bounds = new google.maps.LatLngBounds();

		            $.each(map.markers, function (i, marker) {
		                marker.setIcon(mapMarkerUrl);
		            });

		            $.each(map.markers, function (i, marker) {
		                if (parseFloat(marker.position.lat().toFixed(7)) == parseFloat(obj.attr('data-lat')).toFixed(7) && parseFloat(marker.position.lng().toFixed(7)) == parseFloat(obj.attr('data-lng')).toFixed(7)) {
		                    var latlng = new google.maps.LatLng(parseFloat(marker.position.lat().toFixed(7)), parseFloat(marker.position.lng().toFixed(7)));

		                    bounds.extend(latlng);
		                    map.setCenter(bounds.getCenter());
		                    marker.setIcon(mapMarkerActiveUrl);

		                    infowindow.close();
		                    infowindow.setContent(infoWindowTextArray[i]);
		                    infowindow.open(map,marker);

		                    return;
		                }
		            });
		        }
			}
		}
	}
}

softUnity.init();

function tabsConstruct($tabItem, $contentItem) {
	$tabItem.eq(0).addClass('active');
	$contentItem.eq(0).addClass('active');

    TweenLite.set($contentItem, {visibility:'hidden', position:'absolute', top:'-1000vw', left:'-1000vw'});

    TweenLite.set($contentItem.eq(0), {visibility:'visible', position:'relative', top:'0px', left:'0px'});

    if (mobileVer == true) {
    	$contentItem.find('.g__tab_content-inner').hide();
    	$contentItem.find('.g__tab_content-inner').eq(0).show();
    }

	$tabItem.on('click', function(){
		$tabItem.removeClass('active');
		$(this).addClass('active');

		$contentItem.removeClass('active');
		$contentItem.eq($(this).index()).addClass('active');

        TweenLite.set($contentItem, {visibility:'hidden', position:'absolute', top:'-1000vw', left:'-1000vw'});

        TweenLite.set($contentItem.eq($(this).index()), {visibility:'visible', position:'relative', top:'0px', left:'0px'});

        TweenLite.fromTo($contentItem.eq($(this).index()), 0.3, {opacity:0}, {opacity:1, ease:Power1.easeOut});

        $contentItem.eq($(this).index()).find('.g__tab_content-inner').show();
	});

	$contentItem.find('.g__tab_content-content-item-mobile-tab').on('click', function(){
		var currentIndex = $(this).parent($contentItem).index();

		if (!$contentItem.eq(currentIndex).hasClass('active')) {
			$tabItem.removeClass('active');
			$tabItem.eq(currentIndex).addClass('active');

			$contentItem.removeClass('active');
			$contentItem.eq(currentIndex).addClass('active');

			TweenLite.set($contentItem, {visibility:'hidden', position:'absolute', top:'-1000vw', left:'-1000vw'});

			TweenLite.set($contentItem.eq(currentIndex), {visibility:'visible', position:'relative', top:'0px', left:'0px'});

			TweenLite.set($contentItem.eq(currentIndex), {opacity:1});

			$contentItem.find('.g__tab_content-inner').stop().slideUp(300);

			$contentItem.eq(currentIndex).find('.g__tab_content-inner').stop().slideDown(300);

			if ($contentItem.eq(currentIndex).hasClass('active')) {
				setTimeout(function(){
					$('html, body').stop().animate({
					    scrollTop: $contentItem.eq(currentIndex).offset().top - $('header').height() - 10
					}, 300);
				}, 300);
			}
		} else {
			$tabItem.eq(currentIndex).removeClass('active');
			$contentItem.eq(currentIndex).removeClass('active');

			$contentItem.eq(currentIndex).find('.g__tab_content-inner').stop().slideUp(300);
		}
	});
}
