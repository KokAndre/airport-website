export namespace SellMyHangerRequest {
    export class RootObject {
        name: string;
        email: string;
        phoneNumber: string;
        hangerNumber: string;
        // titleDocument: FileData;
        hangerDimensions: HangerDimensions;
        doorType: string;
        doorDimensions: HangerDimensions
        buildingMaterial: string[];
        yearBuilt: number;
        hangerCustomisations: string[];
        featuresAndBenefits: string[];
        securty: string[];
        additionalInfrastructure: string[];
        price: number;
        // leviesApplicable: string[];
        hangerImages: FileData[];
        detailedFloorPlan: FileData;
        reasonsForSelling: string;
    }

    export class FileData {
        fileName: string;
        fileData: any;
    }

    export class HangerDimensions {
        width: number;
        length: number;
        height: number;
    }
}