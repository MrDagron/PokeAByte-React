import React, { memo } from "react";
import { getPropertyFieldValue, PropertyInputField } from "./PropertyInputField";
import { CopyValueIcon } from "./CopyValueIcon";
import { Store } from "../store/propertyStore";
import classNames from "classnames";
import { PropertyInfoTable } from "./PropertyInfoTable";

export const PropertyInput = memo(
  function PropertyInput({ path }: { path: string }) {
    const [tableOpen, setTableOpen] = React.useState(false);
    const iconClassNames = classNames("material-icons", { "info": tableOpen });

    const handleCopyClick = () => {
      var currentPropValue = Store.getProperty(path)();
      console.log("copy value of " + path);
      if (currentPropValue) {
        navigator.clipboard.writeText(getPropertyFieldValue(currentPropValue));
      }
    };

    return (
      <div className="property-input">
        <span onClick={() => setTableOpen(!tableOpen)}>
          <span className={iconClassNames}> catching_pokemon </span>
          <label htmlFor={"edit-" + path}>
            {path.split(".").pop()}:
          </label>
        </span>
        <CopyValueIcon onClick={handleCopyClick} />
        <PropertyInputField path={path} />
        {tableOpen &&
          <div>
            <PropertyInfoTable path={path} />
          </div>
        }
      </div>
    );
  }
);

