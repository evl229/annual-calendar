/* ======================================================================
   EDIT ZONE — everything below is the only part you should need to touch.
   ----------------------------------------------------------------------
   YEAR        : the calendar year to render. Change this and every
                 weekday/day-count recalculates automatically.
 
   CATEGORIES  : one entry per tab (KAC / KPC / 진단). Each category has
                 a list of "programs". Each program renders as one colored,
                 collapsible course card in the sidebar, and its dates get
                 highlighted on the calendar in that same color.
 
   CATEGORY FIELDS
     id, label - as before
     color     - this tab's accent color (hex or var(--이름) from :root).
                 Colors the active tab button and the calendar's month
                 header row whenever that tab is selected.
 
   PROGRAM FIELDS
     id      - unique string, no spaces
     name    - shown as the course name in the sidebar
     color   - hex color (e.g. "#E3ACA0") OR a reference to one of the
               brand color variables defined in :root at the top of this
               file, written as "var(--코칭포유플러스)" etc. Using the
               variable form means changing the color once in :root
               updates it everywhere automatically.
     sessions- list of session groups shown inside that course's dropdown.
               Each group is:
                 { label: "1차",            <- shown as the session name
                   mode:  "online" | "offline", <- default mode for this session
                   dates: ["2026-07-04","2026-07-11", ...] }
 
               If a session mixes online and offline days (e.g. two days
               in-person, then two days online), you don't need to split
               it into two rows — just override the mode per date instead
               of using a plain string:
                 dates: [
                   "2026-01-22",                          <- uses session's mode
                   "2026-01-23",
                   { date:"2026-01-27", mode:"online" },   <- overrides just this date
                   { date:"2026-02-03", mode:"online" }
                 ]
               The calendar stripes only the online dates, and the sidebar
               only shows the "· 온라인" tag next to dates that are online
               (a mixed session's header tag reads "· 혼합" instead of one mode).

               If every date in a session falls on the same weekday (e.g. a
               weekly online prep class that always meets on Wednesdays),
               the per-date "(수)" is automatically dropped from the date
               list since it'd just repeat — put that info in the course's
               "notes" instead, e.g. notes: ["시간: 매주 수요일 (2H)"].
     notes   - optional list of plain-text lines shown at the bottom of
               the dropdown, below the sessions — for anything that isn't
               a date (refund policy, minimum enrollment, contact info,
               etc). e.g. notes: ["정원 미달 시 폐강될 수 있습니다."]
     tags    - optional list of tags shown at the top of the dropdown, 
               e.g. ["온라인", "Zoom"]. These are displayed as pill-shaped badges.
 
   To add a new date: find the program, find (or add) a sessions entry,
   add the date string in "YYYY-MM-DD" format to its "dates" array.
 
   To add a brand-new program: copy an existing program object inside
   the right category's "programs" array and edit id/name/color/dates.
 
   To add a brand-new tab/category: copy a whole category object at the
   top level and edit id/label/programs.
   ====================================================================== */
 
const YEAR = 2026;
 
