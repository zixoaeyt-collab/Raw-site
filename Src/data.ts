// Single source of truth for rarity styling.
// Used by PatternTile, AccFrames, ThumbGallery. One change, one place.

export type Rarity = "S" | "A" | "B" | "WIP";

// Rarity color maps to the desaturated semantic palette.
// Gold is reserved for the SINGLE primary accent (CTAs, section labels),
// not for badges — so the gold stays the loudest signal on the page.
export const RARITY_COLOR: Record<Rarity, string> = {
  S: "var(--color-gold-bright)",  // bright gold — top tier, but no gold-glow dominance
  A: "var(--color-info)",          // dusty cyan
  B: "var(--color-warm)",          // terracotta
  WIP: "var(--color-rare)",        // dusty rose
};

export const RARITY_LABEL: Record<Rarity, string> = {
  S: "S · RANK",
  A: "A · RANK",
  B: "B · RANK",
  WIP: "WIP",
};

export type Character = {
  id: string;
  code: string;
  name: string;
  role: string;
  faction: string;
  type: string;
  status: Rarity;
  views: string;
  ctr: string;
  year: string;
  client: string;
  bio: string;
  palette: [string, string, string];
  glyph: string;
  tags: string[];
  pattern: "grid" | "halftone" | "stripes" | "noise" | "rays" | "circuit" | "blueprint";
};

// Tile palettes use the new warm luxury gacha system: deep warm canvas
// + a single accent from the rarity semantic palette. Pre-loader, accordion,
// and gallery tiles all read as one family.
const S = "#d4a857";  // gold
const A = "#7fb8d4";  // info
const B = "#d67b5a";  // warm
const W = "#c76b7a";  // rare
const BG_WARM  = "#0e0d0b";
const BG_DEEP  = "#06060a";
const BG_CARD  = "#1a1814";
const INK_50   = "#f2efe6";

export const characters: Character[] = [
  { id: "001", code: "RO-001", name: "Hoshino Mei", role: "Lead Thumbnail Director", faction: "Studio Atlas", type: "DOCUMENTARY", status: "S", views: "48.2M", ctr: "14.6%", year: "2025", client: "NHK World", bio: "A 12-part documentary series on the disappearing craft of Japanese sign painters. Each thumbnail was a slow-burn composition — wide negative space, a single human gesture, the kind of restraint that earned the click without earning the eye-roll.", palette: [BG_WARM, S, INK_50], glyph: "M", tags: ["Cinematic", "Long-form", "Print-influenced"], pattern: "grid" },
  { id: "002", code: "RO-002", name: "Kade Vance", role: "Sr. Motion Designer", faction: "Nightshift Co.", type: "REVIEWS", status: "A", views: "12.8M", ctr: "11.2%", year: "2025", client: "Phantom Tech", bio: "Tech reviews for a generation that hates being shouted at. Geometric portraits, big-type compositions, and a single accent colour that does 90% of the work. The other 10% is silence.", palette: [BG_WARM, A, INK_50], glyph: "K", tags: ["Tech", "Geometric", "High-contrast"], pattern: "circuit" },
  { id: "003", code: "RO-003", name: "Yuna Halberg", role: "Art Director", faction: "Coldtype", type: "BRAND · EDITORIAL", status: "A", views: "6.4M", ctr: "9.8%", year: "2024", client: "Field & Forge", bio: "Magazine covers translated into motion. Editorial layouts that breathe, type that earns its weight, and a colour palette borrowed from a 1974 issue of Domus.", palette: [BG_CARD, B, INK_50], glyph: "Y", tags: ["Editorial", "Type-led", "Print-mood"], pattern: "stripes" },
  { id: "004", code: "RO-004", name: "Theo Aris", role: "Thumbnail Lead", faction: "Studio Atlas", type: "GAMING", status: "S", views: "112M", ctr: "18.4%", year: "2026", client: "Kowloon Drift", bio: "Gaming thumbnails with the noise dialled all the way down. Halftone textures, neon as punctuation rather than wallpaper, and a sense that every frame was composed with intent — not assembled in a hurry.", palette: [BG_DEEP, W, S], glyph: "T", tags: ["Gaming", "Bold", "Loud-but-quiet"], pattern: "halftone" },
  { id: "005", code: "RO-005", name: "Marisol Quinn", role: "Illustrator · Director", faction: "Slowhouse", type: "STORYTIME", status: "B", views: "23.1M", ctr: "13.1%", year: "2023", client: "Personal", bio: "An older series — storytime thumbnails that felt like Sunday-morning picture books. Hand-drawn glyphs, warm paper, and an entire visual language built around the idea that 'comfortable' is a clickable word.", palette: [BG_CARD, W, INK_50], glyph: "Q", tags: ["Storytime", "Hand-drawn", "Warm"], pattern: "noise" },
  { id: "006", code: "RO-006", name: "Ezra Nakamura", role: "Director · 3D", faction: "Vacant Studio", type: "MUSIC VIDEO", status: "WIP", views: "—", ctr: "—", year: "2026", client: "Yozo Ono", bio: "An ongoing music-video project with artist Yozo Ono. Thumbnails aren't the brief here — they're tiny music videos of their own. Always in progress. Always a little ahead of the algorithm.", palette: [BG_DEEP, A, W], glyph: "E", tags: ["Music", "3D", "Experimental"], pattern: "rays" },
];

