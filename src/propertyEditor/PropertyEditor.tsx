
import "./PropertyEdit.css"
import { Store } from "./store/propertyStore";
import { PropertyTree } from "./components/PropertyTree";
import { unique } from "./utils/unique";
import { useSyncExternalStore } from "react";
import { Button } from "../components/Button";
import { unloadMapper } from "../utility/unloadMapper";

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
    <div>
      <span>

      <h6>
        Properties for {mapper?.gameName}
      </h6>
      <Button label="UNLOAD MAPPER" onClick={unloadMapper}/>
      </span>

    <div id="property-editor">
      {paths.map((x) => {
        return <PropertyTree key={x} path={x} />
      })}
    </div>
      </div>
  )
}