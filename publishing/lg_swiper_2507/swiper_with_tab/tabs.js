document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTabId = button.dataset.tab;

            // 모든 탭 버튼의 active 클래스 제거
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // 클릭된 버튼에 active 클래스 추가
            button.classList.add('active');

            // 모든 탭 콘텐츠 숨기기
            tabContents.forEach(content => content.classList.remove('active'));
            // 대상 탭 콘텐츠 보여주기
            document.getElementById(targetTabId).classList.add('active');

            // 탭 전환 후 해당 스와이퍼 업데이트 및 첫 번째 슬라이드로 이동
            const swiperIndex = parseInt(targetTabId.replace('tab', '')) - 1; // 'tab1' -> 0, 'tab2' -> 1, 'tab3' -> 2
            if (swipers[swiperIndex]) {
                swipers[swiperIndex].update(); // 스와이퍼 레이아웃 업데이트
                swipers[swiperIndex].slideTo(0); // **이 부분이 추가되었습니다: 첫 번째 슬라이드로 이동**
            }
        });
    });

    // 페이지 로드 시 첫 번째 탭 활성화 (HTML에 active 클래스가 이미 있으므로 필요 없지만, 스크립트로 제어할 경우 사용)
    // tabButtons[0].click();
});