import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { StackSingleton } from '../../lib/Stack';
import { GameCycleSingleton } from '../../lib/GameCycle';

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

export type StackProps = {}
export type StackState = {
    stack: StackSingleton
}

export class Stack extends React.Component<StackProps, StackState>{
    constructor(props:StackProps, state:StackState){
        super(props, state);

        this.state = {
            'stack': StackSingleton.getInstance()
        }
    }


    render() {
        GameCycleSingleton.getInstance().registerForUpdates(this);
        const actions = this.state.stack.getStack().map((action) =>
            <ListItem>
                <ListItemText>{action.title}</ListItemText>
                <ListItemText>{action.warmupLeft}</ListItemText>
            </ListItem>
        );

        return (<List sx={style} component="nav" aria-label="stack actions">
            {actions}
        </List>);
    }
}