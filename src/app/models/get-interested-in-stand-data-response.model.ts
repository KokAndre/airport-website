export namespace GetInterestedInStandDataResponse {
    export class RootObject {
        status: number;
        header: string;
        message: string;
        standInterests: StandInterests[];
    }

    export class StandInterests {
        id: number;
        name: string;
        email: string;
        phoneNumber: string;
        standId: number;
        standNumber: string;
        standPrice: string;
        sellerName: string;
        sellerEmail: string;
        sellerPhoneNumber: string;
        dateAdded: string;
        hasFollowedUp: string;
    }

}







