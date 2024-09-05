import { Store } from "../store/propertyStore";

export function FreezeValueButton({ isFrozen, path }: { isFrozen: boolean, path: string }) {
  const handleClick = () => {
    Store.client.freezeProperty(path, !isFrozen);
  }
  const classes = isFrozen ? "material-icons frozen" : "material-icons";
  return (
    <button type="button" onClick={handleClick}>
      <span className={classes}> ac_unit </span>
    </button>
  )
}
