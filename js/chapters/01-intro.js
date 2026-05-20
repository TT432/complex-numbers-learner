/* 第 1 章：复数的定义 */
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
          <p>方程 $x^2 + 1 = 0$ 在实数域无解。引入虚数单位 $i$ 使得 $i^2 = -1$，则解为 $x = \pm i$。</p>
          <div class="formula-block">$$z = a + bi \\quad (a, b \in \mathbb{R})$$</div>
          <p>称 <span class="highlight">a</span> 为<strong>实部</strong>（real part），<span class="highlight2">b</span> 为<strong>虚部</strong>（imaginary part）。$b = 0$ 时退化为实数，$a = 0$ 时称为<strong>纯虚数</strong>（pure imaginary）。</p>
        </div>

        <div class="ch-text">
          <p><strong>复平面</strong>（complex plane）：横轴 = 实轴 Re，纵轴 = 虚轴 Im。每个复数 $a+bi$ 唯一对应一个平面点 $(a, b)$。反过来，每个平面点也唯一确定一个复数——复数和平面点之间是<strong>双射</strong>（bijection）。</p>
        </div>

        <div class="canvas-wrapper">
          <canvas id="c01-canvas"></canvas>
          <div class="canvas-label">拖拽蓝点：点的坐标 $(a, b)$ 直接就是复数 $a+bi$</div>
        </div>

        <div class="info-panel" id="c01-info">
          <div class="info-item">
            <span class="dot" style="background:#60a5fa"></span>
            <span class="label">z =</span>
            <span class="value" id="c01-val">0</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#f472b6"></span>
            <span class="label">Re(z) =</span>
            <span class="value" id="c01-real">0</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#34d399"></span>
            <span class="label">Im(z) =</span>
            <span class="value" id="c01-imag">0</span>
          </div>
        </div>

        <div class="ch-text">
          <p>与 $\mathbb{R}^2$ 向量不同，复数定义了乘法 $i^2 = -1$，这使得它不仅是二维点，更是一个<strong>代数结构</strong>——后续章节会看到这个乘法的几何意义。</p>
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
  }
};
