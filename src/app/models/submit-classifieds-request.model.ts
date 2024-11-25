export namespace SubmitClassifiedsRequest {
    export class RootObject {
        title: string;
        category: string;
        description: string;
        price: string;
        location: string;
        name: string;
        email: string;
        phoneNumber: string;
        condition: string;
        availability: string;
        specialNotes: string;
        images: Image[];
    }

    export class Image {
        fileName: string;
        fileData: any;
    }
}