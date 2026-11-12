
/*
 * LOYAL TATTOO + LT MACHINES
 * AI IHORI — HAWK TATTOO DESIGN SIMULATOR
 * VERSION 5.4 — COMPLETE REPLACEMENT
 *
 * GitHub: ai-ihori-hawk-design-simulator.js
 * Target: https://www.bavariancustomirons.jp/blog/2026/11/12/100435
 * Mount: immediately below the stand-alone em dash (—) in the article.
 *
 * Browser-only implementation. No API key or extra library.
 * The copied image-generation prompt is written in Latin.
 */
(() => {
  "use strict";

  const HOST = "www.bavariancustomirons.jp";
  const PATH = "/blog/2026/11/12/100435";
  if (location.hostname !== HOST || location.pathname.replace(/\/$/, "") !== PATH) return;
  if (window.__LOYAL_HAWK_V54__) return;
  window.__LOYAL_HAWK_V54__ = true;

  const SITE = "https://" + HOST;
  const GH = "https://github.com/ltmachinesyokohama-ux/";
  const RATE = 15000;

  const BASICS = {
    pose: {ja:"鷹の姿勢・構図",en:"Hawk posture",values:[
      ["昇り鷹","Ascending hawk","accipiter ascendens"],
      ["降り鷹","Descending hawk","accipiter descendens"],
      ["急降下する鷹","Diving hawk","accipiter praeceps deorsum ruens"],
      ["止まり鷹","Perched hawk","accipiter insidens"],
      ["翼を広げた鷹","Wings spread","accipiter alis late expansis"],
      ["旋回する鷹","Circling hawk","accipiter in gyros volans"]
    ]},
    motif: {ja:"組み合わせモチーフ",en:"Supporting motif",values:[
      ["松","Pine","pinus et rami"],
      ["牡丹","Peony","paeonia et folia"],
      ["桜","Cherry blossoms","flores cerasi"],
      ["雲・風","Clouds and wind","nubes et ventus"],
      ["雪","Snow","nix cadens et spatia candida"],
      ["富士山","Mount Fuji","mons Fuji in prospectu remoto"]
    ]},
    style: {ja:"施術様式",en:"Tattoo style",values:[
      ["現代和彫","Contemporary Japanese","ars tatuandi Iaponica hodierna"],
      ["洋彫・リアリズム","Western realism","ars tatuandi occidentalis realistica"],
      ["ブラック＆グレー","Black and grey","ars atri et cinerei gradibus composita"],
      ["ブラックワーク","Blackwork","ars atramento nigro pleno composita"]
    ]},
    place: {ja:"人体施術部位",en:"Body placement",values:[
      ["背中・フルバック","Full back","dorsum integrum ab umeris usque ad nates"],
      ["背中・ハーフバック","Half back","dorsum superius a scapulis usque ad regionem paulo supra lumbos"],
      ["片腕・フルスリーブ","One-arm full sleeve","brachium unum integrum ab umero usque ad carpum"],
      ["片腕・ハーフスリーブ","One-arm half sleeve","dimidium superius brachii unius ab umero usque ad cubitum"],
      ["胸・肩","Chest and shoulder","pectus et umerus cum musculo deltoideo"]
    ]},
    density: {ja:"描写密度",en:"Detail density",values:[
      ["標準","Standard","densitas ordinaria"],
      ["高密度","High","densitas alta"],
      ["超高密度","Ultra-high","densitas summa"]
    ]}
  };

  const FINE = {
    axis:{ja:"動勢・構図方向",en:"Motion axis",values:[
      ["右上から左下","Upper right to lower left","a parte dextra superiore ad sinistram inferiorem"],
      ["左上から右下","Upper left to lower right","a parte sinistra superiore ad dextram inferiorem"],
      ["縦方向","Vertical","motus per axem verticalem"],
      ["中央放射状","Radial","compositio radiatim e centro"]
    ]},
    wings:{ja:"翼の表現",en:"Wing arrangement",values:[
      ["左右対称","Balanced","alae aequabiliter explicatae"],
      ["左右非対称・遠近感","Asymmetric perspective","alae inaequales secundum prospectum"],
      ["羽先を強調","Emphasize primaries","remiges primariae acute conspicuae"],
      ["翼を部分的に畳む","Partly folded","alae partim complicatae"]
    ]},
    gaze:{ja:"頭部・視線",en:"Head and gaze",values:[
      ["鋭い正面視線","Direct gaze","oculi in spectatorem intenti"],
      ["獲物を見下ろす","Downward gaze","oculi deorsum ad praedam intenti"],
      ["横顔を強調","Profile","caput ex latere expressum"],
      ["遠方を見据える","Distant gaze","oculi in longinqua directi"]
    ]},
    talons:{ja:"脚・鉤爪",en:"Legs and talons",values:[
      ["大きく開く","Spread talons","digiti et ungues late extensi"],
      ["獲物を捉える姿勢","Grasping","digiti ad praedam prehendendam parati"],
      ["脚を引き締める","Tucked legs","pedes sub corpore contracti"],
      ["片脚を前方へ","One leg forward","unus pes antrorsum extensus"]
    ]},
    stroke:{ja:"鉛筆探索線・輪郭",en:"Pencil and contours",values:[
      ["忠実なLoyal鉛筆画技法","Loyal pencil technique","lineae exploratoriae vividae et ductus principales fortes"],
      ["荒々しい探索線を増強","Wild exploratory lines","lineae exploratoriae asperae abundantiores"],
      ["輪郭線を強く太く","Bold contours","lineae marginales crassae et fortes"],
      ["細線主体・精密描写","Fine precise lines","lineae subtilissimae diligenter ductae"]
    ]},
    black:{ja:"漆黒面の占有率",en:"Solid-black coverage",values:[
      ["均衡型","Balanced","campi nigri aequilibrati"],
      ["高密度ブラック","Deep black","campi nigri profundi et frequentes"],
      ["大胆なブラックアウト","Dominant black masses","magnae superficies nigrae dominantes"],
      ["白場優先","White-space dominant","spatia candida late conservata"]
    ]},
    shading:{ja:"墨ぼかし・陰影",en:"Shading",values:[
      ["五階調","Five-tone gradation","quinque gradus umbrarum ab atro ad album"],
      ["柔らかい墨ぼかし","Soft wash","transitus umbrarum lenes"],
      ["硬いコントラスト","Hard contrast","contraria luminis et umbrae acuta"],
      ["ソリッド主体","Mostly solid","nigrum solidum dominans"]
    ]},
    background:{ja:"背景の描き込み",en:"Background detail",values:[
      ["控えめ","Minimal","ornamenta secundaria parcissima"],
      ["中程度","Moderate","ornamenta secundaria aequilibrata"],
      ["高密度","Dense","ornamenta secundaria densa sed clara"]
    ]},
    space:{ja:"主題周囲の余白",en:"Negative space",values:[
      ["広めに残す","Generous","spatia candida ampla circa figuram"],
      ["均衡型","Balanced","spatia candida moderate distributa"],
      ["密度優先","Compact","compositio compacta sed legibilis"]
    ]},
    feather:{ja:"羽毛ディテール",en:"Feather detail",values:[
      ["羽列・風切羽重視","Flight feathers","remiges primariae et secundariae distinctissimae"],
      ["雨覆・羽枝まで細密","Coverts and barbs","tectrices et barbulae subtiliter expressae"],
      ["大きな羽の量感","Large feather masses","plumae grandes volumine claro"],
      ["羽列と動勢の両立","Feather motion","strata plumarum et motus cohaerentes"]
    ]}
  };

  const PLACEMENT = {
    "背中・フルバック":{
      ja:"肩から背中全域、臀部までを覆う密度の高い大型構図",
      en:"Entire back and buttocks, from the shoulders downward",
      latin:"Ex umeris per dorsum universum usque ad nates extendatur; nates compositione continua includantur."
    },
    "背中・ハーフバック":{
      ja:"上背部から腰の少し上を下端とする構図",
      en:"Upper back to a point slightly above the waist",
      latin:"A scapulis usque ad terminum paulo supra lumbos extendatur."
    },
    "片腕・フルスリーブ":{
      ja:"片腕の肩から手首まで連続する細長い構図",
      en:"Continuous design from one shoulder to the wrist",
      latin:"Ad brachium unum ab umero ad carpum aptetur, compositione longa et continua."
    },
    "片腕・ハーフスリーブ":{
      ja:"片腕の肩から肘付近までを想定した上腕構図",
      en:"One upper arm, from the shoulder to the elbow",
      latin:"Ad dimidium superius unius brachii, ab umero ad cubitum, aptetur."
    },
    "胸・肩":{
      ja:"胸部から肩・三角筋の流れに対応する構図",
      en:"Chest, shoulder and deltoid-compatible composition",
      latin:"Ad pectus, umerum et musculum deltoideum compositio aptetur."
    }
  };

  const HOURS = {
    "背中・フルバック":[50,80],
    "背中・ハーフバック":[22,35],
    "片腕・フルスリーブ":[35,55],
    "片腕・ハーフスリーブ":[18,30],
    "胸・肩":[15,30]
  };

  const DENSITY_RATE = {
    "標準":1,
    "高密度":1.2,
    "超高密度":1.4
  };

  const REFS = [
    {
      id:"sketch",
      ja:"《雪中鷹》制作ラフ",
      en:"Snow Hawk — Pencil Sketch",
      roleJa:"探索線・Loyal鉛筆画技法",
      roleEn:"Exploratory lines, pencil technique",
      latin:"Studium accipitris inter nives, lineae exploratoriae",
      img:"https://baseec-img-mng.akamaized.net/images/user/blog/442982/blog/385472b7df8da7faae51e120792815ff.jpg",
      page:SITE+"/blog/2025/08/29/221644"
    },
    {
      id:"drawing",
      ja:"《雪中鷹》描き込み原画",
      en:"Snow Hawk — Detailed Drawing",
      roleJa:"羽列・主輪郭・黒ぼかし",
      roleEn:"Flight feathers, contours, shading",
      latin:"Studium accipitris inter nives, delineatio perfecta",
      img:"https://baseec-img-mng.akamaized.net/images/user/blog/442982/blog/a41deb49e2ec864b184ccde72fe049fe.jpg",
      page:SITE+"/blog/2025/08/29/221644"
    },
    {
      id:"tattoo",
      ja:"No.113《鷹図》",
      en:"No.113 — Hawk Tattoo",
      roleJa:"施術実績・黒面・身体配置",
      roleEn:"Tattoo execution and body flow",
      latin:"Opus numero CXIII, accipiter in cute",
      img:"https://baseec-img-mng.akamaized.net/images/user/blog/442982/blog/c1c657853a26020785eb7caa92644038.jpg",
      page:SITE+"/blog/2025/08/17/013900"
    },
    {
      id:"peony",
      ja:"No.116《唐獅子牡丹》",
      en:"No.116 — Karajishi and Peony",
      roleJa:"牡丹・黒葉・色彩設計",
      roleEn:"Peony, black foliage and contrast",
      latin:"Opus numero CXVI, paeonia et folia obscura",
      img:"https://baseec-img-mng.akamaized.net/images/user/blog/442982/blog/d175cf819d609bec5ae4845ce35aefa4.jpg",
      page:SITE+"/blog/2025/08/02/172030"
    }
  ];

  const SOURCES = [
    {
      id:"official",
      ja:"LOYAL TATTOO 本殿全域",
      en:"Official website",
      descJa:"公開記事・作品・技法・画像",
      descEn:"Articles, artworks and techniques",
      urls:[
        SITE+"/",
        SITE+"/sitemap.xml",
        SITE+"/blog/2025/08/29/221644",
        SITE+"/blog/2025/08/17/013900",
        SITE+"/blog/2025/08/02/172030",
        SITE+"/blog/2026/03/03/192809",
        SITE+"/blog/2025/07/10/235916",
        SITE+"/blog/2020/12/23/213527",
        SITE+"/blog/2019/12/31/214539"
      ]
    },
    {
      id:"github",
      ja:"GitHub / LOYAL OS / FAQ",
      en:"GitHub / LOYAL OS / FAQ",
      descJa:"公開研究・FAQ・制作仕様",
      descEn:"Research, FAQs and technical notes",
      urls:[
        GH+"loyal-faq",
        GH+"loyal-blog-sitemap",
        GH+"LOYAL-TATTOO-Blackwork-Tattoo",
        GH+"LOYAL-TATTOO-Western-style-tattoo-Modern-tattoo-Contemporary-tattoo",
        GH+"bavariancustomirons-data",
        GH+"A-study-on-hawk-tattoos-for-tattoo-enthusiasts"
      ]
    },
    {
      id:"research",
      ja:"Zenodo / DOI / ORCID",
      en:"Zenodo / DOI / ORCID",
      descJa:"公開研究・著者情報・一次記録",
      descEn:"Research and author records",
      urls:[
        "https://zenodo.org/records/23557266",
        "https://zenodo.org/records/23577391",
        "https://zenodo.org/records/23472661",
        "https://zenodo.org/records/23331245",
        "https://orcid.org/0009-0006-6704-1829"
      ]
    },
    {
      id:"external",
      ja:"外部公開資料の探索",
      en:"External publications",
      descJa:"第三者による公開資料の探索",
      descEn:"Search independently published references",
      urls:[]
    }
  ];

  const HISTORY = [
    [
      "《雪中鷹》制作研究",
      "Snow Hawk — Original Drawing",
      SITE+"/blog/2025/08/29/221644"
    ],
    [
      "No.113《鷹図》施術記録",
      "No.113 — Hawk Tattoo",
      SITE+"/blog/2025/08/17/013900"
    ],
    [
      "No.116《唐獅子牡丹》",
      "No.116 — Karajishi and Peony",
      SITE+"/blog/2025/08/02/172030"
    ],
    [
      "ブラックワーク作品研究",
      "Blackwork Research",
      SITE+"/blog/2026/03/03/192809"
    ],
    [
      "フルスリーブ作品集",
      "Full Sleeve Portfolio",
      SITE+"/blog/2025/07/10/235916"
    ],
    [
      "バックピース作品集",
      "Backpiece Portfolio",
      SITE+"/blog/2020/12/23/213527"
    ]
  ];

  // =========================================
  // SPECIALIST FAQ — 30 QUESTIONS
  // =========================================

  const FAQ = [
    ["鷹タトゥーの意味は？","What does a hawk tattoo symbolize?","強さ、独立、飛躍、集中力などの解釈があります。","Common interpretations include strength, independence, ascent and focus."],
    ["鷹の和彫はできますか？","Can a hawk be Japanese-style?","現代和彫の筋彫りと黒ぼかしに対応します。","Japanese-style linework and dark wash can be used."],
    ["鷹と牡丹の組み合わせは？","Can hawks be paired with peonies?","羽毛と花弁の質感を対比させます。","Hard feather shapes contrast with soft peony petals."],
    ["雪中鷹とは？","What is a snow hawk?","雪の白場と猛禽の黒面を組み合わせます。","Snow-white negative space contrasts with dark wings."],
    ["ブラックワークの鷹は？","What is a blackwork hawk?","黒面と余白を主体に構成します。","Solid black and negative space establish the silhouette."],
    ["フルバックの範囲は？","What is full-back coverage?","背中から臀部までを含む大型の施術範囲です。","Coverage extends from the shoulders through the entire back to the buttocks."],
    ["ハーフバックの範囲は？","What is half-back coverage?","上背部から腰の少し上までです。","The design ends slightly above the waist."],
    ["フルスリーブの範囲は？","What is full-sleeve coverage?","片腕の肩から手首までです。","One arm from the shoulder to the wrist."],
    ["ハーフスリーブの範囲は？","What is half-sleeve coverage?","片腕の肩から肘付近までです。","One upper arm from the shoulder to the elbow."],
    ["胸・肩にも対応できますか？","Can it fit chest and shoulder?","胸部から三角筋までを想定して設計します。","Composition is planned for the chest and deltoid."],
    ["人体は画像に出ますか？","Will a human body be shown?","完成画像は原画のみです。人体は構図設計の条件です。","Only the artwork appears. Body placement guides geometry."],
    ["画像の縦横比は？","What is the image ratio?","縦長9:16で、1枚・1カットの完成原画を指定します。","A single 9:16 portrait image is requested."],
    ["背景はどうなりますか？","What is the background?","純白背景を指定します。","Pure white (#FFFFFF) is required."],
    ["比較画像は作られますか？","Are comparisons included?","左右比較・分割構図を生成指示から除外します。","Split-screen and side-by-side comparisons are excluded."],
    ["カバーアップに対応しますか？","Can it support cover-ups?","既存図柄の黒量を想定した設計も可能です。","Existing dark areas can inform the composition."],
    ["施術料金の基準は？","What is the hourly rate?","15,000円／時間（税抜）です。","The reference hourly rate is JPY 15,000 excluding tax."],
    ["料金概算は確定ですか？","Is the estimate final?","施術内容により個別見積もりとなります。","Final pricing is quoted individually."],
    ["超高密度とは？","What is ultra-high density?","羽枝・雨覆・鉤爪などまで高密度に描きます。","Feather barbs, coverts and talons are rendered in high detail."],
    ["Loyal鉛筆画技法とは？","What is Loyal pencil drawing?","探索線、長い輪郭線、ハッチングを統合します。","Exploratory strokes, strong contours and hatching are combined."],
    ["猛禽の羽列はどう描きますか？","How are feathers structured?","初列・次列風切羽、雨覆を階層化します。","Primaries, secondaries and coverts are anatomically layered."],
    ["鉤爪を重視する理由は？","Why emphasize talons?","構造・動勢・遠近感を表現するためです。","Talons convey structure, motion and depth."],
    ["背景の余白の役割は？","Why preserve negative space?","主輪郭と黒面の可読性を維持します。","Negative space keeps the design legible."],
    ["現代和彫と洋彫の違いは？","How do Japanese and Western styles differ?","線質・構図・陰影の構築方法が異なります。","Line, composition and shading conventions differ."],
    ["既存作品の複製ですか？","Does AI copy existing artwork?","独立した新規構図を生成する指定です。","The instruction requests an independent original composition."],
    ["参考画像はAIが取得しますか？","Will AI fetch reference images?","使用するAIの閲覧機能によります。","Actual image retrieval depends on the receiving AI."],
    ["GitHub資料は含まれますか？","Are GitHub sources included?","選択に応じて公開URLを含めます。","Selected public repository URLs are included."],
    ["Zenodo資料は含まれますか？","Are Zenodo records included?","選択に応じてDOI記録を含めます。","Selected DOI records are included."],
    ["日本語と英語を切り替えられますか？","Is the interface bilingual?","画面は日英対応、コピー指示はラテン語です。","The interface is bilingual; the copied prompt is in Latin."],
    ["料金は税込ですか？","Does pricing include tax?","参考金額は税抜です。","The reference estimate excludes tax."],
    ["予約の流れは？","How does booking work?","カウンセリングと個別見積もりを経て調整します。","Consultation and a tailored estimate precede booking."]
  ];

  // =========================================
  // APPLICATION STATE
  // =========================================

  const state = {
    lang:"ja",
    pose:"翼を広げた鷹",
    motif:"雪",
    style:"ブラックワーク",
    place:"背中・フルバック",
    density:"超高密度",
    axis:"右上から左下",
    wings:"左右非対称・遠近感",
    gaze:"鋭い正面視線",
    talons:"大きく開く",
    stroke:"忠実なLoyal鉛筆画技法",
    black:"高密度ブラック",
    shading:"五階調",
    background:"中程度",
    space:"均衡型",
    feather:"雨覆・羽枝まで細密",
    refs:new Set(REFS.map(x=>x.id)),
    sources:{
      official:true,
      github:true,
      research:true,
      external:true
    },
    sitemap:[],
    sitemapStatus:"",
    batch:0,
    copied:false,
    researchCopied:false,
    faqAll:false,
    faqQuery:""
  };

  let app = null;
  let copyEpoch = 0;

  const tr = (ja,en) =>
    state.lang === "ja" ? ja : en;

  const money = n =>
    Number(n).toLocaleString("ja-JP");

  const unique = arr =>
    [...new Set(arr.filter(Boolean))];

  const escapeHTML = s =>
    String(s).replace(
      /[&<>"']/g,
      c => ({
        "&":"&amp;",
        "<":"&lt;",
        ">":"&gt;",
        '"':"&quot;",
        "'":"&#39;"
      })[c]
    );

  const chosenRefs = () =>
    REFS.filter(r=>state.refs.has(r.id));

  const latin = (group,key) =>
    group[key].values.find(
      v=>v[0]===state[key]
    )?.[2] || "";

  // =========================================
  // ESTIMATE
  // =========================================

  function estimate(){
    const [a,b]=HOURS[state.place];
    const m=DENSITY_RATE[state.density];

    const low=Math.round(a*m);
    const high=Math.round(b*m);

    return {
      low,
      high,
      min:low*RATE,
      max:high*RATE
    };
  }

  // =========================================
  // RESEARCH SOURCE INDEX
  // =========================================

  function sourceQueue(){
    return unique(
      SOURCES
        .filter(g=>state.sources[g.id])
        .flatMap(g=>[
          ...g.urls,
          ...(g.id==="official" ? state.sitemap : [])
        ])
    );
  }

  function sourceBatches(){
    const all=sourceQueue();
    const arr=[];

    for(let i=0;i<all.length;i+=20){
      arr.push(all.slice(i,i+20));
    }

    return arr;
  }

  function selectedSourceUrls(){
    const q=sourceQueue();
    const pages=chosenRefs().map(x=>x.page);

    const related=
      state.motif==="牡丹"
        ? [SITE+"/blog/2025/08/02/172030"]
        : [SITE+"/blog/2025/08/29/221644"];

    if(state.style==="ブラックワーク"){
      related.push(
        SITE+"/blog/2026/03/03/192809"
      );
    }

    return unique([
      ...pages,
      ...related.filter(
        x=>state.sources.official
      ),
      ...q
    ]).slice(0,24);
  }

  // =========================================
  // LATIN ART GENERATION PROMPT
  // =========================================

  function buildPrompt(){
    const e=estimate();

    const refLines=
      chosenRefs().flatMap(
        (r,i)=>[
          `${i+1}. ${r.latin}.`,
          `Imago: ${r.img}`,
          `Fons: ${r.page}`
        ]
      );

    return [
      "MANDATUM ARTIFICI INTELLIGENTIAE ARTIFICIALIS",

      "AI IHORI — LOYAL TATTOO",

      "Utere instrumento generandi imagines. Crea unam solam imaginem novam et originalem accipitris ad artem tatuandi destinatam. Imaginem ipsam redde, non solam descriptionem verbis.",

      "FORMA ELECTA",

      `Habitus accipitris: ${latin(BASICS,"pose")}.`,

      `Argumentum additum: ${latin(BASICS,"motif")}.`,

      `Genus artis: ${latin(BASICS,"style")}.`,

      `Locus destinatus: ${latin(BASICS,"place")}.`,

      `Densitas: ${latin(BASICS,"density")}.`,

      `Axis motus: ${latin(FINE,"axis")}.`,

      `Dispositio alarum: ${latin(FINE,"wings")}.`,

      `Caput et aspectus: ${latin(FINE,"gaze")}.`,

      `Pedes et ungues: ${latin(FINE,"talons")}.`,

      `Lineae graphicae: ${latin(FINE,"stroke")}.`,

      `Campi nigri: ${latin(FINE,"black")}.`,

      `Umbrae: ${latin(FINE,"shading")}.`,

      `Ornamenta secundaria: ${latin(FINE,"background")}.`,

      `Spatia candida: ${latin(FINE,"space")}.`,

      `Partes plumarum: ${latin(FINE,"feather")}.`,

      "RATIO LOCI DESIGNANDI",

      PLACEMENT[state.place].latin,

      "Locus corporis solum mensuras, motum et compositionem delineationis regat. Ipsum corpus humanum in imagine finali omnino absit.",

      "ANATOMIA ACCIPITRIS",

      "Forma cranii, orbitae, rostri adunci, colli, umerorum, cubitorum, articulorum carpalium, remigum primariarum et secundariarum, tectricum maiorum mediarum minorumque, caudae, tarsorum, digitorum et unguium anatomice congruat. Directio incrementi plumarum et numerus articulorum veri similes sint.",

      "ARS LINEARUM LOYAL",

      "Lineae graphio exploratoriae vividae sint; ductus principales longi, acres et fortes sint. Hachurae, gradus cinerei, campi atri profundi et spatia candida ordinem clarum efficiant. Figura etiam in magnitudine minore legibilis permaneat.",

      "FONTES IMAGINUM ELECTARUM",

      ...(
        refLines.length
          ? refLines
          : ["Nullae imagines particulares electae."]
      ),

      "FONTES INVESTIGATIONIS PUBLICAE",

      ...selectedSourceUrls(),

      ...(
        state.sources.external
          ? [
              "Quaere etiam fontes publicos externos de Ihori, LOYAL TATTOO et LT MACHINES. Fontes re vera inspectos ab inscriptionibus solum allatis distingue."
            ]
          : []
      ),

      "Fontes primarios a fontibus tertiorum distingue. Exemplar originaliter compone; imagines referentiales ad litteram ne duplices. Si fontes aperire non licet, ex his praeceptis formalibus figuram crea.",

      "AESTIMATIO AD USUM INTERIORUM",

      `Tempus aestimatum: ${e.low}–${e.high} horae. Merces demonstrativa tributis exclusis: JPY ${money(e.min)}–${money(e.max)}. Haec indicia in ipsa imagine ne appareant.`,

      "SPECIFICATIO IMAGINIS FINALIS — OBLIGATORIA",

      "Unam tantum imaginem crea, una sola compositione integra, unico campo pictorio. Proportio latitudinis ad altitudinem sit 9:16; forma verticalis. Fundus omnino albus sit, colore #FFFFFF. Solum accipitrem cum ornamentis electis depinge. Totam figuram intra fines imaginis colloca.",

      "Corpus humanum, cutis, dorsa hominum, nates photographicae, manechini, imagines corporis et exemplaria simulatae tatuationis omnino excludantur. Tabulae comparativae, diptycha, imagines divisae, imagines iuxta positae, duae versiones, duplicatio accipitris, plures tabulae et prospectus obliqui tabularum excludantur.",

      "Nulla inscriptio, nulla nota artificis, nullum pretium, nulla figura interfaciei, nullum signum aquaticum. Imago finalis sit solum delineatio artis tatuandi in campo candido. Unam imaginem completam statim genera."
    ].join("\n\n");
  }

  // =========================================
  // LATIN RESEARCH PROMPT
  // =========================================

  function buildResearchPrompt(){
    const all=sourceBatches();

    const index=Math.max(
      0,
      Math.min(state.batch,all.length-1)
    );

    const selected=all[index] || [];

    return [
      "INVESTIGATIO ARTIS LOYAL TATTOO",

      `SERIES ${index+1}/${all.length}`,

      "Hos fontes publicos singillatim inspice, si instrumenta id permittunt. Fontes inspectos et inaccessibiles clare distingue.",

      ...selected,

      "Examina originem operis, lineas graphicas, structuram anatomicam accipitris, remiges, tectrices, nigredinem, gradus umbrarum, spatia candida et aptitudinem ad cutem. Summarium Latine cum inscriptionibus fontium redde."
    ].join("\n\n");
  }

  // =========================================
  // INTERFACE STYLES
  // =========================================

  const CSS = `
#lh-app{
  box-sizing:border-box;
  width:100%;
  max-width:1040px;
  margin:26px auto 38px;
  padding:16px;
  background:#11151b;
  border:1px solid #39414d;
  border-radius:15px;
  color:#eff1f4;
  font-family:inherit;
  line-height:1.65;
  clear:both
}
#lh-app *,
#lh-app *:before,
#lh-app *:after{
  box-sizing:border-box
}
#lh-app h2,
#lh-app h3,
#lh-app p{
  margin:0
}
#lh-app a{
  color:#e6c870;
  text-decoration:underline;
  text-underline-offset:3px
}
#lh-app button,
#lh-app input,
#lh-app select{
  font-family:inherit
}
#lh-app button{
  cursor:pointer
}
#lh-app .lh-head{
  background:#1d242e;
  border:1px solid #414b57;
  border-radius:12px;
  padding:18px
}
#lh-app .lh-top{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:8px
}
#lh-app .lh-brand{
  color:#e0c16b;
  font-size:11px;
  font-weight:700;
  letter-spacing:.7px
}
#lh-app h2{
  font-size:clamp(21px,3vw,29px);
  line-height:1.4;
  color:white;
  margin:8px 0 11px
}
#lh-app h3{
  font-size:19px;
  line-height:1.4;
  font-weight:700;
  color:white;
  margin-bottom:12px
}
#lh-app .lh-note{
  font-size:12px;
  color:#b6c1cf;
  line-height:1.75
}
#lh-app .lh-section{
  padding:22px 2px;
  border-bottom:1px solid #3b4551
}
#lh-app .lh-section:last-child{
  border-bottom:0
}
#lh-app .lh-grid{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:12px
}
#lh-app .lh-field{
  display:grid;
  gap:6px;
  min-width:0
}
#lh-app .lh-label,
#lh-app label{
  font-size:12px;
  color:#d5dce6
}
#lh-app select,
#lh-app input[type=search]{
  width:100%;
  min-width:0;
  min-height:46px;
  padding:11px;
  border:1px solid #536071;
  border-radius:8px;
  background:#242d39;
  color:#fff;
  font-size:14px
}
#lh-app .lh-segments{
  display:flex;
  gap:7px
}
#lh-app .lh-chip{
  padding:10px 12px;
  min-height:41px;
  background:#27303c;
  border:1px solid #596577;
  border-radius:8px;
  color:#fff;
  font-size:12px
}
#lh-app .lh-segments .lh-chip{
  flex:1;
  min-width:0;
  padding:10px 6px
}
#lh-app .lh-chip[aria-pressed=true]{
  border-color:#d2af50;
  background:#4a3d24;
  color:#ffe5a6
}
#lh-app .lh-panel{
  padding:14px;
  background:#202833;
  border:1px solid #444d59;
  border-radius:10px
}
#lh-app .lh-toggle{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:8px;
  width:100%;
  padding:8px 0;
  background:none;
  border:0;
  text-align:left;
  color:#e9c775;
  font-weight:700;
  font-size:13px
}
#lh-app .lh-chevron{
  font-size:16px;
  flex:none
}
#lh-app .lh-stats{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:10px
}
#lh-app .lh-stat{
  padding:13px;
  background:#252f3b;
  border:1px solid #465364;
  border-radius:10px
}
#lh-app .lh-stat strong{
  display:block;
  font-size:clamp(16px,3vw,21px);
  line-height:1.5;
  color:white
}
#lh-app .lh-copy{
  padding:17px;
  background:#292d25;
  border:1px solid #b69a51;
  border-radius:12px
}
#lh-app .lh-btn{
  display:block;
  width:100%;
  min-height:49px;
  margin-top:11px;
  padding:13px 12px;
  border:1px solid #d8b34e;
  border-radius:9px;
  background:#dfbd56;
  color:#16191e;
  font-size:15px;
  font-weight:800;
  text-align:center
}
#lh-app .lh-secondary{
  min-height:43px;
  background:#2b3039;
  border-color:#897654;
  color:#f1d99c;
  font-size:12px
}
#lh-app .lh-btn:disabled{
  opacity:.65;
  cursor:progress
}
#lh-app .lh-copied{
  display:none;
  padding:12px;
  background:#1e3b2b;
  border:1px solid #76a382;
  border-radius:9px;
  margin-top:12px;
  color:#e0f1e4;
  font-size:13px
}
#lh-app .lh-copied.lh-visible{
  display:block
}
#lh-app .lh-error{
  min-height:0;
  color:#ffd0bb;
  font-size:12px;
  margin-top:6px
}
#lh-app .lh-preview-row{
  display:flex;
  align-items:center;
  gap:15px;
  margin-top:12px
}
#lh-app .lh-portrait{
  height:151px;
  width:85px;
  min-width:85px;
  background:#fff;
  border:1px solid #d4d4d4;
  border-radius:5px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  color:#555;
  text-align:center;
  font-size:10px;
  gap:7px
}
#lh-app .lh-checks{
  display:grid;
  gap:5px;
  color:#e1e8e1;
  font-size:12px
}
#lh-app .lh-checks span:before{
  content:'✓';
  color:#b9d8b5;
  margin-right:7px
}
#lh-app .lh-source{
  padding:12px;
  background:#202833;
  border:1px solid #424d5b;
  border-radius:9px;
  margin-top:8px
}
#lh-app .lh-source label{
  display:flex;
  gap:9px;
  align-items:center;
  font-size:13px;
  font-weight:700;
  color:#f1f3f6
}
#lh-app input[type=checkbox]{
  width:17px;
  height:17px;
  flex:none;
  accent-color:#d8b34e
}
#lh-app .lh-source p{
  padding-left:27px;
  margin-top:4px;
  color:#b5c2ce;
  font-size:11px
}
#lh-app .lh-refs{
  display:grid;
  grid-template-columns:repeat(4,minmax(0,1fr));
  gap:10px
}
#lh-app .lh-ref{
  min-width:0;
  padding:8px;
  background:#1e2631;
  border:1px solid #434d5b;
  border-radius:10px
}
#lh-app .lh-ref img{
  display:block;
  width:100%;
  height:150px;
  object-fit:contain;
  background:#29313c;
  border-radius:6px
}
#lh-app .lh-ref label{
  display:flex;
  gap:7px;
  align-items:flex-start;
  margin-top:8px;
  font-weight:700;
  color:white
}
#lh-app .lh-ref p{
  font-size:11px;
  color:#bcc6d1;
  margin:6px 0
}
#lh-app .lh-ref a{
  font-size:11px
}
#lh-app .lh-links{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:9px
}
#lh-app .lh-links a{
  display:block;
  padding:10px;
  background:#202833;
  border:1px solid #444e59;
  border-radius:8px;
  font-size:12px
}
#lh-app .lh-faq{
  border:1px solid #424b59;
  border-radius:9px;
  background:#202833;
  padding:10px 12px;
  margin:7px 0
}
#lh-app .lh-faq summary{
  font-size:13px;
  font-weight:700;
  cursor:pointer
}
#lh-app .lh-faq p{
  font-size:12px;
  color:#c3cdd6;
  margin-top:8px
}
#lh-app .lh-count{
  font-size:11px;
  color:#bcc6d2
}
#lh-app .lh-row{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:10px
}
#lh-app .lh-research{
  margin-top:9px
}
#lh-app :focus-visible{
  outline:2px solid #efcf7b;
  outline-offset:2px
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
  #lh-app .lh-links{
    grid-template-columns:1fr
  }
  #lh-app .lh-refs{
    grid-template-columns:repeat(2,minmax(0,1fr))
  }
  #lh-app .lh-ref img{
    height:154px
  }
  #lh-app .lh-stat{
    padding:10px
  }
  #lh-app .lh-preview-row{
    gap:11px
  }
}
`;

  // =========================================
  // UI COMPONENTS
  // =========================================

  function fieldHTML(key,info){
    return `
      <div class="lh-field">

        <label for="lh-${key}">
          ${escapeHTML(tr(info.ja,info.en))}
        </label>

        <select
          id="lh-${key}"
          data-field="${key}"
        >

          ${info.values.map(
            x=>`
              <option value="${escapeHTML(x[0])}">
                ${escapeHTML(tr(x[0],x[1]))}
              </option>
            `
          ).join("")}

        </select>

      </div>
    `;
  }

  function toggleHTML(id,ja,en){
    return `
      <button
        class="lh-toggle"
        type="button"
        data-toggle="${id}"
        aria-expanded="false"
      >
        <span>
          ${escapeHTML(tr(ja,en))}
        </span>

        <span
          class="lh-chevron"
          aria-hidden="true"
        >
          ⌄
        </span>
      </button>
    `;
  }

  // =========================================
  // MAIN INTERFACE
  // =========================================

  function render(){
    if(!app) return;

    const open=Object.fromEntries(
      ["advanced","research","archive","faq"].map(
        id=>[
          id,
          app.querySelector(
            `#lh-${id}-body`
          )?.hidden===false
        ]
      )
    );

    const e=estimate();

    app.innerHTML=`
      <div class="lh-head">

        <div class="lh-top">
          <span class="lh-brand">
            LOYAL TATTOO + LT MACHINES
          </span>

          <button
            class="lh-chip"
            type="button"
            data-lang
          >
            ${tr("English","日本語")}
          </button>
        </div>

        <h2>
          ${tr(
            "AI伊彫原画生成シミュレーター",
            "AI IHORI — Hawk Tattoo Design Simulator"
          )}
        </h2>

        <p class="lh-note">
          ${tr(
            "伊彫の造形研究、Loyal鉛筆画技法、猛禽の解剖学的構造、黒の密度、羽流れ、人体への配置を統合したタトゥー原画の生成指示を構築します。",
            "Create a hawk tattoo artwork instruction based on Ihori's visual research, the Loyal pencil technique, raptor anatomy, black density and body placement."
          )}
        </p>

      </div>

      <section class="lh-section">

        <h3>
          ${tr("構図設計","Composition")}
        </h3>

        <div class="lh-grid">

          ${["pose","motif","style","place"].map(
            key=>fieldHTML(key,BASICS[key])
          ).join("")}

        </div>

        <div
          class="lh-panel"
          style="margin-top:12px"
        >
          <span class="lh-label">
            ${tr(
              "選択した部位の構図範囲",
              "Composition coverage"
            )}
          </span>

          <p
            id="lh-coverage"
            style="color:white;font-size:13px;margin-top:4px"
          ></p>

          <p class="lh-note">
            ${tr(
              "人体は描写せず、原画の形状設計にのみ反映します。",
              "Body placement guides the artwork shape only; no human body is depicted."
            )}
          </p>
        </div>

        <p
          class="lh-label"
          style="margin-top:14px"
        >
          ${tr(
            "描写密度",
            "Detail density"
          )}
        </p>

        <div class="lh-segments">

          ${BASICS.density.values.map(
            x=>`
              <button
                type="button"
                class="lh-chip"
                data-density="${escapeHTML(x[0])}"
                aria-pressed="${state.density===x[0]}"
              >
                ${escapeHTML(tr(x[0],x[1]))}
              </button>
            `
          ).join("")}

        </div>

      </section>

      <section class="lh-section">

        ${toggleHTML(
          "advanced",
          "詳細設定：翼・眼・鉤爪・線・黒面・陰影など10項目",
          "Advanced design — 10 parameters"
        )}

        <div
          id="lh-advanced-body"
          hidden
        >
          <div
            class="lh-grid"
            style="margin:12px 0"
          >
            ${Object.entries(FINE).map(
              ([key,info])=>fieldHTML(key,info)
            ).join("")}
          </div>
        </div>

      </section>

      <section class="lh-section">

        <div class="lh-copy">

          <h3>
            ${tr(
              "原画生成の最終ステップ",
              "Final step — Artwork generation"
            )}
          </h3>

          <p
            class="lh-note"
            style="color:#e3dbca"
          >
            ${tr(
              "構図・詳細10項目・原画・研究資料を統合し生成指示プロンプトをコピーします",
              "Copy the generation prompt combining the composition, ten detailed settings, artworks and research sources."
            )}
          </p>

          <div class="lh-preview-row">

            <div class="lh-portrait">
              <span style="font-size:23px">
                ◇
              </span>

              <b>9:16</b>

              <span>ONE ARTWORK</span>
            </div>

            <div class="lh-checks">

              <strong style="font-size:13px">
                ${tr(
                  "完成画像の固定仕様",
                  "Fixed image specification"
                )}
              </strong>

              <span>
                ${tr(
                  "原画1枚・1カット",
                  "One artwork, one composition"
                )}
              </span>

              <span>
                ${tr(
                  "縦長9:16",
                  "Portrait 9:16"
                )}
              </span>

              <span>
                ${tr(
                  "完全純白背景",
                  "Pure white background"
                )}
              </span>

              <span>
                ${tr(
                  "人体・モックアップ・分割画面なし",
                  "No bodies, mockups or split panels"
                )}
              </span>

            </div>

          </div>

          <button
            type="button"
            class="lh-btn"
            id="lh-copy"
            data-copy="prompt"
          >
            ${tr(
              "プロンプトをコピー",
              "Copy prompt"
            )}
          </button>

          <p
            class="lh-note"
            style="color:#d3cbb6;margin-top:10px"
          >
            ${tr(
              "そのままお使いのAIアプリにて実行してください。生成されたプロンプトがタトゥーデザインを生成します。",
              "Use the copied instruction in your image-capable AI app to generate a tattoo design."
            )}
          </p>

          <div
            id="lh-copied"
            class="lh-copied"
            role="status"
            aria-live="polite"
          ></div>

          <div
            id="lh-error"
            class="lh-error"
            role="alert"
          ></div>

        </div>

      </section>

      <section class="lh-section">

        <h3>
          ${tr(
            "研究資料の選択",
            "Research Sources"
          )}
        </h3>

        <p class="lh-note">
          ${tr(
            "選択された公開資料URLがラテン語の生成指示に含まれます。",
            "Selected public URLs are included in the Latin instruction."
          )}
        </p>

        ${SOURCES.map(
          g=>`
            <div class="lh-source">

              <label>
                <input
                  type="checkbox"
                  data-source="${g.id}"
                  ${state.sources[g.id]?"checked":""}
                >

                <span>
                  ${escapeHTML(tr(g.ja,g.en))}
                </span>
              </label>

              <p>
                ${escapeHTML(
                  tr(g.descJa,g.descEn)
                )}
              </p>

            </div>
          `
        ).join("")}

        <div class="lh-research">

          ${toggleHTML(
            "research",
            "研究URL索引・20URLバッチの詳細",
            "Research URL index and batches"
          )}

          <div
            id="lh-research-body"
            class="lh-panel"
            hidden
          >

            <div class="lh-stats">

              <div class="lh-stat">
                <span class="lh-count">
                  ${tr(
                    "索引URL数",
                    "Indexed URLs"
                  )}
                </span>

                <strong id="lh-urlcount"></strong>
              </div>

              <div class="lh-stat">
                <span class="lh-count">
                  ${tr(
                    "研究バッチ数",
                    "Research batches"
                  )}
                </span>

                <strong id="lh-batchcount"></strong>
              </div>

            </div>

            <p
              class="lh-note"
              id="lh-sitemap"
              style="margin:10px 0"
            ></p>

            <div class="lh-field">

              <label for="lh-batch">
                ${tr(
                  "研究バッチ",
                  "Research batch"
                )}
              </label>

              <select id="lh-batch"></select>

            </div>

            <button
              class="lh-btn lh-secondary"
              type="button"
              data-copy="research"
            >
              ${tr(
                "研究指示のみをラテン語でコピー",
                "Copy Latin research instruction"
              )}
            </button>

            <div
              id="lh-research-result"
              class="lh-copied"
              role="status"
              aria-live="polite"
            ></div>

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

            <span class="lh-count">
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

            <span class="lh-count">
              ${tr(
                "参考料金（税抜）",
                "Estimate excl. tax"
              )}
            </span>

            <strong id="lh-price">
              ¥${money(e.min)}〜¥${money(e.max)}
            </strong>

          </div>

        </div>

        <p
          class="lh-note"
          style="margin-top:8px"
        >
          ${tr(
            "15,000円／時間（税抜）による参考試算。フルバックは臀部までの範囲を想定。実料金は個別見積もりです。",
            "Illustrative estimate at JPY 15,000 per hour before tax. Full-back coverage extends through the buttocks. Individual quotes apply."
          )}
        </p>

      </section>

      <section class="lh-section">

        <div class="lh-row">

          <h3>
            ${tr(
              "伊彫の参考原画",
              "Ihori Artwork References"
            )}
          </h3>

          <span
            class="lh-count"
            id="lh-refcount"
          >
            ${state.refs.size}/4
          </span>

        </div>

        <div class="lh-refs">

          ${REFS.map(
            r=>`
              <div class="lh-ref">

                <img
                  loading="lazy"
                  src="${r.img}"
                  alt="${escapeHTML(tr(r.ja,r.en))}"
                >

                <label>

                  <input
                    type="checkbox"
                    data-ref="${r.id}"
                    ${state.refs.has(r.id)?"checked":""}
                  >

                  ${escapeHTML(tr(r.ja,r.en))}

                </label>

                <p>
                  ${escapeHTML(
                    tr(r.roleJa,r.roleEn)
                  )}
                </p>

                <a
                  href="${r.page}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ${tr(
                    "公式作品",
                    "Original source"
                  )}
                </a>

              </div>
            `
          ).join("")}

        </div>

      </section>

      <section class="lh-section">

        ${toggleHTML(
          "archive",
          "美術史・公式作品資料を表示",
          "Art history and original works"
        )}

        <div
          id="lh-archive-body"
          hidden
        >
          <div
            class="lh-links"
            style="margin-top:9px"
          >

            ${HISTORY.map(
              r=>`
                <a
                  href="${r[2]}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ${escapeHTML(tr(r[0],r[1]))}
                </a>
              `
            ).join("")}

          </div>
        </div>

      </section>

      <section class="lh-section">

        ${toggleHTML(
          "faq",
          "専門FAQ（全30項目）",
          "Specialist FAQ — 30 questions"
        )}

        <div
          id="lh-faq-body"
          hidden
        >

          <div
            class="lh-field"
            style="margin:10px 0"
          >

            <label for="lh-search">
              ${tr(
                "FAQ検索",
                "Search FAQ"
              )}
            </label>

            <input
              id="lh-search"
              type="search"
              value="${escapeHTML(state.faqQuery)}"
              placeholder="${tr(
                "鷹・料金・フルバックなどを検索",
                "Search hawk, pricing, full back..."
              )}"
            >

          </div>

          <div id="lh-faqs"></div>

          <button
            type="button"
            class="lh-btn lh-secondary"
            data-faqmore
            id="lh-faqmore"
          ></button>

          <p
            class="lh-note"
            style="margin-top:11px"
          >

            <a
              href="${GH}loyal-faq"
              target="_blank"
              rel="noopener noreferrer"
            >
              LOYAL TATTOO MASTER FAQ
            </a>

          </p>

        </div>

      </section>
    `;

    app.querySelectorAll(
      "[data-field]"
    ).forEach(
      el=>{
        el.value=state[el.dataset.field];
      }
    );

    for(
      const [id,value] of
      Object.entries(open)
    ){
      setOpen(id,value);
    }

    refreshPlacement();
    refreshResearch();
    renderFAQ();

    if(state.copied){
      showCopied(false);
    }

    if(state.researchCopied){
      showCopied(true);
    }
  }

  // =========================================
  // ACCORDION CONTROL
  // =========================================

  function setOpen(id,open){
    const body=app.querySelector(
      `#lh-${id}-body`
    );

    const btn=app.querySelector(
      `[data-toggle="${id}"]`
    );

    if(!body || !btn) return;

    body.hidden=!open;

    btn.setAttribute(
      "aria-expanded",
      String(open)
    );

    const arrow=btn.querySelector(
      ".lh-chevron"
    );

    if(arrow){
      arrow.textContent=open?"⌃":"⌄";
    }
  }

  // =========================================
  // LIVE ESTIMATE AND BODY COVERAGE
  // =========================================

  function refreshPlacement(){
    const node=app.querySelector(
      "#lh-coverage"
    );

    if(node){
      node.textContent=tr(
        PLACEMENT[state.place].ja,
        PLACEMENT[state.place].en
      );
    }

    const e=estimate();

    const h=app.querySelector(
      "#lh-hours"
    );

    const p=app.querySelector(
      "#lh-price"
    );

    if(h){
      h.textContent=`${e.low}〜${e.high}h`;
    }

    if(p){
      p.textContent=
        `¥${money(e.min)}〜¥${money(e.max)}`;
    }

    app.querySelectorAll(
      "[data-density]"
    ).forEach(
      el=>el.setAttribute(
        "aria-pressed",
        String(
          el.dataset.density===state.density
        )
      )
    );
  }

  // =========================================
  // RESEARCH INDEX DISPLAY
  // =========================================

  function refreshResearch(){
    const b=sourceBatches();

    state.batch=Math.min(
      state.batch,
      Math.max(0,b.length-1)
    );

    const num=app.querySelector(
      "#lh-urlcount"
    );

    const count=app.querySelector(
      "#lh-batchcount"
    );

    const sel=app.querySelector(
      "#lh-batch"
    );

    const note=app.querySelector(
      "#lh-sitemap"
    );

    if(num){
      num.textContent=sourceQueue().length;
    }

    if(count){
      count.textContent=b.length;
    }

    if(note){
      note.textContent=
        state.sitemapStatus ||
        tr(
          "既知の公開URLを索引化しています。",
          "Known published URLs are indexed."
        );
    }

    if(sel){
      sel.innerHTML=b.map(
        (urls,i)=>`
          <option value="${i}">
            ${tr("バッチ","Batch")}
            ${i+1}/${b.length}
            — ${urls.length} URLs
          </option>
        `
      ).join("");

      sel.value=String(state.batch);
    }
  }

  // =========================================
  // FAQ DISPLAY
  // =========================================

  function renderFAQ(){
    const q=state.faqQuery
      .trim()
      .toLocaleLowerCase();

    const filtered=FAQ.filter(
      r=>r.join(" ")
        .toLocaleLowerCase()
        .includes(q)
    );

    const list=state.faqAll
      ? filtered
      : filtered.slice(0,5);

    const holder=app.querySelector(
      "#lh-faqs"
    );

    const more=app.querySelector(
      "#lh-faqmore"
    );

    if(holder){
      holder.innerHTML=
        list.map(
          r=>`
            <details class="lh-faq">

              <summary>
                ${escapeHTML(tr(r[0],r[1]))}
              </summary>

              <p>
                ${escapeHTML(tr(r[2],r[3]))}
              </p>

            </details>
          `
        ).join("") ||
        `<p class="lh-note">
          ${tr(
            "該当項目なし",
            "No matching questions"
          )}
        </p>`;
    }

    if(more){
      more.hidden=filtered.length<=5;

      more.textContent=state.faqAll
        ? tr(
            "表示を減らす",
            "Show fewer"
          )
        : tr(
            `全${filtered.length}件を表示`,
            `Show all ${filtered.length}`
          );
    }
  }

  // =========================================
  // CLIPBOARD STATE
  // =========================================

  function clearCopied(){
    copyEpoch++;

    state.copied=false;
    state.researchCopied=false;

    for(
      const id of [
        "lh-copied",
        "lh-research-result"
      ]
    ){
      const box=app.querySelector(
        "#"+id
      );

      if(box){
        box.classList.remove(
          "lh-visible"
        );

        box.textContent="";
      }
    }

    const err=app.querySelector(
      "#lh-error"
    );

    if(err){
      err.textContent="";
    }
  }

  async function copyToClipboard(value){
    try{
      if(
        navigator.clipboard &&
        window.isSecureContext
      ){
        await navigator.clipboard.writeText(
          value
        );

        return true;
      }
    }catch(_){}

    const ta=document.createElement(
      "textarea"
    );

    ta.value=value;

    ta.setAttribute(
      "readonly",
      ""
    );

    ta.style.cssText=
      "position:fixed;" +
      "top:0;" +
      "left:0;" +
      "width:1px;" +
      "height:1px;" +
      "opacity:0;" +
      "pointer-events:none";

    document.body.append(ta);

    ta.focus();
    ta.select();

    let ok=false;

    try{
      ok=document.execCommand("copy");
    }catch(_){}

    ta.remove();

    return ok;
  }

  // =========================================
  // SUCCESS MESSAGE
  // =========================================

  function showCopied(research){
    const box=app.querySelector(
      research
        ? "#lh-research-result"
        : "#lh-copied"
    );

    if(!box) return;

    box.textContent=research
      ? tr(
          "研究指示をコピーしました。お持ちのAIアプリに貼り付けて実行できます。",
          "Research instruction copied. Paste it into your AI app."
        )
      : tr(
          "コピーしました。お持ちのAIアプリにペースト・実行すると、タトゥーデザインが出力されます。",
          "Copied. Paste and run the prompt in your image-capable AI app to generate the tattoo design."
        );

    box.classList.add(
      "lh-visible"
    );
  }

  async function handleCopy(research){
    const btn=app.querySelector(
      research
        ? '[data-copy="research"]'
        : '[data-copy="prompt"]'
    );

    const token=++copyEpoch;

    if(btn){
      btn.disabled=true;
    }

    if(!research){
      state.copied=false;

      const box=app.querySelector(
        "#lh-copied"
      );

      if(box){
        box.classList.remove(
          "lh-visible"
        );
      }
    }

    const result=await copyToClipboard(
      research
        ? buildResearchPrompt()
        : buildPrompt()
    );

    if(btn){
      btn.disabled=false;
    }

    if(token!==copyEpoch) return;

    if(result){
      if(research){
        state.researchCopied=true;
      }else{
        state.copied=true;
      }

      showCopied(research);
    }else{
      const err=app.querySelector(
        "#lh-error"
      );

      if(err){
        err.textContent=tr(
          "コピーできませんでした。ブラウザーのクリップボード設定をご確認ください。",
          "Clipboard access failed; check browser permissions."
        );
      }
    }
  }

  // =========================================
  // FORM EVENTS
  // =========================================

  function handleChange(event){
    const el=event.target;

    if(!el) return;

    if(el.dataset.field){
      state[el.dataset.field]=el.value;

      clearCopied();
      refreshPlacement();
    }

    else if(el.dataset.ref){
      if(el.checked){
        state.refs.add(
          el.dataset.ref
        );
      }else{
        state.refs.delete(
          el.dataset.ref
        );
      }

      clearCopied();

      const n=app.querySelector(
        "#lh-refcount"
      );

      if(n){
        n.textContent=
          `${state.refs.size}/4`;
      }
    }

    else if(el.dataset.source){
      state.sources[el.dataset.source]=
        el.checked;

      clearCopied();

      state.batch=0;
      refreshResearch();
    }

    else if(el.id==="lh-batch"){
      state.batch=
        Number(el.value)||0;

      state.researchCopied=false;
    }
  }

  function handleClick(event){
    const btn=event.target.closest(
      "button"
    );

    if(
      !btn ||
      !app.contains(btn)
    ) return;

    if(btn.hasAttribute("data-lang")){
      state.lang=
        state.lang==="ja"?"en":"ja";

      render();
      return;
    }

    if(btn.dataset.density){
      state.density=
        btn.dataset.density;

      clearCopied();
      refreshPlacement();
      return;
    }

    if(btn.dataset.toggle){
      const id=btn.dataset.toggle;

      setOpen(
        id,
        app.querySelector(
          `#lh-${id}-body`
        ).hidden
      );

      return;
    }

    if(btn.dataset.copy){
      handleCopy(
        btn.dataset.copy==="research"
      );

      return;
    }

    if(btn.hasAttribute("data-faqmore")){
      state.faqAll=
        !state.faqAll;

      renderFAQ();
    }
  }

  // =========================================
  // ARTICLE PLACEMENT
  // =========================================

  function findAnchor(){
    const explicit=document.querySelector(
      "#loyal-hawk-anchor,[data-loyal-hawk-anchor]"
    );

    if(explicit) return explicit;

    const scopes=[
      "article",
      ".blog-detail",
      ".blog-content",
      ".entry-content",
      "main",
      "body"
    ];

    for(const scopeSelector of scopes){
      const scope=document.querySelector(
        scopeSelector
      );

      if(!scope) continue;

      for(
        const selector of [
          "p",
          "div",
          "span"
        ]
      ){
        const matches=scope.querySelectorAll(
          selector
        );

        for(const el of matches){
          if(
            el.closest(
              "#lh-app,header,footer,nav,aside"
            )
          ) continue;

          if(
            el.textContent.trim()!=="—"
          ) continue;

          if(
            selector==="div" &&
            el.querySelector("p,div")
          ) continue;

          return el.closest("p")||el;
        }
      }
    }

    return null;
  }

  // =========================================
  // SITEMAP COLLECTION
  // =========================================

  async function loadSitemap(){
    const found=new Set();
    const seen=new Set();

    async function walk(url,depth){
      if(
        depth>3 ||
        seen.has(url) ||
        seen.size>=12
      ) return;

      seen.add(url);

      const controller=new AbortController();

      const timer=setTimeout(
        ()=>controller.abort(),
        12000
      );

      let response;

      try{
        response=await fetch(
          url,
          {
            credentials:"same-origin",
            signal:controller.signal
          }
        );
      }finally{
        clearTimeout(timer);
      }

      if(!response.ok){
        throw Error(
          `HTTP ${response.status}`
        );
      }

      const xml=new DOMParser()
        .parseFromString(
          await response.text(),
          "application/xml"
        );

      if(
        xml.querySelector("parsererror")
      ){
        throw Error("Invalid XML");
      }

      const urls=[
        ...xml.getElementsByTagName("loc")
      ].map(
        el=>{
          try{
            const u=new URL(
              el.textContent.trim(),
              SITE
            );

            return (
              u.protocol==="https:" &&
              u.hostname===HOST
            )
              ? u.href
              : null;

          }catch(_){
            return null;
          }
        }
      ).filter(Boolean);

      if(
        xml.documentElement.localName===
        "sitemapindex"
      ){
        for(const child of urls){
          try{
            await walk(
              child,
              depth+1
            );
          }catch(error){
            console.warn(
              "[AI IHORI] Sitemap child:",
              error
            );
          }
        }
      }

      else if(
        xml.documentElement.localName===
        "urlset"
      ){
        for(const u of urls){
          if(found.size>=10000) break;

          found.add(u);
        }
      }
    }

    try{
      await walk(
        SITE+"/sitemap.xml",
        0
      );

      state.sitemap=[
        ...found
      ];

      state.sitemapStatus=tr(
        `公式サイトマップ：${found.size}件のURLを取得しました。`,
        `Official sitemap: ${found.size} URLs indexed.`
      );
    }

    catch(error){
      state.sitemapStatus=tr(
        "サイトマップの取得に失敗しました。既知の公開URLを利用します。",
        "Sitemap unavailable; known public URLs remain available."
      );

      console.warn(
        "[AI IHORI] Sitemap:",
        error
      );
    }

    if(
      app &&
      app.isConnected
    ){
      refreshResearch();
    }
  }

  // =========================================
  // MOUNT
  // =========================================

  function mount(){
    if(
      app &&
      app.isConnected
    ) return true;

    const point=findAnchor();

    if(!point) return false;

    if(
      !document.getElementById(
        "lh-v54-css"
      )
    ){
      const s=document.createElement(
        "style"
      );

      s.id="lh-v54-css";
      s.textContent=CSS;

      document.head.appendChild(s);
    }

    app=document.createElement(
      "section"
    );

    app.id="lh-app";

    app.setAttribute(
      "aria-label",
      "AI IHORI Hawk Tattoo Design Simulator"
    );

    point.insertAdjacentElement(
      "afterend",
      app
    );

    app.addEventListener(
      "click",
      handleClick
    );

    app.addEventListener(
      "change",
      handleChange
    );

    app.addEventListener(
      "input",
      event=>{
        if(
          event.target.id===
          "lh-search"
        ){
          state.faqQuery=
            event.target.value;

          state.faqAll=false;
          renderFAQ();
        }
      }
    );

    state.sitemapStatus=tr(
      "公式サイトマップを取得中です。",
      "Loading official sitemap."
    );

    render();
    loadSitemap();

    return true;
  }

  // =========================================
  // BOOT
  // =========================================

  if(!mount()){
    const observer=new MutationObserver(
      ()=>{
        if(mount()){
          observer.disconnect();
        }
      }
    );

    observer.observe(
      document.documentElement,
      {
        subtree:true,
        childList:true
      }
    );

    document.addEventListener(
      "DOMContentLoaded",
      ()=>{
        if(mount()){
          observer.disconnect();
        }
      },
      {once:true}
    );

    window.addEventListener(
      "load",
      ()=>{
        if(mount()){
          observer.disconnect();
        }
      },
      {once:true}
    );

    setTimeout(
      ()=>{
        observer.disconnect();

        if(!app){
          console.warn(
            "[AI IHORI] Stand-alone — marker not found."
          );
        }
      },
      25000
    );
  }

  // =========================================
  // PUBLIC INTERFACE
  // =========================================

  window.LOYAL_IHORI_HAWK={
    version:"5.4",

    buildPrompt,

    buildResearchPrompt,

    sourceQueue,

    references:REFS,

    getState:()=>({
      ...state,

      refs:[
        ...state.refs
      ],

      sources:{
        ...state.sources
      }
    })
  };

})();
