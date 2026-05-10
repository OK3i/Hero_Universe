import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getHeroPath, heroes as localHeroes } from "../../data";
import { getHeroBySlug, getHeroes } from "../../strapi";

type HeroPageProps = {
  params: Promise<{
    name: string;
  }>;
};

export function generateStaticParams() {
  return localHeroes.map((hero) => ({
    name: hero.slug,
  }));
}

export async function generateMetadata({
  params,
}: HeroPageProps): Promise<Metadata> {
  const { name } = await params;
  const hero = await getHeroBySlug(name);

  if (!hero) {
    return {
      title: "Герой не найден | Hero Universe",
    };
  }

  return {
    title: `${hero.name} | Hero Universe`,
    description: hero.description,
  };
}

export default async function HeroPage({ params }: HeroPageProps) {
  const { name } = await params;
  const hero = await getHeroBySlug(name);

  if (!hero) {
    notFound();
  }

  const heroes = await getHeroes();
  const similarHeroes = heroes
    .filter(
      (candidate) =>
        candidate.slug !== hero.slug && candidate.rarity === hero.rarity
    )
    .slice(0, 3);

  return (
    <main className="page detailPage">
      <nav className="topNav" aria-label="Основная навигация">
        <Link href="/" className="brandLink">
          Hero Universe
        </Link>
        <div className="navLinks">
          <Link href="/heroes" className="navLink">
            Герои
          </Link>
          <Link href="/factions" className="navLink">
            Фракции
          </Link>
        </div>
      </nav>

      <section className="detailHero">
        <div className="detailImageWrap">
          <Image
            src={hero.image}
            alt={hero.name}
            width={760}
            height={520}
            className="detailImage"
            priority
          />
        </div>

        <div className="detailCopy">
          <p className="eyebrow">{hero.rarity}</p>
          <h1>{hero.name}</h1>
          <div className="detailMeta">
            <span style={{ color: hero.color }}>{hero.role}</span>
            <span>{hero.faction}</span>
          </div>
          <p>{hero.description}</p>
          <Link href="/heroes" className="detailsLink">
            Вернуться к поиску
          </Link>
        </div>
      </section>

      <section className="detailGrid">
        <article className="detailPanel">
          <h2>Характеристики</h2>
          <div className="stats">
            {Object.entries(hero.stats).map(([stat, value]) => (
              <div key={stat}>
                <div className="statHeader">
                  <span>{stat}</span>
                  <strong>{value}</strong>
                </div>
                <div className="bar">
                  <div
                    style={{
                      width:
                        stat === "hp"
                          ? `${value / 15}%`
                          : stat === "mana"
                            ? `${value / 10}%`
                            : `${value}%`,
                      background: hero.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="detailPanel">
          <h2>Способности</h2>
          <div className="abilities largeAbilities">
            {hero.abilities.map((ability) => (
              <span key={ability}>{ability}</span>
            ))}
          </div>
        </article>

        <article className="detailPanel">
          <h2>Сильные стороны</h2>
          <ul>
            {hero.strengths.map((strength) => (
              <li key={strength}>{strength}</li>
            ))}
          </ul>
        </article>

        <article className="detailPanel">
          <h2>Слабые стороны</h2>
          <ul>
            {hero.weaknesses.map((weakness) => (
              <li key={weakness}>{weakness}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="loreSection">
        <p className="eyebrow">История</p>
        <h2>{hero.lore}</h2>
      </section>

      {similarHeroes.length > 0 && (
        <section className="similarSection">
          <div>
            <p className="eyebrow">Похожая редкость</p>
            <h2>Ещё {hero.rarity}</h2>
          </div>
          <div className="similarGrid">
            {similarHeroes.map((similarHero) => (
              <Link
                href={getHeroPath(similarHero)}
                className="smallHeroLink"
                key={similarHero.slug}
              >
                <Image
                  src={similarHero.image}
                  alt={similarHero.name}
                  width={150}
                  height={100}
                  className="smallHeroImage"
                />
                <span>{similarHero.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
