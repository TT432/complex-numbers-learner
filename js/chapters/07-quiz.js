     1|/* 第 7 章：综合练习 */
     2|const chapter07 = {
     3|  id: 'ch7',
     4|  title: '综合练习',
     5|  subtitle: '检验你的理解',
     6|  render(container) {
     7|    container.insertAdjacentHTML('beforeend', `
     8|      <div class="chapter">
     9|        <h2>📝 第 7 章：综合练习</h2>
    10|        <p class="ch-subtitle">检验你的理解</p>
    11|
    12|        <div class="ch-text">
    13|          <p>随机出题，涵盖前 6 章的内容。选择正确答案，即时反馈。</p>
    14|        </div>
    15|
    16|        <div class="quiz-container" id="c07-quiz">
    17|          <div class="quiz-stats">
    18|            <span id="c07-score">✅ 0/0</span>
    19|            <span id="c07-total">已回答 0 题</span>
    20|          </div>
    21|          <div class="quiz-question" id="c07-question">
    22|            <div class="q-text" id="c07-qtext">加载中...</div>
    23|            <div class="quiz-options" id="c07-options"></div>
    24|            <div class="quiz-feedback" id="c07-feedback"></div>
    25|          </div>
    26|          <button class="quiz-next-btn" id="c07-next" disabled>下一题 →</button>
    27|        </div>
    28|      </div>
    29|    `;
    30|
    31|    let currentQ = null;
    32|    let correctCount = 0;
    33|    let totalCount = 0;
    34|    let answered = false;
    35|
    36|    function loadQuestion() {
    37|      currentQ = genQuiz();
    38|      answered = false;
    39|
    40|      document.getElementById('c07-qtext').innerHTML = currentQ.question;
    41|      document.getElementById('c07-feedback').className = 'quiz-feedback';
    42|      document.getElementById('c07-feedback').textContent = '';
    43|      document.getElementById('c07-next').disabled = true;
    44|
    45|      const optsDiv = document.getElementById('c07-options');
    46|      optsDiv.innerHTML = '';
    47|
    48|      currentQ.options.forEach((opt) => {
    49|        const btn = document.createElement('div');
    50|        btn.className = 'quiz-option';
    51|        // Try to render as KaTeX if it looks like LaTeX
    52|        if (opt.includes('{') || opt.includes('\\') || opt.includes('^') || opt.includes('_')) {
    53|          btn.innerHTML = `$$${opt}$$`;
    54|        } else {
    55|          btn.textContent = opt;
    56|        }
    57|        btn.dataset.value = opt;
    58|
    59|        btn.onclick = () => {
    60|          if (answered) return;
    61|          answered = true;
    62|          totalCount++;
    63|
    64|          const isCorrect = opt === currentQ.answer;
    65|          if (isCorrect) correctCount++;
    66|          document.getElementById('c07-score').textContent = `✅ ${correctCount}/${totalCount}`;
    67|          document.getElementById('c07-total').textContent = `已回答 ${totalCount} 题`;
    68|
    69|          // 标记所有选项
    70|          optsDiv.querySelectorAll('.quiz-option').forEach((b) => {
    71|            if (b.dataset.value === currentQ.answer) {
    72|              b.classList.add('correct');
    73|            } else if (b.dataset.value === opt && !isCorrect) {
    74|              b.classList.add('wrong');
    75|            }
    76|            b.style.pointerEvents = 'none';
    77|          });
    78|
    79|          const fb = document.getElementById('c07-feedback');
    80|          if (isCorrect) {
    81|            fb.className = 'quiz-feedback correct show';
    82|            fb.textContent = '✅ 回答正确！';
    83|          } else {
    84|            fb.className = 'quiz-feedback wrong show';
    85|            fb.innerHTML = `❌ 正确答案是：<strong>${currentQ.answer}</strong>`;
    86|          }
    87|
    88|          document.getElementById('c07-next').disabled = false;
    89|        };
    90|
    91|        optsDiv.appendChild(btn);
    92|      });
    93|
    94|      // 渲染 KaTeX
    95|      if (window.renderMathInElement) {
    96|        try {
    97|          renderMathInElement(document.getElementById('c07-question'), {
    98|            delimiters: [
    99|              {left: '$$', right: '$$', display: false},
   100|              {left: '$', right: '$', display: false}
   101|            ]
   102|          });
   103|        } catch(e) {}
   104|      }
   105|    }
   106|
   107|    document.getElementById('c07-next').onclick = loadQuestion;
   108|    loadQuestion();
   109|  }
   110|};
   111|