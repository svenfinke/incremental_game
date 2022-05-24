import { IItem } from "./Item";

export interface IAction{
    id: string;
    title: string;
    icon: string;
    input: IItem[];
    output: IItem[];
    repeat: boolean;
    delay: number;
    status: string[];

    execute():void;
}