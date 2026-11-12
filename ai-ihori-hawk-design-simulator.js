
/*
 * LOYAL TATTOO + LT MACHINES
 * AI伊彫原画生成シミュレーター
 * AI IHORI HAWK DESIGN SIMULATOR
 *
 * MULTI-REFERENCE + GLOBAL RESEARCH
 * VERSION 5.1
 *
 * Artist: Ihori / 伊彫
 * Organization: LOYAL TATTOO + LT MACHINES
 *
 * Target:
 * https://www.bavariancustomirons.jp/blog/2026/11/12/100435
 *
 * Mount:
 * Directly below the stand-alone "—" in the article.
 *
 * File:
 * ai-ihori-hawk-design-simulator.js
 *
 * No external JavaScript dependencies.
 * No API keys embedded.
 */

(() => {
  "use strict";

  const HOST = "www.bavariancustomirons.jp";
  const PATH = "/blog/2026/11/12/100435";

  if (
    location.hostname !== HOST ||
    location.pathname.replace(/\/$/, "") !== PATH
  ) return;

  if (window.__LOYAL_IHORI_HAWK_V51__) return;

  window.__LOYAL_IHORI_HAWK_V51__ = true;

  const HOME = "https://" + HOST;

  const REPO =
    "https://github.com/ltmachinesyokohama-ux/";

  const REFS = [
    {
      id: "sketch",
      ja: "《雪中鷹》制作ラフ",
      en: "Snow Hawk — Pencil Sketch",
      roleJa: "探索線・Loyal鉛筆画技法",
      roleEn: "Pencil construction and line variation",
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
      roleEn: "Flight feathers, contours and shading",
      img:
        "https://baseec-img-mng.akamaized.net/images/user/blog/442982/blog/a41deb49e2ec864b184ccde72fe049fe.jpg",
      page:
        HOME + "/blog/2025/08/29/221644"
    },
    {
      id: "tattoo",
      ja: "No.113《鷹図》",
      en: "No.113 — Hawk Tattoo",
      roleJa: "施術実績・黒面・人体配置",
      roleEn: "Tattoo execution, black mass, body placement",
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
      roleEn: "Peonies, dark foliage, color contrast",
      img:
        "https://baseec-img-mng.akamaized.net/images/user/blog/442982/blog/d175cf819d609bec5ae4845ce35aefa4.jpg",
      page:
        HOME + "/blog/2025/08/02/172030"
    }
  ];

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
      ["現代和彫", "Contemporary Japanese tattoo"],
      ["洋彫・リアリズム", "Western tattoo / realism"],
      ["ブラック＆グレー", "Black & grey"],
      ["ブラックワーク", "Blackwork"]
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
      "肩・肘・手根の関節連鎖に沿って大きく翼を展開する。羽列は左右それぞれ自然な遠近を持たせる。",
    "旋回する鷹":
      "左右の翼の傾斜と尾羽の操舵によって旋回軌道を表現する。"
  };

  const MOTIF = {
    "松":
      "幹・枝・松葉を運動方向に整理し、主役の翼と区別する。",
    "牡丹":
      "大輪の外花弁・内花弁・花芯・黒葉を重層的に描き、鷹を主題として保持する。",
    "桜":
      "枝と花弁の流れを鷹の動勢に調和させる。",
    "雲・風":
      "渦雲、風の帯、抜きで速度と視線誘導を形成する。",
    "雪":
      "降雪・積雪・白場と黒墨の対比で空間を構成する。植物の花弁や葉を雪の代わりに描かない。",
    "富士山":
      "遠景の山影を副主題として低コントラストに配置する。"
  };

  const STYLE = {
    "現代和彫":
      "日本花鳥画の動勢、強い筋彫り、黒ぼかし、和洋折衷の立体設計。",
    "洋彫・リアリズム":
      "構造的写実・光源・筋肉量感と刺青に適した主輪郭を統合。",
    "ブラック＆グレー":
      "濃墨から淡墨まで階調を設計し白場を保持する。",
    "ブラックワーク":
      "ソリッドブラック、大きな黒面、ネガティブスペース、輪郭を主役にする。"
  };

  const CORE_PAGES = [
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
      REPO + "loyal-faq",
      REPO + "loyal-blog-sitemap",
      REPO + "LOYAL-TATTOO-Blackwork-Tattoo",
      REPO +
        "LOYAL-TATTOO-Western-style-tattoo-Modern-tattoo-Contemporary-tattoo",
      REPO + "bavariancustomirons-data",
      REPO +
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
      CORE_PAGES[0]
    ],
    [
      "No.113《鷹図》施術記録",
      "No.113 — Hawk Tattoo",
      CORE_PAGES[1]
    ],
    [
      "No.116《唐獅子牡丹》",
      "No.116 — Karajishi & Peony",
      CORE_PAGES[2]
    ],
    [
      "人体構造とタトゥー設計",
      "Body Structure & Tattoo Design",
      CORE_PAGES[3]
    ],
    [
      "現代和彫の定義と研究",
      "Contemporary Japanese Tattoo Study",
      CORE_PAGES[4]
    ],
    [
      "小原古邨・鷲図参考資料",
      "Ōhara Koson — Eagle Reference",
      "https://collections.lacma.org/object/103108"
    ]
  ];

  const FAQ = [
    [
      "鷹タトゥーにはどんな意味がありますか？",
      "What does a hawk tattoo symbolize?",
      "強さ、集中力、独立、飛躍、自由などの解釈があります。",
      "Common interpretations include strength, focus, independence and freedom."
    ],
    [
      "鷹の和彫はできますか？",
      "Can a hawk be a Japanese-style tattoo?",
      "現代和彫の構図、墨ぼかし、背景で制作できます。",
      "Yes, using Japanese composition, ink shading and background elements."
    ],
    [
      "鷹と牡丹の組み合わせは？",
      "Can hawks be paired with peonies?",
      "羽毛の硬さと花弁の柔らかさを対比して配置します。",
      "The contrast between firm feathers and soft petals guides the design."
    ],
    [
      "雪中鷹とは？",
      "What is a snow hawk design?",
      "雪の白場と猛禽の黒面を対比する構図です。",
      "Snow-filled negative space contrasts with the raptor’s dark masses."
    ],
    [
      "鷹のブラックワークは？",
      "What is a blackwork hawk?",
      "黒面と余白の構成を中心に猛禽を描写します。",
      "Solid blacks and negative space describe the bird."
    ],
    [
      "フルバックの構図は？",
      "How is a full-back design planned?",
      "肩甲骨から広背筋、腰背部へ翼と尾羽を展開します。",
      "Wings and tail follow the shoulder blades and back muscles."
    ],
    [
      "ハーフバックの構図は？",
      "How is a half-back design planned?",
      "片側肩甲骨から脊柱際へ非対称に配置します。",
      "An asymmetric design follows one shoulder blade and the spine."
    ],
    [
      "フルスリーブにもできますか？",
      "Can the design fit a full sleeve?",
      "肩から前腕への羽流れを再構成して設計します。",
      "The feather flow can be redesigned around the arm."
    ],
    [
      "胸・肩の構図は？",
      "How is chest and shoulder placement handled?",
      "三角筋と胸郭の曲面に主輪郭を調整します。",
      "Contours are adjusted to the deltoid and ribcage."
    ],
    [
      "カバーアップにも使えますか？",
      "Can it cover an existing tattoo?",
      "既存の黒量と位置を踏まえ、翼と背景の黒面を設計します。",
      "Dark masses and background are planned around the existing tattoo."
    ],
    [
      "施術料金の基準は？",
      "What is the hourly rate?",
      "時間彫り15,000円／時間（税抜）を基本とします。",
      "The reference rate is JPY 15,000 per hour before tax."
    ],
    [
      "料金概算は確定ですか？",
      "Is the estimate binding?",
      "概算は参考値であり、実際の見積もりは個別に算出します。",
      "The estimate is illustrative; final pricing is individual."
    ],
    [
      "超高密度とは？",
      "What is ultra-high density?",
      "羽枝、雨覆、鱗、鉤爪、背景まで高密度に設計します。",
      "The design includes detailed feathers, scales, talons and background."
    ],
    [
      "Loyal鉛筆画技法とは？",
      "What is the Loyal pencil technique?",
      "探索線、長い主輪郭、擦筆やハッチングを組み合わせます。",
      "It combines exploratory lines, forceful contours and pencil shading."
    ],
    [
      "猛禽の羽列はどう描きますか？",
      "How are feather rows constructed?",
      "初列・次列風切羽、雨覆、肩羽を階層的に設計します。",
      "Primary and secondary flight feathers and coverts are layered."
    ],
    [
      "鉤爪を重視する理由は？",
      "Why emphasize talons?",
      "遠近感・緊張感・猛禽特有の構造を表現できます。",
      "Talons communicate depth, tension and raptor anatomy."
    ],
    [
      "背景の余白の役割は？",
      "Why leave negative space?",
      "視認性と構図の呼吸を確保し、黒面を引き立てます。",
      "Negative space keeps the design legible and balances dark areas."
    ],
    [
      "現代和彫と洋彫の違いは？",
      "How do Japanese and Western styles differ?",
      "背景処理、線質、陰影、人体配置の設計方法に差があります。",
      "They differ in composition, linework, shading and body placement."
    ],
    [
      "制作原画は複製できますか？",
      "Does AI copy the original artwork?",
      "AI原画は参考作品を研究し、新規の図案として生成します。",
      "References inform a newly generated composition."
    ],
    [
      "施術作品の画像は参照されますか？",
      "Are tattoo photographs used?",
      "選択した公開画像のURLが生成指示に含まれます。",
      "Selected image URLs are added to the generation instructions."
    ],
    [
      "GPTは全記事を読みますか？",
      "Will GPT read every article?",
      "取得範囲はGPT側の検索・ページ読取機能と利用条件に依存します。",
      "Actual retrieval depends on the AI tool and its access limits."
    ],
    [
      "Geminiの20URLとは？",
      "What does the Gemini 20-URL limit mean?",
      "Gemini API URL Contextの1リクエスト上限です。",
      "It is the per-request limit for Gemini API URL Context."
    ],
    [
      "GitHub資料は含まれますか？",
      "Are GitHub sources included?",
      "研究対象の選択により関連公開リポジトリを追加します。",
      "Public repositories can be selected as research sources."
    ],
    [
      "Zenodo資料は含まれますか？",
      "Are Zenodo records included?",
      "公開DOI記録を研究対象として選択できます。",
      "Published DOI records can be included."
    ],
    [
      "外部掲載記事は対象ですか？",
      "Are external publications searched?",
      "作者と作品の関連が確認できる公開資料を探索対象にします。",
      "Public sources associated with the artist are considered."
    ],
    [
      "画像生成結果はどこに表示されますか？",
      "Where will the image appear?",
      "チャット連携では利用者のチャットに、API連携では本画面に表示します。",
      "In chat handoff mode it appears in the user's AI chat; with API integration it appears here."
    ],
    [
      "日本語と英語は切り替えられますか？",
      "Can I switch language?",
      "画面と生成指示を日本語・英語に切り替えられます。",
      "The interface and generation guidance support Japanese and English."
    ],
    [
      "料金に消費税は含まれますか？",
      "Does the estimate include tax?",
      "表示金額は税抜です。",
      "Displayed reference prices exclude tax."
    ],
    [
      "大型作品は分割施術ですか？",
      "Are large projects completed over sessions?",
      "通常は複数回の施術計画を構築します。",
      "Large tattoos are usually planned over multiple sessions."
    ],
    [
      "予約はどう進みますか？",
      "How do appointments work?",
      "事前カウンセリングと個別見積もりを経て調整します。",
      "Appointments are arranged after consultation and an individual estimate."
    ]
  ];

  const state = {
    lang: "ja",
    pose: "翼を広げた鷹",
    motif: "雪",
    style: "ブラックワーク",
    place: "背中・フルバック",
    density: "超高密度",
    provider: "GPT",
    refs: new Set(REFS.map(x => x.id)),
    source: {
      official: true,
      github: true,
      research: true,
      external: true
    },
    batch: 0,
    sitemapUrls: [],
    sitemapStatus: "pending",
    faq: "",
    faqAll: false
  };

  let root = null;
  let requestId = 0;

  const tt = (ja, en) =>
    state.lang === "ja" ? ja : en;

  const fmt = n =>
    Number(n).toLocaleString("ja-JP");

  const uniq = arr =>
    [...new Set(arr.filter(Boolean))];

  function escapeHtml(value) {
    return String(value).replace(
      /[&<>"']/g,
      c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[c]
    );
  }

  function estimate() {
    const base = HOURS[state.place];
    const m = MULT[state.density];

    const low = Math.round(base[0] * m);
    const high = Math.round(base[1] * m);

    return {
      low,
      high,
      min: low * 15000,
      max: high * 15000
    };
  }

  function chosenRefs() {
    return REFS.filter(
      r => state.refs.has(r.id)
    );
  }

  function pickedExternal() {
    return [
      ...(state.source.github ? EXTERNAL.github : []),
      ...(state.source.research ? EXTERNAL.research : [])
    ];
  }

  function sourceQueue() {
    const official = state.source.official
      ? [
          HOME + "/",
          HOME + "/sitemap.xml",
          ...CORE_PAGES,
          ...state.sitemapUrls
        ]
      : [];

    return uniq([
      ...official,
      ...pickedExternal()
    ]);
  }

  function batches() {
    const urls = sourceQueue();
    const result = [];

    for (let i = 0; i < urls.length; i += 20) {
      result.push(urls.slice(i, i + 20));
    }

    return result;
  }

  function selectedPromptUrls() {
    return uniq([
      ...(state.source.official
        ? [HOME + "/", ...CORE_PAGES]
        : []),
      ...pickedExternal()
    ]).slice(0, 16);
  }

  // =====================================
  // ART GENERATION PROMPT
  // =====================================

  function buildPrompt() {
    const e = estimate();
    const jp = state.lang === "ja";

    const refsText = chosenRefs()
      .map((r, i) => [
        `${i + 1}. ${r.ja} / ${r.en}`,
        `IMAGE: ${r.img}`,
        `SOURCE: ${r.page}`,
        `FOCUS: ${r.roleJa}`
      ].join("\n"))
      .join("\n\n");

    const urls = selectedPromptUrls();

    const guide = [
      `POSE: ${state.pose} — ${POSE[state.pose]}`,
      `MOTIF: ${state.motif} — ${MOTIF[state.motif]}`,
      `STYLE: ${state.style} — ${STYLE[state.style]}`,

      `PLACEMENT: ${state.place};
Adapt to shoulder blades, spine,
latissimus dorsi, chest and shoulder
curvature as appropriate.`,

      `DENSITY: ${state.density};
Preserve readable main outlines and
negative space.`,

      `ANATOMY:
Authentic raptor skull, orbital socket,
hooked beak, cervical region,
shoulder/elbow/wrist joints,
primaries, secondaries,
greater/median/lesser coverts,
tail, tarsus, toes and talons.
Coherent feather-growth direction
and realistic joint count.`,

      `LOYAL PENCIL DRAWING:
Dynamic exploratory pencil strokes;
long forceful outer contour;
uneven line weight;
dry graphite hatching;
deep blacks;
dark/medium/light ink washes;
intentional open white areas.`,

      `COMPOSITION:
Combine Japanese painting's motion
and spacing with Western anatomical
volumetric construction.
Design for tattoo readability on
a curved body.`,

      `INSPECTION:
Avoid redundant feathers,
invented joints, extra toes,
dense decorative noise or loss
of silhouette.`,

      `FINISH:
Vertically composed original drawing
on pure white.
No text, watermark, signature
or photo background.`
    ].join("\n\n");

    return [
      jp
        ? "画像生成ツールでLOYAL TATTOO／刺青師・伊彫の画風研究に基づく完全新規の鷹タトゥー原画を1枚生成してください。画像を実際に出力してください。"
        : "Use the image-generation tool to create ONE new original hawk tattoo drawing informed by LOYAL TATTOO artist Ihori's published art research. Return the actual image.",

      "\nAI IHORI — GLOBAL HAWK DESIGN",

      `Posture: ${state.pose}
Motif: ${state.motif}
Style: ${state.style}
Placement: ${state.place}
Density: ${state.density}`,

      `Reference tattoo time:
${e.low}–${e.high} hours.
Estimated fee:
JPY ${fmt(e.min)}–${fmt(e.max)}
excluding tax (illustrative only).`,

      "\nPRIMARY VISUAL REFERENCES:\n" +
        (refsText || "No selected image references."),

      "\nPRIMARY RESEARCH SOURCES:\n" +
        (urls.join("\n") || "No research sources selected."),

      state.source.external
        ? `Search for additional publicly available,
verifiable LOYAL TATTOO / LT MACHINES /
Ihori artwork and technical references.
Distinguish first-party records from
third-party reports.`
        : "",

      state.source.official
        ? `Explore the official website and
its sitemap to locate relevant articles.
Report which URLs were actually retrieved.

Site map:
${HOME}/sitemap.xml`
        : "",

      "\nART DIRECTION:\n" + guide,

      jp
        ? `取得できた資料と未取得の資料を
区別して扱う。

参照作品の造形特徴を研究し、
独立した新規の図案を制作する。

猛禽の骨格、翼関節、羽列、
鉤爪、黒の密度、人体配置を
点検してから描写する。

純白背景、縦長、高精細。
必ず画像生成ツールを実行し、
完成画像を1枚出力する。`
        : `Distinguish retrieved sources
from inaccessible ones.

Create an independent composition
based on the studied visual characteristics.

Check raptor anatomy,
wing joints, feather arrays,
talons, black density and body placement.

Use a pure white background
and a high-detail vertical composition.

Produce the actual image.`
    ].join("\n\n").trim();
  }

  // =====================================
  // 20-URL RESEARCH BATCH PROMPT
  // =====================================

  function buildResearchPrompt() {
    const list = batches();

    const idx = Math.min(
      state.batch,
      Math.max(0, list.length - 1)
    );

    const urls = list[idx] || [];

    return [
      tt(
        "LOYAL TATTOO／刺青師伊彫の画風を、以下の公開URLから一次資料重視で研究してください。可能なら各URLを個別に開き、読取成功・失敗を区別してください。",
        "Research the style of LOYAL TATTOO / tattoo artist Ihori using the following public URLs. Open individual sources when permitted and report retrieval results."
      ),

      `RESEARCH BATCH ${idx + 1}/${list.length}`,

      `EXACT URL COUNT: ${urls.length}`,

      ...urls,

      `Extract:
- Source URL
- Artist and work
- Context and provenance
- Outline shape
- Pencil marks and line variation
- Wing anatomy
- Black density and negative space
- Japanese motifs
- Body placement
- Verified and inferred observations

Distinguish current retrieval
from model training.

Never claim inaccessible pages
have been read.

Summarize as reusable art-direction
research with full source URLs.`
    ].join("\n");
  }

  // =====================================
  // COMPONENT STYLES
  // =====================================

  const css = `
#lh-app{
  box-sizing:border-box;
  max-width:1040px;
  margin:26px auto 36px;
  padding:16px;
  border:1px solid #2c313b;
  border-radius:16px;
  background:#101319;
  color:#eceef2;
  font:inherit;
  line-height:1.6;
  clear:both
}
#lh-app *{box-sizing:border-box}
#lh-app h2,#lh-app h3,#lh-app p{margin:0}
#lh-app a{
  color:#e1be57;
  text-decoration:underline;
  text-underline-offset:3px
}
#lh-app a:hover{color:#ffe6a4}
#lh-app .lh-head{
  padding:20px;
  background:#171a22;
  border:1px solid #343945;
  border-radius:12px
}
#lh-app .lh-brand{
  font-size:11px;
  font-weight:700;
  letter-spacing:1.2px;
  color:#e0ba46
}
#lh-app h2{
  font-size:clamp(21px,4vw,29px);
  line-height:1.35;
  margin:8px 0 12px;
  color:#fff
}
#lh-app .lh-desc{
  font-size:13px;
  color:#c8ccd4
}
#lh-app .lh-section{
  border-bottom:1px solid #363b43;
  padding:22px 2px
}
#lh-app .lh-section:last-child{border-bottom:0}
#lh-app h3{
  font-size:19px;
  color:white;
  margin:0 0 13px;
  font-weight:700
}
#lh-app .lh-grid{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:12px
}
#lh-app .lh-field{
  display:grid;
  gap:5px
}
#lh-app label,#lh-app .lh-label{
  color:#d5d8df;
  font-size:12px
}
#lh-app select,
#lh-app input[type=search],
#lh-app textarea{
  width:100%;
  background:#1d222b;
  color:#f8f8fa;
  border:1px solid #4a515e;
  border-radius:8px;
  padding:11px;
  font:inherit;
  font-size:14px
}
#lh-app select{min-height:46px}
#lh-app .lh-density{
  display:flex;
  gap:8px;
  flex-wrap:wrap
}
#lh-app .lh-chip{
  cursor:pointer;
  border:1px solid #4a515e;
  background:#222630;
  color:#f3f3f4;
  padding:9px 15px;
  border-radius:9px;
  font-size:13px;
  flex:1;
  min-width:80px
}
#lh-app .lh-chip[aria-pressed=true]{
  border-color:#d4ae42;
  background:#40351c;
  color:#ffe09a
}
#lh-app .lh-engines{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:8px
}
#lh-app .lh-engine{
  border:1px solid #444954;
  background:#252a34;
  color:#f5f6f8;
  padding:12px;
  cursor:pointer;
  border-radius:9px;
  font-weight:700
}
#lh-app .lh-engine[aria-pressed=true]{
  background:#4d4024;
  border-color:#d9b447;
  color:#ffe3a1
}
#lh-app .lh-btn{
  width:100%;
  padding:13px 14px;
  border-radius:9px;
  border:1px solid #c79e32;
  background:#d9b64d;
  color:#17191d;
  font:inherit;
  font-size:14px;
  font-weight:800;
  cursor:pointer
}
#lh-app .lh-secondary{
  border:1px solid #7b7160;
  background:#25272d;
  color:#e9d197
}
#lh-app .lh-btn:disabled{
  opacity:.5;
  cursor:wait
}
#lh-app .lh-panel{
  background:#191d26;
  border:1px solid #3c414b;
  border-radius:12px;
  padding:14px
}
#lh-app .lh-note{
  font-size:12px;
  color:#b6bcc7;
  line-height:1.65;
  margin:7px 0
}
#lh-app .lh-actionrow{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px;
  margin-top:10px
}
#lh-app .lh-refs{
  display:grid;
  grid-template-columns:repeat(4,minmax(0,1fr));
  gap:10px
}
#lh-app .lh-ref{
  padding:8px;
  border-radius:10px;
  border:1px solid #3d434b;
  background:#1c2029;
  min-width:0
}
#lh-app .lh-ref img{
  display:block;
  width:100%;
  height:148px;
  object-fit:contain;
  background:#292c33;
  border-radius:6px
}
#lh-app .lh-ref label{
  display:flex;
  align-items:flex-start;
  gap:6px;
  font-weight:700;
  font-size:12px;
  margin-top:8px
}
#lh-app input[type=checkbox]{
  accent-color:#d4b04c;
  width:17px;
  height:17px;
  flex:none
}
#lh-app .lh-ref p{
  font-size:11px;
  color:#b1b8c2;
  margin:5px 0
}
#lh-app .lh-source{
  border:1px solid #414652;
  background:#1c2029;
  padding:11px 12px;
  border-radius:9px;
  margin:8px 0
}
#lh-app .lh-source label{
  display:flex;
  gap:9px;
  align-items:center;
  font-size:13px;
  font-weight:700
}
#lh-app .lh-source p{
  font-size:12px;
  color:#b4bac3;
  margin:5px 0 0 26px
}
#lh-app .lh-stats{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px
}
#lh-app .lh-stat{
  padding:14px;
  border:1px solid #454955;
  background:#1e222b;
  border-radius:10px
}
#lh-app .lh-stat strong{
  display:block;
  font-size:clamp(16px,3vw,22px);
  color:#fff;
  margin-top:4px
}
#lh-app .lh-status{
  color:#e7ce8b;
  font-size:12px;
  min-height:20px;
  margin:10px 0
}
#lh-app .lh-preview{
  text-align:center;
  border:1px dashed #4c525e;
  border-radius:10px;
  padding:16px;
  margin-top:10px;
  color:#aab1bb;
  font-size:12px
}
#lh-app .lh-preview img{
  display:block;
  width:100%;
  max-width:700px;
  margin:auto;
  object-fit:contain
}
#lh-app .lh-output{
  white-space:pre-wrap;
  overflow-wrap:anywhere;
  min-height:120px;
  max-height:270px;
  overflow:auto;
  font-size:11px;
  display:none
}
#lh-app .lh-history{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:8px
}
#lh-app .lh-history a{
  display:block;
  padding:10px;
  border:1px solid #3d434b;
  border-radius:9px;
  font-size:12px;
  background:#1b2028
}
#lh-app .lh-faq{
  margin:7px 0;
  border:1px solid #414751;
  border-radius:8px;
  padding:9px 11px;
  background:#1b2028
}
#lh-app .lh-faq summary{
  font-size:13px;
  font-weight:700;
  cursor:pointer
}
#lh-app .lh-faq p{
  color:#bfc5cd;
  font-size:12px;
  margin-top:7px
}
#lh-app .lh-meta{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:6px;
  margin-bottom:10px
}
#lh-app .lh-counter{
  font-size:11px;
  color:#b0b8c3
}
@media(max-width:640px){
  #lh-app{
    padding:11px;
    margin:24px 0
  }
  #lh-app .lh-head{padding:15px}
  #lh-app .lh-refs{
    grid-template-columns:repeat(2,minmax(0,1fr))
  }
  #lh-app .lh-grid,
  #lh-app .lh-history{
    grid-template-columns:1fr
  }
  #lh-app .lh-actionrow{
    grid-template-columns:1fr
  }
  #lh-app .lh-stat{padding:10px}
  #lh-app .lh-ref img{height:165px}
}`;

  // =====================================
  // UI RENDERER
  // =====================================

  function selectField(field, labelJa, labelEn) {
    const options = OPTIONS[field]
      .map(([jp, en]) => `
        <option value="${escapeHtml(jp)}">
          ${escapeHtml(tt(jp, en))}
        </option>
      `)
      .join("");

    return `
      <div class="lh-field">
        <label for="lh-${field}">
          ${escapeHtml(tt(labelJa, labelEn))}
        </label>
        <select
          id="lh-${field}"
          data-field="${field}"
        >
          ${options}
        </select>
      </div>
    `;
  }

  function render() {
    if (!root) return;

    const e = estimate();
    const b = batches();

    state.batch = Math.min(
      state.batch,
      Math.max(0, b.length - 1)
    );

    root.innerHTML = `
      <div class="lh-head">

        <div class="lh-meta">
          <span class="lh-brand">
            LOYAL TATTOO + LT MACHINES
          </span>

          <button
            type="button"
            class="lh-chip"
            id="lh-language"
            style="flex:none"
          >
            ${tt("English", "日本語")}
          </button>
        </div>

        <h2>
          ${tt(
            "AI伊彫原画生成シミュレーター",
            "AI IHORI — Hawk Tattoo Design Simulator"
          )}
        </h2>

        <p class="lh-desc">
          ${tt(
            "伊彫の造形研究、Loyal鉛筆画技法、猛禽の解剖学的構造、黒の密度、羽流れ、人体への配置を統合した原画案をAI伊彫が生成します。",
            "AI Ihori develops original concepts informed by Ihori's art research, Loyal pencil technique, raptor anatomy, blackwork, feather structure and body placement."
          )}
        </p>
      </div>

      <section class="lh-section">
        <h3>${tt("構図設計", "Composition")}</h3>

        <div class="lh-grid">
          ${selectField(
            "pose",
            "鷹の姿勢・構図",
            "Hawk posture"
          )}

          ${selectField(
            "motif",
            "組み合わせモチーフ",
            "Background motif"
          )}

          ${selectField(
            "style",
            "施術様式",
            "Tattoo style"
          )}

          ${selectField(
            "place",
            "人体施術部位",
            "Body placement"
          )}
        </div>

        <p
          class="lh-label"
          style="margin-top:14px"
        >
          ${tt("デザイン密度", "Detail density")}
        </p>

        <div class="lh-density">
          ${[
            ["標準", "Standard"],
            ["高密度", "High"],
            ["超高密度", "Ultra-high"]
          ].map(([jp, en]) => `
            <button
              class="lh-chip"
              type="button"
              data-density="${jp}"
              aria-pressed="${state.density === jp}"
            >
              ${tt(jp, en)}
            </button>
          `).join("")}
        </div>
      </section>

      <section class="lh-section">
        <h3>
          ${tt(
            "AI伊彫原画生成",
            "AI Ihori Art Generation"
          )}
        </h3>

        <div class="lh-panel">
          <p class="lh-label">
            ${tt("生成エンジン", "AI engine")}
          </p>

          <div class="lh-engines">
            ${["GPT", "Gemini"].map(v => `
              <button
                type="button"
                class="lh-engine"
                data-provider="${v}"
                aria-pressed="${state.provider === v}"
              >
                ${v}
              </button>
            `).join("")}
          </div>

          <p
            class="lh-note"
            id="lh-configuration"
          ></p>

          <button
            type="button"
            id="lh-generate"
            class="lh-btn"
          >
            ${tt(
              "AI伊彫で鷹タトゥー原画を生成する",
              "Generate original hawk tattoo artwork"
            )}
          </button>

          <p class="lh-note">
            ${tt(
              "現在の選択条件・参照画像・公式研究資料を生成指示へ統合します。API接続時はこの画面に表示し、通常はGPT／Geminiへ引き渡します。",
              "The current selections, reference images and research URLs are included. A configured API displays the image here; otherwise the prompt is handed off to the chosen AI."
            )}
          </p>

          <div class="lh-actionrow">
            <button
              type="button"
              id="lh-copy"
              class="lh-btn lh-secondary"
            >
              ${tt(
                "超高精細プロンプトをコピー",
                "Copy detailed art prompt"
              )}
            </button>

            <button
              type="button"
              id="lh-detail"
              class="lh-btn lh-secondary"
            >
              ${tt(
                "画風研究・生成指示を表示",
                "View art research prompt"
              )}
            </button>
          </div>

          <p
            class="lh-status"
            id="lh-status"
            role="status"
            aria-live="polite"
          ></p>

          <textarea
            id="lh-prompt"
            class="lh-output"
            readonly
            aria-label="Generation prompt"
          ></textarea>

          <div
            class="lh-preview"
            id="lh-preview"
          >
            ${tt(
              "生成原画の表示領域／チャット連携時は選択したAIで画像が表示されます。",
              "Artwork preview / chat handoff results appear in the selected AI."
            )}
          </div>
        </div>
      </section>

      <section class="lh-section">

        <div class="lh-meta">
          <h3>
            ${tt(
              "伊彫の参考画像",
              "Ihori Artwork References"
            )}
          </h3>

          <span class="lh-counter">
            ${state.refs.size} / 4
          </span>
        </div>

        <p class="lh-note">
          ${tt(
            "4枚の実作品を核とし、参考画像を個別に選択できます。原画の輪郭・羽列・黒面・牡丹の研究に使用します。",
            "Select each of the four original references for line, feather, blackwork and peony research."
          )}
        </p>

        <div class="lh-refs">
          ${REFS.map(r => `
            <div class="lh-ref">

              <img
                loading="lazy"
                alt="${escapeHtml(tt(r.ja, r.en))}"
                src="${r.img}"
              >

              <label>
                <input
                  type="checkbox"
                  data-ref="${r.id}"
                  ${state.refs.has(r.id) ? "checked" : ""}
                >
                ${escapeHtml(tt(r.ja, r.en))}
              </label>

              <p>
                ${escapeHtml(
                  tt(r.roleJa, r.roleEn)
                )}
              </p>

              <a
                href="${r.page}"
                target="_blank"
                rel="noopener noreferrer"
              >
                ${tt("公式作品", "Original source")}
              </a>
            </div>
          `).join("")}
        </div>
      </section>

      <section class="lh-section">
        <h3>
          ${tt(
            "全域AI画風研究",
            "Global Art Research"
          )}
        </h3>

        <p class="lh-note">
          ${tt(
            "本殿のサイトマップから公開URLを収集し、GitHub・Zenodo・外部公開研究へ拡張します。各研究バッチは20URL以内です。",
            "Collect official URLs from the site map and include GitHub, Zenodo and other public sources. Each research batch contains up to 20 URLs."
          )}
        </p>

        ${[
          [
            "official",
            "LOYAL TATTOO 本殿全域",
            "Official Website / Full Corpus",
            "公開記事・制作画像・技法・施術記録",
            "Published articles, artwork and techniques"
          ],
          [
            "github",
            "GitHub / LOYAL OS / MASTER FAQ",
            "GitHub / LOYAL OS / FAQ",
            "研究リポジトリ・FAQ・作品仕様書",
            "Repositories, FAQs and technical notes"
          ],
          [
            "research",
            "Zenodo / DOI / ORCID",
            "Zenodo / DOI / ORCID",
            "公開研究・著者情報・制作記録",
            "Published research and author records"
          ],
          [
            "external",
            "外部掲載・公開資料の探索",
            "External Source Discovery",
            "外部作品掲載・取材・研究言及をAIで探索",
            "Discover verified external publications"
          ]
        ].map(([id, jp, en, noteJa, noteEn]) => `
          <div class="lh-source">
            <label>
              <input
                type="checkbox"
                data-source="${id}"
                ${state.source[id] ? "checked" : ""}
              >

              ${escapeHtml(tt(jp, en))}
            </label>

            <p>
              ${escapeHtml(tt(noteJa, noteEn))}
            </p>
          </div>
        `).join("")}

        <div
          class="lh-panel"
          style="margin-top:14px"
        >
          <div class="lh-stats">

            <div class="lh-stat">
              <span class="lh-label">
                ${tt(
                  "公開URL索引",
                  "Indexed source URLs"
                )}
              </span>

              <strong id="lh-urlcount">
                ${sourceQueue().length}
              </strong>
            </div>

            <div class="lh-stat">
              <span class="lh-label">
                ${tt(
                  "研究バッチ数",
                  "20-URL batches"
                )}
              </span>

              <strong id="lh-batchcount">
                ${b.length}
              </strong>
            </div>
          </div>

          <p
            class="lh-note"
            id="lh-indexstatus"
          >
            ${escapeHtml(state.sitemapStatus)}
          </p>

          <div class="lh-field">
            <label for="lh-batch">
              ${tt(
                "研究バッチ選択",
                "Research batch"
              )}
            </label>

            <select id="lh-batch">
              ${b.map((urls, i) => `
                <option value="${i}">
                  ${tt("バッチ", "Batch")}
                  ${i + 1} / ${b.length}
                  — ${urls.length} URLs
                </option>
              `).join("") ||
                '<option value="0">0 URLs</option>'}
            </select>
          </div>

          <div class="lh-actionrow">
            <button
              type="button"
              id="lh-batchopen"
              class="lh-btn lh-secondary"
            >
              ${tt(
                "選択バッチをAIで研究",
                "Research selected batch in AI"
              )}
            </button>

            <button
              type="button"
              id="lh-batchcopy"
              class="lh-btn lh-secondary"
            >
              ${tt(
                "20URL研究指示をコピー",
                "Copy 20-URL research prompt"
              )}
            </button>
          </div>

          <p class="lh-note">
            ${tt(
              "API未接続では研究指示をコピーして選択AIを開きます。全バッチの自動解析・蓄積には別途サーバー側の研究APIが必要です。",
              "Without a research API, this copies a single batch prompt and opens the selected AI. Automated processing of all batches requires a separate backend."
            )}
          </p>
        </div>
      </section>

      <section class="lh-section">
        <h3>
          ${tt("施術概算", "Tattoo Estimate")}
        </h3>

        <div class="lh-stats">

          <div class="lh-stat">
            <span class="lh-label">
              ${tt(
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
              ${tt(
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
          ${tt(
            "時間彫り15,000円／時間（税抜）の参考試算。実際の施術内容に基づいて個別見積もりします。",
            "JPY 15,000 per hour excluding tax. This estimate is illustrative; actual fees are quoted individually."
          )}
        </p>
      </section>

      <section class="lh-section">
        <h3>
          ${tt(
            "美術史・実作品",
            "Art History & Original Works"
          )}
        </h3>

        <div class="lh-history">
          ${HISTORY.map(([jp, en, url]) => `
            <a
              href="${url}"
              target="_blank"
              rel="noopener noreferrer"
            >
              ${escapeHtml(tt(jp, en))}
            </a>
          `).join("")}
        </div>
      </section>

      <section class="lh-section">
        <h3>
          ${tt("専門FAQ", "Specialist FAQ")}
        </h3>

        <div class="lh-field">
          <label for="lh-search">
            ${tt("FAQ検索", "Search questions")}
          </label>

          <input
            type="search"
            id="lh-search"
            value="${escapeHtml(state.faq)}"
            placeholder="${tt(
              "鷹・料金・ブラックワークなど",
              "hawk, pricing, blackwork..."
            )}"
          >
        </div>

        <div
          id="lh-faqs"
          style="margin-top:10px"
        ></div>

        <button
          type="button"
          class="lh-btn lh-secondary"
          id="lh-showfaq"
          style="margin-top:8px"
        >
          ${tt(
            "全30件を表示",
            "Show all 30 questions"
          )}
        </button>

        <p class="lh-note">
          <a
            href="${REPO}loyal-faq"
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
    ).forEach(el => {
      el.value = state[el.dataset.field];
    });

    const batchSelect =
      root.querySelector("#lh-batch");

    if (batchSelect) {
      batchSelect.value = String(state.batch);
    }

    updateSummary();
    renderFaq();
  }

  function updateSummary() {
    if (!root) return;

    const config =
      root.querySelector("#lh-configuration");

    if (config) {
      config.textContent = [
        state.pose,
        state.motif,
        state.style,
        state.density
      ].join(" × ");
    }

    const e = estimate();

    const hours =
      root.querySelector("#lh-hours");

    const price =
      root.querySelector("#lh-price");

    if (hours) {
      hours.textContent =
        `${e.low}〜${e.high}h`;
    }

    if (price) {
      price.textContent =
        `¥${fmt(e.min)}〜¥${fmt(e.max)}`;
    }
  }

  function status(text, failed = false) {
    const el =
      root && root.querySelector("#lh-status");

    if (!el) return;

    el.textContent = text;

    el.style.color = failed
      ? "#ffb1b1"
      : "#e7ce8b";
  }

  function renderFaq() {
    if (!root) return;

    const query = state.faq
      .trim()
      .toLocaleLowerCase();

    const filtered = FAQ.filter(row =>
      row.join(" ")
        .toLocaleLowerCase()
        .includes(query)
    );

    const visible = state.faqAll
      ? filtered
      : filtered.slice(0, 5);

    const holder =
      root.querySelector("#lh-faqs");

    if (holder) {
      holder.innerHTML = visible.map(r => `
        <details class="lh-faq">
          <summary>
            ${escapeHtml(tt(r[0], r[1]))}
          </summary>

          <p>
            ${escapeHtml(tt(r[2], r[3]))}
          </p>
        </details>
      `).join("") || `
        <p class="lh-note">
          ${tt(
            "一致する項目はありません。",
            "No matching questions."
          )}
        </p>
      `;
    }

    const button =
      root.querySelector("#lh-showfaq");

    if (button) {
      button.hidden = filtered.length <= 5;

      button.textContent = state.faqAll
        ? tt("表示を少なくする", "Show fewer")
        : tt(
            `全${filtered.length}件を表示`,
            `Show all ${filtered.length}`
          );
    }
  }

  // =====================================
  // CLIPBOARD + AI HANDOFF
  // =====================================

  async function copyText(value) {
    try {
      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {
        await navigator.clipboard.writeText(value);
        return true;
      }
    } catch (_) {}

    const area =
      document.createElement("textarea");

    area.value = value;

    area.style.cssText =
      "position:fixed;left:-9999px;top:0;";

    document.body.append(area);
    area.select();

    let ok = false;

    try {
      ok = document.execCommand("copy");
    } catch (_) {}

    area.remove();

    return ok;
  }

  function exposePrompt(prompt) {
    const text =
      root.querySelector("#lh-prompt");

    text.value = prompt;
    text.style.display = "block";

    text.focus();
    text.select();
  }

  async function handoff(prompt) {
    const destination =
      state.provider === "GPT"
        ? "https://chatgpt.com/"
        : "https://gemini.google.com/app";

    window.open(
      destination,
      "_blank",
      "noopener,noreferrer"
    );

    const ok = await copyText(prompt);

    if (!ok) {
      exposePrompt(prompt);
    }

    status(
      ok
        ? tt(
            "生成／研究指示をコピーしました。開いたAI画面に貼り付けて実行できます。",
            "Copied. Paste the prompt into the AI tab to run it."
          )
        : tt(
            "コピーが制限されました。下部に指示全文を表示しました。",
            "Clipboard access was blocked. Full prompt is shown below."
          )
    );
  }

  // =====================================
  // OPTIONAL IMAGE API EXECUTION
  // =====================================

  async function generate() {
    const prompt = buildPrompt();

    const endpoint =
      window.LOYAL_HAWK_IMAGE_ENDPOINT;

    if (!endpoint) {
      return handoff(prompt);
    }

    const button =
      root.querySelector("#lh-generate");

    const serial = ++requestId;

    button.disabled = true;

    status(
      tt(
        "画像生成APIに接続しています。",
        "Connecting to image API..."
      )
    );

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          provider: state.provider,
          prompt,
          images: chosenRefs().map(r => r.img),
          references: selectedPromptUrls(),
          spec: {
            pose: state.pose,
            motif: state.motif,
            style: state.style,
            place: state.place,
            density: state.density
          }
        })
      });

      const body = await response.json();

      if (!response.ok) {
        throw new Error(
          body.error || String(response.status)
        );
      }

      if (serial !== requestId) return;

      const url = body.imageBase64
        ? "data:image/png;base64," +
          body.imageBase64
        : body.imageUrl;

      if (
        !url ||
        !(
          url.startsWith(
            "data:image/png;base64,"
          ) ||
          url.startsWith("https://")
        )
      ) {
        throw new Error("Image data missing");
      }

      const box =
        root.querySelector("#lh-preview");

      box.textContent = "";

      const image =
        document.createElement("img");

      image.alt =
        "AI Ihori generated hawk tattoo drawing";

      image.src = url;

      box.append(image);

      status(
        tt(
          "原画の生成結果を表示しました。",
          "Artwork generated."
        )
      );

    } catch (error) {
      status(
        tt(
          "画像生成API接続エラー: ",
          "Image API error: "
        ) +
          String(error.message || error),
        true
      );

      exposePrompt(prompt);

    } finally {
      button.disabled = false;
    }
  }

  // =====================================
  // UI EVENTS
  // =====================================

  function onRootChange(event) {
    const el = event.target;

    if (el.dataset.field) {
      state[el.dataset.field] = el.value;
      updateSummary();
      return;
    }

    if (el.dataset.ref) {
      if (el.checked) {
        state.refs.add(el.dataset.ref);
      } else {
        state.refs.delete(el.dataset.ref);
      }

      render();
      return;
    }

    if (el.dataset.source) {
      state.source[el.dataset.source] =
        el.checked;

      state.batch = 0;
      render();
      return;
    }

    if (el.id === "lh-batch") {
      state.batch = Number(el.value) || 0;
    }
  }

  function onRootClick(event) {
    const button =
      event.target.closest("button");

    if (!button) return;

    if (button.id === "lh-language") {
      state.lang =
        state.lang === "ja" ? "en" : "ja";

      render();
      return;
    }

    if (button.dataset.density) {
      state.density =
        button.dataset.density;

      render();
      return;
    }

    if (button.dataset.provider) {
      state.provider =
        button.dataset.provider;

      render();
      return;
    }

    if (button.id === "lh-generate") {
      generate();
      return;
    }

    if (button.id === "lh-copy") {
      copyText(buildPrompt()).then(ok => {
        status(
          ok
            ? tt("コピーしました。", "Copied.")
            : tt(
                "コピーを許可できませんでした。",
                "Clipboard unavailable."
              ),
          !ok
        );
      });

      return;
    }

    if (button.id === "lh-detail") {
      const el =
        root.querySelector("#lh-prompt");

      el.value = buildPrompt();

      el.style.display =
        el.style.display === "block"
          ? "none"
          : "block";

      return;
    }

    if (button.id === "lh-batchcopy") {
      copyText(
        buildResearchPrompt()
      ).then(ok => {
        status(
          ok
            ? tt(
                "研究指示をコピーしました。",
                "Research prompt copied."
              )
            : tt(
                "コピーを許可できませんでした。",
                "Clipboard unavailable."
              ),
          !ok
        );
      });

      return;
    }

    if (button.id === "lh-batchopen") {
      handoff(buildResearchPrompt());
      return;
    }

    if (button.id === "lh-showfaq") {
      state.faqAll = !state.faqAll;
      renderFaq();
    }
  }

  // =====================================
  // STYLE INITIALIZATION
  // =====================================

  function ensureStyles() {
    if (
      document.getElementById(
        "lh-v51-css"
      )
    ) return;

    const node =
      document.createElement("style");

    node.id = "lh-v51-css";
    node.textContent = css;

    document.head.append(node);
  }

  // =====================================
  // ARTICLE PLACEMENT
  // =====================================

  function chooseAnchor() {
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
        if (seen.has(el)) continue;

        seen.add(el);

        if (
          el.closest(
            "#lh-app,nav,header,footer"
          )
        ) continue;

        if (
          el.textContent.trim() === "—" &&
          el.parentElement
        ) {
          const block =
            el.closest("p") || el;

          if (
            block.textContent.trim() === "—" &&
            !block.closest(
              "#lh-app,nav,header,footer"
            )
          ) {
            return block;
          }
        }
      }
    }

    return document.querySelector(
      "[data-loyal-hawk-anchor],#loyal-hawk-anchor"
    );
  }

  // =====================================
  // OFFICIAL SITEMAP DISCOVERY
  // =====================================

  async function loadSitemaps() {
    const discovered = new Set();
    const visited = new Set();

    function inHost(url) {
      try {
        const u = new URL(url, HOME);

        return (
          u.protocol === "https:" &&
          u.hostname === HOST
        )
          ? u.href
          : null;

      } catch {
        return null;
      }
    }

    async function walk(url, depth) {
      if (
        depth > 3 ||
        visited.size >= 12 ||
        visited.has(url)
      ) return;

      visited.add(url);

      const response = await fetch(url, {
        credentials: "same-origin",
        signal: AbortSignal.timeout(12000)
      });

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}`
        );
      }

      const documentXML =
        new DOMParser().parseFromString(
          await response.text(),
          "text/xml"
        );

      if (
        documentXML.querySelector(
          "parsererror"
        )
      ) {
        throw new Error(
          "XML parsing failed"
        );
      }

      const locations = Array.from(
        documentXML.getElementsByTagName(
          "loc"
        )
      )
        .map(el =>
          inHost(el.textContent.trim())
        )
        .filter(Boolean);

      if (
        documentXML.documentElement.localName ===
        "sitemapindex"
      ) {
        for (const sub of locations) {
          await walk(sub, depth + 1);
        }

      } else if (
        documentXML.documentElement.localName ===
        "urlset"
      ) {
        for (const loc of locations) {
          if (discovered.size < 50000) {
            discovered.add(loc);
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
        ...discovered
      ];

      state.sitemapStatus = tt(
        `公式サイトマップから${discovered.size}件のURLを取得しました。`,
        `Loaded ${discovered.size} URLs from the official sitemap.`
      );

    } catch (error) {
      state.sitemapStatus = tt(
        "サイトマップの取得を確認できませんでした。既知の公式資料を使用します。",
        "Sitemap unavailable. Using verified known source URLs."
      );

      console.warn(
        "[AI IHORI] Sitemap:",
        String(error)
      );
    }

    const count =
      root &&
      root.querySelector("#lh-urlcount");

    const batchCount =
      root &&
      root.querySelector("#lh-batchcount");

    if (count) {
      count.textContent =
        sourceQueue().length;
    }

    if (batchCount) {
      batchCount.textContent =
        batches().length;
    }

    const statusNode =
      root &&
      root.querySelector("#lh-indexstatus");

    if (statusNode) {
      statusNode.textContent =
        state.sitemapStatus;
    }

    const batchSelect =
      root &&
      root.querySelector("#lh-batch");

    if (batchSelect) {
      const list = batches();

      batchSelect.innerHTML =
        list.map((urls, i) => `
          <option value="${i}">
            ${tt("バッチ", "Batch")}
            ${i + 1} / ${list.length}
            — ${urls.length} URLs
          </option>
        `).join("");

      batchSelect.value =
        String(state.batch);
    }
  }

  // =====================================
  // MOUNT
  // =====================================

  function mount() {
    if (
      root &&
      root.isConnected
    ) return true;

    const anchor = chooseAnchor();

    if (
      !anchor ||
      !anchor.parentNode
    ) return false;

    ensureStyles();

    root =
      document.createElement("section");

    root.id = "lh-app";

    root.setAttribute(
      "aria-label",
      "AI Ihori Hawk Tattoo Simulator"
    );

    // Preserve free text above "—".
    // Insert immediately after the marker.

    anchor.insertAdjacentElement(
      "afterend",
      root
    );

    root.addEventListener(
      "change",
      onRootChange
    );

    root.addEventListener(
      "click",
      onRootClick
    );

    root.addEventListener(
      "input",
      event => {
        if (
          event.target.id ===
          "lh-search"
        ) {
          state.faq =
            event.target.value;

          renderFaq();
        }
      }
    );

    render();

    state.sitemapStatus = tt(
      "公式サイトマップを取得中です。",
      "Loading official sitemap..."
    );

    const statusNode =
      root.querySelector(
        "#lh-indexstatus"
      );

    if (statusNode) {
      statusNode.textContent =
        state.sitemapStatus;
    }

    loadSitemaps();

    return true;
  }

  // =====================================
  // BOOTSTRAP
  // =====================================

  if (!mount()) {
    const watcher = new MutationObserver(
      () => {
        if (mount()) {
          watcher.disconnect();
        }
      }
    );

    watcher.observe(
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
          watcher.disconnect();
        }
      },
      { once: true }
    );

    window.addEventListener(
      "load",
      () => {
        if (mount()) {
          watcher.disconnect();
        }
      },
      { once: true }
    );

    setTimeout(() => {
      watcher.disconnect();

      if (!root) {
        console.warn(
          "[AI IHORI] Placement dash (—) not found on the target article."
        );
      }
    }, 25000);
  }

  // =====================================
  // PUBLIC API
  // =====================================

  window.LOYAL_IHORI_HAWK = {
    version: "5.1",

    references: REFS,

    buildPrompt,

    buildResearchPrompt,

    getState: () => ({
      ...state,
      refs: [...state.refs],
      source: { ...state.source }
    }),

    sourceQueue
  };

})();
