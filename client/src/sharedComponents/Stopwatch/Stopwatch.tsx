import { useState } from "react";

import Box from "@mui/material/Box";

import StopwatchButtons from "./components/StopwatchButtons";
import StopwatchDisplay from "./components/StopwatchDisplay";
import { StopwatchStatuses } from "./types";

const Stopwatch: React.FC = () => {
    const [intervalId, setIntervalId] = useState<number>(0);
    const [totalSeconds, setTotalSeconds] = useState<number>(0);
    const [status, setStatus] = useState<StopwatchStatuses>(StopwatchStatuses.NOT_STARTED);

    const incrementSecond = () => {
        setTotalSeconds((prev) => prev + 1);
    };

    const start = () => {
        clearInterval(intervalId);
        setIntervalId(setInterval(incrementSecond, 1000));
        setStatus(StopwatchStatuses.STARTED);
    };

    const pause = () => {
        clearInterval(intervalId);
        setIntervalId(0);
        setStatus(StopwatchStatuses.PAUSED);
    };

    const stop = () => {
        setStatus(StopwatchStatuses.NOT_STARTED);
        clearInterval(intervalId);
        setTotalSeconds(0);

        console.log(totalSeconds); //TODO: Add API call
    };

    return (
        <Box display={"flex"} alignItems={"center"}>
            <StopwatchButtons status={status} start={start} pause={pause} stop={stop} />
            <StopwatchDisplay totalSeconds={totalSeconds} />
        </Box>
    );
};

export default Stopwatch;
