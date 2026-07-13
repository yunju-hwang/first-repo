   
        /* =========================================
           1. SPA (Single Page Application) 라우팅 로직
           ========================================= */
        function navigateTo(targetId) {
            // 모든 섹션 숨기기
            document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
            // 모든 네비게이션 링크 비활성화
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            
            // 타겟 섹션 보여주기
            const targetSection = document.getElementById(targetId);
            if(targetSection) {
                targetSection.classList.add('active');
            }

            // 클릭한 메뉴 활성화 처리
            const targetLinks = document.querySelectorAll(`.nav-link[data-target="${targetId}"]`);
            targetLinks.forEach(link => link.classList.add('active'));

            // URL Hash 변경 (SPA 특유의 주소줄 변경 - 새로고침 안됨)
            window.location.hash = targetId;
            
            // 페이지 최상단으로 이동 (옵션)
            window.scrollTo(0, 0);
        }

        // 메뉴 클릭 이벤트 바인딩
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // 기본 앵커 이동 방지
                const targetId = link.getAttribute('data-target');
                navigateTo(targetId);
            });
        });

        // 주소창(Hash)에 직접 접근했을 때 해당 화면 표시 (새로고침 대응)
        window.addEventListener('load', () => {
            const hash = window.location.hash.substring(1);
            if(hash && document.getElementById(hash)) {
                navigateTo(hash);
            }
        });


        /* =========================================
           2. 타이핑 효과 로직
           ========================================= */
        const words = ["a Developer.", "a Problem Solver.", "a Creator.", "Hong Gil Dong."];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typedTextElement = document.getElementById('typed-text');

        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }
            setTimeout(typeEffect, typeSpeed);
        }
        setTimeout(typeEffect, 1000);


        /* =========================================
           3. 프로젝트 모달 팝업 로직
           ========================================= */
        const projectData = {
            project1: {
                title: "스마트 화분 관리 시스템 (졸업 작품)",
                category: "IoT & AI Web Application",
                bgClass: "img-1",
                desc: "3인 프로젝트로, 아두이노를 통해 화분의 온습도 및 조도 데이터를 수집하고 Wi-Fi 모듈로 서버에 전송합니다. Node.js 백엔드와 MongoDB Atlas를 활용해 데이터를 저장하며, ChatGPT API를 호출하여 센서 데이터를 분석하고 사용자에게 맞춤형 식물 관리 가이드를 제안하는 기능을 구현했습니다. 모바일 앱(React Native, 카카오 로그인 연동)과 통합되어 실시간 관리가 가능합니다.",
                tech: "Node.js, MongoDB Atlas, Arduino, ChatGPT API, React Native, Kakao Auth",
                link: "https://github.com/yunju-hwang/ploony-backend"
            },
            project2: {
                title: "영화 리뷰 및 추천 시스템",
                category: "Movie Analyze",
                bgClass: "img-2",
                desc: "Spring, JPA, MySQL을 이용한 영화 플랫폼입니다. TMDB API로 데이터를 수집하고 ChatGPT API를 토애 리뷰 분석 및 추천 기능을 구현하여 리눅스 서버에 배포하였습니다.",
                tech: "Spring, JPA, MySQL",
                link: "https://github.com/yunju-hwang/Pro1_MovieList"
            }
           
        };

        const modalOverlay = document.getElementById('project-modal');
        const modalBody = document.getElementById('modal-body');

        function openModal(projectId) {
            const data = projectData[projectId];
            
            // 모달 내용 렌더링
            modalBody.innerHTML = `
                <div class="modal-header ${data.bgClass}">
                    ${data.category}
                </div>
                <div class="modal-desc">
                    <h2>${data.title}</h2>
                    <div class="tech">사용 기술: <span>${data.tech}</span></div>
                    <p>${data.desc}</p>
                    <div class="modal-action">
                        <a href="${data.link}" class="btn btn-primary" style="display:inline-block; padding: 10px 20px;">사이트 방문하기 &rarr;</a>
                    </div>
                </div>
            `;
            modalOverlay.classList.add('show');
        }

        function closeModal() {
            modalOverlay.classList.remove('show');
        }

        // 배경 클릭 시 닫기
        modalOverlay.addEventListener('click', function(e) {
            if(e.target === this) closeModal();
        });

        // ESC 키로 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('show')) closeModal();
        });
