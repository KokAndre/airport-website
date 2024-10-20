export enum AppRoutes {
    Home = '/home',
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
    LiveWeather = '/about-us/live-weather',
    MissionAndVisionStatement = '/about-us/mission-and-vision-statement',
    MapAndLocation = '/pilot-information/map-and-location',
    AirfieldInformation = '/pilot-information/airfield-information',
    JoiningAndLanding = '/pilot-information/joining-and-landing',
    LiveWeatherUpdates = '/pilot-information/live-weather-updates',
    OtherAirfields = '/pilot-information/other-airfields',
    ReportingHazards = '/pilot-information/reporting-hazards',
    SurroundingAirfields = '/pilot-information/surrounding-airfields',
    Projects = '/projects',
    Classifieds = '/merch/classifieds',


    HangarRenting = '/property-for-sale/hangar-renting',
    HangarsForSale = '/property-for-sale/hangars-for-sale',

    MembersWelcome = '/members/welcome',
    MembersFAQS = '/members/faqs',


    PropertyForSaleBase = '/property-for-sale/',
    
    GalleryAdmin='/admin/edit-gallery',
}

export enum Endpoints {
    // BaseURL = 'https://www.tedderfield.co.za/api',
    BaseURL = 'http://localhost/teddefield-airfield',
    // GalleryImagesBaseURL = 'https://www.tedderfield.co.za/api/gallery/images/',
    GalleryImagesBaseURL = 'http://localhost/teddefield-airfield/gallery/images/',
    Register = '/members/register.php',
    Login = '/members/login.php',
    CheckWhitelisting = '/members/get-member.php',
    SlingCraftWeatherWidget = 'https://www.slingaircraft.com/live-cam/data.php',
    UploadImage = '/gallery/upload-image.php',
    CreateGallerySection = '/gallery/create-section.php',
    GetGalleryData = '/gallery/get-gallery-data.php',
    DeleteImage = '/gallery/delete-image.php',
    DeleteSection = '/gallery/delete-section.php',
    EditSection = '/gallery/edit-section.php'
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
    PDFModal = 'pdfModal',
    ConfirmationModal = 'confirmationModal',
    CaptureGallerySectionTitle = 'captureGallerySectionTitle'
}

export enum ModalOutcomeOptions {
    Close = 'close',
    Cancel = 'cancel',
    Confirm = 'confirm',
    Update = 'update'
}