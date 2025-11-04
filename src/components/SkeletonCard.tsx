const SkeletonCard = () => {
  return (
    <article className="anime-card anime-card--skeleton" aria-hidden>
      <div className="anime-card__poster" />
      <div className="anime-card__content">
        <div className="skeleton skeleton--pill" />
        <div className="skeleton skeleton--title" />
        <div className="skeleton skeleton--text" />
        <div className="skeleton skeleton--text" />
        <div className="skeleton skeleton--button" />
      </div>
    </article>
  );
};

export default SkeletonCard;
