     1|/* 第 5 章：共轭与模 */
     2|const chapter05 = {
     3|  id: 'ch5',
     4|  title: '共轭与模',
     5|  subtitle: '关于实轴对称',
     6|  render(container) {
     7|    container.insertAdjacentHTML('beforeend', `
     8|      <div class="chapter">
     9|        <h2>📖 第 5 章：共轭与模</h2>
    10|        <p class="ch-subtitle">关于实轴对称</p>
    11|
    12|        <div class="ch-text">
    13|          <p><strong>共轭</strong> 是复数最重要的概念之一。一个复数 $z = a + bi$ 的共轭记作：</p>
    14|          <div class="formula-block">$$\\bar{z} = a - bi$$</div>
    15|          <p>几何上，共轭相当于 <span class="highlight">关于实轴（Re 轴）镜面翻转</span>。</p>
    16|          <p>有趣的性质：</p>
    17|          <ul style="padding-left:20px;margin:12px 0;line-height:2">
    18|            <li>$z \\cdot \\bar{z} = a^2 + b^2 = |z|^2$ — 一个复数乘以自己的共轭等于模的平方</li>
    19|            <li>$\\overline{z_1 + z_2} = \\bar{z}_1 + \\bar{z}_2$ — 共轭对加法保持</li>
    20|            <li>$\\overline{z_1 \\cdot z_2} = \\bar{z}_1 \\cdot \\bar{z}_2$ — 共轭对乘法保持</li>
    21|          </ul>
    22|        </div>
    23|
    24|        <div class="canvas-wrapper">
    25|          <canvas id="c05-canvas"></canvas>
    26|          <div class="canvas-label">👆 拖拽蓝点，绿色点是它的共轭（关于实轴对称）</div>
    27|        </div>
    28|
    29|        <div class="info-panel" id="c05-info">
    30|          <div class="info-item">
    31|            <span class="dot" style="background:#60a5fa"></span>
    32|            <span class="label">z</span>
    33|            <span class="value" id="c05-z">3 + 2i</span>
    34|          </div>
    35|          <div class="info-item">
    36|            <span class="dot" style="background:#34d399"></span>
    37|            <span class="label">z̄</span>
    38|            <span class="value" id="c05-conj">3 − 2i</span>
    39|          </div>
    40|          <div class="info-item">
    41|            <span class="dot" style="background:#f472b6"></span>
    42|            <span class="label">|z|</span>
    43|            <span class="value" id="c05-mod">3.61</span>
    44|          </div>
    45|          <div class="info-item">
    46|            <span class="dot" style="background:#a78bfa"></span>
    47|            <span class="label">z · z̄ = |z|²</span>
    48|            <span class="value" id="c05-sq">13.00</span>
    49|          </div>
    50|        </div>
    51|
    52|        <div class="ch-text">
    53|          <p>💡 试试把 z 拖到实轴上（虚部=0），此时 z = z̄。只有实数等于自己的共轭。</p>
    54|          <p>💡 再试试把 z 拖到虚轴上（实部=0），看看纯虚数的共轭是什么。</p>
    55|        </div>
    56|      </div>
    57|    `;
    58|
    59|    const z = new Complex(3, 2);
    60|    const plane = new ComplexPlane('c05-canvas', { scale: 45 });
    61|
    62|    plane.addPoint(z, '#60a5fa', 'z', (zp) => {
    63|      const conj = zp.conj();
    64|      document.getElementById('c05-z').textContent = zp.fmt();
    65|      document.getElementById('c05-conj').textContent = conj.fmt();
    66|      document.getElementById('c05-mod').textContent = zp.r.toFixed(2);
    67|      document.getElementById('c05-sq').textContent = (zp.r * zp.r).toFixed(2);
    68|
    69|      plane.clearStatic();
    70|      plane.addStaticPoint(conj, '#34d399', 'z̄');
    71|      // 连线：z 和 z̄ 关于实轴对称
    72|      plane.addLine(zp, conj, 'rgba(52,211,153,.3)', true);
    73|    });
    74|  }
    75|};
    76|