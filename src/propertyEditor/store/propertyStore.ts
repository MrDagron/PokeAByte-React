import { PokeAClient, GameProperty } from "pokeaclient";


export class PropertyStore {
	private _connectionSubscriber: Function[] = [];
	private _mapperSubscriber: Function[] = [];
	private _propertyCallbacks: Record<string, Function[]> = {};
	client: PokeAClient;
	private _pendingPathUpdates: string[];

	constructor() {
		this._pendingPathUpdates = [];
		this.client = new PokeAClient({
			onMapperChange: this.onMapperChange,
			onPropertiesChanged: this.onPropertiesChange,
			onConnectionChange: this.onConnectionChange
		});
		this.client.connect();
		window.setInterval(() => this.sendPropertyChanges(), 50);
	}

	sendPropertyChanges = () => {
		if (this._pendingPathUpdates.length > 0) {
			this._pendingPathUpdates.forEach((path) => {
				this._propertyCallbacks[path]?.forEach(x => x());
			});
			this._pendingPathUpdates.length = 0;
		}
	}

	onPropertiesChange = (paths: string[]) => {
    paths.forEach(path => {
      if (!this._pendingPathUpdates.includes(path)) {
        this._pendingPathUpdates.push(path);
      }
    })
	}

	onMapperChange = () => {
		this._mapperSubscriber.forEach(callback => callback());
	}
	onConnectionChange = () => {
		this._connectionSubscriber.forEach(callback => callback());
	}

	subscribeProperty = (path: string) => (onStoreChange: () => void) => {
		if (!this._propertyCallbacks[path]) {
			this._propertyCallbacks[path] = [];
		}
		this._propertyCallbacks[path].push(onStoreChange)
		return () => {
			this._propertyCallbacks[path] = this._propertyCallbacks[path].filter(x => x != onStoreChange);
		}
	}

	subscribeMapper = (onStoreChange: () => void) => {
		this._mapperSubscriber.push(onStoreChange)
		return () => {
			this._mapperSubscriber = this._mapperSubscriber.filter(x => x != onStoreChange);
		}
	}

	subscribeConnected = (onConnectedChange: () => void) => {
		this._connectionSubscriber.push(onConnectedChange);
		return () => {
			this._connectionSubscriber = this._connectionSubscriber.filter(x => x != onConnectedChange);
		}
	}
	isConnected = () => this.client.isConnected()

	getMapper = () => this.client.getMapper();


	getProperty = <T = any>(path: string) => () => this.client.getProperty<T>(path);
	getAllProperties = (): Record<string, GameProperty> => this.client["_properties"];
	getGlossary = (): Record<string, GameProperty> => this.client.getGlossary();

	getGlossaryItem = (item: string) => this.client.getGlossary()[item];
}

export const Store = new PropertyStore();