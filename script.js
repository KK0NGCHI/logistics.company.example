// ===================================
// 전역 변수 및 설정
// ===================================
let isMenuOpen = false;
let currentTab = "all";
let currentPage = 1;
let itemsPerPage = 10;

// ===================================
// DOM 로드 완료 시 초기화
// ===================================
document.addEventListener("DOMContentLoaded", function () {
    // 페이지 로드 애니메이션
    document.body.style.opacity = "1";

    // 네비게이션 초기화
    initNavigation();

    // 폼 초기화
    initForms();

    // 탭 시스템 초기화
    initTabs();

    // FAQ 초기화
    initFAQ();

    // 검색 기능 초기화
    initSearch();

    // 페이지네이션 초기화
    initPagination();

    // 필터 기능 초기화
    initFilters();

    // 차트 컨트롤 초기화
    initChartControls();

    // 스크롤 효과 초기화
    initScrollEffects();

    // 카운터 애니메이션 초기화
    initCounterAnimation();

    // 툴팁 초기화
    initTooltips();

    // 모달 초기화
    initModals();

    // 알림 시스템 초기화
    initNotifications();
});

// ===================================
// 네비게이션 관련 함수
// ===================================
function initNavigation() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    const dropdowns = document.querySelectorAll(".dropdown");

    // 햄버거 메뉴 토글
    if (hamburger) {
        hamburger.addEventListener("click", function () {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            isMenuOpen = !isMenuOpen;

            // 바디 스크롤 제어
            document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
        });
    }

    // 네비게이션 링크 클릭 시 메뉴 닫기
    navLinks.forEach((link) => {
        link.addEventListener("click", function () {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
                isMenuOpen = false;
                document.body.style.overflow = "auto";
            }
        });
    });

    // 드롭다운 메뉴 호버 효과 (데스크톱)
    dropdowns.forEach((dropdown) => {
        const dropdownMenu = dropdown.querySelector(".dropdown-menu");

        if (dropdownMenu) {
            dropdown.addEventListener("mouseenter", function () {
                if (window.innerWidth > 768) {
                    dropdownMenu.style.opacity = "1";
                    dropdownMenu.style.visibility = "visible";
                    dropdownMenu.style.transform = "translateY(0)";
                }
            });

            dropdown.addEventListener("mouseleave", function () {
                if (window.innerWidth > 768) {
                    dropdownMenu.style.opacity = "0";
                    dropdownMenu.style.visibility = "hidden";
                    dropdownMenu.style.transform = "translateY(-10px)";
                }
            });
        }
    });

    // 스크롤 시 헤더 그림자 효과
    window.addEventListener("scroll", function () {
        const header = document.querySelector(".header");
        if (header) {
            if (window.scrollY > 50) {
                header.style.boxShadow = "0 2px 20px rgba(220, 38, 38, 0.15)";
            } else {
                header.style.boxShadow = "0 2px 10px rgba(220, 38, 38, 0.1)";
            }
        }
    });

    // 윈도우 리사이즈 시 메뉴 상태 초기화
    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
            isMenuOpen = false;
            document.body.style.overflow = "auto";
        }
    });
}

