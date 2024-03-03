import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { DrawerItem } from "../../../provider/LayoutProvider";

interface Props {
    open: boolean;
    toggleDrawer: () => void;
    drawerItems: DrawerItem[];
}

const DrawerComponent: React.FC<Props> = ({ open, toggleDrawer, drawerItems }) => {
    return (
        <Drawer open={open} onClose={toggleDrawer}>
            <Box sx={{ width: 250 }}>
                <Box
                    height={64}
                    display="flex"
                    alignItems="center"
                    sx={{ justifyContent: "center" }}>
                    <Typography variant="h5" component="div">
                        KN-BN
                    </Typography>
                </Box>

                <Divider />

                <List>
                    {drawerItems.map(({ text, selected, onClick }) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={onClick} selected={selected}>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default DrawerComponent;
