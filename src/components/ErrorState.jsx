export default function ErrorState({ title = "Something went wrong", message, onRetry }) {
  return (
    <div className="error-state">
      <h3>{title}</h3>
      {message && <p className="muted">{message}</p>}
      {onRetry && (
        <button className="btn btn-ghost" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
