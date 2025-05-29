// 資傳3A_1111841廖羽歆_作品集設計與展現_線上作品集製作

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

// marquee.（illustrationPage_2.html）
const marquee = document.getElementById('gifMarquee');
let scrollAmount = 0;

if (marquee) {
    // 複製一次內容實現無縫滾動
    marquee.innerHTML += marquee.innerHTML;

    function animateMarquee() {
        scrollAmount += 1;
        if (scrollAmount >= marquee.scrollWidth / 2) {
            scrollAmount = 0;
        }
        marquee.style.transform = `translateX(-${scrollAmount}px)`;
        requestAnimationFrame(animateMarquee);
    }

    animateMarquee();
}


// 完整顯示遊戲畫面（不裁切）且等比例縮放（web.html）
function scaleIframe() {
    const container = document.getElementById('webDisplay1');
    const iframe = document.getElementById('webIframe1');

    const scale = Math.min(
        container.clientWidth / 1710,
        container.clientHeight / 900
    );

    // 位移值是縮放後尺寸的一半
    const offsetX = (1710 * scale) / 2;
    const offsetY = (900 * scale) / 2;

    iframe.style.transform = `translate(-${offsetX}px, -${offsetY}px) scale(${scale})`;
    iframe.style.opacity = '1'; // 顯示 iframe
}

window.addEventListener('resize', scaleIframe);
window.addEventListener('load', scaleIframe);


// 延遲載入個人任務清單管理（web.html）

function lazyLoadIframe(id) {
    const iframe = document.getElementById(id);
    const src = iframe.dataset.src;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                iframe.src = src;
                observer.unobserve(iframe); // 載入一次就停止觀察
            }
        });
    });

    observer.observe(iframe);
}

window.addEventListener('DOMContentLoaded', () => {
    lazyLoadIframe('webIframe2'); // 僅針對你那個有 alert 的 iframe 做 lazy-load
});