import { memo } from "react";
import { useGameProperty } from "../hooks/useGameProperty";
import { getPropertyFieldValue, PropertyInputField } from "./PropertyInputField";
import { CopyValueIcon } from "./CopyValueIcon";

export const PropertyInput = memo(
  function PropertyInput({ path }: { path: string }) {
    var property = useGameProperty(path);
    if (!property) {
      return null;
    }
    const onCopyClick = () => {
      if (property !== null) {
        navigator.clipboard.writeText(getPropertyFieldValue(property));
      }
    }
    return (
      <div className="property-input">
        <span className="material-icons"> catching_pokemon </span>
        <label htmlFor={"edit-" + path}>
          {path.split(".").pop()}:
        </label>
        <CopyValueIcon onClick={onCopyClick} />
        <PropertyInputField property={property} />
      </div>
    );
  }
);