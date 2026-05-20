     1|/* 第 3 章：复数的加减法 */
     2|const chapter03 = {
     3|  id: 'ch3',
     4|  title: '复数的加减法',
     5|  subtitle: '向量的平移',
     6|  render(container) {
     7|    container.insertAdjacentHTML('beforeend', `
     8|      <div class="chapter">
     9|        <h2>📖 第 3 章：复数的加减法</h2>
    10|        <p class="ch-subtitle">向量的平移</p>
    11|
    12|        <div class="ch-text">
    13|          <p>复数的加减法在几何上就是 <strong>向量的加减</strong>：</p>
    14|          <div class="formula-block">
    15|            $$z_1 + z_2 = (a_1 + a_2) + (b_1 + b_2)i$$
    16|          </div>
    17|          <p><span class="highlight">加法</span> = 向量平移（平行四边形法则）</p>
    18|          <p><span class="highlight2">减法</span> = 反向平移</p>
    19|          <p>拖拽下方两个蓝点，观察和与差的变化：</p>
    20|        </div>
    21|
    22|        <div class="canvas-wrapper">
    23|          <canvas id="c03-canvas"></canvas>
    24|          <div class="canvas-label">👆 拖拽蓝色点，观察粉色 (和) 与橙色 (差)</div>
    25|        </div>
    26|
    27|        <div class="info-panel" id="c03-info">
    28|          <div class="info-item">
    29|            <span class="dot" style="background:#60a5fa"></span>
    30|            <span class="label">z₁</span>
    31|            <span class="value" id="c03-z1">3 + 2i</span>
    32|          </div>
    33|          <div class="info-item">
    34|            <span class="dot" style="background:#34d399"></span>
    35|            <span class="label">z₂</span>
    36|            <span class="value" id="c03-z2">1 + 3i</span>
    37|          </div>
    38|          <div class="info-item">
    39|            <span class="dot" style="background:#f472b6"></span>
    40|            <span class="label">z₁ + z₂</span>
    41|            <span class="value" id="c03-add">4 + 5i</span>
    42|          </div>
    43|          <div class="info-item">
    44|            <span class="dot" style="background:#fb923c"></span>
    45|            <span class="label">z₁ − z₂</span>
    46|            <span class="value" id="c03-sub">2 − 1i</span>
    47|          </div>
    48|        </div>
    49|
    50|        <div class="ch-text">
    51|          <p>💡 试试把 z₂ 的实部和虚部取反：z₁ − z₂ 其实就是 z₁ + (−z₂)。</p>
    52|        </div>
    53|      </div>
    54|    `;
    55|
    56|    const z1 = new Complex(3, 2);
    57|    const z2 = new Complex(1, 3);
    58|    const plane = new ComplexPlane('c03-canvas', { scale: 40 });
    59|
    60|    function update(z1p, z2p) {
    61|      const add = z1p.add(z2p);
    62|      const sub = z1p.sub(z2p);
    63|      document.getElementById('c03-z1').textContent = z1p.fmt();
    64|      document.getElementById('c03-z2').textContent = z2p.fmt();
    65|      document.getElementById('c03-add').textContent = add.fmt();
    66|      document.getElementById('c03-sub').textContent = sub.fmt();
    67|
    68|      // 清除旧的静态元素
    69|      plane.clearStatic();
    70|      // 画结果
    71|      plane.addStaticVector(add, '#f472b6');
    72|      plane.addStaticVector(sub, '#fb923c');
    73|      // 画平行四边形辅助线
    74|      plane.addLine(z1p, z1p.add(z2p), 'rgba(96,165,250,.2)', true);
    75|      plane.addLine(z2p, z1p.add(z2p), 'rgba(52,211,153,.2)', true);
    76|    }
    77|
    78|    plane.addPoint(z1, '#60a5fa', 'z₁', (zp) => {
    79|      update(zp, z2);
    80|    });
    81|    plane.addPoint(z2, '#34d399', 'z₂', (zp) => {
    82|      update(z1, zp);
    83|    });
    84|
    85|    update(z1, z2);
    86|  }
    87|};
    88|