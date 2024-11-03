export namespace GetGreeningTedderfieldDataResponse {
    export class RootObject {
        status: number
        header: string
        message: string
        requests: Requests[];
        
      }

      export class Requests {
        id: string;
        name: string;
        email: string;
        donationAmount: string;
        interestedIn: string;
        otherIdeas: string;
        dateAdded: string;
        hasFollowedUp: string;
        dateFollowedUp: any;
      }
}