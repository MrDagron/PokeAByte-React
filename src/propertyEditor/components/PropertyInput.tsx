import { memo } from "react";
import { getPropertyFieldValue, PropertyInputField } from "./PropertyInputField";
import { CopyValueIcon } from "./CopyValueIcon";
import { Store } from "../store/propertyStore";

export const PropertyInput = memo(
  function PropertyInput({ path }: { path: string }) {
    const handleCopyClick = () => {
      var currentPropValue = Store.getProperty(path)();
      console.log("copy value of "+ path);
      if (currentPropValue) {
        navigator.clipboard.writeText(getPropertyFieldValue(currentPropValue));
      }
    };
    return (
      <div className="property-input">
        <span className="material-icons"> catching_pokemon </span>
        <label htmlFor={"edit-" + path}>
          {path.split(".").pop()}:
        </label>
        <CopyValueIcon onClick={handleCopyClick} />
        <PropertyInputField path={path} />
      </div>
    );
  }
);