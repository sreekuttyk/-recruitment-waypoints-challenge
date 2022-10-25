import { timeUnits } from "../Constants/constants";

export const deg2rad = (deg) => {
    return deg * (Math.PI / 180)
}

export const calculateTimeDifference = (wayPointStart, wayPointEnd) => {
    return (Date.parse(wayPointEnd.timestamp) - Date.parse(wayPointStart.timestamp)) / timeUnits.Value;
}