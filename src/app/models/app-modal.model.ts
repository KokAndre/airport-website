import { ModalTypes } from '../enums/app.enums';

export class ModalDetails {
    public title: string;
    public details: string;
    public type: ModalTypes;
    public callbackMessageResult: (result: any, returnData: any) => void;
    public inputValues: any;

    constructor(type: ModalTypes, title: string, details: string, callbackMesssageResult: (result: any, returnData: any) => void, inputValues: any) {
        this.type = type;
        this.title = title;
        this.details = details;
        this.callbackMessageResult = callbackMesssageResult;
        this.inputValues = inputValues;
    }
}
