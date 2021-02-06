export declare class Todo {
    static newItem({ title, schedule, }: {
        title: string;
        schedule: Date | number;
    }): Todo;
    static of({ id, title, schedule, }: {
        id: string;
        title: string;
        schedule: Date | number;
    }): Todo;
    constructor(id: string, title: string, schedule: Date | number);
    id: string;
    title: string;
    schedule: Date;
    copyWith({ title, schedule, }: {
        title: string;
        schedule: Date | string;
    }): Todo;
}
