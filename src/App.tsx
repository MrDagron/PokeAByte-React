
import React, { useSyncExternalStore } from 'react';
import './App.css'
import GetMappers from "./mappers/get-mappers.tsx";
import { PropertyEditor } from './propertyEditor/PropertyEditor.tsx';
import { ToastContainer } from './notifications/ToastContainer.tsx';
import { Store } from './propertyEditor/store/propertyStore.ts';

function App() {
  // todo: Use a proper router or something.
  const mapper = useSyncExternalStore(Store.subscribeMapper, Store.getMapper);
  const [viewState, setViewState] = React.useState<"mappers" | "properties">("properties");
  const highlightClass = mapper ? "connected" : "disconnected";
  React.useEffect(() => {
    setViewState(!!mapper ? "properties" : "mappers");
  }, [mapper])
  return (
    <>
      <header className={highlightClass}>
        <h1 >
          Poke-A-Byte
        </h1>
        <div>
          <button type="button" onClick={() => setViewState("mappers")} >
            <span className="material-icons"> catching_pokemon </span> Mappers
          </button>
          <button type="button" onClick={() => setViewState("properties")} >
            <span className="material-icons"> api </span> 
            Properties
          </button>
        </div>
        <button type="button">
          <span className={`material-icons ${highlightClass}`}>
            power_settings_new
          </span>
        </button>
      </header>
      <main>
        {viewState === "mappers"
          ? <GetMappers />
          : <PropertyEditor />
        }
      </main>
      <ToastContainer />
    </>
  )

}

export default App
