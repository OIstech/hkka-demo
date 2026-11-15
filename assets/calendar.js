/* 綜合活動行事曆 — Google 日曆式 月／週／議程 檢視
   活動資料為示例（dummy），日後可改為由 CMS / API 載入。
   網址參數：?d=YYYY-MM-DD（開啟日期）&v=month|week|agenda
   每項活動可設 href 指向其詳情文章，例如 href: "post.html?slug=autumn-grading-2026" */

const CATS = [
  { id: "seminar", name: "講習會", color: "#2563c7" },
  { id: "comp", name: "比賽", color: "#dc2626" },
  { id: "exam", name: "段級審查", color: "#b45309" },
  { id: "training", name: "訓練班", color: "#15803d" },
  { id: "admin", name: "會務及假期", color: "#7c3aed" },
];
const CAT = Object.fromEntries(CATS.map(c => [c.id, c]));

const EVENTS = [
  { title: "秋季交流大會", cat: "comp", date: "2026-10-31", start: "09:00", end: "17:00", venue: "九龍公園體育館", note: "各屬會道場團體交流賽，歡迎觀賽。" },
  { title: "執行委員會第十一次會議", cat: "admin", date: "2026-11-05", start: "19:30", end: "21:30", venue: "本會會議室" },
  { title: "劍道形講習會（初學者）", cat: "seminar", date: "2026-11-08", start: "10:00", end: "13:00", venue: "石硤尾公園體育館", reg: true },
  { title: "秋季段位審查報名截止", cat: "exam", date: "2026-11-15", allDay: true, note: "逾期報名恕不受理。" },
  { title: "裁判講習會 — 審判員課程第二級", cat: "seminar", date: "2026-11-16", start: "09:30", end: "17:00", venue: "石硤尾公園體育館", reg: true, note: "需持有審判員課程第一級證書。" },
  { title: "教練研討會：青少年訓練安全", cat: "seminar", date: "2026-11-18", start: "19:30", end: "21:30", venue: "網上（Zoom）", reg: true },
  { title: "秋季段位審查（初段至五段）", cat: "exam", date: "2026-11-22", start: "09:00", end: "18:00", venue: "九龍公園體育館", note: "考生請於 08:30 前報到，並攜帶會員證。" },
  { title: "兒童劍道體驗班（6–12歲）", cat: "training", date: "2026-11-29", start: "10:00", end: "12:00", venue: "石硤尾公園體育館", reg: true, note: "免費參加，名額 30 人，先到先得。" },
  { title: "錦標賽對陣抽籤", cat: "comp", date: "2026-12-02", start: "19:30", end: "20:30", venue: "本會會議室" },
  { title: "全港學界劍道邀請賽", cat: "comp", date: "2026-12-06", start: "09:00", end: "18:00", venue: "九龍公園體育館", reg: true },
  { title: "居合道段位審查", cat: "exam", date: "2026-12-12", start: "13:00", end: "18:00", venue: "石硤尾公園體育館" },
  { title: "第五十八屆香港劍道錦標賽", cat: "comp", date: "2026-12-14", start: "09:00", end: "18:30", venue: "九龍公園體育館", note: "個人賽及團體賽，FIK 比賽規則。" },
  { title: "周年會員大會", cat: "admin", date: "2026-12-19", start: "14:00", end: "17:00", venue: "九龍公園體育館 會議室" },
  { title: "聖誕及新年假期（暫停常規訓練）", cat: "admin", date: "2026-12-24", until: "2027-01-01", allDay: true },
  { title: "居合道冬季講習會 — 全日本劍道連盟應邀老師", cat: "seminar", date: "2027-01-10", until: "2027-01-11", allDay: true, venue: "石硤尾公園體育館", reg: true },
  { title: "寒假劍道訓練班開課", cat: "training", date: "2027-01-16", start: "10:00", end: "12:00", venue: "九龍公園體育館", reg: true },
  { title: "杖道講習會", cat: "seminar", date: "2027-01-24", start: "14:00", end: "17:00", venue: "石硤尾公園體育館", reg: true },
  { title: "新春交流稽古", cat: "training", date: "2027-01-31", start: "10:00", end: "13:00", venue: "九龍公園體育館" },
];

