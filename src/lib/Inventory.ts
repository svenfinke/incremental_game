export class InventoryItemClass {
    id: string;
    count: number;

    constructor(id: string, count: number){
        this.id = id;
        this.count = count;
    }

    add(count: number){
        this.count += count;
    }

    remove(count: number){
        this.count -= count;
    }

    clear(){
        this.count = 0;
    }
}

export class InventorySingleton {
    private static _instance: InventorySingleton|null = null;
    
    items: InventoryItemClass[];

    private constructor(){
        this.items = [
            new InventoryItemClass('wood', 15),
            new InventoryItemClass('food', 50)
        ];
    }

    static getInstance(): InventorySingleton{
        if (!this._instance) {
            this._instance = new InventorySingleton();
        }

        return this._instance;
    }

    getItem(id: string): InventoryItemClass|null{
        let result = null
        this.items.forEach(item => {
            if (item.id == id) result = item;
        });

        return result;
    }
}

