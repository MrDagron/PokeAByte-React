
import React from 'react';
import './App.css'
import GetMappers from "./mappers/get-mappers.tsx";
import { PropertyEditor } from './propertyEditor/PropertyEditor.tsx';

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
			</>
		)
	
}

export default App
