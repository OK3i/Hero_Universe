import { heroes as localHeroes, type Hero } from "./data";

type JsonRecord = Record<string, unknown>;

const DEFAULT_STRAPI_URL = "http://localhost:1337";

const isRecord = (value: unknown): value is JsonRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readString = (record: JsonRecord, key: string) => {
  const value = record[key];
  return typeof value === "string" ? value : undefined;
};

const readNumber = (record: JsonRecord, key: string) => {
  const value = record[key];
  return typeof value === "number" ? value : undefined;
};

const readStringList = (record: JsonRecord, key: string) => {
  const value = record[key];

  if (Array.isArray(value)) {
    const strings = value.filter(
      (item): item is string => typeof item === "string"
    );
    return strings.length > 0 ? strings : undefined;
  }

  if (typeof value === "string") {
    const strings = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    return strings.length > 0 ? strings : undefined;
  }

  return undefined;
};

const getStrapiUrl = () =>
  (process.env.STRAPI_URL ||
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    DEFAULT_STRAPI_URL).replace(/\/$/, "");

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const getAttributes = (entry: unknown) => {
  if (!isRecord(entry)) {
    return undefined;
  }

  return isRecord(entry.attributes) ? entry.attributes : entry;
};

const normalizeMediaUrl = (url: string) => {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${getStrapiUrl()}${url}`;
};

const getMediaUrl = (value: unknown): string | undefined => {
  if (Array.isArray(value)) {
    return value.map(getMediaUrl).find(Boolean);
  }

  if (!isRecord(value)) {
    return undefined;
  }

  if (Array.isArray(value.data)) {
    return value.data.map(getMediaUrl).find(Boolean);
  }

  if (value.data) {
    return getMediaUrl(value.data);
  }

  if (isRecord(value.attributes)) {
    return getMediaUrl(value.attributes);
  }

  const url = readString(value, "url");
  return url ? normalizeMediaUrl(url) : undefined;
};

const mapStrapiHero = (entry: unknown): Hero | undefined => {
  const attributes = getAttributes(entry);

  if (!attributes) {
    return undefined;
  }

  const name = readString(attributes, "name");

  if (!name) {
    return undefined;
  }

  const slug = readString(attributes, "slug") || toSlug(name);
  const localHero =
    localHeroes.find((hero) => hero.slug === slug) ||
    localHeroes.find((hero) => hero.name.toLowerCase() === name.toLowerCase());

  return {
    slug,
    name,
    image: getMediaUrl(attributes.image) || localHero?.image || "/heroes/dicer.png",
    role: readString(attributes, "role") || localHero?.role || "Hero",
    faction: readString(attributes, "faction") || localHero?.faction || "Unknown",
    rarity: readString(attributes, "rarity") || localHero?.rarity || "Common",
    color: readString(attributes, "color") || localHero?.color || "#ff9800",
    description:
      readString(attributes, "description") ||
      localHero?.description ||
      "Герой из Strapi.",
    strengths:
      readStringList(attributes, "strengths") ||
      localHero?.strengths ||
      ["Гибкий стиль боя"],
    weaknesses:
      readStringList(attributes, "weaknesses") ||
      localHero?.weaknesses ||
      ["Требует настройки"],
    lore:
      readString(attributes, "lore") ||
      localHero?.lore ||
      "История героя редактируется в Strapi.",
    stats: {
      hp: readNumber(attributes, "hp") || localHero?.stats.hp || 600,
      mana: readNumber(attributes, "mana") || localHero?.stats.mana || 300,
      attack: readNumber(attributes, "attack") || localHero?.stats.attack || 60,
      defense:
        readNumber(attributes, "defense") || localHero?.stats.defense || 40,
      speed: readNumber(attributes, "speed") || localHero?.stats.speed || 60,
    },
    abilities:
      readStringList(attributes, "abilities") ||
      localHero?.abilities ||
      ["Basic Strike"],
  };
};

export async function getHeroes(): Promise<Hero[]> {
  const url = new URL("/api/heroes", getStrapiUrl());
  url.searchParams.set("populate", "*");
  url.searchParams.set("pagination[pageSize]", "100");

  const headers: HeadersInit = {};

  if (process.env.STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${process.env.STRAPI_API_TOKEN}`;
  }

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers,
    });

    if (!response.ok) {
      return localHeroes;
    }

    const json: unknown = await response.json();
    const data = isRecord(json) && Array.isArray(json.data) ? json.data : [];
    const heroes = data.map(mapStrapiHero).filter(Boolean) as Hero[];

    return heroes.length > 0 ? heroes : localHeroes;
  } catch {
    return localHeroes;
  }
}

export async function getHeroBySlug(slug: string) {
  const heroes = await getHeroes();
  return heroes.find((hero) => hero.slug === slug);
}
