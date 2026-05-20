/* ===========================
   app.js — SPA 路由 + 导航
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

  // ---- 构建导航 ----
  chapters.forEach((ch, i) => {
    const li = document.createElement('li');
    li.dataset.chapter = ch.id;
    li.innerHTML = `<span class="num">${i + 1}</span> ${ch.title}`;
    li.onclick = () => {
      location.hash = '#' + ch.id;
      closeSidebar();
    };
    chapterList.appendChild(li);
  });

  // ---- 侧边栏控制 ----
  function openSidebar() { sidebar.classList.add('open'); overlay.classList.add('open'); }
  function closeSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('open'); }
  if (menuToggle) menuToggle.onclick = openSidebar;
  if (overlay) overlay.onclick = closeSidebar;

  // ---- 路由 ----
  let currentChapter = null;

  function navigate(hash) {
    const id = hash.replace('#', '');
    if (!id) {
      showWelcome();
      return;
    }
    const ch = chapters.find(c => c.id === id);
    if (!ch) { showWelcome(); return; }
    showChapter(ch);
  }

  function showWelcome() {
    container.innerHTML = `
      <div class="welcome">
        <h2>👋 欢迎</h2>
        <p>通过拖拽、观察和练习，直观理解复数的几何意义。</p>
        <p>点击左侧章节开始学习，或点击下方直接开始。</p>
        <button class="btn-start" onclick="location.hash='#ch1'">开始学习 →</button>
      </div>
    `;
    setActive(null);
    updateProgress(0);
    renderMath();
    currentChapter = null;
  }

  function showChapter(ch) {
    ch.render(container);
    setActive(ch.id);
    const idx = chapters.indexOf(ch);
    updateProgress(idx + 1, ch);
    addNavButtons(ch, idx);
    renderMath();
    currentChapter = ch;
  }

  function setActive(id) {
    chapterList.querySelectorAll('li').forEach(li => {
      li.classList.toggle('active', li.dataset.chapter === id);
      li.classList.toggle('done', isDone(li.dataset.chapter));
    });
  }

  function isDone(chId) {
    const idx = chapters.findIndex(c => c.id === chId);
    const visited = getVisited();
    return visited.includes(chId);
  }

  function getVisited() {
    try {
      return JSON.parse(localStorage.getItem('complex_learner_visited') || '[]');
    } catch { return []; }
  }

  function markVisited(chId) {
    const v = getVisited();
    if (!v.includes(chId)) {
      v.push(chId);
      localStorage.setItem('complex_learner_visited', JSON.stringify(v));
    }
  }

  function updateProgress(count, ch) {
    if (ch) markVisited(ch.id);
    const total = chapters.length;
    const visited = getVisited().length;
    const pct = Math.round((visited / total) * 100);
    progressFill.style.width = pct + '%';
    progressText.textContent = `${visited} / ${total}`;

    // 更新导航的完成标记
    chapters.forEach((c, i) => {
      const li = chapterList.querySelector(`li[data-chapter="${c.id}"]`);
      if (li && visited.includes(c.id)) {
        li.classList.add('done');
        const check = li.querySelector('.check');
        if (!check) {
          const s = document.createElement('span');
          s.className = 'check';
          s.textContent = '✓';
          li.appendChild(s);
        }
      }
    });
  }

  function addNavButtons(ch, idx) {
    const nav = document.createElement('div');
    nav.className = 'chapter-nav';

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '← 上一章';
    prevBtn.disabled = idx === 0;
    if (idx > 0) prevBtn.onclick = () => { location.hash = '#' + chapters[idx - 1].id; };

    const nextBtn = document.createElement('button');
    nextBtn.textContent = idx === chapters.length - 1 ? '🎉 已完成' : '下一章 →';
    if (idx < chapters.length - 1) nextBtn.onclick = () => { location.hash = '#' + chapters[idx + 1].id; };

    nav.appendChild(prevBtn);
    nav.appendChild(nextBtn);
    container.appendChild(nav);
  }

  function renderMath() {
    if (!window.renderMathInElement || !container) return;
    try {
      renderMathInElement(container, {
        delimiters: [
          {left: '$$', right: '$$', display: true},
          {left: '$', right: '$', display: false}
        ],
        throwOnError: false
      });
    } catch(e) {
      // fallback: 等 DOM 完全就绪后再试
      setTimeout(() => {
        try {
          renderMathInElement(container, {
            delimiters: [
              {left: '$$', right: '$$', display: true},
              {left: '$', right: '$', display: false}
            ],
            throwOnError: false
          });
        } catch(_) {}
      }, 50);
    }
  }

  // ---- 监听 hash 变化 ----
  window.addEventListener('hashchange', () => navigate(location.hash));
  window.addEventListener('load', () => {
    navigate(location.hash || '');
  });

  // 如果页面已经加载完毕，触发初始导航
  if (document.readyState === 'complete') {
    navigate(location.hash || '');
  }
})();
