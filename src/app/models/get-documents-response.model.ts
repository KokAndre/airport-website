export namespace GetDocumentsResponse {
    export class RootObject {
        status: number
        header: string
        message: string
        documentData: Folder;
    }
    
    export class Folder {
        name: string;
        files: File[];
        folders: Folder[];
        isExpanded: boolean;
    }

    export class File {
        name: string;
    }
}