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
        isRegistered: number;
        isAdmin: number;
        hasCompletedGettingToKnowYou: number;
        phoneNumber: string;
        userId?: number;
        hangarNumbers: string;
        hangarNumbersArray?: string[];
        standNumbers: string;
        standNumbersArray?: string[];
        numberOfLogins: number;
        lastLoginDate: string;
    }
}