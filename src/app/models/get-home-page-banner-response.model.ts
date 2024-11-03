export namespace GetHomePageBannerResponse {
    export class RootObject {
        status: number
        header: string
        message: string
        documentData: DocumentData;
    }

    export class DocumentData {
        name: string;
        file: string;
    }
}