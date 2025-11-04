interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

type PageToken = number | "ellipsis";

const buildPageTokens = (current: number, total: number): PageToken[] => {
  const pageSet = new Set<number>();
  pageSet.add(1);
  pageSet.add(total);

  for (let offset = -2; offset <= 2; offset += 1) {
    const candidate = current + offset;
    if (candidate > 1 && candidate < total) {
      pageSet.add(candidate);
    }
  }

  const sorted = Array.from(pageSet).sort((a, b) => a - b);
  const tokens: PageToken[] = [];

  sorted.forEach((page, index) => {
    if (index === 0) {
      tokens.push(page);
      return;
    }

    const prev = sorted[index - 1];
    if (page - prev > 1) {
      tokens.push("ellipsis");
    }
    tokens.push(page);
  });

  return tokens;
};

const Pagination = ({ currentPage, lastPage, onPageChange }: PaginationProps) => {
  if (lastPage <= 1) {
    return null;
  }

  const tokens = buildPageTokens(currentPage, lastPage);

  const goTo = (page: number) => {
    if (page < 1 || page > lastPage || page === currentPage) {
      return;
    }
    onPageChange(page);
  };

  return (
    <nav className="pagination" aria-label="Pagination">
      <button type="button" className="pagination__nav" onClick={() => goTo(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <div className="pagination__pages">
        {tokens.map((token, index) => {
          if (token === "ellipsis") {
            return (
              <span key={`ellipsis-${index}`} className="pagination__ellipsis">
                ⋯
              </span>
            );
          }

          const isActive = token === currentPage;
          return (
            <button
              key={token}
              type="button"
              className={isActive ? "pagination__page pagination__page--active" : "pagination__page"}
              onClick={() => goTo(token)}
              aria-current={isActive ? "page" : undefined}
            >
              {token}
            </button>
          );
        })}
      </div>
      <button type="button" className="pagination__nav" onClick={() => goTo(currentPage + 1)} disabled={currentPage === lastPage}>
        Next
      </button>
    </nav>
  );
};

export default Pagination;
