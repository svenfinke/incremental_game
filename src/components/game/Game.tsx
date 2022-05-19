import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import { Stack } from '../stack/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Inventory from '../inventory/Inventory';
import { GameCycleSingleton } from '../../lib/GameCycle';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface GameProps {
    
}

interface GameState {
    value: number;
}

class TabPanel extends React.Component<TabPanelProps>{
    render(){
        const { children, value, index, ...other } = this.props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }
}
  
class Game extends React.Component<GameProps, GameState>{
    private gameCycle: GameCycleSingleton;
    
    constructor(props: GameProps, state: GameState){
        super(props, state);

        this.state = { value: 0 };
        this.gameCycle = GameCycleSingleton.getInstance();
    }

    a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }; 

    render() {
        const handleChange = (event: React.SyntheticEvent, newValue: number) => {
            this.setState({'value': newValue});
        };

        return(
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={this.state.value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Stack" {...this.a11yProps(0)} />
                    <Tab label="Inventory" {...this.a11yProps(1)} />
                    <Tab label="Locations" {...this.a11yProps(2)} />
                </Tabs>
                </Box>
                <TabPanel value={this.state.value} index={0}>
                    <Stack></Stack>
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    <Inventory></Inventory>
                </TabPanel>
                <TabPanel value={this.state.value} index={2}>
                    Locations
                </TabPanel>
            </Box>
        );
    }
}

export default Game;