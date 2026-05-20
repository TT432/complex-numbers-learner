/* 第 7 章：综合练习 */
const chapter07 = {
  id: 'ch7',
  title: '综合练习',
  subtitle: '检验你的理解',
  render(container) {
    container.insertAdjacentHTML('beforeend', `
      <div class="chapter">
        <h2>第 7 章：综合练习</h2>
        <p class="ch-subtitle">检验你的理解</p>

        <div class="ch-text">
          <p>随机出题，涵盖前 6 章的内容。选择正确答案，即时反馈。</p>
        </div>

        <div class="quiz-container" id="c07-quiz">
          <div class="quiz-stats">
            <span id="c07-score">0 / 0</span>
            <span id="c07-total">已回答 0 题</span>
          </div>
          <div class="quiz-question" id="c07-question">
            <div class="q-text" id="c07-qtext">加载中...</div>
            <div class="quiz-options" id="c07-options"></div>
            <div class="quiz-feedback" id="c07-feedback"></div>
          </div>
          <button class="quiz-next-btn" id="c07-next" disabled>下一题</button>
        </div>
      </div>
    `);

    let currentQ = null;
    let correctCount = 0;
    let totalCount = 0;
    let answered = false;

    function loadQuestion() {
      currentQ = genQuiz();
      answered = false;

      document.getElementById('c07-qtext').innerHTML = currentQ.question;
      document.getElementById('c07-feedback').className = 'quiz-feedback';
      document.getElementById('c07-feedback').textContent = '';
      document.getElementById('c07-next').disabled = true;

      const optsDiv = document.getElementById('c07-options');
      optsDiv.innerHTML = '';

      currentQ.options.forEach((opt) => {
        const btn = document.createElement('div');
        btn.className = 'quiz-option';
        if (opt.includes('{') || opt.includes('\\\\') || opt.includes('^') || opt.includes('_')) {
          btn.innerHTML = `$$${opt}$$`;
        } else {
          btn.textContent = opt;
        }
        btn.dataset.value = opt;

        btn.onclick = () => {
          if (answered) return;
          answered = true;
          totalCount++;

          const isCorrect = opt === currentQ.answer;
          if (isCorrect) correctCount++;
          document.getElementById('c07-score').textContent = `${correctCount} / ${totalCount}`;
          document.getElementById('c07-total').textContent = `已回答 ${totalCount} 题`;

          optsDiv.querySelectorAll('.quiz-option').forEach((b) => {
            if (b.dataset.value === currentQ.answer) {
              b.classList.add('correct');
            } else if (b.dataset.value === opt && !isCorrect) {
              b.classList.add('wrong');
            }
            b.style.pointerEvents = 'none';
          });

          const fb = document.getElementById('c07-feedback');
          if (isCorrect) {
            fb.className = 'quiz-feedback correct show';
            if (currentQ.z) {
              fb.innerHTML = `正确！$z = ${currentQ.z.fmt()}$`;
            } else {
              fb.textContent = '回答正确！';
            }
          } else {
            fb.className = 'quiz-feedback wrong show';
            fb.innerHTML = `正确答案是：<strong>${currentQ.answer}</strong>`;
          }

          document.getElementById('c07-next').disabled = false;
        };

        optsDiv.appendChild(btn);
      });

      if (window.renderMathInElement) {
        try {
          renderMathInElement(document.getElementById('c07-question'), {
            delimiters: [
              {left: '$$', right: '$$', display: false},
              {left: '$', right: '$', display: false}
            ]
          });
        } catch(e) {}
      }
    }

    document.getElementById('c07-next').onclick = loadQuestion;
    loadQuestion();
  }
};
