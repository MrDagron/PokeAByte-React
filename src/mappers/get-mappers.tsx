import config from "../../config.json"
import  {useEffect, useState} from "react";

interface Mapper {
    id: string;
    displayName: string;
}

const fetchData = async () : Promise<Mapper[]> => {
    const url = config.pokeabyte_url + "/mapper-service/get-mappers"
    const resp = await fetch(url, {
        method: "GET"
    });
    return await resp.json();
};

export default function GetMappers() {
    const [mapperData, setMapperData] = useState<Mapper[] | null> (null);
    useEffect(() => {
        fetchData().then((data) => {
            setMapperData(data);
        });
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