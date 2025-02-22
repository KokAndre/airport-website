export namespace GetWebTicketsDataResponse {

    export class RootObject {
        webTickets: WebTicket[];
        sections: Section[];
        priorities: Priority[];
        statusList: Status[];
        status: number;
        header: string;
        message: string;
    }

    export class WebTicket {
        id: number;
        name: string;
        email: string;
        section: string;
        page: string;
        description: string;
        dateAdded: string;
        personResponsible: string;
        category: string;
        status: string;
        statusDateChanged: string;
        priority: string;
        estimatedCompletionDate: string;
    }

    export class Section {
        id: number;
        name: string;
        pages: Page[];
    }

    export class Page {
        id: number;
        name: string;
        sectionId: number;
    }

    export class Priority {
        id: number;
        priority: string;
        isFilterSelected: boolean;
    }

    export class Status {
        id: number;
        status: string;
        isFilterSelected: boolean;
    }

}