// 資傳3A_1111841廖羽歆_作品集設計與展現_線上作品集製作


// 關閉 Bootstrap 點擊展開的 JS 功能（避免干擾 hover）
document.querySelectorAll('.dropdown-toggle').forEach(function (el) {
    el.addEventListener('click', function (e) {
        e.preventDefault(); // 阻止點擊展開
    });
});


// 100vh為單位捲動頁面
let isScrolling = false;

document.addEventListener("wheel", (event) => {
    event.preventDefault();

    if (isScrolling) return;  // 動畫執行中不觸發

    const sections = document.querySelectorAll(".page");
    const direction = event.deltaY > 0 ? 1 : -1;
    const current = Math.round(window.scrollY / window.innerHeight);
    let target = current + direction;

    // 限制範圍不超出頁數
    target = Math.max(0, Math.min(sections.length - 1, target));

    isScrolling = true;
    window.scrollTo({
        top: target * window.innerHeight,
        behavior: "smooth"
    });

    // 等滾動結束再解鎖
    setTimeout(() => {
        isScrolling = false;
    }, 700);  // 700ms 可依需求調整滾動時間
}, { passive: false });


// 鼠標跟隨發光球球
window.addEventListener("DOMContentLoaded", () => {
    // 加載完再設定跟隨滑鼠

    console.log("滑鼠偵測啟動");

    const cursorGlow = document.getElementById("cursorGlow");

    window.addEventListener("mousemove", (e) => {
        cursorGlow.style.left = e.clientX + "px";
        cursorGlow.style.top = e.clientY + "px";
    });
});


// 自我介紹圖片和文字移動動畫動畫.(index.html)
const target_img = document.getElementById('introduceMySelf_img');
const target_text = document.getElementById('introduceMySelf_text');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 動畫：圖片往左移52.5%，文字往右移62.5%
            target_img.style.transform = 'translate(calc(-50% - 52.5%), -50%)';
            target_text.style.transform = 'translate(calc(-50% + 62.5%), -50%)';
        } else {
            // 回到置中重疊
            target_img.style.transform = 'translate(-50%, -50%)';
            target_text.style.transform = 'translate(-50%, -50%)';
        }
    });
}, { threshold: 0.5 });

if (target_img && target_text) {
    observer.observe(document.getElementById('introduceMySelf'));
};


// .divs淡入淡出動畫.(index.html)
const observer2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const divs = entry.target.querySelectorAll('.divs');

        if (entry.isIntersecting) {
            divs.forEach((div, index) => {
                setTimeout(() => {
                    div.classList.add('fade-in');
                }, index * 300);
            });
        } else {
            divs.forEach((div) => {
                div.classList.remove('fade-in');
            });
        }
    });
}, {
    threshold: 0.2
});

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    observer2.observe(skillsSection);
}


// #contactDiv滑入動畫.(index.html)
document.addEventListener("DOMContentLoaded", () => {
    const contactDiv = document.getElementById("contactDiv");

    const observer3 = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    contactDiv.classList.add("active");
                } else {
                    contactDiv.classList.remove("active");
                }
            });
        },
        {
            threshold: 0.3, // 元素 30% 出現在視窗就觸發
        }
    );

    if (contactDiv) {
        observer3.observe(contactDiv);
    }
});

const titleIllustration = document.querySelector('.titleIllustration');
if (titleIllustration) {
    titleIllustration.addEventListener('mouseenter', () => {
        titleIllustration.textContent = '草稿×灰階×彩稿×gif';
        titleIllustration.style.color = '#cf9f62';
    });

    titleIllustration.addEventListener('mouseleave', () => {
        titleIllustration.textContent = '框架×甜點×動物×插畫';
        titleIllustration.style.color = '';  // 回復原本顏色（或設定你原本想要的色）
    });
}

// 點擊圖片打開浮出視窗
document.querySelectorAll('.blur-edges').forEach(img => {
    img.addEventListener('click', () => {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');

        modal.style.display = 'block';
        modalImg.src = img.src;
    });
});

// 點背景關閉視窗
const closeBtn = document.querySelector('.close-btn');
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        document.getElementById('imageModal').style.display = 'none';
    });
}

