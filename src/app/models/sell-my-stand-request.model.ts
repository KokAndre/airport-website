export namespace SellMyStandRequest {
    export class RootObject {
        name: string;
        email: string;
        phoneNumber: string;
        standNumber: string;
        titleDocument: FileData;
        standDimensions: StandDimensions;
        // featuresAndBenefits: string[];
        securty: string[];
        price: number;
        leviesApplicable: string[];
        standImages: FileData[];
        reasonsForSelling: string;
    }

    export class FileData {
        fileName: string;
        fileData: any;
    }

    export class StandDimensions {
        width: number;
        length: number;
        height: number;
    }
}