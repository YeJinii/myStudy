document.addEventListener('DOMContentLoaded', function() {
    const tabItems = document.querySelectorAll('.tab-menu .tab-item');
    const tabContents = document.querySelectorAll('.tab-content-container .tab-content');

    const activeSwipers = new Map();

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

    function initializeSwiperForTab(tabContentElement) {
        const swiperContainer = tabContentElement.querySelector('.swiper-container');

        if (activeSwipers.has(swiperContainer)) {
            activeSwipers.get(swiperContainer).slideTo(0);
            updateActiveButton(swiperContainer, 0);
            return;
        }

        if (swiperContainer) {
            const mySwiper = new Swiper(swiperContainer, {
                direction: 'horizontal',
                loop: false,
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
                pagination: {
                    el: swiperContainer.querySelector('.swiper-pagination'),
                    clickable: true,
                },
                navigation: {
                    nextEl: swiperContainer.querySelector('.swiper-button-next'),
                    prevEl: swiperContainer.querySelector('.swiper-button-prev'),
                },
                scrollbar: {
                    el: swiperContainer.querySelector('.swiper-scrollbar'),
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

            mySwiper.on('slideChange', function () {
                updateActiveButton(swiperContainer, mySwiper.activeIndex);
                // 슬라이드 변경 시 h4 너비에 맞춰 text-wrap 너비 조정
                setH4WidthToTextWrap(mySwiper.slides[mySwiper.activeIndex]);
            });

            updateActiveButton(swiperContainer, mySwiper.activeIndex);

            // 초기 로드 시 또는 탭 전환 시 현재 활성 슬라이드의 h4 너비 적용
            setH4WidthToTextWrap(mySwiper.slides[mySwiper.activeIndex]);
        }
    }

    function updateActiveButton(swiperContainer, activeIndex) {
        const navButtons = swiperContainer.closest('.swiper-wrap').querySelectorAll('.left-nav .nav-button');
        navButtons.forEach(button => {
            button.classList.remove('active');
        });
        if (navButtons[activeIndex]) {
            navButtons[activeIndex].classList.add('active');
        }
    }

    // h4 너비를 text-wrap에 적용하는 함수
    function setH4WidthToTextWrap(slideElement) {
        const textWrapElement = slideElement.querySelector('.text-wrap');
        const h4Element = textWrapElement ? textWrapElement.querySelector('h4') : null;

        if (h4Element && textWrapElement) {
            const h4Width = h4Element.getBoundingClientRect().width;
            textWrapElement.style.width = h4Width + 'px';
        }
    }

    const initialActiveTab = document.querySelector('.tab-content-container .tab-content.active');
    if (initialActiveTab) {
        initializeSwiperForTab(initialActiveTab);
    }
});