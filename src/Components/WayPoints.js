import { useEffect, useState } from "react";
import Distance from "./WayPoints.Distance";
import Duration from "./WayPoints.Duration";


function WayPoints() {
    const [wayPoints, setWayPoints] = useState([]);

    const getData = () => {
        //do a fetch to json file directly.
        //set that data to component state.
        fetch('data/waypoints.json')
            .then((response) => response.json())
            .then((data) => setWayPoints(data));
    }

    useEffect(() => {
        //load data when component is mounted.
        getData()
    }, [])

    if (wayPoints.length === 0)
        return (<div>No data loaded...</div>)

    return (
        <div>
            <Distance wayPoints={wayPoints} isSpeeding={true} />
            <Duration wayPoints={wayPoints} isSpeeding={true} />
            <Distance wayPoints={wayPoints} isSpeeding={false} />
            <Duration wayPoints={wayPoints} isSpeeding={false} />
        </div>
    )
}

export default WayPoints;