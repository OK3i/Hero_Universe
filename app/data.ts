export type Hero = {
  slug: string;
  name: string;
  image: string;
  role: string;
  faction: string;
  rarity: string;
  color: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  lore: string;
  stats: {
    hp: number;
    mana: number;
    attack: number;
    defense: number;
    speed: number;
  };
  abilities: string[];
};

export const heroes: Hero[] = [
  {
    slug: "dicer",
    name: "Dicer",
    image: "/heroes/dicer.png",
    role: "Controller",
    faction: "Chaos Order",
    rarity: "Legendary",
    color: "#ff9800",
    description: "Манипулирует шансами и хаосом на поле боя.",
    strengths: ["Высокий урон", "Контроль", "Непредсказуемость"],
    weaknesses: ["Зависит от удачи", "Мало защиты"],
    lore:
      "Древний артефакт изменил судьбу Dicer и позволил ему управлять вероятностью.",
    stats: {
      hp: 700,
      mana: 500,
      attack: 85,
      defense: 30,
      speed: 80,
    },
    abilities: [
      "Dice Storm",
      "Lucky Roll",
      "Chaos Blast",
      "Ultimate Gamble",
    ],
  },
  {
    slug: "fhoenixa",
    name: "FhoenixA",
    image: "/heroes/fhoenixA.png",
    role: "Mage",
    faction: "Ash Kingdom",
    rarity: "Mythic",
    color: "#ff5722",
    description: "Огненная птица, перерождающаяся после смерти.",
    strengths: ["Регенерация", "AOE урон", "Огонь"],
    weaknesses: ["Слабая защита"],
    lore: "Последний феникс древнего мира.",
    stats: {
      hp: 620,
      mana: 900,
      attack: 70,
      defense: 20,
      speed: 75,
    },
    abilities: ["Fire Wings", "Ash Rain", "Rebirth", "Solar Explosion"],
  },
  {
    slug: "flamebro",
    name: "Flamebro",
    image: "/heroes/flamebro.png",
    role: "Fighter",
    faction: "Volcano Clan",
    rarity: "Epic",
    color: "#ff3d00",
    description: "Берсерк ближнего боя, усиливающийся в огне.",
    strengths: ["DPS", "Ближний бой"],
    weaknesses: ["Нет мобильности"],
    lore: "Закалил своё тело в вулканической лаве.",
    stats: {
      hp: 950,
      mana: 200,
      attack: 95,
      defense: 50,
      speed: 60,
    },
    abilities: ["Lava Punch", "Inferno Rage", "Fire Dash", "Volcanic Rage"],
  },
  {
    slug: "maron",
    name: "Maron",
    image: "/heroes/maron.png",
    role: "Shadow Mage",
    faction: "Night Cult",
    rarity: "Legendary",
    color: "#9c27b0",
    description: "Использует тьму и иллюзии.",
    strengths: ["Магия", "Иллюзии"],
    weaknesses: ["Мало HP"],
    lore: "Изгнанный маг запретных искусств.",
    stats: {
      hp: 500,
      mana: 1000,
      attack: 60,
      defense: 15,
      speed: 90,
    },
    abilities: ["Dark Mist", "Night Clone", "Shadow Portal", "Void Eclipse"],
  },
  {
    slug: "peashoote",
    name: "PeaShoote",
    image: "/heroes/peaShoote.png",
    role: "Marksman",
    faction: "Nature Core",
    rarity: "Rare",
    color: "#4caf50",
    description: "Стрелок природы с энергетическими семенами.",
    strengths: ["Дальность", "Скорость атак"],
    weaknesses: ["Слаб вблизи"],
    lore: "Создан древним лесом.",
    stats: {
      hp: 550,
      mana: 300,
      attack: 88,
      defense: 18,
      speed: 95,
    },
    abilities: ["Seed Shot", "Nature Burst", "Rapid Bloom", "Forest Cannon"],
  },
  {
    slug: "rano",
    name: "Rano",
    image: "/heroes/rano.png",
    role: "Assassin",
    faction: "Frozen North",
    rarity: "Epic",
    color: "#03a9f4",
    description: "Ледяной убийца с высокой скоростью.",
    strengths: ["Скорость", "Контроль"],
    weaknesses: ["Мало здоровья"],
    lore: "Охотник ледяных земель.",
    stats: {
      hp: 480,
      mana: 400,
      attack: 100,
      defense: 15,
      speed: 100,
    },
    abilities: ["Ice Step", "Frozen Blade", "Snow Dash", "Absolute Zero"],
  },
  {
    slug: "rino",
    name: "Rino",
    image: "/heroes/rino.png",
    role: "Tank",
    faction: "Iron Tribe",
    rarity: "Epic",
    color: "#795548",
    description: "Массивный танк с огромной защитой.",
    strengths: ["Защита", "Контроль"],
    weaknesses: ["Медленный"],
    lore: "Последний зверолюд древнего племени.",
    stats: {
      hp: 1500,
      mana: 150,
      attack: 55,
      defense: 95,
      speed: 35,
    },
    abilities: ["Earth Slam", "Stone Skin", "War Roar", "Titan Crash"],
  },
  {
    slug: "sahid",
    name: "Sahid",
    image: "/heroes/sahid.png",
    role: "Mage",
    faction: "Desert Empire",
    rarity: "Legendary",
    color: "#ffc107",
    description: "Маг песчаных бурь.",
    strengths: ["AOE", "Замедление"],
    weaknesses: ["Слаб без маны"],
    lore: "Получил силу в проклятой пустыне.",
    stats: {
      hp: 650,
      mana: 950,
      attack: 72,
      defense: 22,
      speed: 70,
    },
    abilities: ["Sand Storm", "Golden Curse", "Desert Wall", "Sun Collapse"],
  },
  {
    slug: "vospe",
    name: "Vospe",
    image: "/heroes/vospe.png",
    role: "Assassin",
    faction: "Toxic Hive",
    rarity: "Rare",
    color: "#cddc39",
    description: "Ядовитый быстрый убийца.",
    strengths: ["Яд", "Скорость"],
    weaknesses: ["Низкая защита"],
    lore: "Результат опасного алхимического эксперимента.",
    stats: {
      hp: 520,
      mana: 250,
      attack: 92,
      defense: 18,
      speed: 98,
    },
    abilities: ["Poison Sting", "Hive Rush", "Toxic Cloud", "Queen's Venom"],
  },
  {
    slug: "zero",
    name: "Zero",
    image: "/heroes/zero.png",
    role: "Void Warrior",
    faction: "Void Legion",
    rarity: "Mythic",
    color: "#673ab7",
    description: "Манипулирует временем и пространством.",
    strengths: ["Телепортация", "Контроль времени"],
    weaknesses: ["Высокие кулдауны"],
    lore: "Существо из разлома между мирами.",
    stats: {
      hp: 800,
      mana: 850,
      attack: 89,
      defense: 35,
      speed: 87,
    },
    abilities: ["Void Jump", "Time Break", "Dimensional Rift", "Reality Collapse"],
  },
];

export const getHeroPath = (hero: Hero) => `/heroes/${hero.slug}`;

export const getHeroBySlug = (slug: string) =>
  heroes.find((hero) => hero.slug === slug);

export const roles = [...new Set(heroes.map((hero) => hero.role))].sort();

export const rarities = [...new Set(heroes.map((hero) => hero.rarity))].sort();

export const factions = [...new Set(heroes.map((hero) => hero.faction))].sort();
