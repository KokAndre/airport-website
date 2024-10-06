export namespace SectionDataModel {

    export class RootObject {
        section: Section[];
    }

    export class Section {
        sectionId: number;
        title: string;
        description: string;
        isDarkSection: boolean;
        images: Image[];
    }

    export class Image {
        imageId: number;
        imageName: string;
        imagePath: string;
    }
}