/* 每週常規訓練（假期暫停） */
(function addWeekly() {
  const rules = [
    { dow: 2, title: "常規劍道訓練班", start: "19:30", end: "21:30", venue: "九龍公園體育館" },
    { dow: 4, title: "常規劍道訓練班", start: "19:30", end: "21:30", venue: "九龍公園體育館" },
    { dow: 6, title: "居合道常規練習", start: "14:00", end: "16:00", venue: "石硤尾公園體育館" },
  ];
  for (let d = parse("2026-10-01"); d <= parse("2027-02-28"); d = addDays(d, 1)) {
    const ds = ymd(d);
    if (ds >= "2026-12-24" && ds <= "2027-01-01") continue;
    rules.filter(r => r.dow === d.getDay()).forEach(r => EVENTS.push({ ...r, cat: "training", date: ds, weekly: true }));
  }
})();
EVENTS.forEach((e, i) => { e.id = i; e.until = e.until || e.date; });

/* ---------- 日期工具 ---------- */
function parse(s) { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); }
function ymd(d) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; }
function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
const WD = "日一二三四五六";
const mins = t => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
const fmtDay = d => `${d.getMonth() + 1}月${d.getDate()}日（星期${WD[d.getDay()]}）`;
const timeRange = e => e.allDay ? "全日" : `${e.start} – ${e.end}`;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ---------- 狀態 ---------- */
const params = new URLSearchParams(location.search);
const todayStr = ymd(new Date());
const mq = matchMedia("(max-width:767px)");
let cur = params.get("d") && /^\d{4}-\d{2}-\d{2}$/.test(params.get("d")) ? parse(params.get("d")) : new Date();
let focus = params.get("d") || null;
let view = ["month", "week", "agenda"].includes(params.get("v")) ? params.get("v") : (mq.matches ? "agenda" : "month");
let miniCur = new Date(cur.getFullYear(), cur.getMonth(), 1);
const active = new Set(CATS.map(c => c.id));

const $view = document.getElementById("calView");
const $title = document.getElementById("calTitle");
const $pop = document.getElementById("calPop");

function eventsOn(ds) {
  return EVENTS.filter(e => active.has(e.cat) && e.date <= ds && e.until >= ds)
    .sort((a, b) => (b.allDay ? 1 : 0) - (a.allDay ? 1 : 0) || (a.start || "").localeCompare(b.start || ""));
}
const startOfWeek = d => addDays(d, -d.getDay());

/* ---------- 側欄 ---------- */
function renderCats() {
  document.getElementById("calCats").innerHTML = CATS.map(c => `
    <label class="catbox" style="--c:${c.color}">
      <input type="checkbox" value="${c.id}" ${active.has(c.id) ? "checked" : ""}><span class="catbox__sq"></span>${c.name}
    </label>`).join("");
}
document.getElementById("calCats").addEventListener("change", e => {
  e.target.checked ? active.add(e.target.value) : active.delete(e.target.value);
  render();
});

function renderMini() {
  const y = miniCur.getFullYear(), m = miniCur.getMonth();
  const start = startOfWeek(new Date(y, m, 1));
  const sel = ymd(cur);
  let cells = "";
  for (let i = 0; i < 42; i++) {
    const d = addDays(start, i), ds = ymd(d);
    const has = EVENTS.some(e => !e.weekly && active.has(e.cat) && e.date <= ds && e.until >= ds);
    cells += `<button class="mini__d ${d.getMonth() !== m ? "is-out" : ""} ${ds === todayStr ? "is-today" : ""} ${ds === sel ? "is-sel" : ""} ${has ? "has-ev" : ""}" data-goto="${ds}" aria-label="${fmtDay(d)}">${d.getDate()}</button>`;
  }
  document.getElementById("mini").innerHTML = `
    <div class="mini__head"><strong>${y}年${m + 1}月</strong>
      <span><button class="cal__arrow" data-mini="-1" aria-label="上個月">‹</button><button class="cal__arrow" data-mini="1" aria-label="下個月">›</button></span></div>
    <div class="mini__wd">${[...WD].map(w => `<span>${w}</span>`).join("")}</div>
    <div class="mini__grid">${cells}</div>`;
}
document.getElementById("mini").addEventListener("click", e => {
  const b = e.target.closest("[data-mini]");
  if (b) { miniCur = new Date(miniCur.getFullYear(), miniCur.getMonth() + Number(b.dataset.mini), 1); renderMini(); }
});

