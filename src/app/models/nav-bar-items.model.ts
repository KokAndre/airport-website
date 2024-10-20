import { AppRoutes } from "../enums/app.enums";

export namespace NavBarItems {
    export class NavLink {
        title: string;
        documentToOpen: string;
        linkToNavigateTo: AppRoutes;
        navLinkToCheck: string;
        subItems: NavBarSubItems[];
        displayForAdminOnly: boolean;
        displayForLoggedInUserOnly: boolean;
        displayForLoggedOutUserOnly: boolean;
    }

    export class NavBarSubItems {
        title: string;
        documentToOpen: string;
        linkToNavigateTo: AppRoutes;
        displayForAdminOnly: boolean;
        displayForLoggedInUserOnly: boolean;
        displayForLoggedOutUserOnly: boolean;
    }
}