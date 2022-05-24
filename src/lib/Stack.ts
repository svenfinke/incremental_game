import { InventoryItemClass, InventorySingleton } from "./Inventory";

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
                    new InventoryItemClass('wood', 1)
                ],
                10
            )
        );

        this.stack.push(
            new StackAction(
                'FungiFarm', 
                true, 
                [ new InventoryItemClass('wood', 10) ], 
                [ new InventoryItemClass('food', 5) ]
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

export class StackAction{
    private inventory: InventorySingleton;

    title: string = "title";
    repeat: boolean = true;
    inputResources: InventoryItemClass[] = []
    outputResources: InventoryItemClass[] = []
    warmup: number = 0;
    warmupLeft: number = 0;

    constructor(title: string, repeat:boolean, inputResources: InventoryItemClass[], outputResources: InventoryItemClass[], warmup: number = 0){
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
            var item = this.inventory.getItem(element.id);
            if (!item) return;
            if (item.count < element.count) {
                enoughResourcesAvailable = false;
            }
        });

        if (enoughResourcesAvailable) {
            this.inputResources.forEach(element => {
                this.inventory.getItem(element.id)?.remove(element.count);
            });

            this.outputResources.forEach(element => {
                this.inventory.getItem(element.id)?.add(element.count);
            });
        }
    }
}