import Image from "next/image";
import Link from "next/link";
import { getHeroPath, type Hero } from "../data";
import { getHeroes } from "../strapi";

const getFactionGroups = (heroes: Hero[]) =>
  [...new Set(heroes.map((hero) => hero.faction))].map((faction) => {
    const members = heroes.filter((hero) => hero.faction === faction);
    const leadHero = members[0];

    return {
      name: faction,
      color: leadHero.color,
      leadHero,
      members,
    };
  });

export default async function FactionsPage() {
  const heroes = await getHeroes();
  const factionGroups = getFactionGroups(heroes);

  return (
    <main className="page factionsPage">
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

      <section className="heroBanner compactBanner">
        <p className="eyebrow">Миры и союзы</p>
        <h1>Фракции</h1>
        <p>Каждый герой связан со своим миром, стилем боя и источником силы</p>
      </section>

      <section className="factionGrid" aria-label="Список фракций">
        {factionGroups.map((faction) => (
          <article
            className="factionCard"
            key={faction.name}
            style={{ borderColor: faction.color }}
          >
            <div
              className="cardStripe"
              style={{
                background: faction.color,
              }}
            />

            <Image
              src={faction.leadHero.image}
              alt={faction.leadHero.name}
              width={420}
              height={240}
              className="factionImage"
            />

            <div className="factionContent">
              <p className="eyebrow">{faction.leadHero.rarity}</p>
              <h2>{faction.name}</h2>
              <p>{faction.leadHero.description}</p>

              <div className="factionRoster">
                {faction.members.map((member) => (
                  <Link href={getHeroPath(member)} key={member.slug}>
                    {member.name}
                  </Link>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
