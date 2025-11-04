interface EmptyStateProps {
  query: string;
}

const EmptyState = ({ query }: EmptyStateProps) => {
  if (!query.trim()) {
    return (
      <div className="empty-state">
        <h2>Search the multiverse of anime</h2>
        <p>Type a title above to discover recommendations crafted for your vibe.</p>
      </div>
    );
  }

  return (
    <div className="empty-state">
      <h2>No matches yet</h2>
      <p>We couldn't find results for "{query}". Try exploring a different keyword.</p>
    </div>
  );
};

export default EmptyState;
