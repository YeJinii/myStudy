document.addEventListener("DOMContentLoaded", function() {
  // service tab all
  const tabBtn = $('.service_tab_menu li');
  const tabContent = $('.service_tab_content');
  
  for (let i = 0; i < tabBtn.length; i++) {
    tabBtn.eq(i).on("click", function() {
      tabBtn.removeClass('on');
      tabBtn.eq(i).addClass('on');
      tabContent.removeClass('active');
      tabContent.eq(i).addClass('active');

      $('html, body').animate({scrollTop: $('.container.rental').offset().top}, 300);  
      if (window.innerWidth <= 768) {
        $('html, body').animate({scrollTop: $('.container.rental').offset().top - 65}, 300);  
      }
    });
  }

  // product tab
  const productTabBtn = $('.product_tab .tab_menu li');
  const productTabContent = $('.product_tab_content');
  
  for (let i = 0; i < productTabBtn.length; i++) {
    productTabBtn.eq(i).on("click", function() {
      productTabBtn.removeClass('on');
      productTabBtn.eq(i).addClass('on');
      productTabContent.removeClass('active');
      productTabContent.eq(i).addClass('active');

      $('html, body').animate({scrollTop: $('.care_sec03').offset().top - 80}, 300); 
    });
  }

  if (window.innerWidth <= 768) {
    productTabBtn.on('click', function() {
      var clickProduct = $(this).index();
  
       // 해당 슬라이드로 이동
      tabSlide.slideTo(clickProduct, 300);
    });
  }

  
  // 스크롤 이벤트 리스너
  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    
    var st0001Height = $('.ST0001 .cmp-image').outerHeight() + 65;
    var serviceTabMenuOffset = $('.service_tab_menu').offset().top;

    // service_tab_menu 상단 고정 (ST0001 높이 끝날 때부터 고정)
    if (scrollTop >= st0001Height) {
      $('.service_tab_menu').addClass('fixed');
    } else {
      $('.service_tab_menu').removeClass('fixed');
    }

    // product_tab_menu 상단 고정
    var productTabMenuOffset = $('.service_tab_content.care .product_tab').offset().top;

    if ($('.service_tab_content.care').hasClass('active')) {
      if (scrollTop >= productTabMenuOffset) {
        $('.product_tab .tab_menu_wrap').addClass('fixed').css('top', $('.service_tab_menu').outerHeight());
      } else {
        $('.product_tab .tab_menu_wrap').removeClass('fixed').css('top', '');
      }
    } else {
      $('.product_tab .tab_menu_wrap').removeClass('fixed').css('top', '');
    }
  });

  //modal
  const modalOpen = $('.service_tab_content .video_popup');
  const modalClose = $('.layer_popup .close');

  modalOpen.click(function() {
    $(this).parent().next('.layer_popup').addClass('active');
    $('body').addClass('popup_open');
  });
  modalClose.click(function () {
    // $(this).parents('.modal-installration').removeClass('active');
    $('body').removeClass('popup_open');
  });
  
  $('.layer_popup .close').click(function() {
    var iframe = $(this).closest('.layer_popup').find('iframe');
    var src = iframe.attr('src');
  
    iframe.attr('src', '');
  
    setTimeout(function() {
      iframe.attr('src', src);
    }, 100);
  
    $(this).closest('.layer_popup').removeClass('active');
  });

  // more btn
  const btnMore = $('.wtr_list .btn_more a');
  const moreContents = $('.wtr_list .moreContents');

  btnMore.on('click', function(e) {
    moreContents.toggleClass('on');
    btnMore.toggleClass('close');

    if (!moreContents.hasClass('on')) {
      $('html,body').animate({scrollTop:$('.service_sec01').offset().top}, 300);
      if (window.innerWidth <= 768) {
        $('html,body').animate({scrollTop:$('.service_sec01').offset().top - 65}, 300);
      }
    }
  });

  // accordian FAQ
  $('.faq_list .accordion li').each(function () {
    const btnAccordion = $(this);
    const toggleHead = btnAccordion.children().first();
    const toggleBody = btnAccordion.children('.accordion .faq_body');

    toggleHead.click(function () {

      $('.faq_list .accordion li').not(btnAccordion).removeClass('open');
      $('.faq_list .accordion li').not(btnAccordion).children('.accordion .faq_body').slideUp().removeClass('faq_toggle');

      if(!btnAccordion.hasClass('open')) {
        btnAccordion.addClass('open');
        toggleBody.slideDown();
      } else {
        btnAccordion.removeClass('open');
        toggleBody.slideUp();
      }

      $('html, body').animate({scrollTop: btnAccordion.offset().top - 100}, 0);  
    });
  });









  // Swiper

  // progress Swiper
  var stepList = new Swiper(".stepList", {
    slidesPerView: "auto", 
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // table slide 
  var tableSlide = new Swiper(".tableSlide", {
    direction: "horizontal",
    slidesPerView: "auto",
    freeMode: true,
    scrollbar: {
      el: ".swiper-scrollbar",
    },
    mousewheel: {
      // forceToAxis: true,
      releaseOnEdges: true,
    }
  });

  // care Swiper
  var careSwiper = new Swiper(".care_swiper", {
    slidesPerView: "auto",
    spaceBetween: 12,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        spaceBetween: "auto",
      },
    },
  });

  // product tab slide 
  var tabSlide = new Swiper(".product_tab .tab_menu", {
    direction: "horizontal",
    slidesPerView: "auto",
    freeMode: true,
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
    mousewheel: {
      releaseOnEdges: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // self guide
  var selfGuide = new Swiper(".self_care .guide_box", {
    slidesPerView: "auto",
    centeredSlides: false,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

});