/* 香港劍道協會 網站草稿 — 共用頁首/頁尾 + 互動
   選單資料對應已核准的資訊架構（6 個核心選單，最多 2 層）。
   t = 中文（主）, en = 英文（副） */

const MENU = [
  {
    id: "info", label: "資訊及管治", en: "Information & Governance", wide: true, cols: 3,
    groups: [
      { title: "刊物及通告", items: [
        { t: "通告及聲明", en: "HKKA Circulars", href: "circulars.html", sub: ["全部", "公告", "公關聲明", "緊急通知"] },
        { t: "年度活動計劃", en: "Annual Plan", href: "#", note: "年度活動一覽表" },
        { t: "歷年核准財務報告", en: "Endorsed Financial Reports", href: "#", note: "歷年存檔及採購政策" },
      ]},
      { title: "管治", items: [
        { t: "企業管治及港協暨奧委會合規披露", en: "Corporate Governance & SF&OC Disclosures", href: "#",
          sub: ["章程及選舉／終止規則", "誠信與操守・安全運動", "遴選、教練及裁判政策", "紀律、投訴及獨立上訴機制"] },
      ]},
      { title: "閱讀", items: [
        { t: "劍道及居合道文章", en: "Kendo / Iaido Articles", href: "articles.html", sub: ["劍道", "居合道", "杖道", "禮儀與歷史"] },
      ]},
    ],
  },
  {
    id: "events", label: "活動", en: "Events", wide: true, cols: 3,
    groups: [
      { title: "行事曆", items: [
        { t: "綜合活動行事曆", en: "Schedule in One", href: "calendar.html", note: "總行事曆・按類別篩選" },
      ]},
      { title: "活動類別", items: [
        { t: "講習會", en: "Seminar", href: "#", note: "應邀老師・規則及指引・報名" },
        { t: "比賽", en: "Competition", href: "#", note: "FIK 規則・對陣表・遴選機制" },
        { t: "段級審查", en: "Examination", href: "#", note: "考綱・修業年限・合格名單" },
        { t: "訓練班", en: "Training Course", href: "#", note: "常規・暑期・兒童・體驗班" },
      ]},
      { title: "海外人士", items: [
        { t: "海外段位認可申請", en: "Overseas Grading Endorsement", href: "#" },
        { t: "電子會員活動報名", en: "E-Member Event Enrollment", href: "#" },
      ]},
    ],
  },
  {
    id: "people", label: "人員及組織", en: "People", wide: true, cols: 3,
    groups: [
      { title: "組織", items: [
        { t: "組織架構圖及領導層", en: "Organization Chart & Leadership", href: "org.html", sub: ["互動組織架構圖", "執委會及評議會名單", "秘書處職員"] },
        { t: "專責委員會", en: "Sub-Committees", href: "#", sub: ["發展委員會", "運動員遴選委員會", "裁判及教練委員會", "活動委員會"] },
      ]},
      { title: "名錄", items: [
        { t: "屬會道場名錄", en: "Affiliated Dojos", href: "#", note: "地區・訓練時間・連結・會員名單" },
        { t: "註冊教練及裁判名錄", en: "Registered Coaches & Referees", href: "#" },
        { t: "普通會員名錄", en: "Ordinary Members", href: "#", note: "名冊・入會資格及會費" },
      ]},
    ],
  },
  /* 會員專區 — 暫時隱藏（client request 2026-11-10）。取消註解即可恢復。 */
//   {
//     id: "member", label: "會員專區", en: "Member Log-in", cols: 2,
//     groups: [
//       { title: "普通會員專區 · Ordinary Member", items: [
//         { t: "個人資料及電子會員證", en: "Personal Particulars", href: "#" },
//         { t: "個人紀錄表", en: "Personal Log Sheet", href: "#" },
//         { t: "會費及活動費用繳付", en: "Membership & Event Fee Payment", href: "#" },
//         { t: "電子聲明", en: "Digital Declarations", href: "#" },
//       ]},
//       { title: "全球電子會員 · Worldwide E-Member", items: [
//         { t: "電子會員登記及年費", en: "E-Member Registration & Subscription", href: "#" },
//         { t: "個人紀錄表", en: "Personal Log Sheet", href: "#" },
//         { t: "活動直接報名及付款", en: "Direct Event Enrollment & Payment", href: "#" },
//       ]},
//     ],
//   },
  {
    id: "shop", label: "紀念品商店", en: "HKKA Souvenir", cols: 1,
    groups: [
      { title: "商店", items: [
        { t: "所有商品", en: "All Items", href: "#" },
        { t: "劍道手拭／面巾", en: "Tenugui", href: "#" },
        { t: "協會外套", en: "Jacket", href: "#" },
        { t: "竹刀袋", en: "Shinai Bag", href: "#" },
      ]},
    ],
  },
  {
    id: "contact", label: "聯繫我們", en: "Contact Us", cols: 2,
    groups: [
      { title: "聯絡方法", items: [
        { t: "秘書處聯絡", en: "HKKA Secretariat", href: "#", note: "電話・電郵・辦事處・開放時間・查詢表格" },
        { t: "屬會道場連結", en: "Affiliated Dojos Quick Links", href: "#" },
      ]},
      { title: "相關網站", en: "Related Websites", items: [
        { t: "港協暨奧委會", en: "SF&OC", href: "#" },
        { t: "康樂及文化事務署", en: "LCSD", href: "#" },
        { t: "全日本劍道連盟", en: "AJKF / ZNKR", href: "#" },
        { t: "國際劍道連盟", en: "FIK", href: "#" },
      ]},
    ],
  },
];

