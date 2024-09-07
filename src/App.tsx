
import React from 'react';
import './App.css'
import GetMappers from "./mappers/get-mappers.tsx";
import { PropertyEditor } from './propertyEditor/PropertyEditor.tsx';
import { ToastContainer } from './notifications/ToastContainer.tsx';

function App() {
  // todo: Use a proper router or something.
	const [viewState, setViewState] = React.useState<"mappers" | "properties">("properties");

		return (
			<>
        <header>
          <div>
            <button type="button" onClick={() => setViewState("mappers")} >
              Mappers
            </button>
            <button type="button" onClick={() => setViewState("properties")} >
              Properties
            </button>
          </div>
        </header>
				{viewState === "mappers" 
					? <GetMappers />
					: <PropertyEditor />
				}
        <ToastContainer />
			</>
		)
	
}

export default App
