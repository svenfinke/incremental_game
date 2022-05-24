import { IAction } from "./Action";
import { IBoolCallable, IVoidCallable } from "./Callables";
import { IItem } from "./Item";

export interface ILocation{
    id: string;
    title: string;
    icon: string;
    subtitle: string;
    unlocked: boolean;
    upgrades: ILocationUpgrade[];
    upgradeLevel: number;

    condition: IBoolCallable;
}

export interface ILocationUpgrade{
    type: string;
    title: string;
    icon: string;
    subtitle: string;
    upgradeLevel: number;
    unlocked: boolean;
    cost: IItem[];
    passive: IVoidCallable;
    actions: IAction[];

    condition: IBoolCallable;
}