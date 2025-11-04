import { useEffect, useMemo, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import AnimeCard from "../components/AnimeCard";
import EmptyState from "../components/EmptyState";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import SkeletonCard from "../components/SkeletonCard";
import { clearResults, fetchAnimeSearch, hydrateSearchState, selectSearchState, setPage, setQuery } from "../features/search/searchSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import useDebounce from "../hooks/useDebounce";

const SearchPage = () => {
  const dispatch = useAppDispatch();
  const { query, page, status, items, pagination, error } = useAppSelector(selectSearchState);
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();
  const debouncedQuery = useDebounce(query, 250);
  const isFirstSync = useRef(false);
  const lastHydrated = useRef<{ query: string; page: number } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paramQuery = params.get("q") ?? "";
    const pageParamRaw = params.get("page") ?? "1";
    const parsedPage = Number(pageParamRaw);
    const safePage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

    if (!isFirstSync.current) {
      dispatch(hydrateSearchState({ query: paramQuery, page: safePage }));
      if (!paramQuery.trim()) {
        dispatch(clearResults());
      }
      isFirstSync.current = true;
      lastHydrated.current = { query: paramQuery, page: safePage };
      return;
    }

    const previous = lastHydrated.current;
    if (!previous || previous.query !== paramQuery || previous.page !== safePage) {
      dispatch(hydrateSearchState({ query: paramQuery, page: safePage }));
      if (!paramQuery.trim()) {
        dispatch(clearResults());
      }
      lastHydrated.current = { query: paramQuery, page: safePage };
    }
  }, [dispatch, location.search]);

  useEffect(() => {
    if (!isFirstSync.current) {
      return;
    }

    if (!debouncedQuery.trim()) {
      if (!query.trim()) {
        dispatch(clearResults());
        setSearchParams({}, { replace: true });
      }
      return;
    }

    dispatch(fetchAnimeSearch({ query: debouncedQuery, page }));

    const params = new URLSearchParams();
    params.set("q", debouncedQuery);
    if (page > 1) {
      params.set("page", String(page));
    }
    setSearchParams(params, { replace: true });
  }, [debouncedQuery, dispatch, page, query, setSearchParams]);

  const totalItems = pagination?.totalItems ?? null;
  const currentPage = pagination?.currentPage ?? page;
  const lastPage = pagination?.lastPage ?? 1;
  const isLoading = status === "loading";

  const content = useMemo(() => {
    if (items.length === 0) {
      if (isLoading) {
        return (
          <div className="anime-grid" aria-live="polite">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={`skeleton-${index}`} />
            ))}
          </div>
        );
      }

      if (error) {
        return (
          <div className="error-state" role="alert">
            <h2>We hit a snag</h2>
            <p>{error}</p>
          </div>
        );
      }

      return <EmptyState query={query} />;
    }

    return (
      <div className="anime-grid" aria-live="polite">
        {items.map((item) => (
          <AnimeCard key={item.id} item={item} />
        ))}
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={`skeleton-inline-${index}`} />)
          : null}
      </div>
    );
  }, [error, isLoading, items, query]);

  return (
    <div className="page search-page">
      <header className="search-page__hero">
        <div className="search-page__copy">
          <span className="search-page__eyebrow">YoPrintAnime</span>
          <h1>Instant anime discovery crafted for enthusiasts.</h1>
          <p>
            Dive into a curated universe of anime titles, live-filtered as you type. Navigate details, trailers, and stats without losing your flow.
          </p>
        </div>
        <SearchBar value={query} onChange={(value) => dispatch(setQuery(value))} isLoading={isLoading} totalItems={totalItems} />
      </header>
      <main className="search-page__content">
        {error && items.length > 0 ? (
          <div className="error-banner" role="alert">
            <span>We couldn't refresh the latest data. Showing your last results.</span>
          </div>
        ) : null}
        {content}
        {items.length > 0 && pagination ? (
          <Pagination currentPage={currentPage} lastPage={lastPage} onPageChange={(nextPage) => dispatch(setPage(nextPage))} />
        ) : null}
      </main>
    </div>
  );
};

export default SearchPage;