// ===================================
// 폼 관련 함수
// ===================================
function initForms() {
    const forms = document.querySelectorAll("form");

    forms.forEach((form) => {
        // 폼 제출 처리
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            if (validateForm(form)) {
                submitForm(form);
            }
        });

        // 실시간 유효성 검사
        const inputs = form.querySelectorAll("input, textarea, select");
        inputs.forEach((input) => {
            input.addEventListener("blur", function () {
                validateField(input);
            });

            input.addEventListener("input", function () {
                clearFieldError(input);
            });
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll("[required]");

    requiredFields.forEach((field) => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    // 이메일 유효성 검사
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach((field) => {
        if (field.value && !isValidEmail(field.value)) {
            showFieldError(field, "올바른 이메일 주소를 입력해주세요.");
            isValid = false;
        }
    });

    // 전화번호 유효성 검사
    const phoneFields = form.querySelectorAll('input[type="tel"]');
    phoneFields.forEach((field) => {
        if (field.value && !isValidPhone(field.value)) {
            showFieldError(field, "올바른 전화번호를 입력해주세요.");
            isValid = false;
        }
    });

    return isValid;
}

function validateField(field) {
    clearFieldError(field);

    if (field.hasAttribute("required") && !field.value.trim()) {
        showFieldError(field, "필수 입력 항목입니다.");
        return false;
    }

    if (field.type === "email" && field.value && !isValidEmail(field.value)) {
        showFieldError(field, "올바른 이메일 주소를 입력해주세요.");
        return false;
    }

    if (field.type === "tel" && field.value && !isValidPhone(field.value)) {
        showFieldError(field, "올바른 전화번호를 입력해주세요.");
        return false;
    }

    return true;
}

function showFieldError(field, message) {
    clearFieldError(field);

    const errorElement = document.createElement("div");
    errorElement.className = "field-error";
    errorElement.textContent = message;

    field.style.borderColor = "#ef4444";
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    const errorElement = field.parentNode.querySelector(".field-error");
    if (errorElement) {
        errorElement.remove();
    }
    field.style.borderColor = "";
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[0-9-+().\s]+$/;
    return phoneRegex.test(phone) && phone.replace(/[^0-9]/g, "").length >= 10;
}

function submitForm(form) {
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    // 로딩 상태
    submitButton.textContent = "전송 중...";
    submitButton.disabled = true;

    // 실제 환경에서는 서버로 데이터 전송
    setTimeout(() => {
        // 성공 메시지 표시
        showNotification("문의가 성공적으로 전송되었습니다.", "success");

        // 폼 초기화
        form.reset();

        // 버튼 상태 복원
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// ===================================
// 탭 시스템
// ===================================
function initTabs() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const targetTab = this.getAttribute("data-tab");

            // 모든 탭 버튼 비활성화
            tabButtons.forEach((btn) => btn.classList.remove("active"));

            // 모든 탭 콘텐츠 숨기기
            tabContents.forEach((content) => {
                content.classList.remove("active");
                content.style.display = "none";
            });

            // 선택된 탭 활성화
            this.classList.add("active");

            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add("active");
                targetContent.style.display = "block";
            }
        });
    });

    // FAQ 카테고리 탭
    const categoryTabs = document.querySelectorAll(".category-tabs .tab-btn");
    categoryTabs.forEach((tab) => {
        tab.addEventListener("click", function () {
            const category = this.getAttribute("data-category");
            filterFAQByCategory(category);

            categoryTabs.forEach((t) => t.classList.remove("active"));
            this.classList.add("active");
        });
    });
}

// ===================================
// FAQ 기능
// ===================================
function initFAQ() {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        const toggle = item.querySelector(".faq-toggle");

        if (question && answer && toggle) {
            question.addEventListener("click", function () {
                const isOpen = answer.classList.contains("active");

                // 다른 FAQ 항목들 닫기
                faqItems.forEach((otherItem) => {
                    const otherAnswer = otherItem.querySelector(".faq-answer");
                    const otherToggle = otherItem.querySelector(".faq-toggle");
                    if (otherAnswer && otherToggle && otherItem !== item) {
                        otherAnswer.classList.remove("active");
                        otherAnswer.style.display = "none";
                        otherToggle.textContent = "+";
                        otherToggle.style.transform = "rotate(0deg)";
                    }
                });

                // 현재 항목 토글
                if (isOpen) {
                    answer.classList.remove("active");
                    answer.style.display = "none";
                    toggle.textContent = "+";
                    toggle.style.transform = "rotate(0deg)";
                } else {
                    answer.classList.add("active");
                    answer.style.display = "block";
                    toggle.textContent = "−";
                    toggle.style.transform = "rotate(180deg)";
                }
            });
        }
    });
}

function filterFAQByCategory(category) {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");

        if (category === "all" || itemCategory === category) {
            item.style.display = "block";
            item.style.animation = "fadeIn 0.3s ease";
        } else {
            item.style.display = "none";
        }
    });
}

// ===================================
// 검색 기능
// ===================================
function initSearch() {
    const searchInputs = document.querySelectorAll(".search-input");
    const searchButtons = document.querySelectorAll(".search-btn");

    searchInputs.forEach((input) => {
        input.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                performSearch(this.value, this);
            }
        });
    });

    searchButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const input = this.parentNode.querySelector(".search-input");
            if (input) {
                performSearch(input.value, input);
            }
        });
    });
}

