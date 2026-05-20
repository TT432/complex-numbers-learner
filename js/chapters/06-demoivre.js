     1|/* 第 6 章：De Moivre 定理与单位根 */
     2|const chapter06 = {
     3|  id: 'ch6',
     4|  title: 'De Moivre 定理',
     5|  subtitle: '乘方与单位根',
     6|  render(container) {
     7|    container.insertAdjacentHTML('beforeend', `
     8|      <div class="chapter">
     9|        <h2>📖 第 6 章：De Moivre 定理</h2>
    10|        <p class="ch-subtitle">乘方与单位根</p>
    11|
    12|        <div class="ch-text">
    13|          <p>利用极坐标形式，复数的乘方变得极其简单：</p>
    14|          <div class="formula-block">$$[r(\\cos\\theta + i\\sin\\theta)]^n = r^n(\\cos n\\theta + i\\sin n\\theta)$$</div>
    15|          <p>这就是 <strong>De Moivre 定理</strong>。它告诉我们：</p>
    16|          <ul style="padding-left:20px;margin:12px 0;line-height:2">
    17|            <li>模被 <span class="highlight">乘方</span>：$r \\to r^n$</li>
    18|            <li>辐角被 <span class="highlight">放大 n 倍</span>：$\\theta \\to n\\theta$</li>
    19|          </ul>
    20|          <p>拖动下面的滑块，观察 $z^n$ 如何随着 n 的变化而旋转和缩放：</p>
    21|        </div>
    22|
    23|        <div class="canvas-wrapper">
    24|          <canvas id="c06-canvas"></canvas>
    25|          <div class="canvas-label">👆 拖拽蓝点调整 z，滑块调整 n</div>
    26|        </div>
    27|
    28|        <div class="control-group">
    29|          <label>
    30|            n 的次方
    31|            <input type="range" id="c06-slider" min="1" max="8" step="1" value="2">
    32|            <span class="control-value" id="c06-n-val">2</span>
    33|          </label>
    34|        </div>
    35|
    36|        <div class="info-panel" id="c06-info">
    37|          <div class="info-item">
    38|            <span class="dot" style="background:#60a5fa"></span>
    39|            <span class="label">z</span>
    40|            <span class="value" id="c06-z">1.50 + 1.00i</span>
    41|          </div>
    42|          <div class="info-item">
    43|            <span class="dot" style="background:#f472b6"></span>
    44|            <span class="label">zⁿ</span>
    45|            <span class="value" id="c06-zn">1.25 + 3.00i</span>
    46|          </div>
    47|        </div>
    48|
    49|        <div class="ch-text">
    50|          <h3 style="margin:16px 0 8px">单位根 — zⁿ = 1</h3>
    51|          <p>方程 $z^n = 1$ 在复数域恰好有 <strong>n 个解</strong>，它们均匀分布在单位圆上，构成一个正 n 边形：</p>
    52|          <div class="formula-block">$$z_k = \\cos\\frac{2\\pi k}{n} + i\\sin\\frac{2\\pi k}{n},\\quad k = 0,1,\\dots,n-1$$</div>
    53|          <p>调整下方的 n 值观察：</p>
    54|        </div>
    55|
    56|        <div class="control-group">
    57|          <label>
    58|            单位根 n =
    59|            <input type="range" id="c06-root-slider" min="1" max="12" step="1" value="5">
    60|            <span class="control-value" id="c06-root-n-val">5</span>
    61|          </label>
    62|        </div>
    63|
    64|        <div class="canvas-wrapper">
    65|          <canvas id="c06-canvas2"></canvas>
    66|          <div class="canvas-label">n 次单位根构成一个正 n 边形</div>
    67|        </div>
    68|      </div>
    69|    `;
    70|
    71|    // ---- 第一部分：z^n ----
    72|    const z = new Complex(1.5, 1);
    73|    const plane = new ComplexPlane('c06-canvas', { scale: 40 });
    74|    let n = 2;
    75|
    76|    function updatePower() {
    77|      const zn = z.pow(n);
    78|      document.getElementById('c06-z').textContent = z.fmt();
    79|      document.getElementById('c06-zn').textContent = zn.fmt();
    80|      plane.clearStatic();
    81|      plane.addStaticVector(zn, '#f472b6', 'zⁿ');
    82|    }
    83|
    84|    plane.addPoint(z, '#60a5fa', 'z', (zp) => updatePower());
    85|    updatePower();
    86|
    87|    document.getElementById('c06-slider').oninput = function() {
    88|      n = parseInt(this.value);
    89|      document.getElementById('c06-n-val').textContent = n;
    90|      updatePower();
    91|    };
    92|
    93|    // ---- 第二部分：单位根 ----
    94|    const plane2 = new ComplexPlane('c06-canvas2', { scale: 50 });
    95|    let rootN = 5;
    96|
    97|    function updateRoots() {
    98|      plane2.clearAll();
    99|      const roots = unitRoots(rootN);
   100|      const colors = ['#60a5fa','#34d399','#f472b6','#fb923c','#a78bfa','#fbbf24','#ef4444','#06b6d4','#8b5cf6','#ec4899','#14b8a6','#f97316'];
   101|
   102|      // 单位圆
   103|      plane2.addCircle(0, 0, 1, 'rgba(148,163,184,.3)', true);
   104|
   105|      // 正多边形连线
   106|      for (let i = 0; i < rootN; i++) {
   107|        const j = (i + 1) % rootN;
   108|        plane2.addLine(roots[i], roots[j], 'rgba(96,165,250,.3)');
   109|      }
   110|
   111|      // 根的点
   112|      roots.forEach((rz, idx) => {
   113|        plane2.addStaticPoint(rz, colors[idx % colors.length], `ω^{${idx}}`);
   114|      });
   115|    }
   116|
   117|    updateRoots();
   118|
   119|    document.getElementById('c06-root-slider').oninput = function() {
   120|      rootN = parseInt(this.value);
   121|      document.getElementById('c06-root-n-val').textContent = rootN;
   122|      updateRoots();
   123|    };
   124|  }
   125|};
   126|