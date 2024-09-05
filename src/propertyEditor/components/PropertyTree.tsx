import React, { memo } from "react";
import { Store } from "../store/propertyStore";
import { PropertyInput } from "./PropertyInput";
import { unique } from "../utils/unique";

export const PropertyTree = memo(
  function PropertyTree({ path, level = 1 }: { path: string, level?: number }) {
    let properties = Store.getAllProperties();
    const [isOpen, setIsOpen] = React.useState(false);
    if (properties[path]) {
      return <PropertyInput path={path} />
    }
    let immediateChildren = Object.keys(properties)
      .filter(x => x.startsWith(path + "."))
      .map(x => x.split(".")[level])
      .filter(unique);

    return (
      <div className="property-group">
        <details onToggle={(e) => setIsOpen(e.currentTarget.open)}>
          <summary>
            <div>
              <span className="material-icons">
                {isOpen ? "folder_open" : "folder"}
              </span>
              &nbsp;
              {path}
            </div>
            <div>
              {immediateChildren.length} Entries
            </div>
          </summary>
          <div>
            {isOpen && immediateChildren.map(x => {
              const childPath = path + "." + x;
              return <PropertyTree key={childPath} path={childPath} level={level + 1} />;
            })}
          </div>
        </details>
      </div>
    )
  }
)