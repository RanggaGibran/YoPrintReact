import { Link } from "react-router-dom";
import type { AnimeListItem } from "../types/anime";

interface AnimeCardProps {
  item: AnimeListItem;
}

const formatSynopsis = (text: string) => {
  const trimmed = text.trim();
  if (trimmed.length <= 160) {
    return trimmed;
  }
  return `${trimmed.slice(0, 157)}...`;
};

const AnimeCard = ({ item }: AnimeCardProps) => {
  const synopsis = formatSynopsis(item.synopsis);

  return (
    <article className="anime-card">
      <div
        className={item.posterImage ? "anime-card__poster" : "anime-card__poster anime-card__poster--empty"}
        style={item.posterImage ? { backgroundImage: `url(${item.posterImage})` } : undefined}
        aria-hidden
      />
      <div className="anime-card__content">
        <div className="anime-card__meta-group">
          {item.year ? <span className="anime-card__pill">{item.year}</span> : null}
          {item.score !== null ? <span className="anime-card__pill">⭐ {item.score.toFixed(1)}</span> : <span className="anime-card__pill">New</span>}
          {item.episodes ? <span className="anime-card__pill">{item.episodes} eps</span> : null}
        </div>
        <h3>{item.title}</h3>
        <p>{synopsis}</p>
        <Link className="anime-card__cta" to={`/anime/${item.id}`}>
          Explore detail
        </Link>
      </div>
    </article>
  );
};

export default AnimeCard;
