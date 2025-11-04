import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { clearDetail, fetchAnimeDetail, selectDetailState } from "../features/detail/detailSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

const DetailPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { item, status, error } = useAppSelector(selectDetailState);
  const isLoading = status === "loading";

  useEffect(() => {
    const numericId = Number(id);
    if (!Number.isFinite(numericId)) {
      return;
    }
    dispatch(fetchAnimeDetail(numericId));

    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  if (!id) {
    return (
      <div className="page detail-page">
        <div className="detail-page__wrapper">
          <div className="error-state" role="alert">
            <h2>Missing anime identifier</h2>
            <p>The link you followed is incomplete. Return to the search experience to try again.</p>
            <Link className="button button--primary" to="/">
              Back to search
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page detail-page">
        <div className="detail-page__wrapper">
          <div className="error-state" role="alert">
            <h2>We couldn't load that anime</h2>
            <p>{error}</p>
            <Link className="button button--primary" to="/">
              Back to search
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading || !item) {
    return (
      <div className="page detail-page">
        <div className="detail-page__banner detail-page__banner--skeleton" aria-hidden />
        <div className="detail-page__wrapper">
          <div className="detail-page__layout">
            <div className="detail-page__poster skeleton" />
            <div className="detail-page__content">
              <div className="skeleton skeleton--title" />
              <div className="skeleton skeleton--text" />
              <div className="skeleton skeleton--text" />
              <div className="detail-page__chips">
                {Array.from({ length: 4 }).map((_, index) => (
                  <span key={index} className="skeleton skeleton--chip" />
                ))}
              </div>
              <div className="skeleton skeleton--section" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const backgroundParagraphs = item.background
    ? item.background.split(/\n+/).map((segment) => segment.trim()).filter((segment) => segment.length > 0)
    : [];

  return (
    <div className="page detail-page">
      <div
        className={item.bannerImage ? "detail-page__banner" : "detail-page__banner detail-page__banner--fallback"}
        style={item.bannerImage ? { backgroundImage: `url(${item.bannerImage})` } : undefined}
        aria-hidden
      >
        <div className="detail-page__banner-overlay" />
      </div>
      <div className="detail-page__wrapper">
        <Link className="button button--ghost" to="/">
          ← Back to search
        </Link>
        <div className="detail-page__layout">
          <div
            className={item.posterImage ? "detail-page__poster" : "detail-page__poster detail-page__poster--empty"}
            style={item.posterImage ? { backgroundImage: `url(${item.posterImage})` } : undefined}
            aria-hidden
          />
          <div className="detail-page__content">
            <div className="detail-page__heading">
              <h1>{item.title}</h1>
              <div className="detail-page__subinfo">
                {item.year ? <span>{item.year}</span> : null}
                {item.episodes ? <span>{item.episodes} episodes</span> : null}
                {item.duration ? <span>{item.duration}</span> : null}
                {item.status ? <span>{item.status}</span> : null}
              </div>
            </div>
            <section>
              <h2>Synopsis</h2>
              <p>{item.synopsis}</p>
            </section>
            <section className="detail-page__stats">
              <div className="stat-card">
                <span className="stat-card__label">Score</span>
                <span className="stat-card__value">{item.score !== null ? item.score.toFixed(1) : "–"}</span>
              </div>
              <div className="stat-card">
                <span className="stat-card__label">Rating</span>
                <span className="stat-card__value">{item.rating ?? "Not rated"}</span>
              </div>
              <div className="stat-card">
                <span className="stat-card__label">Studios</span>
                <span className="stat-card__value">{item.studios.length ? item.studios.join(", ") : "Unlisted"}</span>
              </div>
            </section>
            <section className="detail-page__chips">
              {item.genres.map((genre) => (
                <span key={genre} className="chip">
                  {genre}
                </span>
              ))}
              {item.themes.map((theme) => (
                <span key={theme} className="chip chip--outline">
                  {theme}
                </span>
              ))}
            </section>
            {backgroundParagraphs.length ? (
              <section>
                <h2>Behind the scenes</h2>
                {backgroundParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </section>
            ) : null}
            {item.trailerUrl ? (
              <section className="detail-page__trailer">
                <h2>Watch the trailer</h2>
                <div className="trailer-frame">
                  <iframe
                    src={item.trailerUrl}
                    title={`${item.title} trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
