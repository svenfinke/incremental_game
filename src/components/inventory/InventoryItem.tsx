import * as React from 'react';
import { InventoryItemClass, InventorySingleton } from '../../lib/Inventory';
import { Card, CardContent, Typography } from '@mui/material';

export type InventoryItemProps = {
    itemId: string
};

interface InventoryItemState {
    item: InventoryItemClass;
    inventory: InventorySingleton;
}

class InventoryItem extends React.Component<InventoryItemProps, InventoryItemState>{
    private inventory: InventorySingleton;

    constructor(props: InventoryItemProps, state: InventoryItemState){
        super(props, state);

        this.inventory = InventorySingleton.getInstance();
        let item = this.inventory.getItem(this.props.itemId);

        if (item) {
            this.state = {
                'item': item,
                'inventory': this.inventory
            }
        }
    }

    render() {
       return(
           <Card variant='outlined'>
               <CardContent>
                   <Typography>{this.state.item.id}</Typography>
                   <Typography>{this.state.item.count}</Typography>
               </CardContent>
           </Card>
       );
    }
}

export default InventoryItem;