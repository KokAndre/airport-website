export enum AppRoutes {
    Home = '/home',
    Login = '/login',
    Register = '/register',
    FAQS = '/training-and-renewals/faqs',
    Info = '/training-and-renewals/info',
    Instructors = '/training-and-renewals/instructors',
    NeedHelp = '/training-and-renewals/need-help',
    ClubHouse = '/about-us/club-house',
    FollowUs = '/about-us/follow-us',
    TedderfieldHistory = '/about-us/tedderfield-history',
    LiveWeather = '/about-us/live-weather',
    GalleryLanding = '/about-us/gallery',
    ContactUs = '/about-us/contact-us',
    MissionAndVisionStatement = '/about-us/mission-and-vision-statement',
    MapAndLocation = '/pilot-information/map-and-location',
    AirfieldInformation = '/pilot-information/airfield-information',
    JoiningAndLanding = '/pilot-information/joining-and-landing',
    LiveWeatherUpdates = '/pilot-information/live-weather-updates',
    OtherAirfields = '/pilot-information/other-airfields',
    AirfieldHazards = '/pilot-information/airfield-hazards',
    SurroundingAirfields = '/pilot-information/surrounding-airfields',
    CircuitProcedures = '/pilot-information/circuit-procedures',
    Projects = '/projects',
    Classifieds = '/merch/classifieds',
    StandsForSale = '/property-for-sale/stands-for-sale',
    HangarsForSale = '/property-for-sale/hangars-for-sale',
    MembersWelcome = '/members/welcome',
    MembersFAQS = '/members/faqs',
    ReportAnIssue = '/members/report-an-issue',
    GettingToKnowYou = '/members/getting-to-know-you',
    GreeningTedderfield = '/members/greening-tedderfield',
    SellMyHanger = '/members/sell-my-hanger',
    SellMyStand = '/members/sell-my-stand',
    YourTrusteed = '/members/your-trustees',
    MembersDocuments = '/members/documents',
    SubmitClassifieds = '/members/classifieds',
    WhosWhoInTheZoo = '/members/whos-who-in-the-tedderfield-zoo',
    ManageProfile = '/members/manage-profile',

    MembersAdmin = '/admin/manage-members',
    GalleryAdmin = '/admin/edit-gallery',
    FollowUsRequests = '/admin/follow-us-requests',
    ReportIssueRequests = '/admin/report-issue-requests',
    GreeningTedderfieldRequests = '/admin/greening-tedderfield-requests',
    ManageHomeScreenBanner = '/admin/manage-home-screen-banner',
    ManageHangersForSale = '/admin/manage-hangers-for-sale',
    ManageStandsForSale = '/admin/manage-stands-for-sale',
    ManageInterestInHangersForSale = '/admin/manage-interest-in-hanger-for-sale',
    ManageInterestInStandsForSale = '/admin/manage-interest-in-stand-for-sale',
    ManageLevies = '/admin/manage-levies',
    ManageMembersDocuments = '/admin/manage-members-documents',
    ManageClassifiedsForSale = '/admin/manage-classifieds-for-sale',
    ManageInterestInClassifiedsForSale = '/admin/manage-interest-in-classifieds-for-sale'
}

