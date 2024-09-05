import config from "../../config.json"
import  {useEffect, useState} from "react";


const fetchData = async () => {
    const url = config.pokeabyte_url + "/mapper-service/get-mappers"
    const resp = await fetch(url, {
        method: "GET"
    });
    const data = await resp.json();
    return data;
};

export default function GetMappers() {
    const [mapperData, getMapperData] = useState(null);
    useEffect(() => {
        fetchData().then((data) => {
            getMapperData(data);
        });
    }, [])
    return (
        <>
            <h1>Mappers</h1>
            { mapperData ? (
                <ul>
                    {mapperData.map(({id, displayName} : any) => {
                        return <li key={id}>{displayName}</li>;
                    })}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}