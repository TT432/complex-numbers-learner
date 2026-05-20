/* ===========================
   utils.js — 复数数学工具 (v2)
   =========================== */

/** 去掉多余小数位的 0 */
function cleanNum(n) {
  if (Number.isInteger(n)) return String(n);
  const s = n.toFixed(10);
  return s.replace(/\.?0+$/, '');
}

class Complex {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  get r() { return Math.sqrt(this.a * this.a + this.b * this.b); }
  get theta() { return Math.atan2(this.b, this.a); }
  get deg() { return this.theta * 180 / Math.PI; }

  add(z) { return new Complex(this.a + z.a, this.b + z.b); }
  sub(z) { return new Complex(this.a - z.a, this.b - z.b); }

  mul(z) {
    return new Complex(
      this.a * z.a - this.b * z.b,
      this.a * z.b + this.b * z.a
    );
  }

  div(z) {
    const d = z.a * z.a + z.b * z.b;
    if (d === 0) return new Complex(NaN, NaN);
    return new Complex(
      (this.a * z.a + this.b * z.b) / d,
      (this.b * z.a - this.a * z.b) / d
    );
  }

  conj() { return new Complex(this.a, -this.b); }
  scale(s) { return new Complex(this.a * s, this.b * s); }

  pow(n) {
    const r = Math.pow(this.r, n);
    const t = this.theta * n;
    return new Complex(r * Math.cos(t), r * Math.sin(t));
  }

  /** 格式化为 a+bi，整数不显示小数，±1 省略系数 */
  fmt() {
    const a = this.a;
    const b = this.b;
    if (Math.abs(a) < 1e-10 && Math.abs(b) < 1e-10) return '0';
    if (Math.abs(b) < 1e-10) return cleanNum(a);

    const sign = b >= 0 ? '+' : '-';
    const absB = Math.abs(b);
    const bStr = Math.abs(absB - 1) < 1e-10 ? '' : cleanNum(absB);

    if (Math.abs(a) < 1e-10) return (b >= 0 ? '' : '-') + bStr + 'i';
    return cleanNum(a) + sign + bStr + 'i';
  }

  /** 显示纯数值格式（带小数位控制） */
  fmtVal(dec) {
    return parseFloat(this.a.toFixed(dec)) + '+' + parseFloat(this.b.toFixed(dec)) + 'i';
  }

  /** 极坐标格式 */
  fmtPolar(dec = 2) {
    if (this.r < 1e-10) return '0';
    return `${this.r.toFixed(dec)} \u00B7 e^{${this.deg.toFixed(1)}\u00B0i}`;
  }

  /** 模长格式化 */
  fmtMod(dec = 2) {
    if (this.r < 1e-10) return '0';
    return this.r.toFixed(dec);
  }
}

/** 极坐标 → 直角坐标 */
function polar2rect(r, deg) {
  const rad = deg * Math.PI / 180;
  return new Complex(r * Math.cos(rad), r * Math.sin(rad));
}

/** n 次单位根 */
function unitRoots(n) {
  const roots = [];
  for (let k = 0; k < n; k++) {
    const angle = (2 * Math.PI * k) / n;
    roots.push(new Complex(Math.cos(angle), Math.sin(angle)));
  }
  return roots;
}

/** n 次单位根（带标签） */
function unitRootsLabeled(n) {
  return unitRoots(n).map((z, k) => ({ z, label: `\u03C9^{${k}}` }));
}

/** 随机整数 [min, max] */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** 随机出题（第 7 章用） */
function genQuiz() {
  const types = ['mod', 'conj', 'add', 'sub', 'mul', 'polar', 'real', 'imag'];
  const type = types[randInt(0, types.length - 1)];
  const a = randInt(-5, 5);
  const b = randInt(-5, 5);
  const z = new Complex(a, b);
  if (a === 0 && b === 0) return genQuiz();
  const z2 = new Complex(randInt(-4, 4), randInt(-4, 4));
  if (Math.abs(z2.a) < 1e-10 && Math.abs(z2.b) < 1e-10) return genQuiz();

  let question, answer, options;

  switch (type) {
    case 'mod':
      question = `求复数 $z = ${z.fmt()}$ 的模 $|z|$（保留 1 位小数）`;
      answer = z.r.toFixed(1);
      options = genOptions(answer, z.r);
      break;
    case 'conj':
      question = `求 $z = ${z.fmt()}$ 的共轭 $\\\\bar{z}$`;
      answer = z.conj().fmt();
      options = genOptionsStr(answer, [z.fmt(), z.scale(-1).fmt(), z.conj().scale(-1).fmt(), new Complex(z.b, z.a).fmt()]);
      break;
    case 'add':
      question = `计算 $z_1 = ${z.fmt()},\\\\; z_2 = ${z2.fmt()}$，求 $z_1 + z_2$`;
      answer = z.add(z2).fmt();
      options = genOptionsStr(answer, [z.fmt(), z2.fmt(), z.sub(z2).fmt()]);
      break;
    case 'sub':
      question = `计算 $z_1 = ${z.fmt()},\\\\; z_2 = ${z2.fmt()}$，求 $z_1 - z_2$`;
      answer = z.sub(z2).fmt();
      options = genOptionsStr(answer, [z.fmt(), z2.fmt(), z.add(z2).fmt()]);
      break;
    case 'mul':
      question = `计算 $z_1 = ${z.fmt()},\\\\; z_2 = ${z2.fmt()}$，求 $z_1 \\\\times z_2$`;
      answer = z.mul(z2).fmt();
      options = genOptionsStr(answer, [z.fmt(), z2.fmt(), z.div(z2).fmt()]);
      break;
    case 'polar':
      question = `复数 $z = ${z.fmt()}$ 的辐角（主值，度）约为？`;
      answer = z.deg.toFixed(1);
      options = genOptions(answer, z.deg);
      break;
    case 'real':
      question = `复数 $z = ${z.fmt()}$ 的实部是？`;
      answer = String(a);
      options = genOptions(answer, a);
      break;
    case 'imag':
      question = `复数 $z = ${z.fmt()}$ 的虚部是？`;
      answer = String(b);
      options = genOptions(answer, b);
      break;
  }

  return { question, answer, options, z };
}

function genOptions(correct, around) {
  const opts = new Set([correct]);
  while (opts.size < 4) {
    const d = randInt(-5, 5) / 2;
    const v = (around + d).toFixed(1);
    if (v !== correct) opts.add(v);
  }
  return shuffle([...opts]);
}

function genOptionsStr(correct, distractors) {
  const opts = new Set([correct]);
  for (const d of distractors) {
    if (d !== correct) opts.add(d);
    if (opts.size >= 4) break;
  }
  while (opts.size < 4) {
    opts.add(randInt(-9, 9) + (randInt(0,1) ? '' : 'i'));
  }
  return shuffle([...opts]);
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
