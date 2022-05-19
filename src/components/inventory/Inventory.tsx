import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { InventorySingleton } from '../../lib/Inventory';
import { GameCycleSingleton } from '../../lib/GameCycle';
import InventoryItem from './InventoryItem';
import { Grid } from '@mui/material';


interface InventoryProps{}

interface InventoryState{
    inventory: InventorySingleton
}

class Inventory extends React.Component<InventoryProps, InventoryState>{
    constructor(props: any){
        super(props);
        this.state = {
            'inventory': InventorySingleton.getInstance()
        };
    }

    render() {
        GameCycleSingleton.getInstance().registerForUpdates(this);
        const inventoryItems = this.state.inventory.items.map((item) => 
            <Grid item xs={4}>
                <InventoryItem itemId={item.id}></InventoryItem>
            </Grid>
        );

        return(
            <Grid container spacing={2}>
                {inventoryItems}
            </Grid>
        );
    }
}

export default Inventory;