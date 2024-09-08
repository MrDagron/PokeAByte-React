import  {useEffect, useState} from "react";
import { Store } from "../propertyEditor/store/propertyStore";
import { AvailableMapper } from "pokeaclient";
import { Toasts } from "../notifications/ToastStore";


export default function GetMappers() {
    const [mapperData, setMapperData] = useState<AvailableMapper[] | null> (null);
    useEffect(() => {
        Store.client.getMappers().then(data => {
          console.log(data);
          if (data) {
            setMapperData(data);
          } else {
            Toasts.push("Failed to load mappers", "error", "error");
          }
        })
    }, [])
    return (
        <>
            <h1>Mappers</h1>
            { mapperData ? (
                <ul>
                    {mapperData.map(({id, displayName}) => {
                        return <li key={id}>{displayName}</li>;
                    })}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}