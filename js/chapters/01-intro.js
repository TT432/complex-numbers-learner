/* 第 1 章：复数的定义 — 从平面上的点开始 */
const chapter01 = {
  id: 'ch1',
  title: '复数的定义',
  subtitle: '复平面：从实数到二维',
  render(container) {
    container.insertAdjacentHTML('beforeend', `
      <div class="chapter">
        <h2>第 1 章：复数的定义</h2>
        <p class="ch-subtitle">复平面：从实数到二维</p>

        <div class="ch-text">
          <p>实数可以用数轴上的一个点来表示。但有些方程在实数范围内无解，比如</p>
          <div class="formula-block">$$x^2 + 1 = 0$$</div>
          <p>因为没有任何实数的平方等于 <span class="highlight">-1</span>。数学家引入了一个新数：</p>
          <div class="formula-block">$$i^2 = -1$$</div>
          <p>这个 <span class="highlight">i</span> 叫做 <strong>虚数单位</strong>（imaginary unit）。有了 i，形如</p>
          <div class="formula-block">$$z = a + bi$$</div>
          <p>的数称为 <strong>复数</strong>，其中 <span class="highlight">a</span> 是 <strong>实部</strong>，<span class="highlight2">b</span> 是 <strong>虚部</strong>。</p>
        </div>

        <div class="ch-text">
          <p><strong>几何意义</strong></p>
          <p>复数不在一条直线上，而是在一个<strong>二维平面</strong>上——<strong>复平面</strong>。横轴是实轴 (Re)，纵轴是虚轴 (Im)。每个复数 $a+bi$ 对应平面上唯一的一个点 $(a, b)$。</p>
          <ul style="padding-left:20px;margin:12px 0;line-height:2">
            <li>实轴上的点 $(a, 0)$ — 就是实数 $a$（虚部为 0）</li>
            <li>虚轴上的点 $(0, b)$ — 称为<strong>纯虚数</strong>（实部为 0）</li>
          </ul>
        </div>

        <div class="canvas-wrapper">
          <canvas id="c01-canvas"></canvas>
          <div class="canvas-label">拖拽蓝点，观察它在复平面上的位置与复数的对应关系</div>
        </div>

        <div class="info-panel" id="c01-info">
          <div class="info-item">
            <span class="dot" style="background:#60a5fa"></span>
            <span class="label">z =</span>
            <span class="value" id="c01-val">0</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#f472b6"></span>
            <span class="label">实部 Re(z) =</span>
            <span class="value" id="c01-real">0</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#34d399"></span>
            <span class="label">虚部 Im(z) =</span>
            <span class="value" id="c01-imag">0</span>
          </div>
        </div>

        <div class="ch-text">
          <p><strong>尝试以下拖拽位置，观察规律：</strong></p>
          <ul style="padding-left:20px;margin:12px 0;line-height:2">
            <li>拖到 <span class="highlight">(1, 0)</span> — 这是一个实数</li>
            <li>拖到 <span class="highlight">(0, 1)</span> — 纯虚数 $i$</li>
            <li>拖到 <span class="highlight">(-2, 0)</span> — 实数 $-2$</li>
            <li>拖到 <span class="highlight">(0, -1)</span> — 纯虚数 $-i$</li>
          </ul>
          <p><strong>数值意义：</strong>实部 $a$ 就是点的 $x$ 坐标，虚部 $b$ 就是点的 $y$ 坐标。两者共同决定了这个复数在复平面上的位置。</p>
        </div>
      </div>
    `);

    const z = new Complex(0, 0);
    const plane = new ComplexPlane('c01-canvas', { scale: 50 });
    plane.addPoint(z, '#60a5fa', 'z', (zp) => {
      document.getElementById('c01-val').textContent = zp.fmt();
      document.getElementById('c01-real').textContent = Math.abs(zp.a) < 1e-10 ? '0' : cleanNum(zp.a);
      document.getElementById('c01-imag').textContent = Math.abs(zp.b) < 1e-10 ? '0' : cleanNum(zp.b);
    });
    // 初始化 info panel
  }
};
