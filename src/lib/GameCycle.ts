import { throwStatement } from "@babel/types";
import { InventorySingleton } from "./Inventory";
import { StackSingleton } from "./Stack";

export class GameCycleSingleton{
    private static _instance: GameCycleSingleton|null = null;
    private componentsToUpdate: React.Component[] = [];
    
    private constructor(){
        var self = this;
        var stack = StackSingleton.getInstance();

        function tick(){
            stack.execute();
            self.forceUpdates();
        }

        setInterval(tick, 200);
    }

    static getInstance(): GameCycleSingleton{
        if (!this._instance) {
            this._instance = new GameCycleSingleton();
        }

        return this._instance;
    }

    registerForUpdates(component: React.Component){
        this.componentsToUpdate.push(component);
    }

    forceUpdates(){
        this.componentsToUpdate.forEach(element => {
            element.forceUpdate();
        })
    }
}