const CATEGORIES = [
  {
    id: "kac",
    label: "KAC",
    color: "var(--KAC)",
    programs: [
      {
        id: "coaching4u-plus",
        name: "[기초] 코칭포유플러스",
        color: "var(--코칭포유플러스)",
        sessions: [
          { label: "평일반", mode: "mix", dates: ["2026-01-15", "2026-01-16", 
              { date: "2026-01-21", mode: "online" }, { date: "2026-01-28", mode: "online" }
          ]},
          { label: "평일반", mode: "mix", dates: ["2026-02-26", "2026-02-27", 
              { date: "2026-03-04", mode: "online" }, { date: "2026-03-11", mode: "online" }
          ]},
          { label: "토요반", mode: "online", dates: ["2026-03-07", "2026-03-14", "2026-03-21"] },
          { label: "평일반", mode: "mix", 
            dates: ["2026-04-16", "2026-04-17", 
              { date: "2026-04-21", mode: "online" }, { date: "2026-04-28", mode: "online" }
          ]},
          { label: "토요반", mode: "online", dates: ["2026-05-14", "2026-05-15", 
              { date: "2026-05-19", mode: "online" }, { date: "2026-05-26", mode: "online" }
          ]},
          { label: "평일반", mode: "mix", 
            dates: ["2026-06-11", "2026-06-12", 
              { date: "2026-06-17", mode: "online" }, { date: "2026-06-24", mode: "online" }
          ]},
          { label: "토요반", mode: "online", dates: ["2026-07-04", "2026-07-11", "2026-07-18"] },
          { label: "평일반", mode: "mix", dates: ["2026-07-9", "2026-07-10", 
              { date: "2026-07-15", mode: "online" }, { date: "2026-07-22", mode: "online" }
          ]},
          
          { label: "평일반", mode: "mix", dates: ["2026-10-13", "2026-10-20", 
              { date: "2026-10-29", mode: "online" }, { date: "2026-11-05", mode: "online" }
          ]}
        ],
        tags: ["20H"]
      },
      {
        id: "kac-prep-online",
        name: "KAC인증준비반 (온라인)",
        color: "var(--KAC인증준비반)",
        sessions: [
          { label: "1차 (26년 2차 시험 대비)", mode: "online", dates: ["2026-01-14","2026-01-21","2026-01-28","2026-02-04","2026-02-11","2026-02-25","2026-03-04"] },
          { label: "2차 (26년 3차 시험 대비)", mode: "online", dates: ["2026-03-25","2026-04-01","2026-04-08","2026-04-15","2026-04-22","2026-04-29","2026-05-06"] },
          { label: "3차 (26년 4차 시험 대비)", mode: "online", dates: ["2026-05-27","2026-06-03","2026-06-10","2026-06-17","2026-06-24","2026-07-01","2026-07-08"] },
          { label: "4차 (26년 5차 시험 대비)", mode: "online", dates: ["2026-07-22","2026-07-29","2026-08-05","2026-08-12","2026-08-19","2026-08-26","2026-09-02"] },
          { label: "5차 (26년 6차 시험 대비)", mode: "online", dates: ["2026-09-09","2026-09-16","2026-09-30","2026-10-07","2026-10-14","2026-10-21","2026-10-28"] },
          { label: "6차 (26년 7차 시험 대비)", mode: "online", dates: ["2026-11-11","2026-11-18","2026-11-25","2026-12-02","2026-12-09","2026-12-16","2026-12-23"] }
        ], 
        notes: [
          "방법: 온라인 진행",
          "시간: 매주 수요일 (1일차만 19:30~21:30 / 2일차부터 20:00~21:30)"
        ],
        tags: ["11H", "온라인"]
      },
      {
        id: "kac-kpc-docs",
        name: "KAC/KPC 서류접수 일정",
        color: "var(--서류접수일정)",
        sessions: [
          { label: "1차", mode: "offline", dates: ["2026-01-07","2026-01-08","2026-01-09"] },
          { label: "2차", mode: "offline", dates: ["2026-03-11","2026-03-12","2026-03-13"] },
          { label: "3차", mode: "offline", dates: ["2026-05-13","2026-05-14","2026-05-15"] },
          { label: "4차", mode: "offline", dates: ["2026-07-15","2026-07-16","2026-07-17"] },
          { label: "5차", mode: "offline", dates: ["2026-09-09","2026-09-10","2026-09-11"] },
          { label: "6차", mode: "offline", dates: ["2026-11-04","2026-11-05","2026-11-06"] }
        ]
      }
    ]
  },
  {
    id: "kpc",
    label: "KPC",
    color: "var(--KPC)",
    programs: [
      {
        id: "coaching4competency",
        name: "[심화] 코칭포역량",
        color: "var(--코칭포역량)",
        sessions: [
          { label: "1회차 (평일반)", mode: "offline", dates: ["2026-01-22","2026-01-23",
            { date:"2026-01-27", mode:"online" }, { date:"2026-02-03", mode:"online" }
          ]},
          { label: "2회차 (평일반)", mode: "offline", dates: ["2026-11-12","2026-11-13",
            { date:"2026-11-17", mode:"online" }, { date:"2026-11-24", mode:"online" }
          ]}
        ],
        tags: ["20H"]
      },
      {
        id: "coaching4leader",
        name: "[역량] 코칭포리더",
        color: "var(--코칭포리더)",
        sessions: [
          { label: "1회차 (평일반)", mode: "offline", dates: ["2026-03-12","2026-03-13",
            { date:"2026-03-17", mode:"online" }, { date:"2026-03-24", mode:"online" }
          ]},
          { label: "2회차 (평일반)", mode: "offline", dates: ["2026-12-10","2026-12-11",
            { date:"2026-12-15", mode:"online" }, { date:"2026-12-22", mode:"online" }
          ]}
        ],
        tags: ["20H"]
      },
      {
        id: "kpc-prep-online",
        name: "KPC인증준비반 (온라인)",
        color: "var(--KPC인증준비반)",
        sessions: [
          { label: "1회차", mode: "online", dates: ["2026-04-07","2026-04-14","2026-04-21","2026-04-28", "2026-05-12","2026-05-19","2026-05-26","2026-06-02","2026-06-09","2026-06-16","2026-06-23","2026-06-30",] },
          { label: "2회차", mode: "online", dates: ["2026-10-13","2026-10-20","2026-10-27","2026-11-03","2026-11-10","2026-11-17","2026-11-24","2026-12-01","2026-12-08","2026-12-15","2026-12-22","2026-12-29"] }
        ],
        notes: [
          "방법: 온라인 진행",
          "시간: 매주 화요일 (2H)"
        ],
        tags: ["23H","온라인"]
      },
      {
        id: "kpc-kac-docs",
        name: "KPC/KAC 서류접수 일정",
        color: "var(--서류접수일정)",
        sessions: [
          { label: "1차", mode: "offline", dates: ["2026-01-07","2026-01-08","2026-01-09"] },
          { label: "2차", mode: "offline", dates: ["2026-03-11","2026-03-12","2026-03-13"] },
          { label: "3차", mode: "offline", dates: ["2026-05-13","2026-05-14","2026-05-15"] },
          { label: "4차", mode: "offline", dates: ["2026-07-15","2026-07-16","2026-07-17"] },
          { label: "5차", mode: "offline", dates: ["2026-09-09","2026-09-10","2026-09-11"] },
          { label: "6차", mode: "offline", dates: ["2026-11-04","2026-11-05","2026-11-06"] }
        ]
      }
    ]
  },
  {
    id: "diag",
    label: "진단",
    color: "var(--진단)",
    programs: [
      {
        id: "sfc-general",
        name: "SFC 성공진단 일반자격",
        color: "var(--SFC)",
        sessions: [
          { label: "교육 단계 (20H)", mode: "offline", dates: ["2026-07-30","2026-07-31",{ date:"2026-08-01", mode:"online" }] }
        ],
        notes: [
          "SuccessFinder Certification",
          "모집 일정",
          "일반 모집 마감: 7/22(금)", 
          "진단 및 디브리핑 경험자 마감: 7/27(월)",
          "- ",
          "실습 단계",
          "버디 디브리핑:8월 3일(월) ~ 9월 11일(금)",
          "일대일 수퍼비전: 9/14(월) ~ 9/30(수)",
          "- ",
          "인증 단계",
          "인증시험 및 리포트 제출: 기간 중 1일 선택",
          "10/12(월) ~ 10/23(금)",
          "합격자 수료증 배부: 11월 중 (1~2주 소요)",
        ],
        tags: ["20H"]
      },
      {
        id: "12dna",
        name: "12DNA인증전문가과정",
        color: "var(--12DNA)",
        sessions: [
          { label: "1회차", mode: "offline", dates: ["2026-03-27","2026-03-28"] },
          { label: "2회차(3기)", mode: "offline", dates: ["2026-06-29","2026-06-30"] },
          { label: "3회차", mode: "offline", dates: ["2026-11-26","2026-11-27"] }
        ],
        notes: [
          "12DNA Certified Program",
          "시간: 09:00 ~ 18:00",
          "방법: 오프라인", 
        ],
        tags: ["16H"]
      }
    ]
  }
];


 
/* ======================================================================
   RENDER ENGINE — no need to edit below this line.
   ====================================================================== */
 
