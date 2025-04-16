export namespace GetReportIssueDataResponse {
  export class RootObject {
    status: number
    header: string
    message: string
    requests: Requests[];
    categories: Category[];
    resposiblePersons: ResponsiblePerson[];
    priority: priorityList[];
  }

  export class Requests {
    id: string;
    name: string;
    email: string;
    hangerOrSectionNumber: string;
    issueDescription: string;
    dateAdded: string;
    personResponsible: string;
    category: string
    status: string
    statusDateChanged: string;
    priority: string;
    estimatedCompletionDate: string;
    numOfRemainingDaysToETC: number;
    isFilteredOnSearch: boolean;
  }

  export class Category {
    id: number;
    category: string;
    isFilterSelected: boolean;
  }

  export class ResponsiblePerson {
    id: number;
    name: string;
    isFilterSelected: boolean;
  }

  export class priorityList {
    id: number;
    name: string;
    time: string
    isFilterSelected: boolean;
  }

  export class PropertyNumber {
    description: string;
    isFilterSelected: boolean;
  }
}