export namespace UploadImageRequest {
    export class RootObject {
        sectionId: string;
        userId: number;
        filesArray: FileData[];
    }

    export class FileData {
        imageName: string;
        imageData: any;
    }
}