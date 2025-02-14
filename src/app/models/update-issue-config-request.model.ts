export namespace UpdateIssueConfigRequest {
    export class RootObject {
        userId: number;
        categoryId: number;
        category: string;
        responsiblePersonId: number;
        responsiblePersonName: string;
        // Priority Fields
        priorityId: number;
        priorityName: string;
        priorityTime: string
    }
}