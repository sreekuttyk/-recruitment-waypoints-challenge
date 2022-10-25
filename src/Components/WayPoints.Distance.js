import { distanceUnits } from "../Constants/constants";
import { deg2rad } from "../Services/helpers";

function Distance({ wayPoints, isSpeeding }) {

    const renderSpeedingDistance = (wayPoints) => {
        let distance = 0;

        for (let i = 0; i < wayPoints.length - 1; i++) {
            const lat1 = wayPoints[i].position.latitude;
            const lon1 = wayPoints[i].position.longitude;
            const lat2 = wayPoints[i + 1].position.latitude;
            const lon2 = wayPoints[i + 1].position.longitude;

            if (isSpeeding && wayPoints[i].speed > wayPoints[i].speed_limit) {
                distance += calculateDistance(lat1, lon1, lat2, lon2);
            }
            else if (!isSpeeding) {
                distance += calculateDistance(lat1, lon1, lat2, lon2);
            }
        }

        return (<>{distance} {distanceUnits.Unit}</>)
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

    if (isSpeeding)
        return (
            <div>
                <h2>Distance Speeding</h2>
                <p>Total Distance : {renderSpeedingDistance(wayPoints)}</p>
            </div>
        )

    return (
        <div>
            <h2>Total Distance</h2>
            <p>Total Distance : {renderSpeedingDistance(wayPoints)}</p>
        </div>
    )
}

export default Distance;