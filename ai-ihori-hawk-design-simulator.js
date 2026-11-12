
/*
 * LOYAL TATTOO + LT MACHINES
 * AI伊彫原画生成シミュレーター
 * FULL REPLACEMENT v5.2
 *
 * GitHub:
 * ai-ihori-hawk-design-simulator.js
 *
 * Target:
 * https://www.bavariancustomirons.jp/blog/2026/11/12/100435
 *
 * Mount:
 * Immediately below the standalone "—" line.
 *
 * All-in-one JavaScript.
 * No script tags.
 * No dependencies.
 * No API keys.
 *
 * Native handoff:
 * Uses the device's native share sheet.
 * The receiving app controls text import
 * and final submission.
 */

(() => {
  "use strict";

  const HOST = "www.bavariancustomirons.jp";
  const TARGET = "/blog/2026/11/12/100435";

  if (
    location.hostname !== HOST ||
    location.pathname.replace(/\/$/, "") !== TARGET
  ) return;

  if (window.__LOYAL_IHORI_HAWK_V52__) return;

  window.__LOYAL_IHORI_HAWK_V52__ = true;

  const HOME = "https://" + HOST;

  const GH =
    "https://github.com/ltmachinesyokohama-ux/";

  const RATE = 15000;

  // =========================================
  // ORIGINAL ARTWORK REFERENCES
  // =========================================

  const REFS = [
    {
      id: "sketch",
      ja: "《雪中鷹》制作ラフ",
      en: "Snow Hawk — Pencil Sketch",
      roleJa: "探索線・Loyal鉛筆画技法",
      roleEn:
        "Exploratory lines, Loyal pencil drawing",
      img:
        "https://baseec-img-mng.akamaized.net/images/user/blog/442982/blog/385472b7df8da7faae51e120792815ff.jpg",
      page:
        HOME + "/blog/2025/08/29/221644"
    },
    {
      id: "drawing",
      ja: "《雪中鷹》描き込み原画",
      en: "Snow Hawk — Detailed Drawing",
      roleJa: "羽列・主輪郭・黒ぼかし",
      roleEn:
        "Feather rows, outlines, black shading",
      img:
        "https://baseec-img-mng.akamaized.net/images/user/blog/442982/blog/a41deb49e2ec864b184ccde72fe049fe.jpg",
      page:
        HOME + "/blog/2025/08/29/221644"
    },
    {
      id: "tattoo",
      ja: "No.113《鷹図》",
      en: "No.113 — Hawk Tattoo",
      roleJa: "施術実績・黒面・身体配置",
      roleEn:
        "Tattoo execution, blacks and anatomy",
      img:
        "https://baseec-img-mng.akamaized.net/images/user/blog/442982/blog/c1c657853a26020785eb7caa92644038.jpg",
      page:
        HOME + "/blog/2025/08/17/013900"
    },
    {
      id: "peony",
      ja: "No.116《唐獅子牡丹》",
      en: "No.116 — Karajishi and Peony",
      roleJa: "牡丹・黒葉・色彩対比",
      roleEn:
        "Peony petals, dark foliage, color",
      img:
        "https://baseec-img-mng.akamaized.net/images/user/blog/442982/blog/d175cf819d609bec5ae4845ce35aefa4.jpg",
      page:
        HOME + "/blog/2025/08/02/172030"
    }
  ];

  // =========================================
  // DESIGN OPTIONS
  // =========================================

  const OPTIONS = {
    pose: [
      ["昇り鷹", "Ascending hawk"],
      ["降り鷹", "Descending hawk"],
      ["急降下する鷹", "Diving hawk"],
      ["止まり鷹", "Perched hawk"],
      ["翼を広げた鷹", "Wings-spread hawk"],
      ["旋回する鷹", "Circling hawk"]
    ],
    motif: [
      ["松", "Pine"],
      ["牡丹", "Peony"],
      ["桜", "Cherry blossoms"],
      ["雲・風", "Clouds & wind"],
      ["雪", "Snow"],
      ["富士山", "Mount Fuji"]
    ],
    style: [
      [
        "現代和彫",
        "Contemporary Japanese tattoo"
      ],
      [
        "洋彫・リアリズム",
        "Western tattoo / realism"
      ],
      [
        "ブラック＆グレー",
        "Black & grey"
      ],
      [
        "ブラックワーク",
        "Blackwork"
      ]
    ],
    place: [
      ["背中・フルバック", "Full back"],
      ["背中・ハーフバック", "Half back"],
      ["片腕・フルスリーブ", "Full sleeve"],
      ["胸・肩", "Chest & shoulder"]
    ]
  };

  const HOURS = {
    "背中・フルバック": [50, 80],
    "背中・ハーフバック": [22, 35],
    "片腕・フルスリーブ": [35, 55],
    "胸・肩": [15, 30]
  };

  const MULT = {
    "標準": 1,
    "高密度": 1.2,
    "超高密度": 1.4
  };

  // =========================================
  // ART DIRECTION
  // =========================================

  const POSE = {
    "昇り鷹":
      "上昇軸に沿って頭部・肩・翼・尾羽を連動させる。",

    "降り鷹":
      "下降動作の重心移動と翼の迎角を整合させる。",

    "急降下する鷹":
      "右上から左下への強い斜行軸。頭部・胸部・鉤爪を先行させ、両翼に遠近差をつける。",

    "止まり鷹":
      "枝を掴む脚趾の実構造、閉じた翼、鋭い視線を描く。",

    "翼を広げた鷹":
      "肩・肘・手根の関節連鎖に沿って翼を展開し、羽列の長短と左右の遠近を整合させる。",

    "旋回する鷹":
      "翼の傾斜と尾羽の操舵から旋回軌道を構築する。"
  };

  const MOTIF = {
    "松":
      "幹・枝・松葉を鷹の動勢と整合させる。",

    "牡丹":
      "大輪の外花弁・内花弁・花芯・黒葉を重層的に描き、鷹を主役として保持する。",

    "桜":
      "枝と散る花弁を飛翔方向と調和させる。",

    "雲・風":
      "渦雲、風の帯、白の抜きで運動量を強調する。",

    "雪":
      "降雪・雪の白場・墨の黒面で空間を形成する。花や葉に置き換えない。",

    "富士山":
      "山形を遠景の副主題として低コントラストに配置する。"
  };

  const STYLE = {
    "現代和彫":
      "日本花鳥画の動勢、強い筋彫り、黒ぼかし、和洋折衷の立体設計。",

    "洋彫・リアリズム":
      "西洋的な構造写実、光源、筋肉の量感、刺青に適した主輪郭。",

    "ブラック＆グレー":
      "濃墨から淡墨の階調、羽の硬軟、白場を保持。",

    "ブラックワーク":
      "ソリッドブラック、大きな黒面、ネガティブスペース。"
  };

  const ART = {
    anatomy:
      "頭蓋、眼窩、鉤嘴、頸部、肩・肘・手根関節、初列・次列風切羽、大中小雨覆、肩羽、胸羽、尾羽、脚趾・鉤爪。羽の生え方と関節数を解剖学的に整合。",

    pencil:
      "Loyal鉛筆画技法。荒々しい探索線、長く鋭い主輪郭、強弱のある線幅、擦筆、ハッチング、細密な羽枝を共存させる。",

    black:
      "漆黒、濃灰、中間灰、淡い墨ぼかし、純白の余白を5段階で使い分ける。翼根と背景の黒面を制御し、視認性を保つ。",

    body:
      "肩甲骨、脊柱、広背筋、三角筋、胸郭の曲面に沿った構図。背中・ハーフバックは片側肩甲骨から腰背部の非対称構図。",

    review:
      "主輪郭、猛禽解剖、羽列、黒面、白場、重心、背景の主従、人体適合、縮小時の可読性を点検。余分な爪・羽・関節を避ける。"
  };

  const DENSITY = {
    "標準":
      "主要な羽列、鉤爪、輪郭を明瞭にし、白場を広めに保持。",

    "高密度":
      "雨覆・羽軸・花芯まで細密に描き、主輪郭の読みやすさを維持。",

    "超高密度":
      "初列・次列風切羽、雨覆、羽枝、眼窩、趾節、花弁を超精密に描く。微細描写の周囲に白場を残し、黒面との階層を確保。"
  };

  // =========================================
  // RESEARCH SOURCES
  // =========================================

  const CORE = [
    HOME + "/blog/2025/08/29/221644",
    HOME + "/blog/2025/08/17/013900",
    HOME + "/blog/2025/08/02/172030",
    HOME + "/blog/2020/12/22/210901",
    HOME + "/blog/2025/10/04/132940",
    HOME + "/blog/2026/03/03/192809",
    HOME + "/blog/2025/07/10/235916",
    HOME + "/blog/2020/12/23/213527",
    HOME + "/blog/2019/12/31/214539"
  ];

  const EXTERNAL = {
    github: [
      GH + "loyal-faq",
      GH + "loyal-blog-sitemap",
      GH + "LOYAL-TATTOO-Blackwork-Tattoo",
      GH +
        "LOYAL-TATTOO-Western-style-tattoo-Modern-tattoo-Contemporary-tattoo",
      GH + "bavariancustomirons-data",
      GH +
        "A-study-on-hawk-tattoos-for-tattoo-enthusiasts"
    ],

    research: [
      "https://zenodo.org/records/23557266",
      "https://zenodo.org/records/23577391",
      "https://zenodo.org/records/23472661",
      "https://zenodo.org/records/23331245",
      "https://orcid.org/0009-0006-6704-1829"
    ]
  };

  const HISTORY = [
    [
      "《雪中鷹》制作研究",
      "Snow Hawk — Original Study",
      CORE[0]
    ],
    [
      "No.113《鷹図》施術記録",
      "No.113 — Hawk Tattoo",
      CORE[1]
    ],
    [
      "No.116《唐獅子牡丹》",
      "No.116 — Karajishi & Peony",
      CORE[2]
    ],
    [
      "人体構造とタトゥー設計",
      "Body Structure & Tattoo Design",
      CORE[3]
    ],
    [
      "現代和彫の定義と研究",
      "Contemporary Japanese Tattoo",
      CORE[4]
    ],
    [
      "LOYAL TATTOO MASTER FAQ",
      "Comprehensive Tattoo FAQ",
      GH + "loyal-faq"
    ]
  ];

  // =========================================
  // SPECIALIST FAQ — 30 ENTRIES
  // =========================================

  const FAQ = [
    [
      "鷹タトゥーの意味は？",
      "What does a hawk tattoo mean?",
      "強さ、集中力、独立、飛躍、自由などの解釈があります。",
      "Common interpretations include strength, focus, independence and freedom."
    ],
    [
      "鷹の和彫はできますか？",
      "Can a hawk be a Japanese tattoo?",
      "現代和彫の筋彫り、背景、黒ぼかしで制作できます。",
      "Yes, with Japanese linework and ink shading."
    ],
    [
      "鷹と牡丹の組み合わせは？",
      "Can hawks be paired with peonies?",
      "羽毛の硬さと花弁の柔らかさを対比します。",
      "Firm feathers and soft petals create contrast."
    ],
    [
      "雪中鷹とは？",
      "What is a snow hawk design?",
      "雪の白場と猛禽の黒面を対比する構図です。",
      "Snow-filled negative space contrasts with dark feathers."
    ],
    [
      "ブラックワークの鷹は？",
      "What is a blackwork hawk?",
      "黒面と余白を中心に猛禽を描写します。",
      "Solid black and negative space describe the bird."
    ],
    [
      "フルバックの構図は？",
      "How is a full back planned?",
      "肩甲骨から広背筋、腰背部へ翼と尾羽を展開します。",
      "Wings and tail follow shoulder blades and back muscles."
    ],
    [
      "ハーフバックの構図は？",
      "How is a half back planned?",
      "片側肩甲骨から脊柱際へ非対称に配置します。",
      "An asymmetric composition follows the shoulder blade and spine."
    ],
    [
      "フルスリーブも可能ですか？",
      "Can it fit a full sleeve?",
      "肩から前腕へ羽流れを再構成します。",
      "Feather flow is redesigned around the arm."
    ],
    [
      "胸・肩の構図は？",
      "How is chest placement planned?",
      "三角筋と胸郭の曲面に主輪郭を調整します。",
      "Contours adapt to the deltoid and ribcage."
    ],
    [
      "カバーアップにも使えますか？",
      "Can it cover an existing tattoo?",
      "既存図柄に合わせ、翼と背景の黒面を設計します。",
      "Dark masses are planned around the existing tattoo."
    ],
    [
      "施術料金の基準は？",
      "What is the hourly rate?",
      "時間彫り15,000円／時間（税抜）が参考単価です。",
      "The reference rate is JPY 15,000 per hour before tax."
    ],
    [
      "料金概算は確定ですか？",
      "Is the estimate binding?",
      "実際の料金は施術内容から個別見積もりします。",
      "Final pricing depends on an individual quotation."
    ],
    [
      "超高密度とは？",
      "What is ultra-high density?",
      "雨覆、羽枝、鱗、鉤爪、背景まで精緻に描きます。",
      "Detailed coverts, barbs, scales, talons and background."
    ],
    [
      "Loyal鉛筆画技法とは？",
      "What is the Loyal pencil technique?",
      "探索線、長い主輪郭、擦筆、ハッチングを統合します。",
      "It combines exploratory lines, dynamic contours and graphite shading."
    ],
    [
      "猛禽の羽列はどう描きますか？",
      "How are feather rows built?",
      "初列・次列風切羽と雨覆を階層的に描きます。",
      "Primaries, secondaries and coverts form distinct layers."
    ],
    [
      "鉤爪を重視する理由は？",
      "Why emphasize talons?",
      "遠近感と猛禽の運動性を表現できます。",
      "Talons convey depth and movement."
    ],
    [
      "背景の余白の役割は？",
      "Why preserve negative space?",
      "輪郭と黒面の可読性を高めます。",
      "Negative space strengthens contrast and readability."
    ],
    [
      "現代和彫と洋彫の違いは？",
      "How do Japanese and Western styles differ?",
      "背景、線質、陰影、人体配置の設計思想が異なります。",
      "Composition, line, shading and body placement differ."
    ],
    [
      "AI原画は既存作品の複製ですか？",
      "Does AI duplicate the original work?",
      "一次資料を研究し、独立した新規構図を生成します。",
      "The AI generates a new composition informed by references."
    ],
    [
      "施術作品の画像は参照されますか？",
      "Are tattoo photos referenced?",
      "選択した公開画像URLを生成指示に含めます。",
      "Selected image URLs are included in the prompt."
    ],
    [
      "GPTは全記事を読みますか？",
      "Will GPT read every article?",
      "実際の取得範囲はGPT側の検索・閲覧機能に依存します。",
      "Retrieval depends on the GPT tool and its access."
    ],
    [
      "Geminiの20URL上限とは？",
      "What is the Gemini 20-URL limit?",
      "Gemini API URL Contextの1リクエストの上限です。",
      "It is a per-request URL Context limit."
    ],
    [
      "GitHub資料は含まれますか？",
      "Are GitHub records included?",
      "選択により公開リポジトリのURLを追加します。",
      "Selected public repositories are included."
    ],
    [
      "Zenodo資料は含まれますか？",
      "Are Zenodo records included?",
      "公開DOI記録を参照対象にできます。",
      "Published DOI records can be included."
    ],
    [
      "外部掲載記事は対象ですか？",
      "Are third-party articles searched?",
      "伊彫との関連が確認できる公開資料を探索対象にします。",
      "Relevant verified external publications are considered."
    ],
    [
      "生成画像はどこに表示されますか？",
      "Where will the image appear?",
      "共有先アプリでの画像生成、API連携時は本画面に表示します。",
      "It appears in the receiving AI app, or on this page with an API."
    ],
    [
      "日本語と英語は切り替えられますか？",
      "Can I switch languages?",
      "画面と生成指示を日英切替できます。",
      "The interface and instructions support Japanese and English."
    ],
    [
      "料金は税込ですか？",
      "Does pricing include tax?",
      "参考金額は税抜です。",
      "Prices shown exclude tax."
    ],
    [
      "大型作品は分割施術ですか？",
      "Are large projects divided into sessions?",
      "複数回の施術計画を組みます。",
      "Large tattoos are normally planned over several sessions."
    ],
    [
      "予約の流れは？",
      "How do appointments work?",
      "事前カウンセリングと個別見積もりを経て調整します。",
      "Consultation and an individual estimate precede booking."
    ]
  ];

  // =========================================
  // APPLICATION STATE
  // =========================================

  const state = {
    lang: "ja",
    pose: "翼を広げた鷹",
    motif: "雪",
    style: "ブラックワーク",
    place: "背中・フルバック",
    density: "超高密度",
    provider: "GPT",

    refs: new Set(
      REFS.map(x => x.id)
    ),

    source: {
      official: true,
      github: true,
      research: true,
      external: true
    },

    sitemapUrls: [],
    sitemapStatus: "pending",
    batch: 0,
    faq: "",
    faqAll: false
  };

  let root = null;
  let taskNumber = 0;

  const tr = (jp, en) =>
    state.lang === "ja" ? jp : en;

  const fmt = n =>
    n.toLocaleString("ja-JP");

  const unique = xs =>
    [...new Set(xs.filter(Boolean))];

  const esc = s =>
    String(s).replace(
      /[&<>"']/g,
      c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[c]
    );

  const refList = () =>
    REFS.filter(
      r => state.refs.has(r.id)
    );

  // =========================================
  // ESTIMATE
  // =========================================

  const rateEstimate = () => {
    const [a, b] = HOURS[state.place];
    const m = MULT[state.density];

    const low = Math.round(a * m);
    const high = Math.round(b * m);

    return {
      low,
      high,
      min: low * RATE,
      max: high * RATE
    };
  };

  // =========================================
  // SOURCE QUEUE
  // =========================================

  const queue = () => unique([
    ...(
      state.source.official
        ? [
            HOME + "/",
            HOME + "/sitemap.xml",
            ...CORE,
            ...state.sitemapUrls
          ]
        : []
    ),

    ...(
      state.source.github
        ? EXTERNAL.github
        : []
    ),

    ...(
      state.source.research
        ? EXTERNAL.research
        : []
    )
  ]);

  const batches = () => {
    const q = queue();
    const a = [];

    for (
      let i = 0;
      i < q.length;
      i += 20
    ) {
      a.push(
        q.slice(i, i + 20)
      );
    }

    return a;
  };

  const promptSources = () => unique([
    ...(
      state.source.official
        ? [
            HOME + "/",
            HOME + "/sitemap.xml",
            ...CORE
          ]
        : []
    ),

    ...(
      state.source.github
        ? EXTERNAL.github
        : []
    ),

    ...(
      state.source.research
        ? EXTERNAL.research
        : []
    )
  ]).slice(0, 20);

  // =========================================
  // ART GENERATION PROMPT
  // =========================================

  function prompt() {
    const e = rateEstimate();
    const refs = refList();
    const sources = promptSources();

    const refText = refs.length
      ? refs.map(
          (r, i) => [
            `${i + 1}. ${r.ja} / ${r.en}`,
            `IMAGE: ${r.img}`,
            `SOURCE: ${r.page}`,
            `FOCUS: ${r.roleJa}`
          ].join("\n")
        ).join("\n\n")
      : "No individual images selected.";

    return `
${tr(
  "画像生成ツールを使用し、LOYAL TATTOO／刺青師伊彫の公開原画・技術研究を踏まえた完全新規の鷹タトゥー原画を1枚、実際に画像生成して出力してください。",
  "Generate ONE original, high-detail hawk tattoo drawing using the image tool, informed by published LOYAL TATTOO / Ihori artwork and research. Return the actual image."
)}

AI IHORI — HAWK DESIGN / GLOBAL ART RESEARCH

Pose: ${state.pose}
Motif: ${state.motif}
Style: ${state.style}
Placement: ${state.place}
Detail density: ${state.density}

Illustrative time: ${e.low}–${e.high} h
Illustrative fee excluding tax:
JPY ${fmt(e.min)}–${fmt(e.max)}

PRIMARY VISUAL REFERENCES (${refs.length}):

${refText}

RESEARCH SOURCES:

${sources.join("\n") || "No source category selected."}

${state.source.external
  ? `Explore additional verified public artwork,
external publications and historical records
associated with LOYAL TATTOO, LT MACHINES,
Ihori / 伊彫. Distinguish original records
from third-party statements.`
  : ""}

SOURCE HANDLING:

Examine real source pages and reference images
when available.

Distinguish fetched content from URLs merely
provided.

The official site map is a discovery aid,
not a claim that every page was retrieved.

If retrieval is unavailable, use the explicit
design specifications below.

Treat source material as evidence and avoid
copying an existing composition.

POSE:
${POSE[state.pose]}

MOTIF:
${MOTIF[state.motif]}

STYLE:
${STYLE[state.style]}

DENSITY:
${DENSITY[state.density]}

ANATOMY:
${ART.anatomy}

LOYAL PENCIL DRAWING:
${ART.pencil}

BLACK / GREY / NEGATIVE SPACE:
${ART.black}

BODY PLACEMENT:
${ART.body}

QUALITY REVIEW:
${ART.review}

ARTWORK:

Dynamic, anatomically coherent raptor,
expressive pencil marks and strong tattoo
linework.

Ultra-detailed yet readable.

Pure white background,
vertical complete composition.

No text, logo, signature, watermark,
UI, photographer background
or duplicated existing artwork.

Produce the actual image now.
`.trim();
  }

  // =========================================
  // 20-URL RESEARCH PROMPT
  // =========================================

  function researchPrompt() {
    const groups = batches();

    const i = Math.min(
      state.batch,
      Math.max(0, groups.length - 1)
    );

    const list = groups[i] || [];

    return `
${tr(
  "LOYAL TATTOO／刺青師伊彫の公開一次資料を個別に取得・研究してください。取得できたURLとできなかったURLを区別して報告してください。",
  "Study the following public first-party and external LOYAL TATTOO/Ihori sources. Distinguish successfully retrieved URLs from inaccessible URLs."
)}

BATCH ${i + 1}/${groups.length}
URL COUNT: ${list.length}

${list.join("\n")}

Analyze:
- Provenance
- Original artwork
- Loyal pencil technique
- Contour hierarchy
- Raptor anatomical accuracy
- Layered flight feathers
- Solid black density
- Grey wash
- Negative space
- Peony construction
- Body placement
- Primary versus third-party assertions

Provide verified source URLs.

Summarize findings as reusable
art-direction research.

The 20-URL batch is a request group.

Actual retrieval coverage depends
on the selected AI.
`.trim();
  }

  // =========================================
  // CSS
  // =========================================

  const CSS = `
#lh-app{
  box-sizing:border-box;
  max-width:1040px;
  width:100%;
  margin:24px auto 40px;
  padding:16px;
  background:#101319;
  border:1px solid #2e343e;
  border-radius:15px;
  color:#eef0f4;
  font-family:inherit;
  line-height:1.6;
  clear:both
}
#lh-app *{
  box-sizing:border-box
}
#lh-app p,
#lh-app h2,
#lh-app h3{
  margin:0
}
#lh-app a{
  color:#e6c45d;
  text-decoration:underline;
  text-underline-offset:3px
}
#lh-app .lh-head{
  padding:19px;
  background:#191c24;
  border:1px solid #3b404b;
  border-radius:11px
}
#lh-app .lh-top{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px
}
#lh-app .lh-brand{
  font-weight:700;
  font-size:11px;
  letter-spacing:1px;
  color:#dbb94f
}
#lh-app h2{
  margin:9px 0;
  font-size:clamp(21px,3vw,29px);
  line-height:1.4;
  color:#fff
}
#lh-app .lh-desc{
  font-size:13px;
  color:#c2c9d3
}
#lh-app .lh-section{
  padding:22px 0;
  border-bottom:1px solid #3c424e
}
#lh-app .lh-section:last-child{
  border-bottom:0
}
#lh-app h3{
  color:#fff;
  font-size:19px;
  font-weight:700;
  margin:0 0 13px
}
#lh-app .lh-grid{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:12px
}
#lh-app .lh-field{
  display:grid;
  gap:6px
}
#lh-app label,
#lh-app .lh-label{
  color:#cfd4dd;
  font-size:12px
}
#lh-app select,
#lh-app input[type=search],
#lh-app textarea{
  border-radius:8px;
  border:1px solid #4c525f;
  background:#20242d;
  color:#fff;
  padding:11px;
  width:100%;
  font:inherit;
  font-size:14px
}
#lh-app select{
  min-height:46px
}
#lh-app .lh-density,
#lh-app .lh-engines{
  display:flex;
  gap:8px
}
#lh-app button{
  font:inherit;
  cursor:pointer
}
#lh-app .lh-chip{
  flex:1;
  min-width:0;
  padding:9px 8px;
  border:1px solid #4b515e;
  border-radius:8px;
  background:#252a34;
  color:#fff;
  font-size:12px
}
#lh-app .lh-chip[aria-pressed=true],
#lh-app .lh-engine[aria-pressed=true]{
  color:#ffe39c;
  border-color:#d4ab36;
  background:#463922
}
#lh-app .lh-engine{
  flex:1;
  padding:11px;
  border-radius:9px;
  border:1px solid #454a54;
  background:#282c35;
  color:#f4f4f5;
  font-weight:700
}
#lh-app .lh-panel{
  border:1px solid #3f4550;
  background:#1a1e27;
  border-radius:11px;
  padding:14px
}
#lh-app .lh-btn{
  width:100%;
  background:#d7b54b;
  color:#171717;
  border:1px solid #d7b54b;
  border-radius:9px;
  padding:13px;
  font-size:14px;
  font-weight:800;
  margin-top:9px
}
#lh-app .lh-secondary{
  background:#2a2a2e;
  border-color:#756a51;
  color:#f1d99f
}
#lh-app .lh-note{
  color:#b4bdc9;
  font-size:12px;
  margin:9px 0;
  line-height:1.75
}
#lh-app .lh-status{
  min-height:20px;
  font-size:12px;
  color:#edd28e;
  margin:8px 0
}
#lh-app .lh-prompt{
  display:none;
  font-size:11px;
  white-space:pre-wrap;
  max-height:260px;
  overflow:auto
}
#lh-app .lh-output{
  margin-top:12px;
  min-height:65px;
  border:1px dashed #4a4f59;
  border-radius:9px;
  padding:12px;
  color:#b9c0c9;
  font-size:12px;
  text-align:center
}
#lh-app .lh-output img{
  display:block;
  width:100%;
  max-width:720px;
  margin:auto
}
#lh-app .lh-refs{
  display:grid;
  grid-template-columns:repeat(4,minmax(0,1fr));
  gap:10px
}
#lh-app .lh-ref{
  border:1px solid #3e444d;
  border-radius:10px;
  background:#1e222a;
  padding:8px;
  min-width:0
}
#lh-app .lh-ref img{
  height:150px;
  width:100%;
  object-fit:contain;
  background:#2b2f35;
  border-radius:7px
}
#lh-app .lh-ref label{
  display:flex;
  gap:6px;
  align-items:flex-start;
  font-size:12px;
  font-weight:700;
  padding:7px 0
}
#lh-app input[type=checkbox]{
  accent-color:#d6af43;
  width:16px;
  height:16px;
  flex-shrink:0
}
#lh-app .lh-ref p{
  font-size:11px;
  color:#b8c1ca;
  margin:0 0 5px
}
#lh-app .lh-ref a{
  font-size:11px
}
#lh-app .lh-source{
  margin-top:8px;
  border:1px solid #414855;
  background:#1c2129;
  border-radius:9px;
  padding:11px
}
#lh-app .lh-source label{
  display:flex;
  gap:9px;
  align-items:center;
  font-weight:700;
  font-size:13px
}
#lh-app .lh-source p{
  font-size:12px;
  color:#b7bdc6;
  padding-left:25px;
  margin-top:5px
}
#lh-app .lh-stats{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px
}
#lh-app .lh-stat{
  padding:14px;
  border:1px solid #444b54;
  background:#202530;
  border-radius:9px
}
#lh-app .lh-stat strong{
  display:block;
  font-size:clamp(16px,3vw,21px);
  color:#fff
}
#lh-app .lh-history{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:8px
}
#lh-app .lh-history a{
  display:block;
  border:1px solid #414953;
  border-radius:8px;
  padding:10px;
  background:#1d222c;
  font-size:12px
}
#lh-app .lh-faq{
  border:1px solid #454a54;
  border-radius:8px;
  padding:9px;
  margin:7px 0;
  background:#1d222c
}
#lh-app .lh-faq summary{
  font-size:13px;
  font-weight:700;
  cursor:pointer
}
#lh-app .lh-faq p{
  font-size:12px;
  color:#b7bec9;
  margin-top:7px
}
#lh-app .lh-actionrow{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:8px
}
#lh-app .lh-counter{
  color:#b7c0cb;
  font-size:11px
}
#lh-app .lh-meta{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:10px
}
#lh-app button:disabled{
  opacity:.6;
  cursor:progress
}
@media(max-width:640px){
  #lh-app{
    margin:20px 0;
    padding:11px
  }
  #lh-app .lh-head{
    padding:14px
  }
  #lh-app .lh-grid,
  #lh-app .lh-actionrow,
  #lh-app .lh-history{
    grid-template-columns:1fr
  }
  #lh-app .lh-refs{
    grid-template-columns:repeat(2,minmax(0,1fr))
  }
  #lh-app .lh-ref img{
    height:165px
  }
  #lh-app .lh-stat{
    padding:10px
  }
}
`;

  // =========================================
  // SELECT FIELD
  // =========================================

  const sel = (key, jp, en) => `
    <div class="lh-field">
      <label for="lh-${key}">
        ${tr(jp, en)}
      </label>
      <select
        id="lh-${key}"
        data-field="${key}"
      >
        ${OPTIONS[key].map(
          ([a, b]) => `
            <option value="${esc(a)}">
              ${esc(tr(a, b))}
            </option>
          `
        ).join("")}
      </select>
    </div>
  `;

  // =========================================
  // MAIN RENDERER
  // =========================================

  function show() {
    if (!root) return;

    const e = rateEstimate();
    const b = batches();

    state.batch = Math.min(
      state.batch,
      Math.max(0, b.length - 1)
    );

    root.innerHTML = `
      <div class="lh-head">

        <div class="lh-top">

          <span class="lh-brand">
            LOYAL TATTOO + LT MACHINES
          </span>

          <button
            type="button"
            class="lh-chip"
            data-action="language"
            style="flex:none;min-width:80px"
          >
            ${tr("English", "日本語")}
          </button>

        </div>

        <h2>
          ${tr(
            "AI伊彫原画生成シミュレーター",
            "AI IHORI — Hawk Tattoo Design Simulator"
          )}
        </h2>

        <p class="lh-desc">
          ${tr(
            "伊彫の造形研究、Loyal鉛筆画技法、猛禽の解剖学的構造、黒の密度、羽流れ、人体への配置を統合した原画案をAI伊彫が生成します。",
            "AI Ihori creates original artwork informed by Ihori’s research, Loyal pencil drawing, raptor anatomy, black density, feather flow and anatomical placement."
          )}
        </p>

      </div>

      <section class="lh-section">

        <h3>
          ${tr("構図設計", "Composition")}
        </h3>

        <div class="lh-grid">

          ${sel(
            "pose",
            "鷹の姿勢・構図",
            "Hawk posture"
          )}

          ${sel(
            "motif",
            "組み合わせモチーフ",
            "Background motif"
          )}

          ${sel(
            "style",
            "施術様式",
            "Tattoo style"
          )}

          ${sel(
            "place",
            "人体施術部位",
            "Body placement"
          )}

        </div>

        <p
          class="lh-label"
          style="margin:14px 0 7px"
        >
          ${tr(
            "デザイン密度",
            "Detail density"
          )}
        </p>

        <div class="lh-density">

          ${[
            ["標準", "Standard"],
            ["高密度", "High"],
            ["超高密度", "Ultra-high"]
          ].map(
            ([a, b]) => `
              <button
                type="button"
                class="lh-chip"
                data-density="${esc(a)}"
                aria-pressed="${state.density === a}"
              >
                ${tr(a, b)}
              </button>
            `
          ).join("")}

        </div>

      </section>

      <section class="lh-section">

        <h3>
          ${tr(
            "AI伊彫原画生成",
            "AI Ihori Art Generation"
          )}
        </h3>

        <div class="lh-panel">

          <p
            class="lh-label"
            style="margin-bottom:8px"
          >
            ${tr(
              "生成エンジン",
              "AI engine"
            )}
          </p>

          <div class="lh-engines">

            ${["GPT", "Gemini"].map(
              p => `
                <button
                  type="button"
                  class="lh-engine"
                  data-provider="${p}"
                  aria-pressed="${state.provider === p}"
                >
                  ${p}
                </button>
              `
            ).join("")}

          </div>

          <p
            class="lh-note"
            id="lh-config"
          ></p>

          <button
            type="button"
            data-action="generate"
            class="lh-btn"
          >
            ${tr(
              "AI伊彫で鷹タトゥー原画を生成する",
              "Generate original hawk tattoo artwork"
            )}
          </button>

          <p class="lh-note">
            ${tr(
              "iPhoneでは共有画面に生成指示を渡します。共有先アプリでの入力・送信は各アプリの対応状況に従います。API接続済みの場合は本画面で直接生成します。",
              "On iPhone this shares the full prompt through the native share sheet. Prefill and submission depend on the receiving app. A configured image API renders here."
            )}
          </p>

          <div class="lh-actionrow">

            <button
              type="button"
              data-action="open"
              class="lh-btn lh-secondary"
            >
              ${tr(
                "コピーして選択AIを開く",
                "Copy and open selected AI"
              )}
            </button>

            <button
              type="button"
              data-action="copy"
              class="lh-btn lh-secondary"
            >
              ${tr(
                "超高精細プロンプトをコピー",
                "Copy detailed art prompt"
              )}
            </button>

          </div>

          <button
            type="button"
            data-action="detail"
            class="lh-btn lh-secondary"
          >
            ${tr(
              "画風研究・生成指示を表示",
              "View research / generation prompt"
            )}
          </button>

          <p
            id="lh-status"
            class="lh-status"
            role="status"
            aria-live="polite"
          ></p>

          <textarea
            id="lh-prompt"
            class="lh-prompt"
            readonly
            aria-label="Full generation prompt"
          ></textarea>

          <div
            id="lh-output"
            class="lh-output"
          >
            ${tr(
              "原画の表示領域。AIアプリ連携時は共有先に画像が表示されます。",
              "Artwork preview. Native-app generation appears in the receiving app."
            )}
          </div>

        </div>

      </section>

      <section class="lh-section">

        <div class="lh-meta">

          <h3>
            ${tr(
              "伊彫の参考画像",
              "Ihori Artwork References"
            )}
          </h3>

          <span class="lh-counter">
            ${state.refs.size}/4
          </span>

        </div>

        <p class="lh-note">
          ${tr(
            "制作ラフ・描き込み・施術作品・牡丹の4点を個別に選択できます。",
            "Select the four foundational sketch, drawing, tattoo and botanical references."
          )}
        </p>

        <div class="lh-refs">

          ${REFS.map(
            r => `
              <div class="lh-ref">

                <img
                  src="${r.img}"
                  loading="lazy"
                  alt="${esc(tr(r.ja, r.en))}"
                >

                <label>
                  <input
                    type="checkbox"
                    data-ref="${r.id}"
                    ${state.refs.has(r.id)
                      ? "checked"
                      : ""}
                  >

                  ${esc(tr(r.ja, r.en))}
                </label>

                <p>
                  ${esc(
                    tr(r.roleJa, r.roleEn)
                  )}
                </p>

                <a
                  href="${r.page}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ${tr(
                    "公式作品",
                    "Source"
                  )}
                </a>

              </div>
            `
          ).join("")}

        </div>

      </section>

      <section class="lh-section">

        <div class="lh-meta">

          <h3>
            ${tr(
              "全域AI画風研究",
              "Global Art Research"
            )}
          </h3>

          <span class="lh-counter">
            20 URLs / batch
          </span>

        </div>

        <p class="lh-note">
          ${tr(
            "本殿サイトマップ、GitHub、Zenodo、外部掲載資料を研究対象に設定します。実際の全件一括処理にはサーバー側の研究APIが必要です。",
            "Select the official site map, GitHub, Zenodo and external publications. Full automated processing requires a research backend."
          )}
        </p>

        ${[
          [
            "official",
            "LOYAL TATTOO 本殿全域",
            "Official Website / Full Corpus",
            "公開記事・施術画像・制作解説",
            "Published works and artwork"
          ],
          [
            "github",
            "GitHub / LOYAL OS / MASTER FAQ",
            "GitHub / LOYAL OS / FAQ",
            "FAQ・技法・製品仕様",
            "FAQ, technique and product specifications"
          ],
          [
            "research",
            "Zenodo / DOI / ORCID",
            "Zenodo / DOI / ORCID",
            "研究・著者情報・制作記録",
            "Research and author records"
          ],
          [
            "external",
            "外部掲載・公開資料の探索",
            "External Source Discovery",
            "公開された第三者掲載資料の追加探索",
            "Find verified external publications"
          ]
        ].map(
          ([id, j, e1, n, n2]) => `
            <div class="lh-source">

              <label>
                <input
                  type="checkbox"
                  data-source="${id}"
                  ${state.source[id]
                    ? "checked"
                    : ""}
                >

                ${tr(j, e1)}
              </label>

              <p>
                ${tr(n, n2)}
              </p>

            </div>
          `
        ).join("")}

        <div
          class="lh-panel"
          style="margin-top:13px"
        >

          <div class="lh-stats">

            <div class="lh-stat">
              <span class="lh-label">
                ${tr(
                  "索引URL数",
                  "Indexed URLs"
                )}
              </span>

              <strong id="lh-urls">
                ${queue().length}
              </strong>
            </div>

            <div class="lh-stat">
              <span class="lh-label">
                ${tr(
                  "20URLバッチ数",
                  "Research batches"
                )}
              </span>

              <strong id="lh-batches">
                ${b.length}
              </strong>
            </div>

          </div>

          <p
            class="lh-note"
            id="lh-sitemap"
          >
            ${esc(state.sitemapStatus)}
          </p>

          <div class="lh-field">

            <label for="lh-batch">
              ${tr(
                "研究バッチ",
                "Research batch"
              )}
            </label>

            <select id="lh-batch">

              ${b.length
                ? b.map(
                    (u, i) => `
                      <option value="${i}">
                        ${tr(
                          "バッチ",
                          "Batch"
                        )}
                        ${i + 1}/${b.length}
                        — ${u.length} URLs
                      </option>
                    `
                  ).join("")
                : '<option value="0">0 URLs</option>'}

            </select>

          </div>

          <div class="lh-actionrow">

            <button
              type="button"
              data-action="research"
              class="lh-btn lh-secondary"
            >
              ${tr(
                "選択バッチをAIで研究",
                "Research selected batch"
              )}
            </button>

            <button
              type="button"
              data-action="researchcopy"
              class="lh-btn lh-secondary"
            >
              ${tr(
                "20URL研究指示をコピー",
                "Copy research prompt"
              )}
            </button>

          </div>

        </div>

      </section>

      <section class="lh-section">

        <h3>
          ${tr(
            "施術概算",
            "Tattoo Estimate"
          )}
        </h3>

        <div class="lh-stats">

          <div class="lh-stat">

            <span class="lh-label">
              ${tr(
                "想定施術時間",
                "Estimated hours"
              )}
            </span>

            <strong id="lh-hours">
              ${e.low}〜${e.high}h
            </strong>

          </div>

          <div class="lh-stat">

            <span class="lh-label">
              ${tr(
                "参考料金（税抜）",
                "Estimate before tax"
              )}
            </span>

            <strong id="lh-price">
              ¥${fmt(e.min)}〜¥${fmt(e.max)}
            </strong>

          </div>

        </div>

        <p class="lh-note">
          ${tr(
            "15,000円／時間（税抜）の参考試算。実際の料金は個別見積もりです。",
            "JPY 15,000/hour before tax. This is an illustrative estimate."
          )}
        </p>

      </section>

      <section class="lh-section">

        <h3>
          ${tr(
            "美術史・実作品",
            "Art History & Original Works"
          )}
        </h3>

        <div class="lh-history">

          ${HISTORY.map(
            ([a, b, u]) => `
              <a
                href="${u}"
                target="_blank"
                rel="noopener noreferrer"
              >
                ${esc(tr(a, b))}
              </a>
            `
          ).join("")}

        </div>

      </section>

      <section class="lh-section">

        <h3>
          ${tr(
            "専門FAQ",
            "Specialist FAQ"
          )}
        </h3>

        <div class="lh-field">

          <label for="lh-search">
            ${tr(
              "FAQ検索",
              "Search FAQ"
            )}
          </label>

          <input
            type="search"
            id="lh-search"
            value="${esc(state.faq)}"
            placeholder="${tr(
              "鷹・料金・ブラックワークなど",
              "hawk, pricing, blackwork"
            )}"
          >

        </div>

        <div
          id="lh-faqs"
          style="margin-top:10px"
        ></div>

        <button
          type="button"
          data-action="faqmore"
          class="lh-btn lh-secondary"
          id="lh-faqmore"
        ></button>

        <p class="lh-note">
          <a
            href="${GH}loyal-faq"
            target="_blank"
            rel="noopener noreferrer"
          >
            LOYAL TATTOO MASTER FAQ
          </a>
        </p>

      </section>
    `;

    root.querySelectorAll(
      "select[data-field]"
    ).forEach(
      n => {
        n.value = state[n.dataset.field];
      }
    );

    const batchControl =
      root.querySelector("#lh-batch");

    if (batchControl) {
      batchControl.value =
        String(state.batch);
    }

    summary();
    showFAQ();
  }

  // =========================================
  // LIVE SUMMARY
  // =========================================

  function summary() {
    if (!root) return;

    const e = rateEstimate();

    const cfg =
      root.querySelector("#lh-config");

    if (cfg) {
      cfg.textContent = [
        state.pose,
        state.motif,
        state.style,
        state.density
      ].join(" × ");
    }

    const h =
      root.querySelector("#lh-hours");

    if (h) {
      h.textContent =
        `${e.low}〜${e.high}h`;
    }

    const p =
      root.querySelector("#lh-price");

    if (p) {
      p.textContent =
        `¥${fmt(e.min)}〜¥${fmt(e.max)}`;
    }
  }

  // =========================================
  // STATUS
  // =========================================

  function status(
    message,
    isError = false
  ) {
    if (!root) return;

    const e =
      root.querySelector("#lh-status");

    if (e) {
      e.textContent = message;

      e.style.color = isError
        ? "#ffb1b1"
        : "#edd28e";
    }
  }

  // =========================================
  // FAQ DISPLAY
  // =========================================

  function showFAQ() {
    if (!root) return;

    const q = state.faq
      .toLocaleLowerCase()
      .trim();

    const results = FAQ.filter(
      row =>
        row.join(" ")
          .toLocaleLowerCase()
          .includes(q)
    );

    const items = state.faqAll
      ? results
      : results.slice(0, 5);

    const holder =
      root.querySelector("#lh-faqs");

    if (holder) {
      holder.innerHTML = items.map(
        r => `
          <details class="lh-faq">

            <summary>
              ${esc(tr(r[0], r[1]))}
            </summary>

            <p>
              ${esc(tr(r[2], r[3]))}
            </p>

          </details>
        `
      ).join("") || `
        <p class="lh-note">
          ${tr(
            "一致する項目がありません。",
            "No matching question."
          )}
        </p>
      `;
    }

    const button =
      root.querySelector("#lh-faqmore");

    if (button) {
      button.hidden =
        results.length <= 5;

      button.textContent = state.faqAll
        ? tr(
            "表示を減らす",
            "Show fewer"
          )
        : tr(
            `全${results.length}件を表示`,
            `Show all ${results.length}`
          );
    }
  }

  // =========================================
  // PROMPT DISPLAY
  // =========================================

  function expose(value) {
    const e =
      root.querySelector("#lh-prompt");

    e.value = value;
    e.style.display = "block";
  }

  // =========================================
  // CLIPBOARD
  // =========================================

  async function copy(value) {
    try {
      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {
        await navigator.clipboard.writeText(
          value
        );

        return true;
      }
    } catch (_) {}

    const t =
      document.createElement("textarea");

    t.value = value;

    t.style.cssText =
      "position:fixed;left:-9999px;top:0";

    document.body.appendChild(t);

    t.select();

    let ok = false;

    try {
      ok = document.execCommand("copy");
    } catch (_) {}

    t.remove();

    return ok;
  }

  // =========================================
  // SELECTED AI
  // =========================================

  const destination = () =>
    state.provider === "GPT"
      ? "https://chatgpt.com/"
      : "https://gemini.google.com/app";

  // =========================================
  // NATIVE APP HANDOFF
  // =========================================

  function nativeHandoff(value) {
    const payload = {
      title: "AI IHORI — LOYAL TATTOO",
      text: value
    };

    // Native OS sharing must be called
    // synchronously from the user click.

    if (
      typeof navigator.share === "function" &&
      window.isSecureContext
    ) {
      try {
        const pending =
          navigator.share(payload);

        status(
          tr(
            "iPhoneの共有画面を開きました。受け取りと送信は選択したアプリ側で行われます。",
            "Native share sheet opened. The receiving app handles import and submission."
          )
        );

        Promise.resolve(pending).catch(
          async error => {
            if (
              error &&
              error.name === "AbortError"
            ) {
              status(
                tr(
                  "共有を取り消しました。",
                  "Sharing cancelled."
                )
              );

              return;
            }

            const ok =
              await copy(value);

            if (!ok) {
              expose(value);
            }

            status(
              tr(
                "共有が利用できません。プロンプトをコピーしました。",
                "Native sharing unavailable; prompt copied."
              ),
              !ok
            );
          }
        );

        return;
      } catch (error) {
        console.warn(
          "[AI IHORI share]",
          error
        );
      }
    }

    // Standard sharing unavailable:
    // copy and open selected service.

    openSelected(value);
  }

  // =========================================
  // COPY + OPEN SELECTED AI
  // =========================================

  function openSelected(value) {
    const url = destination();

    // Launch during the user click.
    // Universal HTTPS links may open
    // a native app depending on OS settings.

    const opened =
      window.open(
        url,
        "_blank",
        "noopener,noreferrer"
      );

    if (!opened) {
      status(
        tr(
          "AI画面の起動が制限されました。プロンプトをコピーします。",
          "Opening AI was blocked. Copying prompt."
        )
      );
    }

    copy(value).then(
      ok => {
        if (!ok) {
          expose(value);
        }

        status(
          ok
            ? tr(
                "プロンプトをコピーしました。選択したAIへ貼り付けて実行できます。",
                "Prompt copied. Paste and send in the selected AI."
              )
            : tr(
                "プロンプトを下の欄に表示しました。",
                "Prompt displayed below."
              ),
          !ok
        );
      }
    );
  }

  // =========================================
  // IMAGE GENERATION
  // =========================================

  async function generate() {
    const value = prompt();

    const endpoint =
      window.LOYAL_HAWK_IMAGE_ENDPOINT;

    // Native or browser handoff mode.

    if (!endpoint) {
      nativeHandoff(value);
      return;
    }

    // Optional direct API mode.

    const btn =
      root.querySelector(
        '[data-action="generate"]'
      );

    const token = ++taskNumber;

    btn.disabled = true;

    status(
      tr(
        "原画生成APIを実行しています。",
        "Generating via image API..."
      )
    );

    try {
      const response = await fetch(
        endpoint,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            provider: state.provider,
            prompt: value,

            images:
              refList().map(r => r.img),

            references:
              promptSources(),

            spec: {
              pose: state.pose,
              motif: state.motif,
              style: state.style,
              place: state.place,
              density: state.density
            }
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
          `HTTP ${response.status}`
        );
      }

      if (token !== taskNumber) {
        return;
      }

      const src = data.imageBase64
        ? "data:image/png;base64," +
          data.imageBase64
        : data.imageUrl;

      if (
        typeof src !== "string" ||
        !(
          src.startsWith(
            "data:image/png;base64,"
          ) ||
          src.startsWith("https://")
        )
      ) {
        throw new Error(
          "Missing image data"
        );
      }

      const output =
        root.querySelector("#lh-output");

      output.textContent = "";

      const img =
        document.createElement("img");

      img.alt =
        "AI Ihori generated hawk tattoo design";

      img.src = src;

      output.appendChild(img);

      status(
        tr(
          "生成画像を表示しました。",
          "Generated artwork displayed."
        )
      );

    } catch (error) {
      expose(value);

      status(
        tr(
          "画像生成APIエラー: ",
          "Image API error: "
        ) +
          String(
            error.message || error
          ),
        true
      );

    } finally {
      btn.disabled = false;
    }
  }

  // =========================================
  // CLICK EVENTS
  // =========================================

  function handleClick(event) {
    const btn =
      event.target.closest("button");

    if (
      !btn ||
      !root.contains(btn)
    ) return;

    if (btn.dataset.density) {
      state.density =
        btn.dataset.density;

      show();
      return;
    }

    if (btn.dataset.provider) {
      state.provider =
        btn.dataset.provider;

      show();
      return;
    }

    const cmd =
      btn.dataset.action;

    if (cmd === "language") {
      state.lang =
        state.lang === "ja"
          ? "en"
          : "ja";

      show();
      return;
    }

    if (cmd === "generate") {
      generate();
      return;
    }

    if (cmd === "open") {
      openSelected(prompt());
      return;
    }

    if (cmd === "copy") {
      const v = prompt();

      copy(v).then(
        ok => {
          if (!ok) {
            expose(v);
          }

          status(
            ok
              ? tr(
                  "プロンプトをコピーしました。",
                  "Prompt copied."
                )
              : tr(
                  "コピーできません。下部に全文を表示しました。",
                  "Clipboard unavailable; full prompt displayed."
                ),
            !ok
          );
        }
      );

      return;
    }

    if (cmd === "detail") {
      const box =
        root.querySelector("#lh-prompt");

      box.value = prompt();

      box.style.display =
        box.style.display === "block"
          ? "none"
          : "block";

      return;
    }

    if (cmd === "research") {
      nativeHandoff(
        researchPrompt()
      );

      return;
    }

    if (cmd === "researchcopy") {
      const v = researchPrompt();

      copy(v).then(
        ok => {
          if (!ok) {
            expose(v);
          }

          status(
            ok
              ? tr(
                  "研究指示をコピーしました。",
                  "Research prompt copied."
                )
              : tr(
                  "コピーできません。研究指示を表示しました。",
                  "Copy blocked; research text displayed."
                ),
            !ok
          );
        }
      );

      return;
    }

    if (cmd === "faqmore") {
      state.faqAll =
        !state.faqAll;

      showFAQ();
    }
  }

  // =========================================
  // CHANGE EVENTS
  // =========================================

  function handleChange(event) {
    const t = event.target;

    if (t.dataset.field) {
      state[t.dataset.field] = t.value;
      summary();
      return;
    }

    if (t.dataset.ref) {
      if (t.checked) {
        state.refs.add(t.dataset.ref);
      } else {
        state.refs.delete(t.dataset.ref);
      }

      show();
      return;
    }

    if (t.dataset.source) {
      state.source[t.dataset.source] =
        t.checked;

      state.batch = 0;
      show();
      return;
    }

    if (t.id === "lh-batch") {
      state.batch =
        Number(t.value) || 0;
    }
  }

  // =========================================
  // ARTICLE INSERTION ANCHOR
  // =========================================

  function anchor() {
    const selectors = [
      "article p",
      "main p",
      ".blog-detail p",
      ".blog-content p",
      ".entry-content p",
      "p",
      "article div",
      "main div"
    ];

    const seen = new Set();

    for (const selector of selectors) {
      for (
        const el of
        document.querySelectorAll(selector)
      ) {
        if (
          seen.has(el) ||
          el.closest(
            "#lh-app,nav,header,footer"
          )
        ) continue;

        seen.add(el);

        if (
          el.textContent.trim() === "—"
        ) {
          const inside =
            el.querySelector("p");

          if (
            inside &&
            inside.textContent.trim() === "—"
          ) continue;

          return el;
        }
      }
    }

    return document.querySelector(
      "[data-loyal-hawk-anchor],#loyal-hawk-anchor"
    );
  }

  // =========================================
  // SITEMAP COLLECTION
  // =========================================

  async function collectSiteMap() {
    const found = new Set();
    const seen = new Set();

    async function walk(
      url,
      depth
    ) {
      if (
        depth > 4 ||
        seen.size >= 20 ||
        seen.has(url)
      ) return;

      seen.add(url);

      const response = await fetch(
        url,
        {
          credentials: "same-origin",
          signal:
            AbortSignal.timeout(14000)
        }
      );

      if (!response.ok) {
        throw new Error(
          String(response.status)
        );
      }

      const doc =
        new DOMParser().parseFromString(
          await response.text(),
          "application/xml"
        );

      if (
        doc.querySelector("parsererror")
      ) {
        throw new Error(
          "Sitemap XML parse error"
        );
      }

      const locs = [
        ...doc.getElementsByTagName("loc")
      ].map(
        x => {
          try {
            const u = new URL(
              x.textContent.trim(),
              HOME
            );

            return (
              u.protocol === "https:" &&
              u.hostname === HOST
            )
              ? u.href
              : null;

          } catch (_) {
            return null;
          }
        }
      ).filter(Boolean);

      if (
        doc.documentElement.localName ===
        "sitemapindex"
      ) {
        for (const u of locs) {
          await walk(
            u,
            depth + 1
          );
        }

      } else if (
        doc.documentElement.localName ===
        "urlset"
      ) {
        for (const u of locs) {
          if (
            found.size < 50000
          ) {
            found.add(u);
          }
        }
      }
    }

    try {
      await walk(
        HOME + "/sitemap.xml",
        0
      );

      state.sitemapUrls = [
        ...found
      ];

      state.sitemapStatus = tr(
        `公式サイトマップ：${found.size}件取得`,
        `Official sitemap: ${found.size} URLs loaded`
      );

    } catch (e) {
      state.sitemapStatus = tr(
        "サイトマップ取得を確認できませんでした。既知の資料を利用します。",
        "Sitemap unavailable; using known sources."
      );

      console.warn(
        "[AI IHORI sitemap]",
        e
      );
    }

    if (
      root &&
      root.isConnected
    ) {
      show();
    }
  }

  // =========================================
  // MOUNT
  // =========================================

  function mount() {
    if (
      root &&
      root.isConnected
    ) return true;

    const point = anchor();

    if (
      !point ||
      !point.parentNode
    ) return false;

    if (
      !document.getElementById(
        "lh-v52-style"
      )
    ) {
      const style =
        document.createElement("style");

      style.id =
        "lh-v52-style";

      style.textContent = CSS;

      document.head.append(style);
    }

    root =
      document.createElement("section");

    root.id = "lh-app";

    root.setAttribute(
      "aria-label",
      "AI Ihori Hawk Tattoo Simulator"
    );

    point.insertAdjacentElement(
      "afterend",
      root
    );

    root.addEventListener(
      "click",
      handleClick
    );

    root.addEventListener(
      "change",
      handleChange
    );

    root.addEventListener(
      "input",
      e => {
        if (
          e.target.id === "lh-search"
        ) {
          state.faq =
            e.target.value;

          showFAQ();
        }
      }
    );

    state.sitemapStatus = tr(
      "公式サイトマップの取得を開始します。",
      "Loading official sitemap."
    );

    show();
    collectSiteMap();

    return true;
  }

  // =========================================
  // BOOT
  // =========================================

  if (!mount()) {
    const observer =
      new MutationObserver(
        () => {
          if (mount()) {
            observer.disconnect();
          }
        }
      );

    observer.observe(
      document.documentElement,
      {
        childList: true,
        subtree: true
      }
    );

    document.addEventListener(
      "DOMContentLoaded",
      () => {
        if (mount()) {
          observer.disconnect();
        }
      },
      { once: true }
    );

    window.addEventListener(
      "load",
      () => {
        if (mount()) {
          observer.disconnect();
        }
      },
      { once: true }
    );

    setTimeout(
      () => {
        observer.disconnect();

        if (!root) {
          console.warn(
            "[AI IHORI] Standalone — was not found."
          );
        }
      },
      25000
    );
  }

  // =========================================
  // PUBLIC API
  // =========================================

  window.LOYAL_IHORI_HAWK = {
    version: "5.2",

    references: REFS,

    buildPrompt: prompt,

    buildResearchPrompt:
      researchPrompt,

    sourceQueue: queue,

    getState: () => ({
      ...state,
      refs: [...state.refs],
      source: {
        ...state.source
      }
    })
  };

})();
