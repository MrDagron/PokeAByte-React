import { useCallback, useRef, useSyncExternalStore } from "react";
import { Store } from "../store/propertyStore";
import { GameProperty } from "pokeaclient";
import deepEqual from "deep-equal";


export function useGameProperty<T=any>(path: string) {
  const ref = useRef<GameProperty|null>(null);
   // Cache the result of the store snapshot function (getProperty) to avoid unncessary updates:
	const getProperty = useCallback(() => {
		var newProperty = Store.getProperty<T>(path)();
    if (!deepEqual(newProperty, ref.current)) {
      ref.current = newProperty;
    }
    return ref.current;
	}, [path])
	const subscribe = useCallback(Store.subscribeProperty(path), [path])
	return useSyncExternalStore(subscribe, getProperty);
}
