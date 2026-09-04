import config from "../../scribe.config";

// Locales come from scribe.config.ts so content and UI can never disagree.
export const LOCALES = config.locales as readonly string[];
export const DEFAULT_LOCALE = config.defaultLocale ?? "en";
export type Locale = (typeof LOCALES)[number];

export const LOCALE_NAMES: Record<string, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
  pt: "Português",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
};

export const isLocale = (v: unknown): v is Locale => typeof v === "string" && LOCALES.includes(v);

/** Prefix a site-relative path with the locale (default locale stays unprefixed). */
export function localePath(path: string, locale: string): string {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  if (locale === DEFAULT_LOCALE) return clean || "/";
  return `/${locale}${clean}`;
}

/** Clean a pathname: drop the `.html` the file-format build leaves on `Astro.url` and trailing slashes. */
export function cleanPath(pathname: string): string {
  return pathname.replace(/\.html$/, "").replace(/\/index$/, "").replace(/\/$/, "") || "/";
}

/** Split `/fr/blog/x` into `{ locale: "fr", path: "/blog/x" }`. */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const [, first, ...rest] = cleanPath(pathname).split("/");
  if (first && first !== DEFAULT_LOCALE && isLocale(first)) {
    const path = "/" + rest.join("/");
    return { locale: first, path: path.replace(/\/$/, "") || "/" };
  }
  return { locale: DEFAULT_LOCALE, path: pathname.replace(/\/$/, "") || "/" };
}

/** Rest-param value for `src/pages/[...locale]/…`: `undefined` keeps the default locale at the root. */
export const localeParam = (locale: string) => (locale === DEFAULT_LOCALE ? undefined : locale);

/** `getStaticPaths` for pages that exist once per locale. */
export function localeStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale: localeParam(locale) }, props: { locale } }));
}

/** Locale of the page being rendered, read from its URL (the build passes `/fr.html`-style paths, so parse it ourselves). */
export function currentLocale(astro: { url: URL }): Locale {
  return splitLocale(astro.url.pathname).locale;
}

/** hreflang map covering every locale for a shared, UI-translated page. */
export function allAlternates(path: string): Record<string, string> {
  return Object.fromEntries(LOCALES.map((l) => [l, localePath(path, l)]));
}

export const fmt = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));

const en = {
  siteDesc: "Founder of Genlook, AI virtual try-on for Shopify. Notes on building products.",
  nav: { blog: "blog", projects: "projects", contact: "contact" },
  home: {
    taglineStart: "Founder, based in France. Building ",
    taglineEnd: ", AI virtual try-on for Shopify.",
    projects: "Projects",
    writing: "Writing",
    all: "all →",
  },
  cta: {
    genlook: { label: "Genlook", title: "AI virtual try-on for Shopify", text: "Let shoppers see clothes on themselves before they buy." },
    call: { label: "1:1 call", title: "Talk with me", text: "Any subject, no agenda needed. I share what I know and help if I can." },
  },
  blog: {
    title: "Blog",
    desc: "Notes on building companies and products.",
    back: "← blog",
    minRead: "{n} min read",
    untranslated: "This post has not been translated yet. Showing the English version.",
  },
  projects: {
    title: "Projects",
    desc: "Products I started or shipped since 2019.",
    allTitle: "All projects",
    allDesc: "Products I started or shipped since 2019, including client work.",
    hide: "hide client work",
    show: "show {n} older client projects",
    live: "live",
    blogPost: "blog post",
    code: "code",
    visit: "visit",
  },
  contact: {
    title: "Contact",
    desc: "Partnerships, Genlook, or just a hello. Email is the fastest way.",
    email: "email",
    call: "1:1 call",
    callValue: "book a slot on cal.com",
  },
  notFound: { title: "Not found", text: "This page does not exist, or moved.", home: "← home" },
  footer: { poweredBy: "powered by", rss: "rss", language: "language" },
};

export type Dictionary = typeof en;

