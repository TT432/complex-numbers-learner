     1|/* 第 4 章：复数的乘除法 */
     2|const chapter04 = {
     3|  id: 'ch4',
     4|  title: '复数的乘除法',
     5|  subtitle: '旋转 + 缩放',
     6|  render(container) {
     7|    container.insertAdjacentHTML('beforeend', `
     8|      <div class="chapter">
     9|        <h2>📖 第 4 章：复数的乘除法</h2>
    10|        <p class="ch-subtitle">旋转 + 缩放</p>
    11|
    12|        <div class="ch-text">
    13|          <p>复数的乘除法在几何上非常优雅——它同时包含 <strong>旋转</strong> 和 <strong>缩放</strong>：</p>
    14|          <div class="formula-block">$$z_1 \\times z_2 = r_1 r_2 [\\cos(\\theta_1+\\theta_2) + i\\sin(\\theta_1+\\theta_2)]$$</div>
    15|          <p>用文字说就是：</p>
    16|          <ul style="padding-left:20px;margin:12px 0;line-height:2">
    17|            <li><span class="highlight">模</span>：相乘 ⇒ $|z_1 z_2| = |z_1| \\cdot |z_2|$</li>
    18|            <li><span class="highlight2">辐角</span>：相加 ⇒ $\\arg(z_1 z_2) = \\arg(z_1) + \\arg(z_2)$</li>
    19|          </ul>
    20|          <p>也就是说，乘以一个复数相当于先缩放到它的模，再旋转它的辐角。</p>
    21|          <p>特别地，乘以 <span class="highlight">i</span> 就是逆时针旋转 <strong>90°</strong>！</p>
    22|        </div>
    23|
    24|        <div class="canvas-wrapper">
    25|          <canvas id="c04-canvas"></canvas>
    26|          <div class="canvas-label">👆 拖拽蓝色点，粉色=乘积，橙色=商</div>
    27|        </div>
    28|
    29|        <div class="info-panel" id="c04-info">
    30|          <div class="info-item">
    31|            <span class="dot" style="background:#60a5fa"></span>
    32|            <span class="label">z₁</span>
    33|            <span class="value" id="c04-z1">2 + 2i</span>
    34|          </div>
    35|          <div class="info-item">
    36|            <span class="dot" style="background:#34d399"></span>
    37|            <span class="label">z₂</span>
    38|            <span class="value" id="c04-z2">1 + 2i</span>
    39|          </div>
    40|          <div class="info-item">
    41|            <span class="dot" style="background:#f472b6"></span>
    42|            <span class="label">z₁ × z₂</span>
    43|            <span class="value" id="c04-mul">−2 + 6i</span>
    44|          </div>
    45|          <div class="info-item">
    46|            <span class="dot" style="background:#fb923c"></span>
    47|            <span class="label">z₁ ÷ z₂</span>
    48|            <span class="value" id="c04-div">1.20 − 0.40i</span>
    49|          </div>
    50|        </div>
    51|
    52|        <div class="control-group">
    53|          <label>
    54|            乘以 i：
    55|            <button class="animate-btn" id="c04-mul-i">z₁ × i</button>
    56|          </label>
    57|          <label>
    58|            乘以 −i：
    59|            <button class="animate-btn" id="c04-mul-ni">z₁ × (−i)</button>
    60|          </label>
    61|        </div>
    62|
    63|        <div class="ch-text">
    64|          <p>💡 试着把 z₂ 拖到实轴上（虚部=0），看看乘法退化成普通的缩放。</p>
    65|          <p>💡 再把 z₂ 拖到单位圆上（模=1），看看乘法退化成纯旋转。</p>
    66|        </div>
    67|      </div>
    68|    `;
    69|
    70|    const z1 = new Complex(2, 2);
    71|    const z2 = new Complex(1, 2);
    72|    const plane = new ComplexPlane('c04-canvas', { scale: 40 });
    73|
    74|    function update(z1p, z2p) {
    75|      const mul = z1p.mul(z2p);
    76|      const div = z1p.div(z2p);
    77|      document.getElementById('c04-z1').textContent = z1p.fmt();
    78|      document.getElementById('c04-z2').textContent = z2p.fmt();
    79|      document.getElementById('c04-mul').textContent = mul.fmt();
    80|      document.getElementById('c04-div').textContent = div.fmt();
    81|
    82|      plane.clearStatic();
    83|      plane.addStaticVector(mul, '#f472b6', '');
    84|      plane.addStaticVector(div, '#fb923c', '');
    85|    }
    86|
    87|    plane.addPoint(z1, '#60a5fa', 'z₁', (zp) => update(zp, z2));
    88|    plane.addPoint(z2, '#34d399', 'z₂', (zp) => update(z1, zp));
    89|    update(z1, z2);
    90|
    91|    document.getElementById('c04-mul-i').onclick = () => {
    92|      const newZ1 = z1.mul(new Complex(0, 1));
    93|      z1.a = newZ1.a; z1.b = newZ1.b;
    94|      plane.render();
    95|      update(z1, z2);
    96|    };
    97|    document.getElementById('c04-mul-ni').onclick = () => {
    98|      const newZ1 = z1.mul(new Complex(0, -1));
    99|      z1.a = newZ1.a; z1.b = newZ1.b;
   100|      plane.render();
   101|      update(z1, z2);
   102|    };
   103|  }
   104|};
   105|