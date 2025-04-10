export namespace GetMerchHubDataResponse {

    export class RootObject {
        items: MerchItem[];
        status: number;
        header: string;
        message: string;
    }

    export class MerchItem {
        id: number;
        name: string;
        description: string;
        price: string;
        imageName: string;
    }
}