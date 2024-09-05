import { useCallback, useMemo, useSyncExternalStore } from "react";
import { Store } from "../store/propertyStore";

export function useGameProperty<T=any>(path: string) {
	const getProperty = useCallback(() => {
		var property = Store.getProperty<T>(path)();
		return useMemo(() => Object.assign({}, property), [property?.value, property?.bits]);
	}, [path])
	const subscribe = useCallback(Store.subscribeProperty(path), [path])
	const property = useSyncExternalStore(subscribe, getProperty);
	
	return property;
}