const MONTH_NAMES = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];
const DOW = ["일","월","화","수","목","금","토"];
 
let activeTab = CATEGORIES[0].id;
const sessionState = {};
const expanded = {};
let hoverDates = null;
let hideClosed = false;
 
// Initialize the state for each program (whether it is toggled on/off and expanded/collapsed)
CATEGORIES.forEach(cat => cat.programs.forEach(p => {
  sessionState[p.id] = p.sessions.map(() => true);
  expanded[p.id] = false;
}));

/**
 * HTML Element Creator (DOM Factory)
 * A shortcut function to easily create HTML elements from JavaScript.
 * It takes an HTML tag (like 'div' or 'span'), applies properties/styles, and adds elements inside it.
 */
const h = (tag, props = {}, ...children) => {
  const el = document.createElement(tag);
  const { style, ...rest } = props;
  if (style) Object.assign(el.style, style);
  Object.assign(el, rest);
  el.append(...children.flat().filter(Boolean));
  return el;
};

/**
 * Day of Week Parser
 * Takes a date string (e.g., "2026-07-15") and calculates what day of the week it is.
 * Returns a number from 0 (Sunday) to 6 (Saturday).
 */
const getDOWIndex = dateStr => {
  const [y, m, d] = dateStr.split("-");
  return new Date(y, m - 1, d).getDay();
};
 
