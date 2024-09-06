import { useCallback, useRef, useSyncExternalStore } from "react";
import { Store } from "../store/propertyStore";
import { GameProperty } from "pokeaclient";

function arePropertiesDifferent(a: GameProperty|null, b: GameProperty|null) {
  if (!a || !b) {
    return true;
  }
  return a.value !== b.value
    || a.bytes !== b.bytes
    || a.bits !== b.bits
    || a.length !== b.length
    || a.address !== b.address
    || a.size !== b.size
    || a.reference !== b.reference
    || a.memoryContainer !== b.memoryContainer
    || a.isFrozen !== b.isFrozen
    || a.isReadOnly !== b.isReadOnly;
}

export function useGameProperty<T=any>(path: string) {
  const ref = useRef<GameProperty|null>(null);
   // Cache the result of the store snapshot function (getProperty) to avoid unncessary updates:
	const getProperty = useCallback(() => {
		var newProperty = Store.getProperty<T>(path)();
    if (arePropertiesDifferent(newProperty, ref.current)) {
      ref.current = newProperty;
    }
    return ref.current;
	}, [path])
	const subscribe = useCallback(Store.subscribeProperty(path), [path])
	return useSyncExternalStore(subscribe, getProperty);
}
