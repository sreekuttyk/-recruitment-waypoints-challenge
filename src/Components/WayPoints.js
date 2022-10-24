import { useEffect, useState } from "react";
import { distanceUnits} from "../Constants/constants";


function WayPoints() {
    const [wayPoints, setWayPoints] = useState([]);

    const getData = () => {
        fetch('data/waypoints.json')
            .then((response) => response.json())
            .then((data) => setWayPoints(data));
    }

    useEffect(() => {
        getData()
    }, [])

    

    const renderTotalDistance = (wayPoints) => {
        let distance = 0;

        for (let i = 0; i < wayPoints.length - 1; i++) {
            const lat1 = wayPoints[i].position.latitude;
            const lon1 = wayPoints[i].position.longitude;
            const lat2 = wayPoints[i + 1].position.latitude;
            const lon2 = wayPoints[i + 1].position.longitude;
            distance += calculateDistance(lat1, lon1, lat2, lon2);
        }

        return (<>{(Math.round(distance, 2))} {distanceUnits.Unit}</>)
    }

    function calculateDistance(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var lat1R = deg2rad(lat1);
        var lat2R = deg2rad(lat2)
        var dLat = deg2rad(lat2 - lat1);
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1R) * Math.cos(lat2R) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return (R * c) * distanceUnits.Value;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }
    
    if (wayPoints.length === 0)
        return (<div>No data loaded...</div>)

    return (
        <div>
            <div>
                <h2>Distance Speeding</h2>
                <p>Total Distance : </p>
            </div>
            <div>
                <h2>Duration  Speeding</h2>
                <p>Total Duration :</p>
            </div>
            <div>
                <h2>Total Distance</h2>
                <p>Total Distance : {renderTotalDistance(wayPoints)}</p>
            </div>
            <div>
                <h2>Total Duration</h2>
                <p>Total Duration : </p>
            </div>
        </div>
    )
}

export default WayPoints;
