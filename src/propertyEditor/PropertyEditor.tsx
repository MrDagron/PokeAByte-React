
import "./PropertyEdit.css"
import { Store } from "./store/propertyStore";
import { PropertyTree } from "./components/PropertyTree";
import { unique } from "./utils/unique";
import { useSyncExternalStore } from "react";

export function PropertyEditor() {
  let properties = Store.getAllProperties();
  let paths = Object.keys(properties)
    .map(x => x.split(".")[0])
    .filter(unique);
  const mapper = useSyncExternalStore(Store.subscribeMapper, Store.getMapper);
  const isConnected = useSyncExternalStore(Store.subscribeConnected, Store.isConnected);
  if (!isConnected) {
    return (
    <div id="property-editor">
      <h1>
        No connection to PokeAByte
      </h1>
      </div>
    );
  }
  if (!mapper) {
    return (
      <div id="property-editor">
      <h1>
        PokeAByte has no loaded mapper.
      </h1>
      </div>
    );
  }
  return (
    <div id="property-editor">
      <h1>
        Properties for {mapper?.gameName} Mapper
      </h1>
      {paths.map((x) => {
        return <PropertyTree key={x} path={x} />
      })}
    </div>
  )
}