/* ---------- 月檢視 ---------- */
function chip(e, ds) {
  const cont = e.allDay && ds !== e.date && parse(ds).getDay() !== 0; // 多日活動：只在首日及每週首格顯示標題
  return e.allDay
    ? `<button class="cev cev--all ${cont ? "is-cont" : ""}" style="--c:${CAT[e.cat].color}" data-ev="${e.id}" title="${esc(e.title)}">${cont ? "" : esc(e.title)}</button>`
    : `<button class="cev" style="--c:${CAT[e.cat].color}" data-ev="${e.id}" title="${esc(e.start + " " + e.title)}"><i></i><span class="cev__t">${e.start}</span><span class="cev__n">${esc(e.title)}</span></button>`;
}
function renderMonth() {
  const y = cur.getFullYear(), m = cur.getMonth();
  const first = new Date(y, m, 1);
  const rows = Math.ceil((first.getDay() + new Date(y, m + 1, 0).getDate()) / 7);
  const start = startOfWeek(first);
  const max = mq.matches ? 4 : 3;
  let cells = "";
  for (let i = 0; i < rows * 7; i++) {
    const d = addDays(start, i), ds = ymd(d), evs = eventsOn(ds);
    const shown = evs.length > max ? evs.slice(0, max - 1) : evs;
    cells += `<div class="cm__cell ${d.getMonth() !== m ? "is-out" : ""} ${ds === todayStr ? "is-today" : ""} ${ds === focus ? "is-focus" : ""}" data-day="${ds}">
      <button class="cm__num" data-week="${ds}" aria-label="${fmtDay(d)}，週檢視">${d.getDate() === 1 ? `${d.getMonth() + 1}月1日` : d.getDate()}</button>
      <div class="cm__evs">${shown.map(e => chip(e, ds)).join("")}${evs.length > shown.length ? `<button class="cm__more" data-more="${ds}">還有 ${evs.length - shown.length} 項</button>` : ""}</div>
    </div>`;
  }
  $view.innerHTML = `<div class="cm" style="--rows:${rows}"><div class="cm__wd">${[...WD].map(w => `<div>${w}</div>`).join("")}</div><div class="cm__grid">${cells}</div></div>`;
  $title.textContent = `${y}年${m + 1}月`;
}

/* ---------- 週檢視 ---------- */
const H0 = 7, H1 = 23, HH = 44; // 07:00–23:00，每小時 44px
function layoutDay(evs) {
  const items = evs.filter(e => !e.allDay).map(e => ({ e, s: mins(e.start), f: mins(e.end), col: 0, cols: 1 }));
  let cluster = [], end = -1;
  const flush = () => { const n = Math.max(1, ...cluster.map(x => x.col + 1)); cluster.forEach(x => x.cols = n); cluster = []; };
  items.forEach(it => {
    if (it.s >= end) { flush(); end = -1; }
    const used = cluster.filter(x => x.f > it.s).map(x => x.col);
    while (used.includes(it.col)) it.col++;
    cluster.push(it); end = Math.max(end, it.f);
  });
  flush();
  return items;
}
function renderWeek() {
  const s = startOfWeek(cur), days = [...Array(7)].map((_, i) => addDays(s, i));
  const head = days.map(d => { const ds = ymd(d); return `<div class="cw__dh ${ds === todayStr ? "is-today" : ""}"><span>${WD[d.getDay()]}</span><b>${d.getDate()}</b></div>`; }).join("");
  const all = days.map(d => { const ds = ymd(d); return `<div class="cw__ac">${eventsOn(ds).filter(e => e.allDay).map(e => chip({ ...e }, e.date)).join("")}</div>`; }).join("");
  const times = [...Array(H1 - H0)].map((_, i) => `<span style="top:${i * HH}px">${String(H0 + i).padStart(2, "0")}:00</span>`).join("");
  const now = new Date(), nowM = now.getHours() * 60 + now.getMinutes();
  const cols = days.map(d => {
    const ds = ymd(d);
    const blocks = layoutDay(eventsOn(ds)).map(({ e, s, f, col, cols }) => {
      const top = Math.max(0, (s - H0 * 60) / 60 * HH), h = Math.max(22, (f - s) / 60 * HH - 2);
      return `<button class="cwe ${h < 40 ? "is-short" : ""}" style="--c:${CAT[e.cat].color};top:${top}px;height:${h}px;left:calc(${col / cols * 100}% + 1px);width:calc(${100 / cols}% - 4px)" data-ev="${e.id}"><b>${esc(e.title)}</b><span>${e.start} – ${e.end}${e.venue ? " · " + esc(e.venue) : ""}</span></button>`;
    }).join("");
    const line = ds === todayStr && nowM >= H0 * 60 && nowM <= H1 * 60 ? `<div class="cw__now" style="top:${(nowM - H0 * 60) / 60 * HH}px"></div>` : "";
    return `<div class="cw__col">${blocks}${line}</div>`;
  }).join("");
  $view.innerHTML = `<div class="cw-scroll"><div class="cw" style="--hh:${HH}px;--hours:${H1 - H0}">
    <div class="cw__row cw__head"><div class="cw__g"></div>${head}</div>
    <div class="cw__row cw__all"><div class="cw__g">全日</div>${all}</div>
    <div class="cw__row cw__body"><div class="cw__g cw__times">${times}</div>${cols}</div>
  </div></div>`;
  const e = days[6];
  $title.textContent = s.getMonth() === e.getMonth() ? `${s.getFullYear()}年${s.getMonth() + 1}月${s.getDate()}日 – ${e.getDate()}日` : `${s.getFullYear()}年${s.getMonth() + 1}月${s.getDate()}日 – ${e.getFullYear() !== s.getFullYear() ? e.getFullYear() + "年" : ""}${e.getMonth() + 1}月${e.getDate()}日`;
}

