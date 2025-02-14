export namespace GetUserDataResponse {

    export class RootObject {
        status: number;
        header: string;
        message: string;
        data: Data;
    }

    export class Data {
        id: number;
        name: string;
        surname: string;
        email: string;
        password: string;
        phoneNumber: string;
        isRegistered: number;
        isAdmin: number;
        hasCompletedGettingToKnowYou: number;
        standNumbers: string[];
        hangarNumbers: string [];
    }
}