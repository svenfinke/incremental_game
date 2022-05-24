import { IAction } from "./Action";

export interface IStack{
    Actions: IAction[];
    AvailableActions: IAction[];

    execute():void;
}