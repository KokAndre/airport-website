export namespace GetUserDataResponse {

    export class RootObject {
        status: number;
        header: string;
        message: string;
        data: Data;
    }

    export class Data {
        id: string;
        name: string;
        surname: string;
        email: string;
        password: string;
        isRegistered: string;
    }
}