export class Dictionary {
    key: string;
    value: any;
    type?: string;
}

export class Entity<T> {
    index = new Dictionary();
    object = {} as T;
}

export class RequestBody<T> {
    contentType: string;
    object = {} as T;
}
