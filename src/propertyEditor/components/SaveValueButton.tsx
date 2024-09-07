import { memo } from "react";

export const SaveValueButton = memo(
  function SaveValueButton({ active, onClick }: { value: string, active: boolean, onClick: Function }) {
    const classes = active ? "material-icons" : "material-icons inactive";
    return (
      <button type="button" onClick={() => active && onClick()}>
        <span className={classes}>
          save
        </span>
      </button>
    )
  }
);
