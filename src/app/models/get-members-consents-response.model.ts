export namespace GetMembersConsentsResponse {
    export class RootObject {
        consents: Consent[]
        status: number
        header: string
        message: string
      }
      
      export class Consent {
        id: number
        consentName: string
        pageOfConsent: string
        date: string
        clientName: string
        clientEmail: string
      }
      
}