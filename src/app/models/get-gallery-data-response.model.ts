export namespace GetGalleryDataResponse {
    export class RootObject {
        status: number
        header: string
        message: string
        sections: Section[]
      }
      
      export class Section {
        id: string
        title: string
        description: string
        images?: Image[]
      }
      
      export class Image {
        id: string
        name: string
        uploadDate: string
        sectionId: string
        imageSource: string;
      }
      
}