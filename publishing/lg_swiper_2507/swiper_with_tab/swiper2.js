// 각 스와이퍼 인스턴스를 관리할 배열
const swipers = [];

for (let i = 1; i <= 3; i++) {
    const slideTexts = Array.from(document.querySelectorAll(`.wrap-${i} .swiper-slide`)).map(
        (slide) => slide.dataset.slideText || slide.innerText
    );

    const paginationEl = document.querySelector(`.wrap-${i} .pagination-${i}`);
    const mainTextEl = document.querySelector(`.wrap-${i} .text-wrap-${i}`);

    // css 변수 설정
    if (paginationEl) {
        const bulletHeight = 78;
        paginationEl.style.setProperty('--bullet-height', `${bulletHeight}px`);
    }
    if (mainTextEl) {
        const slideTextHeight = 42;
        mainTextEl.style.setProperty('--slide-text-height', `${slideTextHeight}px`);
    }

    const mySwiper = new Swiper(`.swiper-container-${i}`, {
        loop: false,
        pagination: {
            el: `.pagination-${i}`,
            clickable: true,
            renderBullet: (index, className) => {
                const text = slideTexts[index];
                return `<button class="${className}"><div class="bullet-wrap"><span>${
                    index + 1
                }</span><p>${text}</p></div></button>`;
            },
        },
        navigation: {
            nextEl: `.button-next-${i}`,
            prevEl: `.button-prev-${i}`,
        },
        on: {
            slideChange: (swiper) => {
                updateAfterPosition(swiper, i); // 스와이퍼 인덱스 전달
                updateNavButtons(swiper, i); // 스와이퍼 인덱스 전달
            },
            init: (swiper) => {
                updateAfterPosition(swiper, i); // 스와이퍼 인덱스 전달
                updateNavButtons(swiper, i); // 스와이퍼 인덱스 전달
            },
        },
    });

    swipers.push(mySwiper); // 생성된 스와이퍼 인스턴스를 배열에 추가
}

function updateNavButtons(swiper, index) {
    const isBeginning = swiper.isBeginning;
    const isEnd = swiper.isEnd;

    const prevBtn = document.querySelector(`.wrap-${index} .button-prev-${index}`);
    const nextBtn = document.querySelector(`.wrap-${index} .button-next-${index}`);

    if (prevBtn) prevBtn.style.display = isBeginning ? 'none' : 'block';
    if (nextBtn) nextBtn.style.display = isEnd ? 'none' : 'block';
}

function updateAfterPosition(swiper, index) {
    const realIndex = (swiper.realIndex || 0) + 1;
    const paginationEl = document.querySelector(`.wrap-${index} .pagination-${index}`);
    const mainTextEl = document.querySelector(`.wrap-${index} .text-wrap-${index}`);

    if (paginationEl) {
        paginationEl.style.setProperty(`--current-slide-index-${index}`, realIndex);
    }
    if (mainTextEl) {
        mainTextEl.style.setProperty(`--current-slide-index-${index}`, realIndex);
    }
}

// 초기 로드 시 모든 스와이퍼의 위치 업데이트
swipers.forEach((swiper, index) => {
    updateAfterPosition(swiper, index + 1);
});