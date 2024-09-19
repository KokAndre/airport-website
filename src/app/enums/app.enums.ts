export enum AppRoutes {
    Welcome = '/welcome',
    ContactUs = '/contact-us',
    Login = '/login',
    Register = '/register',
    // Airfield = '/gallery/airfield',
    // Dane = '/gallery/dane',
    // FlyAways = '/gallery/fly-aways',
    // Stories = '/gallery/stories',
    GalleryLanding='/gallery',
    FAQS = '/training-and-renewals/faqs',
    Info = '/training-and-renewals/info',
    Instructors = '/training-and-renewals/instructors',
    NeedHelp = '/training-and-renewals/need-help',
    ClubHouse = '/about-us/club-house',
    FollowUs = '/about-us/follow-us',
    TedderfieldHistory = '/about-us/tedderfield-history',
    MapAndLocation = '/pilot-information/map-and-location',
    AirfieldInformation = '/pilot-information/airfield-information',
    JoiningAndLanding = '/pilot-information/joining-and-landing',
    LiveWeatherUpdates = '/pilot-information/live-weather-updates',
    OtherAirfields = '/pilot-information/other-airfields',
    ReportingHazards = '/pilot-information/reporting-hazards',
    SurroundingAirfields = '/pilot-information/surrounding-airfields',
    Projects = '/projects',
    Classifieds = '/merch/classifieds',
    HangarRenting = '/merch/hangar-renting',
    HangarsForSale = '/merch/hangars-for-sale',
}

export enum Endpoints {
    BaseURL = 'https://ppldevelopment.co.za/teddefield-airfield/members', // TODO: Implement correct endpoints
    Register = '/register.php',
    Login = '/login.php',
}

export enum EncryptionKeys {
    LoginPasswordEncryptionKey = 'dhey27rfc89037fsnsdju3ijdp0bvvg4',
    TokenEncryptionKey = 'wert24356vjkol85cvsjeyufifised6p'
}

export enum SessionStorageKeys {
    Token = 'token'
}

export enum ModalTypes {
    InformationModal = 'informationModal',
    PDFModal = 'pdfModal'
}