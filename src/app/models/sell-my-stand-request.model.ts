export namespace SellMyStandRequest {
    export class RootObject {
        name: string;
        email: string;
        phoneNumber: string;
        standNumber: string;
        titleDocument: FileData;
        standDimensions: StandDimensions;


        standCustomisations: string;
        featuresAndBenefits: string;
        securty: string;
        additionalInfrastructure: string;
        price: number;
        leviesApplicable: string[];
        standImages: FileData[];
        detailedFloorPlan: FileData;
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