// Routes AUTHENTICATE
export const URL_BACK_AUTHENTICATE = "/login_check";
export const URL_BACK_DISABLE_USER = "/user/getDisableById/";

// Routes PRODUITS
export const URL_BACK_PRODUCTS = "/produit/";
export const URL_BACK_PRODUCT_BY_ID = "/produit/find/";
export const URL_BACK_PRODUCT_FILTER = "/produit/filter/";
export const URL_BACK_SUGGESTIONS = "/produit/suggestions/";
export const URL_BACK_PRODUCT_TREND = "/produit/isTrend";
export const URL_BACK_PRODUCT_BEST_PROMO = "/produit/bestPromo";
export const URL_BACK_PROMOTIONS = "/produit/promotions";

// Routes BLOG
export const URL_BACK_BLOG = '/blog/';
export const URL_BACK_COUNT_BLOG = '/blog/count/'
export const URL_BACK_BLOG_FIND = '/blog/find/';
export const URL_BACK_BLOG_LAST_ARTICLE = '/blog/lastArticle';
export const URL_BACK_CREATE_BLOG = '/blog/add'
export const URL_BACK_DELETE_BLOG = '/blog/remove/'
export const URL_BACK_UPDATE_BLOG = '/blog/update'
export const URL_BACK_MULTIPLE_DELETE_BLOG = '/blog/multipleRemove'

// Routes USER
export const URL_BACK_USERS ="/user/"
export const URL_BACK_REGISTER = "/user/register";
export const URL_BACK_USER_BY_MAIL = "/user/getUserByMail";
export const URL_SEND_MAIL_FORGOT_PASSWORD = "/reset-password/sendMail";
export const URL_RESET_PASSWORD = "/reset-password/reset/";
export const URL_USER_STATS_REGISTER = "user/stats/register/"
export const URL_USER_STATS_COUNT = "user/stats/count"

// Routes CONTACT
export const URL_BACK_COUNT_CONTACT ='/contact/countNotFinish'
export const URL_BACK_ADD_CONTACT = "/contact/add";
export const URL_BACK_CONTACT = "/contact/";
export const URL_BACK_REMOVE_CONTACT = "/contact/remove/";
export const URL_BACK_MULTIPLE_REMOVE_CONTACT = "/contact/multipleRemove";
export const URL_BACK_CONTACT_UPDATE_ISFINISH = "/contact/update/isFinish/"
export const URL_BACK_MULTIPLE_CONTACT_UPDATE_ISFINISH = "/contact/multipleUpdate/isFinish/";

// Routes CATEGORIE
export const URL_BACK_CATEGORIES = "/categorie/"
export const URL_BACK_CATEGORIES_ADMIN = "/categorie/forAdmin"
export const URL_BACK_CATEGORIES_CREATE = "/categorie/create"
export const URL_BACK_CATEGORIES_UPDATE = "/categorie/update"
export const URL_BACK_CATEGORIES_DELETE = "/categorie/delete/"
export const URL_BACK_CATEGORIES_MULTIPLE_DELETE = "/categorie/multipleDelete"
export const URL_BACK_CATEGORIES_TREND = "/categorie/isTrend"
export const URL_BACK_CATEGORIES_UPDATE_TREND = "/categorie/updateIsTrend/"
export const URL_BACK_CATEGORIES_MULTIPLE_UPDATE_TREND = "/categorie/multipleUpdateIsTrend/"
export const URL_BACK_CATEGORIES_UPDATE_AVAILABLE = "/categorie/updateAvailable/"
export const URL_BACK_CATEGORIES_MULTIPLE_UPDATE_AVAILABLE = "/categorie/multipleUpdateAvailable/"

// Route TAILLE
export const URL_BACK_SIZE_PRODUCT = "/size/allSizeProduct/";
export const URL_BACK_TYPE_TAILLE = "/size/typeTaille/";

// Routes PROMOTIONS
export const URL_BACK_PROMOS = "/promotion/";
export const URL_BACK_DELETE_PROMOTION = "/promotion/remove/"
export const URL_BACK_MULTIPLE_DELETE_PROMOTION = "/promotion/multipleRemove"
export const URL_BACK_CREATE_PROMOTION = "/promotion/add/"
export const URL_BACK_UPDATE_PROMOTION = "promotion/update/"

// Routes ADMIN PRODUITS
export const URL_BACK_COUNT_PRODUCT ='/produit/count'
export const URL_BACK_CREATE_PRODUCT = '/produit/add'
export const URL_BACK_DELETE_PRODUCT = '/produit/remove/'
export const URL_BACK_UPDATE_PRODUCT = '/produit/update'
export const URL_BACK_UPDATE_TREND_PRODUCT = '/produit/update/trend/'
export const URL_BACK_UPDATE_MULTIPLE_TREND_PRODUCT = '/produit/update/multipleTrend/'
export const URL_BACK_UPDATE_AVAILABLE_PRODUCT = '/produit/update/available/'
export const URL_BACK_UPDATE_MULTIPLE_AVAILABLE_PRODUCT = '/produit/update/multipleAvailable/'
export const URL_BACK_MULTIPLE_DELETE_PRODUCT = '/produit/multipleRemove'

// Routes ADMIN USER
export const URL_BACK_CREATE_USER = '/user/create/'
export const URL_BACK_DELETE_USER = '/user/delete/'
export const URL_BACK_UPDATE_USER = '/user/update/'
export const URL_BACK_MULTIPLE_DELETE_USER = '/user/multipleDelete'

// Routes ADMIN COMMANDES
export const URL_BACK_COUNT_COMMANDE ='/commande/count'
export const URL_BACK_UPDATE_ORDER = '/commande/update/'
export const URL_BACK_UPDATE_ORDER_DETAILS = '/produitInCommande/single_order/update/'
export const URL_BACK_CANCEL_ORDER = '/commande/cancel/'
export const URL_BACK_DELETE_ORDER_DETAILS = '/produitInCommande/single_order/delete/'
export const URL_BACK_MULTIPLE_CANCEL_ORDER = '/commande/multipleCancel'

// Routes COMMANDES CLIENT
export const URL_BACK_SINGLE_ORDER = "/produitInCommande/single_order/";
export const URL_BACK_LIST_ORDERS = "/commande/byUser/";
export const URL_BACK_COMMANDES ="/commande/"
