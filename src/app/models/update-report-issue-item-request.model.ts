export namespace UpdateReportIssueItemRequest {
    export class RootObject {
        userId: string;
        reportIssueId: string;
        reportIssueCategory: string;
        personResponsible: string;
        status: string;
        hangarOrSectionNumber: string;
        issueDescription: string;
        priority: string;
    }
}