function performSearch(query, inputElement) {
    if (!query.trim()) {
        showNotification("검색어를 입력해주세요.", "warning");
        return;
    }

    const searchableItems = document.querySelectorAll(".faq-item, .notice-item, .disclosure-item, .job-card");
    let visibleCount = 0;

    searchableItems.forEach((item) => {
        const title = item.querySelector(".faq-question h3, .notice-title, .disclosure-link, .job-title");
        const content = item.querySelector(".faq-answer, .notice-summary, .job-summary");

        if (title || content) {
            const titleText = title ? title.textContent.toLowerCase() : "";
            const contentText = content ? content.textContent.toLowerCase() : "";
            const searchTerm = query.toLowerCase();

            if (titleText.includes(searchTerm) || contentText.includes(searchTerm)) {
                item.style.display = "block";
                item.style.animation = "fadeIn 0.3s ease";
                visibleCount++;

                // 검색어 하이라이트
                highlightSearchTerm(item, searchTerm);
            } else {
                item.style.display = "none";
            }
        }
    });

    // 검색 결과 알림
    if (visibleCount === 0) {
        showNotification("검색 결과가 없습니다.", "info");
    } else {
        showNotification(`${visibleCount}개의 검색 결과를 찾았습니다.`, "success");
    }
}

function highlightSearchTerm(element, searchTerm) {
    const textNodes = getTextNodes(element);

    textNodes.forEach((node) => {
        const text = node.textContent;
        const regex = new RegExp(`(${searchTerm})`, "gi");

        if (regex.test(text)) {
            const highlightedText = text.replace(
                regex,
                '<mark style="background-color: #fef3c7; color: #92400e;">$1</mark>'
            );
            const wrapper = document.createElement("span");
            wrapper.innerHTML = highlightedText;
            node.parentNode.replaceChild(wrapper, node);
        }
    });
}

function getTextNodes(element) {
    const textNodes = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);

    let node;
    while ((node = walker.nextNode())) {
        if (node.textContent.trim()) {
            textNodes.push(node);
        }
    }

    return textNodes;
}

// ===================================
// 페이지네이션
// ===================================
function initPagination() {
    const paginationButtons = document.querySelectorAll(".page-btn");

    paginationButtons.forEach((button) => {
        button.addEventListener("click", function () {
            if (this.classList.contains("prev")) {
                goToPreviousPage();
            } else if (this.classList.contains("next")) {
                goToNextPage();
            } else if (!isNaN(this.textContent)) {
                goToPage(parseInt(this.textContent));
            }
        });
    });
}

function goToPage(pageNumber) {
    currentPage = pageNumber;
    updatePaginationButtons();
    updateVisibleItems();
    scrollToTop();
}

function goToPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        updatePaginationButtons();
        updateVisibleItems();
        scrollToTop();
    }
}

function goToNextPage() {
    const totalPages = getTotalPages();
    if (currentPage < totalPages) {
        currentPage++;
        updatePaginationButtons();
        updateVisibleItems();
        scrollToTop();
    }
}

function getTotalPages() {
    const visibleItems = document.querySelectorAll(
        '.notice-item:not([style*="display: none"]), .disclosure-item:not([style*="display: none"])'
    );
    return Math.ceil(visibleItems.length / itemsPerPage);
}

function updatePaginationButtons() {
    const pageButtons = document.querySelectorAll(".page-btn");
    const totalPages = getTotalPages();

    pageButtons.forEach((button) => {
        button.classList.remove("active");

        if (button.classList.contains("prev")) {
            button.disabled = currentPage === 1;
        } else if (button.classList.contains("next")) {
            button.disabled = currentPage === totalPages;
        } else if (!isNaN(button.textContent)) {
            if (parseInt(button.textContent) === currentPage) {
                button.classList.add("active");
            }
        }
    });
}

