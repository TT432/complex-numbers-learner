/* 第 2 章：复数的表示 — 直角坐标与极坐标 */
const chapter02 = {
  id: 'ch2',
  title: '复数的表示',
  subtitle: '直角坐标与极坐标',
  render(container) {
    container.insertAdjacentHTML('beforeend', `
      <div class="chapter">
        <h2>第 2 章：复数的表示</h2>
        <p class="ch-subtitle">直角坐标与极坐标</p>

        <div class="ch-text">
          <p>复数有两种等价的表示方法，从不同角度描述同一个点。</p>

          <p><strong>直角坐标形式</strong>（代数形式）</p>
          <div class="formula-block">$$z = a + bi$$</div>
          <p>其中 $a$ 是实部（$x$ 坐标），$b$ 是虚部（$y$ 坐标）。这是用"横纵位置"来描述。</p>

          <p><strong>极坐标形式</strong>（三角形式）</p>
          <div class="formula-block">$$z = r(\\cos\\theta + i\\sin\\theta)$$</div>
          <p>其中 $r$ 是点到原点的距离，$\\theta$ 是与实轴正方向的夹角。这是用"距离和方向"来描述。</p>
          <ul style="padding-left:20px;margin:12px 0;line-height:2">
            <li><strong>模</strong> $r = |z| = \\sqrt{a^2 + b^2}$</li>
            <li><strong>辐角</strong> $\\theta = \\arg(z) = \\tan^{-1}(b/a)$</li>
          </ul>
        </div>

        <div class="ch-text">
          <p><strong>几何意义：</strong>拖拽蓝点，观察直角坐标和极坐标如何从同一个点衍生出两种描述。虚线圆是单位圆 ($r=1$)，当点在圆上时辐角的变化尤为清晰。</p>
        </div>

        <div class="canvas-wrapper">
          <canvas id="c02-canvas"></canvas>
          <div class="canvas-label">拖拽蓝点，观察 r 和 \u03B8 随位置的连续变化</div>
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
            <span class="label">辐角 \u03B8</span>
            <span class="value" id="c02-arg">0.0\u00B0</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#a78bfa"></span>
            <span class="label">极坐标</span>
            <span class="value" id="c02-polar">0</span>
          </div>
        </div>

        <div class="ch-text">
          <p><strong>尝试以下拖拽位置：</strong></p>
          <ul style="padding-left:20px;margin:12px 0;line-height:2">
            <li>拖到 <span class="highlight">(1, 0)</span> — $r = 1,\\ \\theta = 0\\degree$，圆周上的起点</li>
            <li>拖到 <span class="highlight">(0, 1)</span> — $r = 1,\\ \\theta = 90\\degree$，纯虚数 $i$</li>
            <li>拖到 <span class="highlight">(-1, 0)</span> — $r = 1,\\ \\theta = 180\\degree$，实数 $-1$</li>
            <li>拖到 <span class="highlight">(0, -1)</span> — $r = 1,\\ \\theta = -90\\degree$（或 $270\\degree$）</li>
            <li>拖到 <span class="highlight">(2, 2)</span> — $r = \\sqrt{8} \\approx 2.83$，辐角 $\\theta = 45\\degree$</li>
          </ul>
          <p><strong>数值意义：</strong>极坐标形式 $z = re^{i\\theta}$ 在乘除法中尤为有用——这一点将在第 4 章体现。</p>
        </div>
      </div>
    `);

    const z = new Complex(0, 0);
    const plane = new ComplexPlane('c02-canvas', { scale: 50 });
    plane.addPoint(z, '#60a5fa', 'z', (zp) => {
      document.getElementById('c02-rect').textContent = zp.fmt();
      document.getElementById('c02-mod').textContent = zp.fmtMod();
      document.getElementById('c02-arg').textContent = cleanNum(parseFloat(zp.deg.toFixed(1))) + '\u00B0';
      document.getElementById('c02-polar').textContent = zp.fmtPolar();
    });
    // 初始化 info panel
    document.getElementById('c02-mod').textContent = z.fmtMod();
    document.getElementById('c02-arg').textContent = '0\u00B0';
    document.getElementById('c02-polar').textContent = z.fmtPolar();
    plane.addCircle(0, 0, 5, 'rgba(148,163,184,.15)', true);
    // 标注特殊角度的位置引导
    plane.addStaticPoint(new Complex(1, 0), 'rgba(148,163,184,.3)', null);
    plane.addStaticPoint(new Complex(0, 1), 'rgba(148,163,184,.3)', null);
    plane.addStaticPoint(new Complex(-1, 0), 'rgba(148,163,184,.3)', null);
    plane.addStaticPoint(new Complex(0, -1), 'rgba(148,163,184,.3)', null);
  }
};
