import { InventoryItemClass, InventorySingleton } from "./Inventory";
import { StackAction } from "./Stack";

export interface IConditionCheck{
    (): boolean;
}

export type LocationUnlocks = {
    unlockTitle: string
    stackActions?: StackAction[]
    resources?: InventoryItemClass[]
};

export class LocationClass {
    id: string;
    buyCost?: InventoryItemClass[];
    unlocks?: LocationUnlocks;
    unlocked?: boolean;
    condition: IConditionCheck

    constructor(id: string){
        this.id = id;
        this.condition = function(){ return true; }
    }
}

export class LocationsSingleton {
    private static _instance: LocationsSingleton|null = null;
    
    locations: LocationClass[];

    static getInstance(): LocationsSingleton{
        if (!this._instance) {
            this._instance = new LocationsSingleton();
        }

        return this._instance;
    }

    getItem(id: string): LocationClass|null{
        let result = null
        this.locations.forEach(location => {
            if (location.id == id) result = location;
        });

        return result;
    }

    checkLocations(){
        this.locations.forEach(location => {
            if (location.unlocked) return;
            if (location.condition()) {
                location.unlocked = true;
            }
        });
    }

    private constructor(){
        this.locations = [];
        var mountains = new LocationClass('Mountains'); 
        mountains.buyCost = [
            new InventoryItemClass('wood', 25),
            new InventoryItemClass('food', 50),
        ];
        mountains.unlocks = {
            unlockTitle: "Exploit area",
            stackActions: [
                new StackAction(
                    "Gather rocks",
                    true,
                    [],
                    [ new InventoryItemClass("rocks", 1) ]
                )
            ]
        };
        mountains.condition = function(){
            var inventory = InventorySingleton.getInstance();
            var item = inventory.getItem("wood");
            if (item) {
                return item.count > 20;
            }
            return false;
        };
    }
}