function updateVisibleItems() {
    const items = document.querySelectorAll(".notice-item, .disclosure-item");
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    items.forEach((item, index) => {
        if (index >= startIndex && index < endIndex) {
            item.style.display = "grid";
        } else {
            item.style.display = "none";
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// ===================================
// 필터 기능
// ===================================
function initFilters() {
    const filterSelects = document.querySelectorAll(".filter-select");

    filterSelects.forEach((select) => {
        select.addEventListener("change", function () {
            applyFilters();
        });
    });
}

function applyFilters() {
    const typeFilter = document.querySelector("#disclosureType");
    const periodFilter = document.querySelector("#disclosurePeriod");
    const departmentFilter = document.querySelector("#departmentFilter");
    const experienceFilter = document.querySelector("#experienceFilter");
    const locationFilter = document.querySelector("#locationFilter");
    const categoryFilter = document.querySelector("#categoryFilter");

    const items = document.querySelectorAll(".disclosure-item, .job-card, .notice-item");

    items.forEach((item) => {
        let shouldShow = true;

        // 공시 유형 필터
        if (typeFilter && typeFilter.value && item.classList.contains("disclosure-item")) {
            const itemType = item.querySelector(".type-badge");
            if (!itemType || !itemType.classList.contains(typeFilter.value)) {
                shouldShow = false;
            }
        }

        // 채용 부서 필터
        if (departmentFilter && departmentFilter.value && item.classList.contains("job-card")) {
            const itemDepartment = item.querySelector(".job-department");
            if (!itemDepartment || !itemDepartment.classList.contains(departmentFilter.value)) {
                shouldShow = false;
            }
        }

        // 경력 필터
        if (experienceFilter && experienceFilter.value && item.classList.contains("job-card")) {
            const itemExperience = item.getAttribute("data-experience");
            if (itemExperience !== experienceFilter.value) {
                shouldShow = false;
            }
        }

        // 지역 필터
        if (locationFilter && locationFilter.value && item.classList.contains("job-card")) {
            const itemLocation = item.querySelector(".job-location");
            if (!itemLocation || itemLocation.textContent !== locationFilter.value) {
                shouldShow = false;
            }
        }

        // 카테고리 필터
        if (categoryFilter && categoryFilter.value && item.classList.contains("notice-item")) {
            const itemCategory = item.querySelector(".notice-category");
            if (!itemCategory || !itemCategory.classList.contains(categoryFilter.value)) {
                shouldShow = false;
            }
        }

        item.style.display = shouldShow ? "block" : "none";
    });

    // 페이지네이션 업데이트
    currentPage = 1;
    updatePaginationButtons();
    updateVisibleItems();
}

// ===================================
// 차트 컨트롤
// ===================================
function initChartControls() {
    const chartButtons = document.querySelectorAll(".chart-btn");

    chartButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const period = this.getAttribute("data-period");

            // 모든 버튼 비활성화
            chartButtons.forEach((btn) => btn.classList.remove("active"));

            // 선택된 버튼 활성화
            this.classList.add("active");

            // 차트 업데이트 (실제 환경에서는 차트 라이브러리 사용)
            updateChart(period);
        });
    });
}

function updateChart(period) {
    const chartPlaceholder = document.querySelector(".chart-placeholder");
    if (chartPlaceholder) {
        // 로딩 효과
        chartPlaceholder.style.opacity = "0.5";

        setTimeout(() => {
            // 차트 데이터 업데이트 시뮬레이션
            const chartData = chartPlaceholder.querySelector(".chart-data");
            if (chartData) {
                chartData.innerHTML = generateChartData(period);
            }

            chartPlaceholder.style.opacity = "1";
            showNotification(`${period} 차트가 업데이트되었습니다.`, "info");
        }, 500);
    }
}

function generateChartData(period) {
    const periods = {
        "1d": ["09:00: 45,100원", "12:00: 45,300원", "15:00: 45,200원"],
        "1w": ["월: 44,800원", "수: 45,100원", "금: 45,200원"],
        "1m": ["1주: 44,500원", "2주: 44,800원", "3주: 45,100원", "4주: 45,200원"],
        "3m": ["1월: 43,200원", "2월: 44,500원", "3월: 45,200원"],
        "6m": ["1월: 43,200원", "3월: 44,100원", "6월: 45,200원"],
        "1y": ["6월: 38,500원", "9월: 42,100원", "12월: 44,800원", "3월: 46,200원", "6월: 45,200원"]
    };

    return periods[period] ? periods[period].map((data) => `<div class="data-point">${data}</div>`).join("") : "";
}

// ===================================
// 스크롤 효과
// ===================================
function initScrollEffects() {
    // 스크롤 시 요소 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // 애니메이션할 요소들 관찰
    const animateElements = document.querySelectorAll(
        ".service-card, .news-card, .vision-card, .milestone-card, .benefit-card, .job-card, .culture-card"
    );

    animateElements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });

    // 스크롤 투 탑 버튼
    const scrollToTopBtn = createScrollToTopButton();
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    });
}

