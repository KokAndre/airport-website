export namespace ReportIssueRequest {
    export class RootObject {
        name: string;
        email: string;
        hangerOrSectionNumber: string;
        issueDescription: string;
    }

    export class FileDataModel {
        fileData: any;
        fileName: string;
        fileExtension: string;
    }
}