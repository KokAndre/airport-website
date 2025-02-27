export namespace GetBackendEmailConfigDataResponse {

    export class RootObject {
        emailConfigData: EmailConfigData[];
        status: number;
        header: string;
        message: string;
    }

    export class EmailConfigData {
        id: number;
        emailName: string;
        emailDisplayName: string;
        emailAdresses: string;
        emailAdressesArray: string[];
    }

}