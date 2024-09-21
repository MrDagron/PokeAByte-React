import config from "../../config.json"
import { useEffect, useState, useSyncExternalStore } from "react";
import { Store } from "../propertyEditor/store/propertyStore";
import { SelectInput } from "../components/SelectInput";

interface Mapper {
  id: string;
  displayName: string;
}

const fetchData = async (): Promise<Mapper[]> => {
  const url = config.pokeabyte_url + "/mapper-service/get-mappers"
  const resp = await fetch(url, {
    method: "GET"
  });
  return await resp.json();
};

export default function GetMappers() {
  const mapper = useSyncExternalStore(Store.subscribeMapper, Store.getMapper);
  const [mapperData, setMapperData] = useState<Mapper[] | null>(null);
  useEffect(() => {
    fetchData().then((data) => {
      setMapperData(data);
    });
  }, [])

  const handleMapperSelection = (mapperId: string|null) => {    
    if (mapperId) {

      console.log("Setting mapper");
      fetch(
        "http://localhost:8085/mapper-service/change-mapper", 
        { method: "PUT", body: JSON.stringify(mapperId), headers: { "Content-Type": "application/json" } }
      );
    }
  }
  return (
    <>
      <h2>Mapper Manager</h2>
      { mapper
        ? <p>Mapper Loaded: {mapper.gameName} </p>
        : <p>No Mapper Loaded </p>
      }
      
      {mapperData ? (
        <>
        <SelectInput 
          id="mapper-select"
          label="Select the mapper you would like to load:"
          onSelection={handleMapperSelection}
          value={mapper?.id ?? null}
          options={mapperData?.map(x => {return { value: x.id, display: x.displayName}})} 
        />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}