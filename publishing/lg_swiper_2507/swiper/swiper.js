const slideTexts = Array.from(document.querySelectorAll('.swiper-slide')).map(
    (slide) => slide.dataset.slideText || slide.innerText
);

const paginationEl = document.querySelector('.my-swiper-pagination');
const mainTextEl = document.querySelector('.main-text-wrap');

// css 변수 설정
if (paginationEl) {
    const bulletHeight = 78;
    paginationEl.style.setProperty('--bullet-height', `${bulletHeight}px`);
}
if (mainTextEl) {
    const slideTextHeight = 42;
    mainTextEl.style.setProperty('--slide-text-height', `${slideTextHeight}px`);
}

const mySwiper = new Swiper('.swiper-container', {
    loop: false,
    pagination: {
        el: '.my-swiper-pagination',
        clickable: true,
        renderBullet: (index, className) => {
            const text = slideTexts[index];
            return `<button class="${className}"><div class="bullet-wrap"><span>${
            index + 1
            }</span><p>${text}</p></div></button>`;
        },
    },
    navigation: {
        nextEl: '.my-swiper-button-next',
        prevEl: '.my-swiper-button-prev',
    },
    on: {
        slideChange: (swiper) => {
            updateAfterPosition(swiper);
            updateNavButtons(swiper);
        },
        init: (swiper) => {
            updateAfterPosition(swiper);
            updateNavButtons(swiper);
        },
    },
});

function updateNavButtons(swiper) {
    const isBeginning = swiper.isBeginning;
    const isEnd = swiper.isEnd;

    const prevBtn = document.querySelector('.my-swiper-button-prev');
    const nextBtn = document.querySelector('.my-swiper-button-next');

    if (prevBtn) prevBtn.style.display = isBeginning ? 'none' : 'block';
    if (nextBtn) nextBtn.style.display = isEnd ? 'none' : 'block';
}

function updateAfterPosition(swiper) {
    const realIndex = (swiper.realIndex || 0) + 1;
    if (paginationEl) {
        paginationEl.style.setProperty('--current-slide-index', realIndex);
    }
    if (mainTextEl) {
        mainTextEl.style.setProperty('--current-slide-index', realIndex);
    }
}

updateAfterPosition(mySwiper);