export enum Endpoints {
    BaseURL = 'https://www.tedderfield.co.za/api',
    HomePageBannerBaseUrl = 'https://www.tedderfield.co.za/api/home/home-page-banner/',
    GalleryImagesBaseURL = 'https://www.tedderfield.co.za/api/gallery/images/',
    HangersForSaleBaseURL = 'https://www.tedderfield.co.za/api/hangers-for-sale/documents/',
    StandsForSaleBaseURL = 'https://www.tedderfield.co.za/api/stands-for-sale/documents/',
    ClassifiedsImagesBaseURL = 'https://www.tedderfield.co.za/api/classifieds/images/',
    GettingoKnowYouImagesBaseURL = 'https://www.tedderfield.co.za/api/getting-to-know-you/images/',
    // MembersDocumentsBaseEndpoint = 'https://www.tedderfield.co.za/api/file-system/',
    Register = '/members/register.php',
    Login = '/members/login.php',
    CheckWhitelisting = '/members/get-member.php',
    SendPasswordResetEmail = '/members/email-reset-password.php',
    SubmitPasswordReset = '/members/submit-reset-password.php',
    SlingCraftWeatherWidget = 'https://www.slingaircraft.com/live-cam/data.php',
    UploadImage = '/gallery/upload-images.php',
    UploadImageAsFile = '/gallery/upload-image-file.php',
    CreateGallerySection = '/gallery/create-section.php',
    GetGalleryData = '/gallery/get-gallery-data.php',
    DeleteImage = '/gallery/delete-image.php',
    DeleteSection = '/gallery/delete-section.php',
    EditSection = '/gallery/edit-section.php',
    SubmitFollowUsRequest = '/follow-us/submit-follow-up.php',
    GetFollowUsData = '/follow-us/get-follow-us-data.php',
    DeleteFollowUsItem = '/follow-us/delete-follow-us-item.php',
    MarkFollowUsAsFollowedUp = '/follow-us/update-follow-us-item.php',
    ReportIssue = '/report-issue/submit-report-issue.php',
    GetReportIssueData = '/report-issue/get-report-issue-data.php',

    UpdateReportIssueRequestType = '/report-issue/update-issue-request-type.php',
    UpdateReportIssueStatus = '/report-issue/update-issue-status.php',
    UpdateReportIssueData = '/report-issue/update-issue-data.php',

    DeleteReportIssueItem = '/report-issue/delete-report-issue-item.php',
    SubmitGreeninTedderfield = '/greening-tedderfield/submit-greening-tedderfield.php',
    GetGreeningTedderfieldData = '/greening-tedderfield/get-greening-tedderfield-data.php',
    MarkGreeningTedderfieldAsFollowedUp = '/greening-tedderfield/update-greening-tedderfield-item.php',
    DeleteGreeningTedderfieldItem = '/greening-tedderfield/delete-greening-tedderfield-item.php',
    GetHomePageBanner = '/home/get-home-page-banner.php',
    DeleteHomePageBanner = '/home/delete-home-page-banner.php',
    AddNewHomeScreenBanner = '/home/add-home-page-banner.php',
    AddNewHomeScreenBannerAsFile = '/home/add-home-page-banner-file.php',
    GetHangersForSales = '/hangers-for-sale/get-hangers-for-sale.php',
    SubmitSellMyHanger = '/hangers-for-sale/submit-hanger-for-sale.php',
    UploadSellMyHangerTitleDocument = '/hangers-for-sale/upload-title-document.php',
    uploadSellMyHangerFloorPlanDocument = '/hangers-for-sale/upload-floor-plan-document.php',
    uploadSellMyHangerImages = '/hangers-for-sale/upload-hanger-for-sale-image.php',
    GetHangerTitleDocument = '/hangers-for-sale/get-title-document.php',
    GetHangerFloorPlanDocument = '/hangers-for-sale/get-floor-plan-document.php',
    SubmitInterestedInHanger = '/hangers-for-sale/submit-interested-in-hanger.php',
    DeleteHangerForSaleItem = '/hangers-for-sale/delete-hanger-for-sale-item.php',
    GetInterestedInHangerData = '/hangers-for-sale/get-interested-in-hanger-data.php',
    MarkInterestedInHangerAsFollowedUp = '/hangers-for-sale/update-interested-in-hanger-item.php',
    DeleteInterestedInHangerItem = '/hangers-for-sale/delete-interested-in-hanger-item.php',
    GetStandsForSales = '/stands-for-sale/get-stands-for-sale.php',
    SubmitSellMyStand = '/stands-for-sale/submit-stand-for-sale.php',
    UploadSellMyStandTitleDocument = '/stands-for-sale/upload-title-document.php',
    uploadSellMyStandImages = '/stands-for-sale/upload-stand-for-sale-image.php',
    GetStandTitleDocument = '/stands-for-sale/get-title-document.php',
    SubmitInterestedInStand = '/stands-for-sale/submit-interested-in-stand.php',
    DeleteStandForSaleItem = '/stands-for-sale/delete-stand-for-sale-item.php',
    GetInterestedInStandData = '/stands-for-sale/get-interested-in-stand-data.php',
    MarkInterestedInStandAsFollowedUp = '/stands-for-sale/update-interested-in-stand-item.php',
    DeleteInterestedInStandItem = '/stands-for-sale/delete-interested-in-stand-item.php',

