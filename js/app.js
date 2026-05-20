/* ===========================
   app.js — 瀑布流布局
   所有章节从上到下连续滚动
   =========================== */

const chapters = [
  chapter01, chapter02, chapter03,
  chapter04, chapter05, chapter06, chapter07
];

(function() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const menuToggle = document.getElementById('menu-toggle');
  const chapterList = document.getElementById('chapter-list');
  const container = document.getElementById('chapter-container');
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');
  const mainContent = document.getElementById('content');

  // ---- 构建侧边栏 TOC ----
  chapters.forEach((ch, i) => {
    const li = document.createElement('li');
    li.dataset.chapter = ch.id;
    li.innerHTML = `<span class="num">${i + 1}</span> ${ch.title}`;
    li.onclick = () => {
      scrollToChapter(ch.id);
      closeSidebar();
    };
    chapterList.appendChild(li);
  });

  // ---- 侧边栏控制 ----
  function openSidebar() { sidebar.classList.add('open'); overlay.classList.add('open'); }
  function closeSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('open'); }
  if (menuToggle) menuToggle.onclick = openSidebar;
  if (overlay) overlay.onclick = closeSidebar;

  // ---- 滚动到指定章节 ----
  function scrollToChapter(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 20; // 顶部留白
    const top = el.getBoundingClientRect().top + mainContent.scrollTop - offset;
    mainContent.scrollTo({ top, behavior: 'smooth' });
  }

  // ---- 渲染所有章节（瀑布流） ----
  // 清空欢迎页
  container.innerHTML = '';

  chapters.forEach((ch, i) => {
    ch.render(container);
    // 章节之间加分隔线
    if (i < chapters.length - 1) {
      const hr = document.createElement('hr');
      hr.style.cssText = 'border:none;border-top:1px solid var(--border);margin:48px 0;';
      container.appendChild(hr);
    }
  });

  // ---- 交互区域布局：将 canvas + info panel + control-group 包裹在一起 ----
  document.querySelectorAll('.canvas-wrapper').forEach(wrapper => {
    if (wrapper.parentElement.classList.contains('interactive-group')) return;
    const group = document.createElement('div');
    group.className = 'interactive-group';
    wrapper.parentNode.insertBefore(group, wrapper);
    group.appendChild(wrapper);
    let el = group.nextElementSibling;
    while (el && (el.classList.contains('info-panel') || el.classList.contains('control-group'))) {
      const next = el.nextElementSibling;
      group.appendChild(el);
      el = next;
    }
  });

  // ---- 渲染公式 ----
  function renderMath() {
    if (!window.renderMathInElement) { setTimeout(renderMath, 200); return; }
    try {
      renderMathInElement(container, {
        delimiters: [
          {left: '$$', right: '$$', display: true},
          {left: '$', right: '$', display: false}
        ],
        throwOnError: false
      });
    } catch(e) { setTimeout(renderMath, 200); }
  }
  renderMath();

  // ---- 滚动监听：侧边栏高亮 + 进度条 ----
  let ticking = false;

  function updateSidebarAndProgress() {
    const scrollTop = mainContent.scrollTop;
    const scrollHeight = mainContent.scrollHeight - mainContent.clientHeight;
    const pct = scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0;
    progressFill.style.width = pct + '%';
    progressText.textContent = `${pct}%`;

    // 高亮当前可见章节
    let activeId = null;
    for (const ch of chapters) {
      const el = document.getElementById(ch.id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.4) {
        activeId = ch.id;
      }
    }

    chapterList.querySelectorAll('li').forEach(li => {
      li.classList.toggle('active', li.dataset.chapter === activeId);
    });
  }

  mainContent.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { ticking = false; updateSidebarAndProgress(); });
      ticking = true;
    }
  });

  // 初始更新
  setTimeout(updateSidebarAndProgress, 300);
})();