/* ---------- 議程檢視 ---------- */
function renderAgenda() {
  const y = cur.getFullYear(), m = cur.getMonth(), last = new Date(y, m + 1, 0).getDate();
  let html = "";
  for (let i = 1; i <= last; i++) {
    const d = new Date(y, m, i), ds = ymd(d), evs = eventsOn(ds);
    if (!evs.length) continue;
    html += `<div class="ca__day ${ds === todayStr ? "is-today" : ""} ${ds === focus ? "is-focus" : ""}" id="d-${ds}">
      <div class="ca__date"><b>${i}</b><span>${m + 1}月 · 星期${WD[d.getDay()]}</span></div>
      <div class="ca__list">${evs.map(e => `<button class="ca__ev" data-ev="${e.id}" style="--c:${CAT[e.cat].color}"><i></i><span class="ca__time">${timeRange(e)}</span><span class="ca__name">${esc(e.title)}${e.venue ? `<small>${esc(e.venue)}</small>` : ""}</span></button>`).join("")}</div>
    </div>`;
  }
  $view.innerHTML = `<div class="ca">${html || `<p class="ca__empty">本月沒有符合篩選條件的活動。</p>`}</div>`;
  $title.textContent = `${y}年${m + 1}月`;
}

/* ---------- 彈出視窗 ---------- */
/* 每項活動連到其詳情文章（post）；未設定 href 時用示例頁 */
const postUrl = e => e.href || `post.html?event=${e.id}`;
const ico = {
  time: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>',
  note: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg>',
  close: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
};
function eventHTML(e) {
  const d = parse(e.date), u = parse(e.until);
  const when = e.until !== e.date ? `${fmtDay(d)} – ${fmtDay(u)}` : `${fmtDay(d)} · ${timeRange(e)}`;
  return `<div class="pop__top"><button class="pop__x" data-close aria-label="關閉">${ico.close}</button></div>
    <div class="pop__head"><span class="pop__sq" style="--c:${CAT[e.cat].color}"></span><div><h3>${esc(e.title)}</h3><p>${when}</p></div></div>
    <ul class="pop__rows">
      ${e.venue ? `<li>${ico.pin}<span>${esc(e.venue)}</span></li>` : ""}
      <li>${ico.tag}<span>${CAT[e.cat].name}${e.weekly ? " · 每週常規" : ""}</span></li>
      ${e.note ? `<li>${ico.note}<span>${esc(e.note)}</span></li>` : ""}
    </ul>
    <div class="pop__actions">
      ${e.reg ? `<a class="btn btn--primary btn--sm" href="#">網上報名</a>` : ""}
      <a class="btn btn--outline btn--sm" href="${postUrl(e)}">查看活動詳情</a>
    </div>`;
}
function dayHTML(ds) {
  const d = parse(ds), evs = eventsOn(ds);
  return `<div class="pop__top"><button class="pop__x" data-close aria-label="關閉">${ico.close}</button></div>
    <div class="pop__day"><span>星期${WD[d.getDay()]}</span><b>${d.getDate()}</b><span>${d.getMonth() + 1}月</span></div>
    <div class="pop__list">${evs.length ? evs.map(e => chip(e, e.date)).join("") : `<p class="meta" style="text-align:center">當日沒有活動</p>`}</div>`;
}
let popAnchor = null;
function openPop(html, anchor) {
  $pop.innerHTML = html; $pop.hidden = false; popAnchor = anchor;
  $pop.classList.toggle("is-sheet", mq.matches);
  if (!mq.matches) {
    const r = anchor.getBoundingClientRect(), w = $pop.offsetWidth, h = $pop.offsetHeight;
    let left = r.right + 8; if (left + w > innerWidth - 12) left = Math.max(12, r.left - w - 8);
    let top = Math.min(Math.max(12, r.top - 8), innerHeight - h - 12);
    $pop.style.left = left + "px"; $pop.style.top = Math.max(12, top) + "px";
  } else { $pop.style.left = $pop.style.top = ""; }
  $pop.querySelector("[data-close]").focus({ preventScroll: true });
}
function closePop() { if ($pop.hidden) return; $pop.hidden = true; if (popAnchor && document.contains(popAnchor)) popAnchor.focus({ preventScroll: true }); popAnchor = null; }

