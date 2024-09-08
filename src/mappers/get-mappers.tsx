import config from "../../config.json"
import { useEffect, useState, useSyncExternalStore } from "react";
import { Store } from "../propertyEditor/store/propertyStore";

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
  return (
    <>
      <h2>Mapper Manager</h2>
      { mapper
        ? <p>Mapper Loaded: {mapper.gameName} </p>
        : <p>No Mapper Loaded </p>
      }
      {mapperData ? (
        <ul>
          {mapperData.map(({ id, displayName }) => {
            return <li key={id}>{displayName}</li>;
          })}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}