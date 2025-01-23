export namespace MembersDataResponse {
    export class RootObject {
        status: number;
        header: string;
        message: string;
        members: Member[];
    }

    export class Member {
        id: number;
        name: string;
        surname: string;
        email: string;
        password: string;
        isRegistered: string;
        isAdmin: string;
        hasCompletedGettingToKnowYou: string;
        phoneNumber: string;
        userId: number;
        hangarNumbers: string;
        hangarNumbersArray: string[];
        standNumbers: string;
        standNumbersArray: string[];
    }
}