const modal = document.getElementById('imageModal');
if (modal) {
    // 點背景（modal本身）關閉浮出視窗
    modal.addEventListener('click', (e) => {
        // 如果點擊目標是 modal 遮罩（非裡面圖片或其他元素）
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// 完整顯示遊戲畫面（不裁切）且等比例縮放（web.html）
function scaleIframe() {
    const container = document.getElementById('webDisplay1');
    const iframe = document.getElementById('webIframe1');

    if (!container || !iframe) return;

    const scale = Math.min(
        container.clientWidth / 1710,
        container.clientHeight / 900
    );

    const offsetX = (1710 * scale) / 2;
    const offsetY = (900 * scale) / 2;

    iframe.style.transform = `translate(-${offsetX}px, -${offsetY}px) scale(${scale})`;
    iframe.style.opacity = '1';
}

window.addEventListener('resize', scaleIframe);
window.addEventListener('load', scaleIframe);


// 延遲載入個人任務清單管理（web.html）

function lazyLoadIframe(id) {
    const iframe = document.getElementById(id);
    if (!iframe) return;

    const src = iframe.dataset.src;
    if (!src) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                iframe.src = src;
                observer.unobserve(iframe);
            }
        });
    });

    observer.observe(iframe);
}


// DOM 完整載入後，再決定是否註冊
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('webDisplay1');
    const iframe = document.getElementById('webIframe1');

    if (container && iframe) {
        window.addEventListener('resize', scaleIframe);
        window.addEventListener('load', scaleIframe);
        scaleIframe(); // 初始執行
    }

    const lazyIframe = document.getElementById('webIframe2');
    if (lazyIframe && lazyIframe.dataset.src) {
        lazyLoadIframe('webIframe2');
    }
});


const observer4 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const descripton = entry.target.querySelector('.descripton');
            const descriptonWeb = entry.target.querySelector('.descriptonWeb');
            if (descripton) descripton.classList.add('show');
            if (descriptonWeb) descriptonWeb.classList.add('show');
        } else {
            const descripton = entry.target.querySelector('.descripton');
            const descriptonWeb = entry.target.querySelector('.descriptonWeb');
            if (descripton) descripton.classList.remove('show');
            if (descriptonWeb) descriptonWeb.classList.remove('show');
        }
    });
}, {
    threshold: 0.3
});

document.querySelectorAll('.page').forEach((page) => {
    observer4.observe(page);
});


const observer5 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const Details = entry.target.querySelector('.Details');

        document.body.style.overflow = "hidden";
        if (entry.isIntersecting) {
            if (Details) Details.classList.add('show');
        } else {
            if (Details) Details.classList.remove('show');
        }
    });
}, {
    threshold: 0.3
});

document.querySelectorAll('.page').forEach((page) => {
    observer5.observe(page);
});

// 選取 modal 和圖片元素
const modala = document.querySelector('.modal');
const modalImgb = document.querySelector('.modalImg');

// 綁定所有圖片點擊事件（可選範圍內圖片）
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('click', () => {
        modala.classList.add('show');
        modalImgb.src = img.src;
    });
});

// 點 modal 背景關閉（只要不是點到圖片）
modala.addEventListener('click', e => {
    if (e.target === modala) {
        modala.classList.remove('show');
        modalImgb.src = "";
    }
});


// 監聽所有輪播圖片點擊事件
document.querySelectorAll('.carousel').forEach(carousel => {
    carousel.addEventListener('click', e => {
        if (e.target.tagName === 'IMG') {
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImg');
            modalImg.src = e.target.src;
            modal.style.display = 'flex';
        }
    });
});

const modal2 = document.querySelector('.modal');       // 只取第一個 modal
const modalImg = document.querySelector('.modalImg'); // 只取第一個 modalImg
// 之前定義的 modal 跟 modalImg 都沿用

const introduceImg = document.getElementById('introduceMySelf_img');
if (introduceImg) {
    introduceImg.addEventListener('click', () => {
        modalImg.src = introduceImg.src;
        modal.classList.add('show');
    });
}

const gameProcessImg = document.getElementById('gameProcessImg');
if (gameProcessImg) {
    gameProcessImg.addEventListener('click', () => {
        modalImg.src = gameProcessImg.src;
        modal.classList.add('show');
    });
}

if (modal2 && modalImg) {
    document.querySelectorAll('.carousel').forEach(carousel => {
        carousel.addEventListener('click', e => {
            if (e.target.tagName === 'IMG') {
                modalImg.src = e.target.src;
                modal2.classList.add('show');
            }
        });
    });
}

if (modal2 && modalImg) {
    modal2.addEventListener('click', e => {
        if (e.target === modal2) {
            modal2.classList.remove('show');
            modalImg.src = '';  // 清空圖片 src，讓下次開啟不會瞬間閃爍上一張
        }
    });
}