/**
 * Date Normalizer
 * Since dates can be written as just a string ("2026-01-22") OR an object with a specific mode 
 * ({date: "2026-01-27", mode: "online"}), this function converts them all into a standard object format.
 */
function normalizeDates(sess) {
  return sess.dates.map(entry =>
    typeof entry === "string" ? { date: entry, mode: sess.mode } : { mode: sess.mode, ...entry }
  );
}

/**
 * Uniform Weekday Checker
 * Checks if every single date in a specific session falls on the exact same day of the week 
 * (e.g., checks if a class ONLY meets on Wednesdays).
 */
function isUniformWeekday(sess) {
  const days = normalizeDates(sess).map(({ date }) => getDOWIndex(date));
  return days.length > 1 && days.every(d => d === days[0]);
}

/**
 * Date List Formatter for Sidebar
 * Formats the raw dates into the text displayed in the sidebar (e.g., "7/15(수·온라인)").
 * Automatically hides the day of the week if every class in the session falls on the same day.
 */
function formatDateList(sess) {
  const uniform = isUniformWeekday(sess);
  return normalizeDates(sess).map(({ date, mode }) => {
    const [_, m, d] = date.split("-");
    const dow = DOW[getDOWIndex(date)];
    const modeText = mode !== sess.mode ? (mode === "online" ? "온라인" : "오프라인") : null;
    const parts = [...(uniform ? [] : [dow]), ...(modeText ? [modeText] : [])];
    return parts.length ? `${parseInt(m)}/${parseInt(d)}(${parts.join("·")})` : `${parseInt(m)}/${parseInt(d)}`;
  }).join(", ");
}
 
/**
 * Closed Session Checker
 * A session counts as closed once it has already started, i.e. its FIRST date
 * has already passed (before today) — enrollment closes once a course begins,
 * even if some later online dates in that same session are still upcoming.
 * Used to mark past programs in the sidebar (strikethrough + "신청마감" badge)
 * and to render them fainter / optionally hide them in both the sidebar and
 * the calendar grid.
 */
function isSessionClosed(sess) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dates = normalizeDates(sess).map(({ date }) => {
    const [y, m, d] = date.split("-");
    return new Date(y, m - 1, d);
  });
  const firstDate = new Date(Math.min(...dates));
  return firstDate < today;
}

/**
 * Date Index Builder
 * Scans through the currently selected category and builds a dictionary (map) of all active dates.
 * It links specific dates to the color and mode of the courses happening on that day so the grid knows what to highlight.
 */
function buildDateIndex(category) {
  const idx = {};
  category.programs.forEach(prog => {
    prog.sessions.forEach((sess, i) => {
      if (!sessionState[prog.id][i]) return;
      const closed = isSessionClosed(sess);
      if (closed && hideClosed) return; // hidden entirely while "마감된 일정 숨기기" is on
      normalizeDates(sess).forEach(({ date, mode }) => {
        (idx[date] ??= []).push({ color: prog.color, mode, closed });
      });
    });
  });
  return idx;
}
 