/* ---------- 事件 ---------- */
document.getElementById("cal").addEventListener("click", e => {
  const mcell = mq.matches && e.target.closest(".cm__cell");
  if (mcell) { e.stopPropagation(); openPop(dayHTML(mcell.dataset.day), mcell); return; }
  const ev = e.target.closest("[data-ev]");
  if (ev) { e.stopPropagation(); openPop(eventHTML(EVENTS[ev.dataset.ev]), ev); return; }
  const more = e.target.closest("[data-more]");
  if (more) { e.stopPropagation(); openPop(dayHTML(more.dataset.more), more); return; }
  const wk = e.target.closest("[data-week]");
  if (wk && !mq.matches) { cur = parse(wk.dataset.week); view = "week"; render(); return; }
  const go = e.target.closest("[data-goto]");
  if (go) { cur = parse(go.dataset.goto); focus = go.dataset.goto; miniCur = new Date(cur.getFullYear(), cur.getMonth(), 1); render(); if (view === "agenda") document.getElementById("d-" + focus)?.scrollIntoView({ block: "center", behavior: "smooth" }); return; }
});
$pop.addEventListener("click", e => {
  if (e.target.closest("[data-close]")) return closePop();
  const ev = e.target.closest("[data-ev]");
  if (ev) { e.stopPropagation(); $pop.innerHTML = eventHTML(EVENTS[ev.dataset.ev]); }
});
document.addEventListener("click", e => { if (!$pop.hidden && !$pop.contains(e.target)) closePop(); });
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closePop();
  if (e.target.matches("input, textarea") || e.metaKey || e.ctrlKey || e.altKey) return;
  const k = { t: "today", j: 1, n: 1, k: -1, p: -1 }[e.key]; if (k !== undefined) nav(k);
  const v = { m: "month", w: "week", a: "agenda" }[e.key]; if (v) { view = v; render(); }
});
addEventListener("resize", closePop);
addEventListener("scroll", () => { if (!mq.matches) closePop(); }, { passive: true });

function nav(dir) {
  if (dir === "today") { cur = new Date(); focus = null; }
  else if (view === "week") cur = addDays(cur, 7 * dir);
  else cur = new Date(cur.getFullYear(), cur.getMonth() + dir, 1);
  miniCur = new Date(cur.getFullYear(), cur.getMonth(), 1);
  render();
}
document.querySelectorAll("[data-nav]").forEach(b => b.addEventListener("click", () => nav(b.dataset.nav === "today" ? "today" : Number(b.dataset.nav))));
document.querySelectorAll("[data-view]").forEach(b => b.addEventListener("click", () => { view = b.dataset.view; render(); }));

const $side = document.getElementById("calSide"), $fb = document.getElementById("calFilterBtn");
$fb.addEventListener("click", () => { const o = $side.classList.toggle("is-open"); $fb.setAttribute("aria-expanded", o); });

function render() {
  closePop();
  ({ month: renderMonth, week: renderWeek, agenda: renderAgenda })[view]();
  document.querySelectorAll("[data-view]").forEach(b => { b.classList.toggle("is-active", b.dataset.view === view); b.setAttribute("aria-pressed", b.dataset.view === view); });
  renderMini();
  const p = new URLSearchParams({ d: ymd(cur), v: view });
  history.replaceState(null, "", "?" + p);
}

renderCats();
render();
