export namespace GetHangersForSaleReponse {

    export class RootObject {
        status: number;
        header: string;
        message: string;
        hangers: Hanger[];
    }

    export class Hanger {
        id: number;
        name: string;
        email: string;
        phoneNumber: string;
        hangerNumber: string;
        titleDocument: FileData;
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
        leviesApplicable: string[];
        hangerImages: FileData[];
        detailedFloorPlan: FileData;
        reasonsForSelling: string;
        dateAdded: string;
        isExpanded: boolean;
        approvedByAdmin: string;
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