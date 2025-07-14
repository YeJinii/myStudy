document.addEventListener('DOMContentLoaded', function() {
    const tabItems = document.querySelectorAll('.tab-menu .tab-item');
    const tabContents = document.querySelectorAll('.tab-content-container .tab-content');
    const activeSwipers = new Map();

    const pathToLeftActive = './imgs/swiper_button_icon.svg';
    const pathToLeftDisabled = './imgs/swiper_button_icon_n.svg';
    const pathToRightActive = './imgs/swiper_button_icon.svg';
    const pathToRightDisabled = './imgs/swiper_button_icon_n.svg';

    tabItems.forEach(item => {
        item.addEventListener('click', function() {
            tabItems.forEach(tab => tab.classList.remove('active'));
            this.classList.add('active');

            tabContents.forEach(content => content.classList.remove('active'));
            const targetTabId = this.dataset.tab;
            const targetContent = document.getElementById(targetTabId);

            if (targetContent) {
                targetContent.classList.add('active');
                initializeSwiperForTab(targetContent);
            }
        });
    });

    activeThniQPagination(document.querySelectorAll('.tab-content-container .tab-content .swiper-wrap')[0], 1); 

    function initializeSwiperForTab(tabContentElement) {
        const swiperContainer = tabContentElement.querySelector('.swiper-container');
        const swiperWrapElement = tabContentElement.querySelector('.swiper-wrap');
        const prevButton = swiperWrapElement.querySelector('.custom-swiper-button-prev');
        const nextButton = swiperWrapElement.querySelector('.custom-swiper-button-next');

        if (activeSwipers.has(swiperContainer)) {
            const existingSwiper = activeSwipers.get(swiperContainer);
            existingSwiper.slideTo(0, 0);
            updateActiveButton(swiperContainer, 0);
            updateSwiperNavImages(existingSwiper);
            activeThniQPagination(swiperWrapElement, 1);
            return;
        }

        const mySwiper = new Swiper(swiperContainer, {
            direction: 'horizontal',
            autoHeight: true,
            loop: false,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            navigation: {
                nextEl: nextButton,
                prevEl: prevButton,
            },
        });

        activeSwipers.set(swiperContainer, mySwiper);

        const navButtons = tabContentElement.querySelectorAll('.left-nav .nav-button');
        navButtons.forEach(button => {
            button.addEventListener('click', function() {
                const slideIndex = parseInt(this.dataset.slide);
                mySwiper.slideTo(slideIndex);
            });
        });

        mySwiper.on('slideChange', function(swiper) {
            updateActiveButton(swiper.el, swiper.activeIndex);
            updateSwiperNavImages(swiper);
            activeThniQPagination(swiperWrapElement, swiper.activeIndex + 1);
        });
        
        mySwiper.on('init', function(swiper) {
            updateActiveButton(swiper.el, swiper.activeIndex);
            updateSwiperNavImages(swiper);
            activeThniQPagination(swiperWrapElement, swiper.activeIndex + 1);
        });
        
        mySwiper.init();
    }

    function updateSwiperNavImages(swiperInstance) {
        const prevImg = swiperInstance.navigation.prevEl.querySelector('img');
        const nextImg = swiperInstance.navigation.nextEl.querySelector('img');

        if (prevImg) {
            prevImg.src = swiperInstance.isBeginning ? pathToLeftDisabled : pathToLeftActive;
        }
        if (nextImg) {
            nextImg.src = swiperInstance.isEnd ? pathToRightDisabled : pathToRightActive;
        }
    }

    function activeThniQPagination(container, targetPage) {
        const wrapper = container.querySelector('.thinq-pagination-wrapper');
        if (!wrapper) {
            wrapper = document.querySelectorAll('.thinq-pagination-wrapper')[0];
        }
        const circles = wrapper.querySelectorAll('.thinq-pagination-circle');
        const plineSpan = wrapper.querySelector('.thinq-pagination-line span');

        circles.forEach((circle, idx) => {
            circle.classList.remove('on', 'off', 'active');
            if (idx + 1 < targetPage) {
                circle.classList.add('on');
            } else if (idx + 1 === targetPage) {
            circle.classList.add('active');
            } else {
            circle.classList.add('off');
            }
        });

        const wrapperRect = wrapper.getBoundingClientRect();

        const getCenterX = el => {
        const rect = el.getBoundingClientRect();
        return (rect.left + rect.right) / 2 - wrapperRect.left;
        };
    
        const startX = getCenterX(circles[0]);
        const currentX = getCenterX(circles[targetPage - 1]);
    
        let endX;
        if (targetPage < circles.length) {
        const nextX = getCenterX(circles[targetPage]);
        endX = (currentX + nextX) / 2;
        } else {
        endX = currentX;
        }
    
        const lineWidth = endX - startX;
        plineSpan.style.left = `${startX}px`;
        plineSpan.style.width = `${lineWidth}px`;
    }

    function updateActiveButton(swiperContainer, activeIndex) {
        const currentTabContent = swiperContainer.closest('.tab-content');
        if (!currentTabContent) return;

        const navButtons = currentTabContent.querySelectorAll('.left-nav .nav-button');
        navButtons.forEach(button => {
            button.classList.remove('active');
        });
        if (navButtons[activeIndex]) {
            navButtons[activeIndex].classList.add('active');
        }
    }

    const initialActiveTab = document.querySelector('.tab-content-container .tab-content.active');
    if (initialActiveTab) {
        initializeSwiperForTab(initialActiveTab);
    }
});