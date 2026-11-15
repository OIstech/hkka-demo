/* 互動組織架構圖 — 最多 4 層，全部展開；桌面顯示架構圖，1024px 以下自動改為列表
   第 1 層 會長 → 第 2 層 副會長／秘書長／司庫 → 第 3 層 委員會及部門 → 第 4 層 成員
   n = 姓名（示例）, r = 職位, en = 英文職位, u = 所屬單位, g = 段位 */

const ORG = {
  n: "陳大文", r: "會長", en: "President", u: "執行委員會", g: "劍道教士七段",
  c: [
    { n: "李志明", r: "副會長（劍道）", en: "Vice-President (Kendo)", u: "執行委員會", g: "劍道教士七段",
      c: [
        { u: "發展委員會", n: "黃嘉欣", r: "主席", en: "Chair, Development Committee", g: "劍道六段",
          c: [{ n: "張偉傑", r: "委員" }, { n: "林美玲", r: "委員" }, { n: "何家豪", r: "青少年發展主任" }] },
        { u: "裁判及教練委員會", n: "吳詠詩", r: "主席", en: "Chair, Referee & Coaching Committee", g: "劍道教士七段",
          c: [{ n: "鄭子健", r: "首席裁判" }, { n: "梁淑儀", r: "教練培訓統籌" }, { n: "劉俊宏", r: "委員" }, { n: "周曉彤", r: "委員" }] },
        { u: "運動員遴選委員會", n: "馬浩然", r: "主席", en: "Chair, Athlete Selection Committee", g: "劍道六段",
          c: [{ n: "羅凱琳", r: "港隊總教練" }, { n: "謝志強", r: "獨立委員" }, { n: "余嘉敏", r: "運動員代表" }] },
      ] },
    { n: "許文傑", r: "副會長（居合道及杖道）", en: "Vice-President (Iaido & Jodo)", u: "執行委員會", g: "居合道錬士六段",
      c: [
        { u: "居合道部", n: "葉家寶", r: "部長", en: "Head, Iaido Section", g: "居合道六段",
          c: [{ n: "蔡詩琪", r: "教練" }, { n: "鄧振華", r: "教練" }] },
        { u: "杖道部", n: "曾慧敏", r: "部長", en: "Head, Jodo Section", g: "杖道五段",
          c: [{ n: "彭志遠", r: "教練" }, { n: "蕭雅文", r: "委員" }] },
      ] },
    { n: "潘國明", r: "秘書長", en: "Honorary Secretary", u: "執行委員會", g: "劍道五段",
      c: [
        { u: "活動委員會", n: "杜曉晴", r: "主席", en: "Chair, Events Committee",
          c: [{ n: "姚建邦", r: "比賽統籌" }, { n: "袁穎欣", r: "講習會統籌" }, { n: "盧永康", r: "審查統籌" }] },
        { u: "秘書處", n: "江芷晴", r: "行政經理", en: "Executive Manager, Secretariat",
          c: [{ n: "高子軒", r: "行政主任" }, { n: "孔慧珊", r: "項目主任" }, { n: "伍家明", r: "會員事務主任" }] },
      ] },
    { n: "莫嘉偉", r: "司庫", en: "Honorary Treasurer", u: "執行委員會", g: "劍道五段",
      c: [
        { u: "財務及審計小組", n: "方綺雯", r: "召集人", en: "Convenor, Finance & Audit Panel",
          c: [{ n: "石俊賢", r: "委員" }, { n: "唐詠恩", r: "會計主任" }] },
      ] },
  ],
};

/* ---------- 建立索引 ---------- */
const NODES = [];
(function index(node, depth, parent) {
  node.id = NODES.length; node.depth = depth; node.parent = parent; node.c = node.c || [];
  if (!node.u && parent) node.u = parent.u;
  NODES.push(node);
  node.c.forEach(ch => index(ch, depth + 1, node));
})(ORG, 1, null);
const count = n => n.c.reduce((s, ch) => s + 1 + count(ch), 0);

let q = "";
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const $org = document.getElementById("org");

/* 搜尋：符合者及其上層 */
function visibleSet() {
  if (!q) return null;
  const vis = new Set();
  NODES.forEach(n => {
    if ([n.n, n.r, n.u, n.en, n.g].some(v => v && v.toLowerCase().includes(q))) {
      for (let p = n; p; p = p.parent) vis.add(p.id);
    }
  });
  return vis;
}
const hl = s => {
  if (!q || !s) return esc(s || "");
  const i = s.toLowerCase().indexOf(q);
  return i < 0 ? esc(s) : esc(s.slice(0, i)) + "<mark>" + esc(s.slice(i, i + q.length)) + "</mark>" + esc(s.slice(i + q.length));
};
const kids = (n, vis) => vis ? n.c.filter(ch => vis.has(ch.id)) : n.c;
const avatar = n => `<span class="oa oa--l${n.depth}" aria-hidden="true">${esc(n.n[0])}</span>`;
const LV = ["", "會長", "副會長及幹事", "委員會及部門", "成員"];
/* 欄寬按第 3 層數目分配：下屬越多的分支越闊 */
const span = (n, vis) => n.depth >= 3 ? 1 : Math.max(1, kids(n, vis).reduce((s, k) => s + span(k, vis), 0));

