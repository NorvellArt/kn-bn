import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import { StopwatchStatuses } from "../types";

interface Props {
    status: StopwatchStatuses;

    start: () => void;
    pause: () => void;
    stop: () => void;
}

const StopwatchButtons: React.FC<Props> = ({ status, start, pause, stop }) => {
    return (
        <Box>
            {status !== StopwatchStatuses.STARTED ? (
                <IconButton color="primary" onClick={start}>
                    <PlayArrowRoundedIcon color="primary" />
                </IconButton>
            ) : (
                <IconButton color="warning" onClick={pause}>
                    <PauseRoundedIcon color="warning" />
                </IconButton>
            )}

            <IconButton color="error" onClick={stop}>
                <StopRoundedIcon color="error" />
            </IconButton>
        </Box>
    );
};

export default StopwatchButtons;
