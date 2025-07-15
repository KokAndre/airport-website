export namespace UpdateReportIssueItemRequest {
    export class RootObject {
        userId: number;
        reportIssueId: number;
        hangerOrSectionNumber: string;
        issueDescription: string;
        personResponsible: string;
        personResponsibleTwo: string;
        category: string
        status: string
        priority: string;
        estimatedCompletionDate: string;
        reportIssueCategory: string;
    }
}