export namespace GetYoutubeVideosDataResponse {

    export class RootObject {
        youtubeVideos: Video[];
        status: number;
        header: string;
        message: string;
    }

    export class Video {
        id: number;
        title: string;
        videoURL: string;
        videoId: string;
        credits: string;
        videoStartTime: number;
        videoEndTime: number;
        sortOrder: number;
        uploadType: string;
        fileData: FileData
    }

    export class FileData {
        fileName: string;
        fileData: any;
    }

}