export type Thumb = {
  id: string;
  title: string;
  client: string;
  year: string;
  type: string;
  views: string;
  rarity: Rarity;
  pattern: "grid" | "halftone" | "stripes" | "noise" | "rays" | "circuit" | "blueprint";
  palette: [string, string, string];
  shape: "tall" | "wide" | "square";
};

export const thumbs: Thumb[] = [
  { id: "t1", title: "The Last Sign Painter", client: "NHK World", year: "2025", type: "Documentary", views: "4.2M", rarity: "S", pattern: "grid", palette: [BG_WARM, S, INK_50], shape: "tall" },
  { id: "t2", title: "Phantom X Review", client: "Phantom Tech", year: "2025", type: "Review", views: "8.1M", rarity: "A", pattern: "circuit", palette: [BG_WARM, A, INK_50], shape: "wide" },
  { id: "t3", title: "Field Notes #04", client: "Field & Forge", year: "2024", type: "Editorial", views: "1.3M", rarity: "A", pattern: "stripes", palette: [BG_CARD, B, INK_50], shape: "square" },
  { id: "t4", title: "Kowloon Drift — Patch 2.4", client: "Kowloon Drift", year: "2026", type: "Gaming", views: "18.6M", rarity: "S", pattern: "halftone", palette: [BG_DEEP, W, S], shape: "tall" },
  { id: "t5", title: "Sunday Storytime #117", client: "Personal", year: "2023", type: "Storytime", views: "2.1M", rarity: "B", pattern: "noise", palette: [BG_CARD, W, INK_50], shape: "wide" },
  { id: "t6", title: "Yozo — Concrete Garden", client: "Yozo Ono", year: "2026", type: "Music", views: "—", rarity: "WIP", pattern: "rays", palette: [BG_DEEP, A, W], shape: "square" },
  { id: "t7", title: "The Slow Software", client: "Field & Forge", year: "2024", type: "Editorial", views: "0.9M", rarity: "A", pattern: "stripes", palette: [BG_CARD, S, INK_50], shape: "tall" },
  { id: "t8", title: "Anatomy of a Click", client: "Studio Atlas", year: "2025", type: "Talk", views: "0.6M", rarity: "B", pattern: "circuit", palette: [BG_WARM, S, INK_50], shape: "wide" },
  { id: "t9", title: "Margins — Issue 12", client: "Coldtype", year: "2024", type: "Magazine", views: "0.4M", rarity: "B", pattern: "grid", palette: [BG_CARD, B, INK_50], shape: "square" },
];

// ZZZ gacha marquee — two rows of alternating outlined/accent words.
// The accent is the gold, the desaturated secondaries read as
// supporting roles (not competing for attention).
export const gachaRowA = [
  { text: "THUMBNAIL", variant: "gold" },
  { text: "DIRECTION", variant: "outline" },
  { text: "MOTION", variant: "info" },
  { text: "DESIGN", variant: "outline" },
  { text: "ART", variant: "rare" },
  { text: "TYPE", variant: "outline" },
] as const;

export const gachaRowB = [
  { text: "RANK", variant: "warm" },
  { text: "UP", variant: "outline" },
  { text: "STUDIO", variant: "info" },
  { text: "ATLAS", variant: "outline" },
  { text: "RIN", variant: "gold" },
  { text: "OKABE", variant: "outline" },
] as const;

export const navWords = [
  { text: "INDEX", href: "#work", id: "00" },
  { text: "ROSTER", href: "#characters", id: "01" },
  { text: "PROCESS", href: "#process", id: "02" },
  { text: "PRESS", href: "#press", id: "03" },
  { text: "CONTACT", href: "#contact", id: "04" },
];

// Section accent by ordinal. Section 01 (Roster) gets the primary gold
// so the eye lands on the marquee of characters first — the rest are
// muted semantic colors that read as section dividers, not competing voices.
export const SECTION_ACCENT: Record<string, string> = {
  "01": "var(--color-gold)",
  "02": "var(--color-info)",
  "03": "var(--color-warm)",
  "04": "var(--color-rare)",
  "05": "var(--color-gold-bright)",
};
