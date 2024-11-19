export namespace GetLeviesResponse {
    export class RootObject {
        status: number;
        header: string;
        message: string;
        levies: Levie[];
    }

    export class Levie {
        id: number;
        levieName: string;
        leviePrice: string;
        levieFrequency: string;
        isForHangars: boolean;
        isForStands: boolean;
    }
}