    // Levies
    GetLeviesData = '/levies/get-levies.php',
    AddLeviItem = '/levies/add-levie-item.php',
    UpdateLeviesData = '/levies/update-levies.php',
    DeleteLevieItem = '/levies/delete-levie-item.php',

    // Members Files
    GetMemebersDocuments = '/file-system/get-folders.php',
    GetMemebersDocumentBase64 = '/file-system/get-document.php',
    UploadMembersDocument = '/file-system/upload-document.php',
    CreateMembersDocumentsFolder = '/file-system/add-folder.php',
    DeletMembersDocumentsFile = '/file-system/delete-file.php',
    DeletMembersDocumentsFolder = '/file-system/delete-folder.php',
    RenameMembersDocumentsFolder = '/file-system/rename-folder.php',

    // Classifieds
    ClassifiedsSubmitItem = '/classifieds/submit-item-for-sale.php',
    ClassifiedsUploadImage = '/classifieds/upload-item-for-sale-image.php',
    GetClassifiedsData = '/classifieds/get-classifieds-data.php',
    SubmitInterestedInClassifiedsItem = '/classifieds/submit-interested-in-item.php',
    DeleteClassifiedsForSaleItem = '/classifieds/delete-classifieds-for-sale-item.php',
    GetInterestedInClassifiedsData = '/classifieds/get-interested-in-classifieds-data.php',
    MarkInterestedInClassifiedsAsFollowedUp = '/classifieds/update-interested-in-classifieds-item.php',
    DeleteInterestedInClassifiedsItem = '/classifieds/delete-interested-in-classifieds-item.php',

    // Getting To Know YOu
    SubmitGettingToKnowYou = '/getting-to-know-you/submit-user-data.php',
    UpdateGettingToKnowYou = '/getting-to-know-you/update-user-data.php',
    UploadGettingToKnowYouImage = '/getting-to-know-you/upload-image.php',
    GetGettingToKnowYouUserData = '/getting-to-know-you/get-getting-to-know-you-user-data.php',
    GetGettingToKnowYouData = '/getting-to-know-you/get-getting-to-know-you-data.php',

    // Manage Members
    GetAllMembers = '/members/get-members.php',
    DeleteMember = '/members/delete-members.php',
    UpdateMemberData = '/members/update-member-data.php',
    AddNewMember = '/member/add-member.php'
}

export enum EncryptionKeys {
    LoginPasswordEncryptionKey = 'dhey27rfc89037fsnsdju3ijdp0bvvg4',
    TokenEncryptionKey = 'wert24356vjkol85cvsjeyufifised6p'
}

export enum SessionStorageKeys {
    Token = 'token',
    // HasViewedBanner = 'hasViewedBanner'
}

export enum LocalStorageKeys {
    PrefferedWelcomeEmail = 'prefferedWelcomeEmail'
}

export enum ModalTypes {
    InformationModal = 'informationModal',
    PDFModal = 'pdfModal',
    ConfirmationModal = 'confirmationModal',
    CaptureGallerySectionTitle = 'captureGallerySectionTitle',
    SearchAndSecueModal = 'searchAndSecueModal',
    BannerModal = 'bannerModal',
    InterestedInPropertyModal = 'interestedInPropertyModal',
    AddFolderModal = 'addFolderModal',
    EditReportIssueData = 'editReportIssueData',
    CaptureMember = 'captureMember'
}

export enum ModalOutcomeOptions {
    Close = 'close',
    Cancel = 'cancel',
    Confirm = 'confirm',
    Update = 'update'
}