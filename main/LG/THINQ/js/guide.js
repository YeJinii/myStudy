document.addEventListener('DOMContentLoaded', function () {
    const tabItems = document.querySelectorAll('.tab-menu .tab-item');
    const tabContents = document.querySelectorAll('.tab-content-container .tab-content');
    const activeSwipers = new Map();

    const pathToLeftActive = './images/guide/lg-subscribe-2025-thinq-guide-swiper.svg';
    const pathToLeftDisabled = './images/guide/lg-subscribe-2025-thinq-guide-swiper-disabled.svg';
    const pathToRightActive = './images/guide/lg-subscribe-2025-thinq-guide-swiper.svg';
    const pathToRightDisabled = './images/guide/lg-subscribe-2025-thinq-guide-swiper-disabled.svg';

    tabItems.forEach(item => {
        item.addEventListener('click', function () {
            tabItems.forEach(tab => tab.classList.remove('active'));
            this.classList.add('active');

            tabContents.forEach(content => content.classList.remove('active'));
            const targetTabId = this.dataset.tab;
            const targetContent = document.getElementById(targetTabId);

            if (targetContent) {
                targetContent.classList.add('active');
                initializeSwiperForTab(targetContent);
                setupPopupsInTab(targetContent);
            }
        });
    });

    activeThniQPagination(document.querySelectorAll('.tab-content-container .tab-content .swiper-wrap')[0], 1);

    function initializeSwiperForTab(tabContentElement) {
        const swiperContainer = tabContentElement.querySelector('.guide-wrap .swiper-container');
        const swiperWrapElement = tabContentElement.querySelector('.guide-wrap .swiper-wrap');
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
            button.addEventListener('click', function () {
                const slideIndex = parseInt(this.dataset.slide);
                mySwiper.slideTo(slideIndex);
            });
        });

        const paginationCircles = swiperWrapElement.querySelectorAll('.thinq-pagination-circle');
        paginationCircles.forEach((circle, index) => {
            circle.addEventListener('click', () => {
                mySwiper.slideTo(index);
            });
        });

        mySwiper.on('slideChange', function (swiper) {
            updateActiveButton(swiper.el, swiper.activeIndex);
            updateSwiperNavImages(swiper);
            activeThniQPagination(swiperWrapElement, swiper.activeIndex + 1);
        });

        mySwiper.on('init', function (swiper) {
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
        let wrapper = container.querySelector('.thinq-pagination-wrapper');
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

    function setupPopupsInTab(tabContentElement) {
        const triggers = tabContentElement.querySelectorAll('.tooltip_trigger');

        triggers.forEach(trigger => {
            const popupId = trigger.dataset.popup;
            const popup = document.getElementById('popup_' + popupId);

            if (!popup) return;

            const closeBtn = popup.querySelector('.popup-close');
            const dimmed = popup.querySelector('.dimmed');

            trigger.addEventListener('click', () => {
                popup.style.display = 'block';
                initializePopupSwiper(popup);
            });

            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    popup.style.display = 'none';
                });
            }

            if (dimmed) {
                dimmed.addEventListener('click', () => {
                    popup.style.display = 'none';
                });
            }
        });
    }

    function initializePopupSwiper(popupElement) {
        const container = popupElement.querySelector('.popup-swiper-container');

        // 이미 초기화된 경우 무시
        if (!container || container.classList.contains('swiper-initialized')) return;

        const prevButton = popupElement.querySelector('.popup-swiper-prev');
        const nextButton = popupElement.querySelector('.popup-swiper-next');

        const swiper = new Swiper(container, {
            slidesPerView: 1,
            spaceBetween: 10,
            autoHeight: true,
            loop: false,
            navigation: {
                nextEl: nextButton,
                prevEl: prevButton,
            },
            on: {
                init: function () {
                    updatePopupSwiperNavBackground(this);
                    togglePopupSlideContent(this.activeIndex, popupElement);
                },
                slideChange: function () {
                    updatePopupSwiperNavBackground(this);
                    togglePopupSlideContent(this.activeIndex, popupElement);
                }
            }
        });

        container.classList.add('swiper-initialized');

        swiper.init();
    }

    function updatePopupSwiperNavBackground(swiperInstance) {
        const prevBtn = swiperInstance.navigation.prevEl;
        const nextBtn = swiperInstance.navigation.nextEl;

        if (prevBtn) {
            prevBtn.style.backgroundImage = `url('${swiperInstance.isBeginning ? pathToLeftDisabled : pathToLeftActive}')`;
        }
        if (nextBtn) {
            nextBtn.style.backgroundImage = `url('${swiperInstance.isEnd ? pathToRightDisabled : pathToRightActive}')`;
        }
    }

    function togglePopupSlideContent(activeIndex, popupElement) {
        const slide1 = popupElement.querySelectorAll('.slide-1');
        const slide2 = popupElement.querySelectorAll('.slide-2');

        if (slide1.length || slide2.length) {
            slide1.forEach(el => el.style.display = 'none');
            slide2.forEach(el => el.style.display = 'none');

            if (activeIndex === 0) {
                slide1.forEach(el => el.style.display = 'block');
            } else if (activeIndex === 1) {
                slide2.forEach(el => el.style.display = 'block');
            }
        }
    }

    // 최초 실행
    const initialActiveTab = document.querySelector('.tab-content-container .tab-content.active');
    if (initialActiveTab) {
        initializeSwiperForTab(initialActiveTab);
        setupPopupsInTab(initialActiveTab);
    }
});