/**
 * Tab Navigation Renderer
 * Generates the clickable tabs (e.g., KAC, KPC, 진단) at the top of the calendar,
 * plus a "마감된 일정 숨기기" button that sits alongside them. The button isn't
 * tied to one specific tab — it stays visible and works the same regardless of
 * which tab is active, so switching tabs never resets the hide/show state.
 */
function renderTabs() {
  const el = document.getElementById("tabs");
  el.innerHTML = "";
  CATEGORIES.forEach(cat => {
    const isActive = cat.id === activeTab;
    const btn = h("button", {
      className: `tab-btn${isActive ? " active" : ""}`,
      textContent: cat.label,
      style: { background: isActive ? cat.color : "", borderColor: isActive ? cat.color : "" },
      onclick: () => { activeTab = cat.id; renderAll(); },
      onmouseenter: () => { if (!isActive) btn.style.background = withAlpha(cat.color, 0.2); },
      onmouseleave: () => { btn.style.background = isActive ? cat.color : ""; }
    });
    el.appendChild(btn);
  });

  const hideBtn = h("button", {
    className: `hide-closed-btn${hideClosed ? " active" : ""}`,
    textContent: hideClosed ? "마감된 일정 표시" : "마감된 일정 숨기기",
    onclick: () => { hideClosed = !hideClosed; renderPanel(); renderGrid(); renderTabs(); }
  });
  el.appendChild(hideBtn);
}
 
/**
 * Sidebar Panel Renderer
 * Generates the collapsible course cards for the sidebar based on the currently active tab.
 * Populates the course names, tags, notes, and individual session rows.
 */
function renderPanel() {
  const el = document.getElementById("panel");
  el.innerHTML = "";
  const cat = CATEGORIES.find(c => c.id === activeTab);
 
  cat.programs.forEach(prog => {
    const states = sessionState[prog.id];
    const allOff = states.every(s => !s);

    const sessionEntries = prog.sessions
      .map((sess, i) => ({ sess, i, closed: isSessionClosed(sess) }))
      .filter(({ closed }) => !hideClosed || !closed);

    // Nothing left to show for this program while "마감된 일정 숨기기" is on — skip the whole card.
    if (hideClosed && sessionEntries.length === 0) return;
 
    const bodyChildren = [
      prog.tags?.length && h("div", { className: "course-tags" },
        prog.tags.map(tag => h("div", { className: "course-tag", textContent: tag }))
      ),
      prog.notes?.length && h("div", { className: "course-notes" }, 
        prog.notes.map(line => h("p", { textContent: line }))
      ),
      sessionEntries.map(({ sess, i, closed }) => {
        const normalized = normalizeDates(sess);
        return h("div", {
          className: `sess-row${closed ? " closed" : ""}`,
          onmouseenter: () => { hoverDates = new Set(normalized.map(x => x.date)); renderGrid(); }, // Highlights dates in the grid on hover
          onmouseleave: () => { hoverDates = null; renderGrid(); } // Removes highlight when mouse leaves
        },
          h("span", { className: "sess-label", textContent: sess.label || `세션 ${i + 1}` }),
          closed && h("span", { className: "status-badge", textContent: "신청마감" }),
          h("span", { className: "sess-dates", textContent: formatDateList(sess) })
        );
      })
    ];

    const course = h("div", {
      className: `course${expanded[prog.id] ? " expanded" : ""}${allOff ? " all-off" : ""}`,
      style: { background: withAlpha(prog.color, 0.35), border: `0.5px solid #818181` }
    },
      h("div", {
        className: "course-head",
        onclick: (e) => {
          if (e.target.closest(".toggle-input")) return;
          expanded[prog.id] = !expanded[prog.id];
          renderPanel();
        }
      },
        h("span", { className: "label-group" }, h("span", { className: "name", textContent: prog.name })),
        h("span", { className: "right" }, masterSwitch(prog))
      ),
      h("div", { className: "course-body" }, ...bodyChildren)
    );
 
    el.appendChild(course);
  });
}
 
