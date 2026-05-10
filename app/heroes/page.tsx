import Image from "next/image";
import Link from "next/link";
import { getHeroPath } from "../data";
import { getHeroes } from "../strapi";

type HeroesPageProps = {
  searchParams: Promise<{
    q?: string;
    role?: string;
    rarity?: string;
  }>;
};

const makeHeroesHref = ({
  q,
  role,
  rarity,
}: {
  q?: string;
  role?: string;
  rarity?: string;
}) => {
  const params = new URLSearchParams();

  if (q) {
    params.set("q", q);
  }

  if (role) {
    params.set("role", role);
  }

  if (rarity) {
    params.set("rarity", rarity);
  }

  const query = params.toString();
  return query ? `/heroes?${query}` : "/heroes";
};

export default async function HeroesPage({ searchParams }: HeroesPageProps) {
  const params = await searchParams;
  const heroes = await getHeroes();
  const roles = [...new Set(heroes.map((hero) => hero.role))].sort();
  const rarities = [...new Set(heroes.map((hero) => hero.rarity))].sort();
  const search = params.q?.trim() ?? "";
  const selectedRole = params.role ?? "";
  const selectedRarity = params.rarity ?? "";
  const query = search.toLowerCase();

  const filteredHeroes = heroes.filter((hero) => {
    const matchesQuery =
      !query ||
      hero.name.toLowerCase().includes(query) ||
      hero.slug.toLowerCase().includes(query) ||
      hero.role.toLowerCase().includes(query) ||
      hero.faction.toLowerCase().includes(query);
    const matchesRole = !selectedRole || hero.role === selectedRole;
    const matchesRarity = !selectedRarity || hero.rarity === selectedRarity;

    return matchesQuery && matchesRole && matchesRarity;
  });

  return (
    <main className="page">
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
        <p className="eyebrow">Поиск персонажей</p>
        <h1>HERO UNIVERSE</h1>
        <p>Введи имя героя и нажми Enter или кнопку поиска</p>

        <form className="searchPanel" action="/heroes" method="get">
          <input
            type="text"
            name="q"
            placeholder="Например: Dicer, Zero, Rano..."
            defaultValue={search}
            className="search wideSearch"
          />

          {selectedRole && (
            <input type="hidden" name="role" value={selectedRole} />
          )}

          {selectedRarity && (
            <input type="hidden" name="rarity" value={selectedRarity} />
          )}

          <div className="searchActions">
            <button className="primaryButton" type="submit">
              Найти героя
            </button>
            <Link href="/heroes" className="detailsLink resetLink">
              Сбросить
            </Link>
          </div>
        </form>

        <div className="filterPanel">
          <div className="filterGroup" aria-label="Фильтр по роли">
            <Link
              className={`filterButton ${!selectedRole ? "active" : ""}`}
              href={makeHeroesHref({
                q: search,
                rarity: selectedRarity,
              })}
            >
              Все роли
            </Link>
            {roles.map((role) => (
              <Link
                className={`filterButton ${
                  selectedRole === role ? "active" : ""
                }`}
                href={makeHeroesHref({
                  q: search,
                  role,
                  rarity: selectedRarity,
                })}
                key={role}
              >
                {role}
              </Link>
            ))}
          </div>

          <div className="filterGroup" aria-label="Фильтр по редкости">
            <Link
              className={`filterButton ${!selectedRarity ? "active" : ""}`}
              href={makeHeroesHref({
                q: search,
                role: selectedRole,
              })}
            >
              Все редкости
            </Link>
            {rarities.map((rarity) => (
              <Link
                className={`filterButton ${
                  selectedRarity === rarity ? "active" : ""
                }`}
                href={makeHeroesHref({
                  q: search,
                  role: selectedRole,
                  rarity,
                })}
                key={rarity}
              >
                {rarity}
              </Link>
            ))}
          </div>

          <p className="resultCount">Найдено: {filteredHeroes.length}</p>
        </div>
      </section>

      {filteredHeroes.length > 0 ? (
        <section className="grid" aria-label="Список героев">
          {filteredHeroes.map((hero) => (
            <article
              className="card"
              key={hero.name}
              style={{
                borderColor: hero.color,
                boxShadow: `0 0 20px ${hero.color}30`,
              }}
            >
              <div
                className="cardStripe"
                style={{
                  background: hero.color,
                }}
              />

              <Image
                src={hero.image}
                alt={hero.name}
                width={500}
                height={300}
                className="heroImage"
              />

              <div className="rarity">{hero.rarity}</div>

              <h2>{hero.name}</h2>

              <div
                className="role"
                style={{
                  color: hero.color,
                }}
              >
                {hero.role}
              </div>

              <div className="faction">{hero.faction}</div>

              <p className="description">{hero.description}</p>

              <div className="section">
                <h3>Abilities</h3>

                <div className="abilities">
                  {hero.abilities.map((ability) => (
                    <span key={ability}>{ability}</span>
                  ))}
                </div>
              </div>

              <div className="section">
                <h3>Stats</h3>

                <div className="stats">
                  <div>
                    HP
                    <div className="bar">
                      <div
                        style={{
                          width: `${hero.stats.hp / 15}%`,
                          background: hero.color,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    Mana
                    <div className="bar">
                      <div
                        style={{
                          width: `${hero.stats.mana / 10}%`,
                          background: hero.color,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    Attack
                    <div className="bar">
                      <div
                        style={{
                          width: `${hero.stats.attack}%`,
                          background: hero.color,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    Defense
                    <div className="bar">
                      <div
                        style={{
                          width: `${hero.stats.defense}%`,
                          background: hero.color,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    Speed
                    <div className="bar">
                      <div
                        style={{
                          width: `${hero.stats.speed}%`,
                          background: hero.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Link href={getHeroPath(hero)} className="detailsLink">
                Открыть героя
              </Link>
            </article>
          ))}
        </section>
      ) : (
        <section className="emptyState">
          <h2>Герои не найдены</h2>
          <p>Попробуй изменить имя или сбросить фильтры.</p>
          <Link href="/heroes" className="primaryButton">
            Сбросить
          </Link>
        </section>
      )}
    </main>
  );
}
