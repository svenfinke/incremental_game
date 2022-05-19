import { InventorySingleton } from "./Inventory";

export class StackSingleton{
    private static _instance: StackSingleton;
    private stack: StackAction[] = [];

    private constructor(){
        this.stack.push(
            new StackAction(
                'Lumberjack', 
                true, 
                [], 
                [
                    { itemId: 'wood', count: 1 }
                ],
                10
            )
        );

        this.stack.push(
            new StackAction(
                'FungiFarm', 
                true, 
                [ { itemId: 'wood', count: 10 } ], 
                [
                    { itemId: 'food', count: 5 }
                ]
            )
        );
        
    }

    static getInstance(): StackSingleton{
        if (!this._instance) {
            this._instance = new StackSingleton();
        }

        return this._instance;
    }

    registerAction(action: StackAction) {
        this.stack.push(action);
    }

    execute(){
        var newStack = [];
        while(this.stack.length > 0)
        {
            var action = this.stack.shift()
            if (action) {
                action.execute();
                if (action.repeat) {
                    newStack.push(action);
                }
            }
        }

        this.stack = newStack;
    }

    getStack(): StackAction[]{
        return this.stack;
    }
}

export type StackResource = {
    itemId: string
    count: number
}

export class StackAction{
    private inventory: InventorySingleton;

    title: string = "title";
    repeat: boolean = true;
    inputResources: StackResource[] = []
    outputResources: StackResource[] = []
    warmup: number = 0;
    warmupLeft: number = 0;

    constructor(title: string, repeat:boolean, inputResources: StackResource[], outputResources: StackResource[], warmup: number = 0){
        this.inventory = InventorySingleton.getInstance();
        this.title = title;
        this.repeat = repeat;
        this.inputResources = inputResources;
        this.outputResources = outputResources;
        this.warmup = warmup;
        this.warmupLeft = warmup;
    }

    execute(){
        if (this.warmupLeft > 0) {
            this.warmupLeft -= 1;
            return;
        }
        this.warmupLeft = this.warmup;

        var enoughResourcesAvailable = true;

        this.inputResources.forEach(element => {
            var item = this.inventory.getItem(element.itemId);
            if (!item) return;
            if (item.count < element.count) {
                enoughResourcesAvailable = false;
            }
        });

        if (enoughResourcesAvailable) {
            this.inputResources.forEach(element => {
                this.inventory.getItem(element.itemId)?.remove(element.count);
            });

            this.outputResources.forEach(element => {
                this.inventory.getItem(element.itemId)?.add(element.count);
            });
        }
    }
}