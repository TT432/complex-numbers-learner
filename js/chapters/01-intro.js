     1|/* 第 1 章：认识复数 */
     2|const chapter01 = {
     3|  id: 'ch1',
     4|  title: '认识复数',
     5|  subtitle: '从实数到复数 — 复平面',
     6|  render(container) {
     7|    container.insertAdjacentHTML('beforeend', `
     8|      <div class="chapter">
     9|        <h2>📖 第 1 章：认识复数</h2>
    10|        <p class="ch-subtitle">从实数到复数 — 复平面</p>
    11|
    12|        <div class="ch-text">
    13|          <p>实数可以用数轴上的一个点来表示。但世界上有些问题在实数范围内无解，比如</p>
    14|          <div class="formula-block">$$x^2 + 1 = 0$$</div>
    15|          <p>因为没有任何实数的平方等于 <span class="highlight">-1</span>。于是数学家引入了一个新数：</p>
    16|          <div class="formula-block">$$i^2 = -1$$</div>
    17|          <p>这个 <span class="highlight">i</span> 叫做 <strong>虚数单位</strong>（imaginary unit）。</p>
    18|          <p>有了 i，我们就可以表示形如 <span class="highlight2">$a + bi$</span> 的数，称为 <strong>复数</strong>：</p>
    19|          <ul style="padding-left:20px;margin:12px 0;line-height:2">
    20|            <li>$a$ = <strong>实部</strong>（real part）</li>
    21|            <li>$b$ = <strong>虚部</strong>（imaginary part）</li>
    22|          </ul>
    23|          <p>实数就是虚部为 0 的特殊复数。纯虚数就是实部为 0 的复数。</p>
    24|          <p>复数不是在一条直线上，而是在一个平面上——<strong>复平面</strong>：横轴是实轴 (Re)，纵轴是虚轴 (Im)。</p>
    25|        </div>
    26|
    27|        <div class="canvas-wrapper">
    28|          <canvas id="c01-canvas"></canvas>
    29|          <div class="canvas-label">👆 拖拽蓝点，观察实部和虚部如何变化</div>
    30|        </div>
    31|
    32|        <div class="info-panel" id="c01-info">
    33|          <div class="info-item">
    34|            <span class="dot" style="background:#60a5fa"></span>
    35|            <span class="label">复数 =</span>
    36|            <span class="value" id="c01-val">0</span>
    37|          </div>
    38|          <div class="info-item">
    39|            <span class="label">实部 Re =</span>
    40|            <span class="value" id="c01-real">0</span>
    41|          </div>
    42|          <div class="info-item">
    43|            <span class="label">虚部 Im =</span>
    44|            <span class="value" id="c01-imag">0</span>
    45|          </div>
    46|        </div>
    47|
    48|        <div class="ch-text">
    49|          <p>试试把点拖到纯虚数的位置（实部为 0），再拖到纯实数的位置（虚部为 0）。</p>
    50|          <p>💡 <strong>提示：</strong> 每个复数对应复平面上唯一的一个点，反之亦然。</p>
    51|        </div>
    52|      </div>
    53|    `;
    54|
    55|    const z = new Complex(0, 0);
    56|    const plane = new ComplexPlane('c01-canvas', { scale: 50 });
    57|    plane.addPoint(z, '#60a5fa', 'z', (zp) => {
    58|      document.getElementById('c01-val').textContent = zp.fmt();
    59|      document.getElementById('c01-real').textContent = Math.abs(zp.a) < 1e-10 ? '0' : zp.a;
    60|      document.getElementById('c01-imag').textContent = Math.abs(zp.b) < 1e-10 ? '0' : zp.b.toFixed(2) + 'i';
    61|    });
    62|  }
    63|};
    64|