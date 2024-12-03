export namespace GetGettingToKnowYouResponse {
    export class RootObject {
        status: number;
        header: string;
        message: string;
        member: Member[];
    }

    export class Member {
        id: number;
        userId: number;
        name: string;
        email: string;
        phoneNumber: string;
        emergencyContactOneName: string;
        emergencyContactOnePhoneNumber: string;
        emergencyContactTwoName: string;
        emergencyContactTwoPhoneNumber: string;
        whereWereYouBorn: string;
        iFlyBecause: string[];
        iLoveTedderfield: string[];
        whenIAmNotFlying: string[];
        whoInspiresYou: string[];
        whatStressesYouMost: string[];
        yourMostUsefullTalent: string[];
        immediateFamily: string[];
        howFarDoYouDrive: string;
        image: Image;
    }

    export class Image {
        fileName: string;
        fileData: any;
    }
}