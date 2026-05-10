import Image from "next/image";
import Link from "next/link";
import { getHeroPath } from "./data";
import { getHeroes } from "./strapi";

export default async function Home() {
  const heroes = await getHeroes();
  const featuredHeroes = heroes.slice(0, 4);
  const rarityCount = new Set(heroes.map((hero) => hero.rarity)).size;
  const factionCount = new Set(heroes.map((hero) => hero.faction)).size;

  return (
    <main className="page introPage">
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

      <section className="introHero">
        <div className="introCopy">
          <p className="eyebrow">Мини-энциклопедия персонажей</p>
          <h1>Hero Universe</h1>
          <p>
            Сайт собирает героев из разных миров: их роли, фракции, редкость,
            способности, сильные и слабые стороны. Это вводная страница проекта,
            а полный список персонажей находится в каталоге.
          </p>
          <Link href="/heroes" className="primaryButton">
            Перейти к героям
          </Link>
        </div>

        <div className="heroPreview" aria-label="Популярные герои">
          {featuredHeroes.map((hero) => (
            <Link className="previewTile" href={getHeroPath(hero)} key={hero.name}>
              <Image
                src={hero.image}
                alt={hero.name}
                width={180}
                height={140}
                className="previewImage"
              />
              <div>
                <h2>{hero.name}</h2>
                <p style={{ color: hero.color }}>{hero.role}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="infoBand" aria-label="Общая информация о сайте">
        <div className="infoItem">
          <strong>{heroes.length}</strong>
          <span>героев в каталоге</span>
        </div>
        <div className="infoItem">
          <strong>{factionCount}</strong>
          <span>фракций и миров</span>
        </div>
        <div className="infoItem">
          <strong>{rarityCount}</strong>
          <span>уровня редкости</span>
        </div>
      </section>

      <section className="aboutSection">
        <div>
          <p className="eyebrow">Что есть на сайте</p>
          <h2>Кратко о проекте</h2>
        </div>

        <div className="aboutGrid">
          <article className="aboutCard">
            <h3>Карточки героев</h3>
            <p>
              У каждого персонажа есть изображение, роль, фракция, описание и
              список способностей.
            </p>
          </article>

          <article className="aboutCard">
            <h3>Характеристики</h3>
            <p>
              В карточках показаны здоровье, мана, атака, защита и скорость,
              чтобы героев было легко сравнивать.
            </p>
          </article>

          <article className="aboutCard">
            <h3>Поиск и фильтры</h3>
            <p>
              В каталоге можно найти героя по имени, роли, фракции и уровню
              редкости.
            </p>
          </article>

          <article className="aboutCard">
            <h3>Фракции</h3>
            <p>
              Отдельная страница показывает, к каким мирам относятся герои и
              кто представляет каждую сторону.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
