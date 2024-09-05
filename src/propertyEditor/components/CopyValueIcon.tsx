export function CopyValueIcon({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}>
      <span className="material-icons"> content_copy </span>
    </button>
  )
}