export namespace GetStandsForSaleReponse {

    export class RootObject {
        status: number;
        header: string;
        message: string;
        stands: Stands[];
    }

    export class Stands {
        id: number;
        name: string;
        email: string;
        phoneNumber: string;
        standNumber: string;
        titleDocument: FileData;
        standDimensions: StandDimensions;
        featuresAndBenefits: string[];
        securty: string[];
        price: number;
        leviesApplicable: string[];
        standImages: FileData[];
        reasonsForSelling: string;
        isExpanded: boolean;
        dateAdded: string;
        approvedByAdmin: string;
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