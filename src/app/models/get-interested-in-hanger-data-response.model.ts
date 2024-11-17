export namespace GetInterestedInHangerDataResponse {
    export class RootObject {
        status: number;
        header: string;
        message: string;
        hangerInterests: HangerInterests[];
    }

    export class HangerInterests {
        id: number;
        name: string;
        email: string;
        phoneNumber: string;
        hangerId: number;
        hangerNumber: string;
        hangerPrice: string;
        sellerName: string;
        sellerEmail: string;
        sellerPhoneNumber: string;
        dateAdded: string;
        hasFollowedUp: string;
}

}