/* ---------- 架構圖（桌面）：全部展開，欄寬自動壓縮 ---------- */
function card(n) {
  return `<button class="oc-card oc-card--l${n.depth}" data-person="${n.id}">
    ${n.depth <= 2 ? avatar(n) : ""}
    <span class="oc-txt">${n.depth === 3 ? `<small>${hl(n.u)}</small>` : ""}<b>${hl(n.n)}</b><span>${hl(n.r)}</span></span>
  </button>`;
}
function chartNode(n, vis) {
  const ks = kids(n, vis);
  let sub = "";
  if (ks.length) {
    sub = n.depth === 3
      ? `<div class="oc-stack">${ks.map(k => `<button class="oc-leaf" data-person="${k.id}"><b>${hl(k.n)}</b><span>${hl(k.r)}</span></button>`).join("")}</div>`
      : `<ul>${ks.map(k => chartNode(k, vis)).join("")}</ul>`;
  }
  return `<li style="flex:${span(n, vis)} 1 0">${card(n)}${sub}</li>`;
}

/* ---------- 列表（流動裝置）：全部展開 ---------- */
function listNode(n, vis) {
  const ks = kids(n, vis);
  return `<li class="ol__li">
    <button class="ol__row ol__row--l${n.depth}" data-person="${n.id}">
      ${avatar(n)}
      <span class="ol__txt"><b>${hl(n.n)}</b><span>${hl(n.r)}${n.depth >= 3 ? ` · ${hl(n.u)}` : ""}</span></span>
      ${n.c.length ? `<span class="ol__count">${count(n)} 人</span>` : ""}
    </button>
    ${ks.length ? `<ul class="ol__ul">${ks.map(k => listNode(k, vis)).join("")}</ul>` : ""}
  </li>`;
}

function render() {
  const vis = visibleSet();
  $org.innerHTML = vis && !vis.size
    ? `<p class="org-empty">找不到「${esc(q)}」相關的成員。</p>`
    : `<div class="oc-wrap"><div class="oc"><ul>${chartNode(ORG, vis)}</ul></div></div><ul class="ol">${listNode(ORG, vis)}</ul>`;
}

/* ---------- 詳情面板 ---------- */
const $od = document.getElementById("od"), $odp = document.getElementById("odPanel");
let lastFocus = null;
function showPerson(id) {
  const n = NODES[id], p = n.parent;
  $odp.innerHTML = `
    <div class="od__top"><span class="ol__lv">第 ${n.depth} 層 · ${LV[n.depth]}</span><button class="od__x" data-oclose aria-label="關閉"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
    <div class="od__hero">${avatar(n)}<div><h3 id="odName">${esc(n.n)}</h3><p>${esc(n.r)}</p>${n.en ? `<p class="zh">${esc(n.en)}</p>` : ""}</div></div>
    <dl class="od__dl">
      <div><dt>所屬單位</dt><dd>${esc(n.u)}</dd></div>
      ${n.g ? `<div><dt>段位</dt><dd>${esc(n.g)}</dd></div>` : ""}
      <div><dt>任期</dt><dd>2025 – 2027 年度</dd></div>
      ${p ? `<div><dt>直屬上級</dt><dd><button class="od__link" data-person="${p.id}">${esc(p.n)} · ${esc(p.r)}</button></dd></div>` : ""}
    </dl>
    ${n.c.length ? `<h4 class="od__h">直屬成員（${n.c.length}）</h4><div class="od__list">${n.c.map(k => `<button class="od__person" data-person="${k.id}">${avatar(k)}<span><b>${esc(k.n)}</b><span>${esc(k.r)}${k.depth === 3 ? " · " + esc(k.u) : ""}</span></span></button>`).join("")}</div>` : ""}
    <a class="btn btn--outline btn--sm od__mail" href="#">聯絡秘書處</a>`;
  if ($od.hidden) lastFocus = document.activeElement;
  $od.hidden = false; document.body.style.overflow = "hidden";
  $odp.querySelector("[data-oclose]").focus();
}
function closePerson() { if ($od.hidden) return; $od.hidden = true; document.body.style.overflow = ""; lastFocus?.focus({ preventScroll: true }); }
$od.addEventListener("click", e => {
  if (e.target.closest("[data-oclose]")) return closePerson();
  const p = e.target.closest("[data-person]"); if (p) showPerson(Number(p.dataset.person));
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closePerson(); });

/* ---------- 互動 ---------- */
$org.addEventListener("click", e => { const p = e.target.closest("[data-person]"); if (p) showPerson(Number(p.dataset.person)); });
document.getElementById("orgQ").addEventListener("input", e => { q = e.target.value.trim().toLowerCase(); render(); });

const units = new Set(NODES.filter(n => n.depth === 3).map(n => n.u)).size;
document.getElementById("orgStats").innerHTML = `<span><b>4</b> 層架構</span><span><b>${NODES.length}</b> 位成員</span><span><b>${units}</b> 個委員會及部門</span>`;

render();