/**
 * Toggle Switch Creator
 * Creates the on/off switch for a specific course in the sidebar.
 * When toggled, it turns the course highlights on or off inside the calendar grid.
 */
function masterSwitch(prog) {
  const states = sessionState[prog.id];
  const input = h("input", {
    type: "checkbox",
    checked: states.some(Boolean),
    onchange: () => {
      states.fill(input.checked);
      renderPanel();
      renderGrid();
    }
  });
  return h("label", {
    className: "toggle-input",
    onclick: (e) => e.stopPropagation()
  }, input, h("span", { className: "switch" }));
}
 
/**
 * CSS Variable Color Extractor
 * If a color is defined using a CSS variable (e.g., "var(--KPC)"), this function reads the 
 * actual hex value (e.g., "#6E4068") from the :root style rules in the CSS file.
 */
function resolveColor(color) {
  const m = color.match(/^var\((--[^)]+)\)$/);
  return m ? getComputedStyle(document.documentElement).getPropertyValue(m[1]).trim() : color;
}
 
/**
 * Opacity (Alpha) Converter
 * Takes a hex color and converts it into an RGBA color format, allowing the program 
 * to apply transparency (opacity) to the calendar grid highlights.
 */
function withAlpha(color, alpha) {
  const hex = resolveColor(color).replace("#", "");
  const [r, g, b] = [0, 2, 4].map(idx => parseInt(hex.slice(idx, idx + 2), 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
 
/**
 * Main Calendar Grid Renderer
 * Generates the 12-month x 31-day table. 
 * Cross-references the dates against the active courses and applies solid background colors, 
 * gradients (for overlapping courses), and diagonal stripes (for online courses).
 */
function renderGrid() {
  const table = document.getElementById("calTable");
  table.innerHTML = "";
  const cat = CATEGORIES.find(c => c.id === activeTab);
  const idx = buildDateIndex(cat);
  const daysInMonth = MONTH_NAMES.map((_, m) => new Date(YEAR, m + 1, 0).getDate());
 
  // Renders the header row containing the 12 months
  const thead = h("thead", {}, 
    h("tr", {}, MONTH_NAMES.map(name => h("th", { textContent: name, style: { background: "#000" } })))
  );
  const tbody = h("tbody");
 
  // Renders exactly 31 rows (days)
  for (let d = 1; d <= 31; d++) {
    const row = h("tr");
    
    // Renders exactly 12 columns (months)
    for (let m = 0; m < 12; m++) {
      // If the month doesn't have this day (e.g., Feb 30th), make it an invalid blank cell
      if (d > daysInMonth[m]) {
        row.appendChild(h("td", { className: "cell invalid" }));
        continue;
      }
 
      const dateStr = `${YEAR}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const hits = idx[dateStr] || [];
      const td = h("td", { className: "cell" });

      // Each course landing on this date gets its own positioned segment, so a
      // diagonal stripe only covers the segment(s) belonging to an online course,
      // not the entire cell (e.g. a shared date with an offline docs deadline).
      if (hits.length) {
        const shown = hits.slice(0, 3);
        const n = shown.length;
        shown.forEach((hit, i) => {
          const seg = h("span", {
            className: `seg${hit.mode === "online" ? " striped" : ""}${hit.closed ? " seg-closed" : ""}`,
            style: {
              left: `${(i / n) * 100}%`,
              width: `${(1 / n) * 100}%`,
              background: withAlpha(hit.color, hit.closed ? 0.2 : 0.5)
            }
          });
          td.appendChild(seg);
        });

        // Add hover highlighting capability
        td.title = hits.length > 1 ? `${hits.length}건의 일정` : "";
        if (hoverDates?.has(dateStr)) td.classList.add("emph");
      }
 
      td.appendChild(h("span", { className: "num", textContent: d }));
      row.appendChild(td);
    }
    tbody.appendChild(row);
  }
  table.append(thead, tbody);
}
 
/**
 * Master Render Function
 * Called once on page load and whenever tabs are switched to ensure 
 * the tabs, sidebar, and calendar grid all update simultaneously.
 */
function renderAll() {
  renderTabs();
  renderPanel();
  renderGrid();
}

// Execute the initial render to load the calendar onto the page
renderAll();