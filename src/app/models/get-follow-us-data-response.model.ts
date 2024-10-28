export namespace GetFollowUsDataResponse {
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
        phoneNumber: string;
        interestedIn: string;
        otherInterest: string;
        commentsAndQuestions: string;
        dateAdded: string;
        hasFollowedUp: string;
        dateFollowedUp: any;
      }
}