/* 第 1 章：认识复数 */
const chapter01 = {
  id: 'ch1',
  title: '认识复数',
  subtitle: '从实数到复数 — 复平面',
  render(container) {
    container.innerHTML = `
      <div class="chapter">
        <h2>📖 第 1 章：认识复数</h2>
        <p class="ch-subtitle">从实数到复数 — 复平面</p>

        <div class="ch-text">
          <p>实数可以用数轴上的一个点来表示。但世界上有些问题在实数范围内无解，比如</p>
          <div class="formula-block">$$x^2 + 1 = 0$$</div>
          <p>因为没有任何实数的平方等于 <span class="highlight">-1</span>。于是数学家引入了一个新数：</p>
          <div class="formula-block">$$i^2 = -1$$</div>
          <p>这个 <span class="highlight">i</span> 叫做 <strong>虚数单位</strong>（imaginary unit）。</p>
          <p>有了 i，我们就可以表示形如 <span class="highlight2">$a + bi$</span> 的数，称为 <strong>复数</strong>：</p>
          <ul style="padding-left:20px;margin:12px 0;line-height:2">
            <li>$a$ = <strong>实部</strong>（real part）</li>
            <li>$b$ = <strong>虚部</strong>（imaginary part）</li>
          </ul>
          <p>实数就是虚部为 0 的特殊复数。纯虚数就是实部为 0 的复数。</p>
          <p>复数不是在一条直线上，而是在一个平面上——<strong>复平面</strong>：横轴是实轴 (Re)，纵轴是虚轴 (Im)。</p>
        </div>

        <div class="canvas-wrapper">
          <canvas id="c01-canvas"></canvas>
          <div class="canvas-label">👆 拖拽蓝点，观察实部和虚部如何变化</div>
        </div>

        <div class="info-panel" id="c01-info">
          <div class="info-item">
            <span class="dot" style="background:#60a5fa"></span>
            <span class="label">复数 =</span>
            <span class="value" id="c01-val">3 + 2i</span>
          </div>
          <div class="info-item">
            <span class="label">实部 Re =</span>
            <span class="value" id="c01-real">3</span>
          </div>
          <div class="info-item">
            <span class="label">虚部 Im =</span>
            <span class="value" id="c01-imag">2i</span>
          </div>
        </div>

        <div class="ch-text">
          <p>试试把点拖到纯虚数的位置（实部为 0），再拖到纯实数的位置（虚部为 0）。</p>
          <p>💡 <strong>提示：</strong> 每个复数对应复平面上唯一的一个点，反之亦然。</p>
        </div>
      </div>
    `;

    const z = new Complex(3, 2);
    const plane = new ComplexPlane('c01-canvas', { scale: 50 });
    plane.addPoint(z, '#60a5fa', 'z', (zp) => {
      document.getElementById('c01-val').textContent = zp.fmt();
      document.getElementById('c01-real').textContent = zp.a;
      document.getElementById('c01-imag').textContent = zp.b.toFixed(2) + 'i';
    });
  }
};
