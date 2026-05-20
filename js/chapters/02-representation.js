/* 第 2 章：复数的表示 */
const chapter02 = {
  id: 'ch2',
  title: '复数的表示',
  subtitle: '直角坐标 ↔ 极坐标',
  render(container) {
    container.innerHTML = `
      <div class="chapter">
        <h2>📖 第 2 章：复数的表示</h2>
        <p class="ch-subtitle">直角坐标 ↔ 极坐标</p>

        <div class="ch-text">
          <p>复数有两种重要的表示方法：</p>
          <div class="formula-block">$$z = a + bi$$</div>
          <p style="color:var(--text-muted);font-size:.9rem">直角坐标形式</p>
          <p>其中 $a$ 是实部，$b$ 是虚部。</p>
          <div class="formula-block">$$z = r(\cos\theta + i\sin\theta)$$</div>
          <p style="color:var(--text-muted);font-size:.9rem">极坐标形式</p>
          <p>其中：</p>
          <ul style="padding-left:20px;margin:12px 0;line-height:2">
            <li><strong>模</strong> $r = |z| = \\sqrt{a^2 + b^2}$ — 点到原点的距离</li>
            <li><strong>辐角</strong> $\\theta = \\arg(z) = \\tan^{-1}(b/a)$ — 与实轴正方向的夹角</li>
          </ul>
          <p>两种形式可以互相转换，<span class="highlight">拖拽下面的点</span> 看看它们如何联动：</p>
        </div>

        <div class="canvas-wrapper">
          <canvas id="c02-canvas"></canvas>
          <div class="canvas-label">👆 拖拽蓝点，观察两种表示同时变化</div>
        </div>

        <div class="info-panel" id="c02-info">
          <div class="info-item">
            <span class="dot" style="background:#60a5fa"></span>
            <span class="label">直角坐标</span>
            <span class="value" id="c02-rect">0</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#34d399"></span>
            <span class="label">模 |z|</span>
            <span class="value" id="c02-mod">0.00</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#f472b6"></span>
            <span class="label">辐角 θ</span>
            <span class="value" id="c02-arg">0.00°</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#a78bfa"></span>
            <span class="label">极坐标</span>
            <span class="value" id="c02-polar">0</span>
          </div>
        </div>

        <div class="ch-text">
          <p>💡 复数的极坐标形式揭示了乘除法的几何本质，这是下一章的关键。</p>
        </div>
      </div>
    `;

    const z = new Complex(0, 0);
    const plane = new ComplexPlane('c02-canvas', { scale: 50 });
    plane.addPoint(z, '#60a5fa', 'z', (zp) => {
      document.getElementById('c02-rect').textContent = zp.fmt();
      document.getElementById('c02-mod').textContent = zp.r.toFixed(2);
      document.getElementById('c02-arg').textContent = zp.deg.toFixed(2) + '°';
      document.getElementById('c02-polar').textContent = zp.fmtPolar();
    });
    // 单位圆引导
    plane.addCircle(0, 0, 5, 'rgba(148,163,184,.15)', true);
  }
};
