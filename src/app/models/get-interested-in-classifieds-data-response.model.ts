export namespace GetInterestedInClassifiedsDataResponse {
    export class Root {
        status: number
        header: string
        message: string
        classifieds: Classified[]
      }
      
      export class Classified {
        id: number
        name: string
        email: string
        phoneNumber: string
        itemId: string
        itemPrice: string
        itemTitle: string
        sellerName: string
        sellerEmail: string
        sellerPhoneNumber: string
        dateAdded: string
        hasFollowedUp: string
      }
      

}







