export namespace GetClassifiedsDataResponse {
    export class RootObject {
        status: number;
        header: string;
        message: string;
        classifieds: Classified[];
    }

    export class Classified {
        id: number;
        title: string;
        category: string;
        description: string;
        price: string;
        images: Image[];
        location: string;
        name: string;
        phoneNumber: string;
        email: string;
        itemCondition: string;
        availability: string;
        specialNotes: string;
        dateAdded: string;
        isExpanded: boolean;
    }

    export class Image {
        fileName: string;
        fileData: any;
    }

}