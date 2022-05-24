export interface IItem{
    id: string;
    title: string;
    count: number;
    icon: string;

    add(count: number): void;
    remove(count: number): void;
}