const fr: Dictionary = {
  siteDesc: "Fondateur de Genlook, essayage virtuel par IA pour Shopify. Notes sur la création de produits.",
  nav: { blog: "blog", projects: "projets", contact: "contact" },
  home: {
    taglineStart: "Fondateur, basé en France. Je construis ",
    taglineEnd: ", l'essayage virtuel par IA pour Shopify.",
    projects: "Projets",
    writing: "Écrits",
    all: "tout →",
  },
  cta: {
    genlook: { label: "Genlook", title: "Essayage virtuel par IA pour Shopify", text: "Vos clients voient les vêtements sur eux avant d'acheter." },
    call: { label: "appel 1:1", title: "Discutons", text: "N'importe quel sujet, sans agenda. Je partage ce que je sais et j'aide si je peux." },
  },
  blog: {
    title: "Blog",
    desc: "Notes sur la création d'entreprises et de produits.",
    back: "← blog",
    minRead: "{n} min de lecture",
    untranslated: "Cet article n'est pas encore traduit. Voici la version anglaise.",
  },
  projects: {
    title: "Projets",
    desc: "Produits que j'ai lancés ou livrés depuis 2019.",
    allTitle: "Tous les projets",
    allDesc: "Produits que j'ai lancés ou livrés depuis 2019, y compris pour des clients.",
    hide: "masquer les projets clients",
    show: "voir {n} anciens projets clients",
    live: "en ligne",
    blogPost: "article",
    code: "code",
    visit: "visiter",
  },
  contact: {
    title: "Contact",
    desc: "Partenariats, Genlook, ou juste un bonjour. L'email est le plus rapide.",
    email: "email",
    call: "appel 1:1",
    callValue: "réserver un créneau sur cal.com",
  },
  notFound: { title: "Page introuvable", text: "Cette page n'existe pas, ou a été déplacée.", home: "← accueil" },
  footer: { poweredBy: "propulsé par", rss: "rss", language: "langue" },
};

const es: Dictionary = {
  siteDesc: "Fundador de Genlook, probador virtual con IA para Shopify. Notas sobre crear productos.",
  nav: { blog: "blog", projects: "proyectos", contact: "contacto" },
  home: {
    taglineStart: "Fundador, con base en Francia. Construyo ",
    taglineEnd: ", probador virtual con IA para Shopify.",
    projects: "Proyectos",
    writing: "Escritos",
    all: "todo →",
  },
  cta: {
    genlook: { label: "Genlook", title: "Probador virtual con IA para Shopify", text: "Que tus clientes se vean con la ropa puesta antes de comprar." },
    call: { label: "llamada 1:1", title: "Hablemos", text: "Cualquier tema, sin agenda. Comparto lo que sé y ayudo si puedo." },
  },
  blog: {
    title: "Blog",
    desc: "Notas sobre crear empresas y productos.",
    back: "← blog",
    minRead: "{n} min de lectura",
    untranslated: "Este artículo aún no está traducido. Se muestra la versión en inglés.",
  },
  projects: {
    title: "Proyectos",
    desc: "Productos que empecé o lancé desde 2019.",
    allTitle: "Todos los proyectos",
    allDesc: "Productos que empecé o lancé desde 2019, incluido trabajo para clientes.",
    hide: "ocultar trabajo para clientes",
    show: "ver {n} proyectos antiguos para clientes",
    live: "en línea",
    blogPost: "artículo",
    code: "código",
    visit: "visitar",
  },
  contact: {
    title: "Contacto",
    desc: "Colaboraciones, Genlook o solo un saludo. El email es lo más rápido.",
    email: "email",
    call: "llamada 1:1",
    callValue: "reserva un hueco en cal.com",
  },
  notFound: { title: "No encontrada", text: "Esta página no existe o se ha movido.", home: "← inicio" },
  footer: { poweredBy: "creado con", rss: "rss", language: "idioma" },
};

const pt: Dictionary = {
  siteDesc: "Fundador da Genlook, prova virtual com IA para Shopify. Notas sobre construir produtos.",
  nav: { blog: "blog", projects: "projetos", contact: "contato" },
  home: {
    taglineStart: "Fundador, morando na França. Construindo ",
    taglineEnd: ", prova virtual com IA para Shopify.",
    projects: "Projetos",
    writing: "Textos",
    all: "tudo →",
  },
  cta: {
    genlook: { label: "Genlook", title: "Prova virtual com IA para Shopify", text: "Seus clientes veem as roupas em si mesmos antes de comprar." },
    call: { label: "conversa 1:1", title: "Fale comigo", text: "Qualquer assunto, sem pauta. Compartilho o que sei e ajudo se puder." },
  },
  blog: {
    title: "Blog",
    desc: "Notas sobre construir empresas e produtos.",
    back: "← blog",
    minRead: "{n} min de leitura",
    untranslated: "Este artigo ainda não foi traduzido. Exibindo a versão em inglês.",
  },
  projects: {
    title: "Projetos",
    desc: "Produtos que iniciei ou lancei desde 2019.",
    allTitle: "Todos os projetos",
    allDesc: "Produtos que iniciei ou lancei desde 2019, incluindo trabalhos para clientes.",
    hide: "ocultar trabalhos para clientes",
    show: "ver {n} projetos antigos para clientes",
    live: "no ar",
    blogPost: "artigo",
    code: "código",
    visit: "visitar",
  },
  contact: {
    title: "Contato",
    desc: "Parcerias, Genlook ou só um olá. E-mail é o caminho mais rápido.",
    email: "e-mail",
    call: "conversa 1:1",
    callValue: "reserve um horário no cal.com",
  },
  notFound: { title: "Não encontrada", text: "Esta página não existe ou foi movida.", home: "← início" },
  footer: { poweredBy: "feito com", rss: "rss", language: "idioma" },
};

