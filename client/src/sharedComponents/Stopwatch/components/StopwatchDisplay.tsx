import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Time from "../../../utils/Time";

interface Props {
    totalSeconds: number;
}

const StopwatchDisplay: React.FC<Props> = ({ totalSeconds }) => {
    const time = new Time(totalSeconds);

    return (
        <Box>
            <Typography variant="h5">{time.getFormatedTime()}</Typography>
        </Box>
    );
};

export default StopwatchDisplay;
