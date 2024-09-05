export function CopyValueIcon({ onClick }: { onClick: Function }) {
  return (
    <button type="button" onClick={() => onClick}>
      <span className="material-icons"> content_copy </span>
    </button>
  )
}