     1|/* 第 2 章：复数的表示 */
     2|const chapter02 = {
     3|  id: 'ch2',
     4|  title: '复数的表示',
     5|  subtitle: '直角坐标 ↔ 极坐标',
     6|  render(container) {
     7|    container.insertAdjacentHTML('beforeend', `
     8|      <div class="chapter">
     9|        <h2>📖 第 2 章：复数的表示</h2>
    10|        <p class="ch-subtitle">直角坐标 ↔ 极坐标</p>
    11|
    12|        <div class="ch-text">
    13|          <p>复数有两种重要的表示方法：</p>
    14|          <div class="formula-block">$$z = a + bi$$</div>
    15|          <p style="color:var(--text-muted);font-size:.9rem">直角坐标形式</p>
    16|          <p>其中 $a$ 是实部，$b$ 是虚部。</p>
    17|          <div class="formula-block">$$z = r(\cos\theta + i\sin\theta)$$</div>
    18|          <p style="color:var(--text-muted);font-size:.9rem">极坐标形式</p>
    19|          <p>其中：</p>
    20|          <ul style="padding-left:20px;margin:12px 0;line-height:2">
    21|            <li><strong>模</strong> $r = |z| = \\sqrt{a^2 + b^2}$ — 点到原点的距离</li>
    22|            <li><strong>辐角</strong> $\\theta = \\arg(z) = \\tan^{-1}(b/a)$ — 与实轴正方向的夹角</li>
    23|          </ul>
    24|          <p>两种形式可以互相转换，<span class="highlight">拖拽下面的点</span> 看看它们如何联动：</p>
    25|        </div>
    26|
    27|        <div class="canvas-wrapper">
    28|          <canvas id="c02-canvas"></canvas>
    29|          <div class="canvas-label">👆 拖拽蓝点，观察两种表示同时变化</div>
    30|        </div>
    31|
    32|        <div class="info-panel" id="c02-info">
    33|          <div class="info-item">
    34|            <span class="dot" style="background:#60a5fa"></span>
    35|            <span class="label">直角坐标</span>
    36|            <span class="value" id="c02-rect">0</span>
    37|          </div>
    38|          <div class="info-item">
    39|            <span class="dot" style="background:#34d399"></span>
    40|            <span class="label">模 |z|</span>
    41|            <span class="value" id="c02-mod">0.00</span>
    42|          </div>
    43|          <div class="info-item">
    44|            <span class="dot" style="background:#f472b6"></span>
    45|            <span class="label">辐角 θ</span>
    46|            <span class="value" id="c02-arg">0.00°</span>
    47|          </div>
    48|          <div class="info-item">
    49|            <span class="dot" style="background:#a78bfa"></span>
    50|            <span class="label">极坐标</span>
    51|            <span class="value" id="c02-polar">0</span>
    52|          </div>
    53|        </div>
    54|
    55|        <div class="ch-text">
    56|          <p>💡 复数的极坐标形式揭示了乘除法的几何本质，这是下一章的关键。</p>
    57|        </div>
    58|      </div>
    59|    `;
    60|
    61|    const z = new Complex(0, 0);
    62|    const plane = new ComplexPlane('c02-canvas', { scale: 50 });
    63|    plane.addPoint(z, '#60a5fa', 'z', (zp) => {
    64|      document.getElementById('c02-rect').textContent = zp.fmt();
    65|      document.getElementById('c02-mod').textContent = zp.r.toFixed(2);
    66|      document.getElementById('c02-arg').textContent = zp.deg.toFixed(2) + '°';
    67|      document.getElementById('c02-polar').textContent = zp.fmtPolar();
    68|    });
    69|    // 单位圆引导
    70|    plane.addCircle(0, 0, 5, 'rgba(148,163,184,.15)', true);
    71|  }
    72|};
    73|