/* 目前語言：選單只顯示一種語言（zh / en），英文資料保留供日後切換 */
const LANG = "zh";
const L = (o, zhKey = "t", enKey = "en") => (LANG === "en" && o[enKey]) ? o[enKey] : o[zhKey];

const I = {
  chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  user: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  alert: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>',
};

function megaHTML(m) {
  const cols = m.groups.map(g => `
    <div class="mega__col">
      ${g.items.map(it => `
        <a class="mega__link" href="${it.href}">${L(it)}${it.note ? `<small>${it.note}</small>` : ""}</a>
        ${it.sub ? `<div class="mega__sub">${it.sub.map(s => `<a href="${it.href}">${s}</a>`).join("")}</div>` : ""}
      `).join("")}
    </div>`).join("");
  return `<div class="mega ${m.wide ? "mega--wide" : ""} ${m.cols === 1 ? "mega--narrow" : ""}" style="--cols:${m.cols}">
    ${/* <div class="mega__head"><h4>${m.label}</h4><span class="zh">${m.en}</span></div> — 暫時隱藏 */ ""}
    <div class="mega__grid">${cols}</div>
  </div>`;
}

function headerHTML() {
  const navItems = MENU.map(m => `
    <li class="nav__item" data-menu="${m.id}">
      <button class="nav__btn" aria-expanded="false" aria-haspopup="true">${L(m, "label")} ${I.chevron}</button>
      ${megaHTML(m)}
    </li>`).join("");

  return `
  <div class="alert" id="alert">
    <div class="container">
      ${I.alert}
      <div class="alert__text"><strong>場地通知 ·</strong> 八號風球應變安排：九龍公園體育館星期日所有訓練取消。</div>
      <a href="#" class="link" style="font-size:13px">詳情</a>
      <button class="alert__close" aria-label="關閉" id="alertClose">${I.close}</button>
    </div>
  </div>
  <header class="header" id="header">
    <div class="container">
      <div class="utility">
        <div class="utility__left"><span>香港劍道協會</span></div>
        <div class="utility__right">
          <label class="search">${I.search}<input type="search" placeholder="搜尋通告、活動、道場…" aria-label="搜尋"></label>
          <div class="lang" role="group" aria-label="語言"><button class="is-active" data-lang="zh">繁體中文</button><button data-lang="en">EN</button></div>
        </div>
      </div>
      <div class="navbar">
        <a class="brand" href="index.html" aria-label="中國香港劍道協會 主頁">
          <img class="brand__logo" src="assets/img/hkka-logo.png" alt="中國香港劍道協會 The Kendo Association of Hong Kong, China" width="598" height="160">
        </a>
        <nav aria-label="主選單">
          <ul class="nav">${navItems}
            <li class="nav__item"><a class="btn btn--primary btn--sm nav__btn--cta" href="#">${I.user} ${LANG === "en" ? "Member Log-in" : "會員登入"}</a></li>
          </ul>
        </nav>
        <button class="mobile-toggle" id="mobileToggle" aria-label="開啟選單">${I.menu}</button>
      </div>
    </div>
  </header>
  <div class="drawer" id="drawer">
    <div class="drawer__scrim" data-close></div>
    <div class="drawer__panel">
      <div class="drawer__top"><strong>選單</strong><button class="mobile-toggle" data-close aria-label="關閉">${I.close}</button></div>
      <a class="btn btn--primary" href="#" style="width:100%;margin-bottom:8px">${I.user} ${LANG === "en" ? "Member Log-in" : "會員登入"}</a>
      ${MENU.map(m => `
        <div class="drawer__group">
          <button class="drawer__btn">${L(m, "label")}${I.chevron}</button>
          <div class="drawer__list">${m.groups.flatMap(g => g.items).map(it => `<a href="${it.href}">${L(it)}</a>`).join("")}</div>
        </div>`).join("")}
    </div>
  </div>`;
}

