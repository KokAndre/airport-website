export namespace UploadMembersDocumentsRequest {
    export class RootObject {
        userId: number;
        filePath: string;
        fileData: FileData[];
    }

    export class FileData {
        fileName: string;
        fileData: any;
    }
}