function createScrollToTopButton() {
    const button = document.createElement("button");
    button.innerHTML = "↑";
    button.className = "scroll-to-top";
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #dc2626;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 8px rgba(220, 38, 38, 0.3);
        transition: all 0.3s ease;
    `;

    button.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    button.addEventListener("mouseenter", () => {
        button.style.transform = "scale(1.1)";
        button.style.backgroundColor = "#b91c1c";
    });

    button.addEventListener("mouseleave", () => {
        button.style.transform = "scale(1)";
        button.style.backgroundColor = "#dc2626";
    });

    return button;
}

// ===================================
// 카운터 애니메이션
// ===================================
function initCounterAnimation() {
    const counters = document.querySelectorAll(".stat-number, .card-value");

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach((counter) => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const numbers = text.match(/[\d,]+/);

    if (numbers) {
        const targetNumber = parseInt(numbers[0].replace(/,/g, ""));
        const prefix = text.split(numbers[0])[0];
        const suffix = text.split(numbers[0])[1];

        let currentNumber = 0;
        const increment = targetNumber / 100;
        const duration = 2000; // 2초
        const intervalTime = duration / 100;

        const timer = setInterval(() => {
            currentNumber += increment;

            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(timer);
            }

            const formattedNumber = Math.floor(currentNumber).toLocaleString();
            element.textContent = prefix + formattedNumber + suffix;
        }, intervalTime);
    }
}

// ===================================
// 툴팁
// ===================================
function initTooltips() {
    const tooltipElements = document.querySelectorAll("[data-tooltip]");

    tooltipElements.forEach((element) => {
        let tooltip;

        element.addEventListener("mouseenter", function () {
            const tooltipText = this.getAttribute("data-tooltip");

            tooltip = document.createElement("div");
            tooltip.className = "tooltip";
            tooltip.textContent = tooltipText;
            tooltip.style.cssText = `
                position: absolute;
                background-color: #1f2937;
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 14px;
                white-space: nowrap;
                z-index: 1001;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            `;

            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px";
            tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + "px";

            setTimeout(() => {
                tooltip.style.opacity = "1";
            }, 100);
        });

        element.addEventListener("mouseleave", function () {
            if (tooltip) {
                tooltip.style.opacity = "0";
                setTimeout(() => {
                    if (tooltip && tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                }, 300);
            }
        });
    });
}

// ===================================
// 모달
// ===================================
function initModals() {
    const modalTriggers = document.querySelectorAll("[data-modal]");
    const modalCloses = document.querySelectorAll(".modal-close, .modal-backdrop");

    modalTriggers.forEach((trigger) => {
        trigger.addEventListener("click", function (e) {
            e.preventDefault();
            const modalId = this.getAttribute("data-modal");
            openModal(modalId);
        });
    });

    modalCloses.forEach((close) => {
        close.addEventListener("click", function () {
            closeModal();
        });
    });

    // ESC 키로 모달 닫기
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closeModal();
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "flex";
        modal.style.opacity = "0";

        setTimeout(() => {
            modal.style.opacity = "1";
        }, 10);

        document.body.style.overflow = "hidden";
    }
}

function closeModal() {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
        modal.style.opacity = "0";
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    });

    document.body.style.overflow = "auto";
}

// ===================================
// 알림 시스템
// ===================================
function initNotifications() {
    // 알림 컨테이너 생성
    if (!document.querySelector(".notification-container")) {
        const container = document.createElement("div");
        container.className = "notification-container";
        container.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 1002;
            max-width: 400px;
        `;
        document.body.appendChild(container);
    }
}

function showNotification(message, type = "info", duration = 3000) {
    const container = document.querySelector(".notification-container");
    if (!container) return;

    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;

    const colors = {
        success: "#10b981",
        error: "#ef4444",
        warning: "#f59e0b",
        info: "#3b82f6"
    };

    notification.style.cssText = `
        background-color: ${colors[type] || colors.info};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        margin-bottom: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease, opacity 0.3s ease;
        cursor: pointer;
        position: relative;
        max-width: 100%;
        word-wrap: break-word;
    `;

    notification.textContent = message;
    container.appendChild(notification);

    // 슬라이드 인 애니메이션
    setTimeout(() => {
        notification.style.transform = "translateX(0)";
    }, 10);

    // 클릭으로 닫기
    notification.addEventListener("click", () => {
        removeNotification(notification);
    });

    // 자동 제거
    setTimeout(() => {
        removeNotification(notification);
    }, duration);
}