const zhCN: Dictionary = {
  siteDesc: "Genlook 创始人，为 Shopify 提供 AI 虚拟试穿。关于打造产品的笔记。",
  nav: { blog: "博客", projects: "项目", contact: "联系" },
  home: {
    taglineStart: "创始人，常驻法国。正在打造 ",
    taglineEnd: "，为 Shopify 提供 AI 虚拟试穿。",
    projects: "项目",
    writing: "文章",
    all: "全部 →",
  },
  cta: {
    genlook: { label: "Genlook", title: "为 Shopify 提供 AI 虚拟试穿", text: "让顾客在购买前看到衣服穿在自己身上的效果。" },
    call: { label: "1:1 通话", title: "和我聊聊", text: "任何话题，无需议程。我分享所知，力所能及地提供帮助。" },
  },
  blog: {
    title: "博客",
    desc: "关于创业与打造产品的笔记。",
    back: "← 博客",
    minRead: "{n} 分钟阅读",
    untranslated: "这篇文章尚未翻译，以下为英文版本。",
  },
  projects: {
    title: "项目",
    desc: "2019 年以来我创办或发布的产品。",
    allTitle: "全部项目",
    allDesc: "2019 年以来我创办或发布的产品，包括客户项目。",
    hide: "隐藏客户项目",
    show: "查看 {n} 个更早的客户项目",
    live: "运行中",
    blogPost: "博客文章",
    code: "代码",
    visit: "访问",
  },
  contact: {
    title: "联系",
    desc: "合作、Genlook，或只是打个招呼。邮件最快。",
    email: "邮箱",
    call: "1:1 通话",
    callValue: "在 cal.com 预约时间",
  },
  notFound: { title: "页面不存在", text: "该页面不存在或已移动。", home: "← 首页" },
  footer: { poweredBy: "技术支持：", rss: "rss", language: "语言" },
};

const zhTW: Dictionary = {
  siteDesc: "Genlook 創辦人，為 Shopify 提供 AI 虛擬試穿。關於打造產品的筆記。",
  nav: { blog: "部落格", projects: "專案", contact: "聯絡" },
  home: {
    taglineStart: "創辦人，常駐法國。正在打造 ",
    taglineEnd: "，為 Shopify 提供 AI 虛擬試穿。",
    projects: "專案",
    writing: "文章",
    all: "全部 →",
  },
  cta: {
    genlook: { label: "Genlook", title: "為 Shopify 提供 AI 虛擬試穿", text: "讓顧客在購買前看到衣服穿在自己身上的樣子。" },
    call: { label: "1:1 通話", title: "和我聊聊", text: "任何話題，不需議程。我分享所知，盡力提供協助。" },
  },
  blog: {
    title: "部落格",
    desc: "關於創業與打造產品的筆記。",
    back: "← 部落格",
    minRead: "{n} 分鐘閱讀",
    untranslated: "這篇文章尚未翻譯，以下為英文版本。",
  },
  projects: {
    title: "專案",
    desc: "2019 年以來我創辦或推出的產品。",
    allTitle: "全部專案",
    allDesc: "2019 年以來我創辦或推出的產品，包括客戶專案。",
    hide: "隱藏客戶專案",
    show: "查看 {n} 個更早的客戶專案",
    live: "運行中",
    blogPost: "部落格文章",
    code: "程式碼",
    visit: "前往",
  },
  contact: {
    title: "聯絡",
    desc: "合作、Genlook，或只是打個招呼。Email 最快。",
    email: "email",
    call: "1:1 通話",
    callValue: "在 cal.com 預約時段",
  },
  notFound: { title: "找不到頁面", text: "此頁面不存在或已移動。", home: "← 首頁" },
  footer: { poweredBy: "技術支援：", rss: "rss", language: "語言" },
};

const dictionaries: Record<string, Dictionary> = { en, fr, es, pt, "zh-CN": zhCN, "zh-TW": zhTW };

/** UI strings for a locale (falls back to the default locale's dictionary). */
export const t = (locale: string): Dictionary => dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
