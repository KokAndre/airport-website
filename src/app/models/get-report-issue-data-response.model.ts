export namespace GetReportIssueDataResponse {
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
        hangerOrSectionNumber: string;
        issueDescription: string;
        dateAdded: string;
        // hasFollowedUp: string;
        // dateFollowedUp: any;
        changeRequest: string;
        status: string
        statusDateChanged: string;
      }
}