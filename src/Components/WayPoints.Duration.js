import { timeUnits } from "../Constants/constants";
import { calculateTimeDifference } from "../Services/helpers";

function Duration({ wayPoints, isSpeeding }) {

    const renderTotalDuration = (wayPoints) => {
        const durationTime = calculateTimeDifference(wayPoints[0], wayPoints[wayPoints.length - 1])
        return (<>{durationTime} {timeUnits.Unit}</>)
    }

    const renderSpeedingDuration = (wayPoints) => {
        let duration = 0;

        for (let i = 0; i < wayPoints.length - 1; i++) {
            if (wayPoints[i].speed > wayPoints[i].speed_limit)
                duration += calculateTimeDifference(wayPoints[i], wayPoints[i + 1])
        }

        return (<>{duration} {timeUnits.Unit}</>)
    }
    
    if (isSpeeding)
        return (
            <div>
                <h2>Duration  Speeding</h2>
                <p>Total Duration: {renderSpeedingDuration(wayPoints)}</p>
            </div>
        )

    return (
        <div>
            <h2>Total Duration</h2>
            <p>Total Duration : {renderTotalDuration(wayPoints)}</p>
        </div>
    )
}

export default Duration;