function removeNotification(notification) {
    notification.style.transform = "translateX(100%)";
    notification.style.opacity = "0";

    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ===================================
// 유틸리티 함수
// ===================================

// 디바운스 함수
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 쓰로틀 함수
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

// 날짜 포맷팅
function formatDate(date, format = "YYYY.MM.DD") {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return format.replace("YYYY", year).replace("MM", month).replace("DD", day);
}

// 숫자 포맷팅
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 로컬 스토리지 관리
function setLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        console.error("로컬 스토리지 저장 실패:", e);
        return false;
    }
}

function getLocalStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.error("로컬 스토리지 읽기 실패:", e);
        return defaultValue;
    }
}

// ===================================
// 접근성 개선
// ===================================

// 키보드 네비게이션
document.addEventListener("keydown", function (e) {
    // Tab 키로 네비게이션 시 포커스 표시
    if (e.key === "Tab") {
        document.body.classList.add("keyboard-navigation");
    }
});

document.addEventListener("mousedown", function () {
    document.body.classList.remove("keyboard-navigation");
});

// 포커스 트랩 (모달용)
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener("keydown", function (e) {
        if (e.key === "Tab") {
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}

// ===================================
// 성능 최적화
// ===================================

// 이미지 지연 로딩
function initLazyLoading() {
    const images = document.querySelectorAll("img[data-src]");

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("lazy");
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach((img) => imageObserver.observe(img));
}

// 스크롤 이벤트 최적화
const optimizedScrollHandler = throttle(() => {
    // 스크롤 관련 작업들
    updateScrollProgress();
    updateHeaderShadow();
}, 16); // 60fps

window.addEventListener("scroll", optimizedScrollHandler);

function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    const progressBar = document.querySelector(".scroll-progress");
    if (progressBar) {
        progressBar.style.width = scrolled + "%";
    }
}

function updateHeaderShadow() {
    const header = document.querySelector(".header");
    if (header) {
        const scrollY = window.scrollY;
        const shadowIntensity = Math.min(scrollY / 100, 1);
        header.style.boxShadow = `0 2px ${10 + shadowIntensity * 10}px rgba(220, 38, 38, ${0.1 + shadowIntensity * 0.05})`;
    }
}

// ===================================
// 개발/디버깅 도구 (개발 환경에서만)
// ===================================
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    // 개발 모드 표시
    console.log("🚀 레드로지스틱스 개발 모드");
    console.log("📱 현재 화면 크기:", window.innerWidth + "x" + window.innerHeight);

    // 반응형 브레이크포인트 표시
    window.addEventListener(
        "resize",
        debounce(() => {
            console.log("📏 화면 크기 변경:", window.innerWidth + "x" + window.innerHeight);
        }, 300)
    );

    // 페이지 로드 성능 측정
    window.addEventListener("load", () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType("navigation")[0];
            console.log("⚡ 페이지 로드 시간:", Math.round(perfData.loadEventEnd - perfData.fetchStart) + "ms");
        }, 0);
    });
}

// ===================================
// 에러 처리
// ===================================
window.addEventListener("error", function (e) {
    console.error("JavaScript 에러:", e.error);
    showNotification("일시적인 오류가 발생했습니다. 페이지를 새로고침해 주세요.", "error");
});

window.addEventListener("unhandledrejection", function (e) {
    console.error("Promise 에러:", e.reason);
    showNotification("요청 처리 중 오류가 발생했습니다.", "error");
});

// ===================================
// 브라우저 호환성 확인
// ===================================
function checkBrowserSupport() {
    const unsupportedFeatures = [];

    if (!window.IntersectionObserver) {
        unsupportedFeatures.push("IntersectionObserver");
    }

    if (!window.fetch) {
        unsupportedFeatures.push("fetch");
    }

    if (!Element.prototype.classList) {
        unsupportedFeatures.push("classList");
    }

    if (unsupportedFeatures.length > 0) {
        console.warn("지원되지 않는 기능:", unsupportedFeatures);
        showNotification("일부 기능이 제한될 수 있습니다. 최신 브라우저를 사용해 주세요.", "warning");
    }
}

// 브라우저 호환성 확인 실행
checkBrowserSupport();

// ===================================
// 최종 초기화
// ===================================
console.log("✅ 레드로지스틱스 JavaScript 로드 완료");
