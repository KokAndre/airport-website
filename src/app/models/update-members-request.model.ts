export namespace UpdateMembersRequest {
    export class RootObject {
        // id: number;
        // name: string;
        // surname: string;
        // email: string;
        // password: string;
        // isRegistered: number;
        // isAdmin: number;
        // hasCompletedGettingToKnowYou: number;
        // phoneNumber: string;
        // hangarNumbers: string;
        // standNumbers: string;
        // hangarNumbersArray: string[];
        // standNumbersArray: string[];
        // userId: number;

        
        // Delete the below! 
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

        // Delete the below field! 
        newPassword?: string;
    }
}