function footerHTML() {
  const FOOT_HREF = { "通告及聲明": "circulars.html", "劍道及居合道文章": "articles.html", "綜合活動行事曆": "calendar.html", "組織架構圖": "org.html" };
  const col = (title, links) => `<div><h4>${title}</h4>${links.map(l => `<a href="${FOOT_HREF[l] || "#"}">${l}</a>`).join("")}</div>`;
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__about">
          <a class="brand" href="index.html" aria-label="中國香港劍道協會 主頁"><img class="brand__logo brand__logo--footer" src="assets/img/hkka-logo-white.png" alt="中國香港劍道協會 The Kendo Association of Hong Kong, China" width="598" height="160"></a>
          <p>香港劍道協會為本港劍道、居合道及杖道的管治團體，是中國香港體育協會暨奧林匹克委員會及國際劍道連盟的成員。</p>
          <div class="footer__logos"><span>SF&OC</span><span>LCSD</span><span>AJKF</span><span>FIK</span></div>
        </div>
        ${col("資訊及管治", ["通告及聲明", "企業管治", "年度活動計劃", "財務報告", "劍道及居合道文章"])}
        ${col("活動", ["綜合活動行事曆", "講習會", "比賽", "段級審查", "訓練班"])}
        ${col("人員及組織", ["組織架構圖", "專責委員會", "屬會道場", "教練及裁判", "普通會員"])}
        ${col("聯繫", ["秘書處", "查詢表格", "紀念品商店", "相關網站", "私隱政策"])}
      </div>
      <div class="footer__bottom">
        <span>© 2026 香港劍道協會 版權所有</span>
        <span><a href="#">私隱政策</a> · <a href="#">使用條款</a> · <a href="#">無障礙</a> · <a href="#">網站地圖</a></span>
      </div>
    </div>
  </footer>`;
}

/* ---------- 掛載與互動 ---------- */
document.getElementById("site-header").innerHTML = headerHTML();
document.getElementById("site-footer").innerHTML = footerHTML();

const header = document.getElementById("header");
const items = [...document.querySelectorAll(".nav__item[data-menu]")];
let closeTimer;
const closeAll = () => items.forEach(i => { i.classList.remove("is-open"); i.querySelector(".nav__btn").setAttribute("aria-expanded", "false"); });
items.forEach(item => {
  const btn = item.querySelector(".nav__btn");
  const open = () => { clearTimeout(closeTimer); closeAll(); item.classList.add("is-open"); btn.setAttribute("aria-expanded", "true"); };
  item.addEventListener("mouseenter", open);
  item.addEventListener("mouseleave", () => { closeTimer = setTimeout(closeAll, 120); });
  btn.addEventListener("click", e => { e.preventDefault(); item.classList.contains("is-open") ? closeAll() : open(); });
});
document.addEventListener("click", e => { if (!e.target.closest(".nav")) closeAll(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") { closeAll(); drawer.classList.remove("is-open"); } });

const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
onScroll(); addEventListener("scroll", onScroll, { passive: true });

document.getElementById("alertClose").addEventListener("click", () => document.getElementById("alert").classList.add("is-hidden"));

const drawer = document.getElementById("drawer");
document.getElementById("mobileToggle").addEventListener("click", () => drawer.classList.add("is-open"));
drawer.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", () => drawer.classList.remove("is-open")));
drawer.querySelectorAll(".drawer__btn").forEach(b => b.addEventListener("click", () => b.parentElement.classList.toggle("is-open")));

document.querySelectorAll(".lang button").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll(".lang button").forEach(x => x.classList.remove("is-active")); b.classList.add("is-active");
}));

/* 首頁橫幅輪播 */
const slides = [...document.querySelectorAll(".hero__slide")];
if (slides.length) {
  const dots = [...document.querySelectorAll(".dots button")];
  const counter = document.querySelector(".hero__counter");
  let i = 0, t;
  const go = n => { i = (n + slides.length) % slides.length; slides.forEach((s, k) => s.classList.toggle("is-active", k === i)); dots.forEach((d, k) => d.classList.toggle("is-active", k === i)); if (counter) counter.textContent = `0${i + 1} / 0${slides.length}`; };
  const auto = () => { clearInterval(t); t = setInterval(() => go(i + 1), 6000); };
  dots.forEach((d, k) => d.addEventListener("click", () => { go(k); auto(); }));
  go(0); auto();
}

/* 內頁篩選 */
const chips = [...document.querySelectorAll(".filters .chip")];
if (chips.length) {
  chips.forEach(c => c.addEventListener("click", () => {
    chips.forEach(x => x.classList.remove("is-active")); c.classList.add("is-active");
    const f = c.dataset.filter;
    document.querySelectorAll(".feed__item, .card[data-type], .mini[data-type]").forEach(it => it.classList.toggle("is-hidden", f !== "all" && it.dataset.type !== f));
  }));
  document.querySelectorAll("[data-jump]").forEach(a => a.addEventListener("click", e => {
    e.preventDefault(); const c = document.querySelector(`.chip[data-filter="${a.dataset.jump}"]`); if (c) { c.click(); c.scrollIntoView({ block: "center", behavior: "smooth" }); }
  }));
}

