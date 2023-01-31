// Routes AUTHENTICATE
export const URL_BACK_AUTHENTICATE = "/login_check";
export const URL_BACK_DISABLE_USER = "/authenticated/user/getDisableById/";

// Routes PRODUITS²
export const URL_BACK_PRODUCTS = "/public/produit/";
export const URL_BACK_PRODUCT_BY_ID = "/public/produit/find/";
export const URL_BACK_PRODUCTS_BY_IDS = "/public/produit/findProductsByIds";
export const URL_BACK_PRODUCT_FILTER = "/public/produit/filter/";
export const URL_BACK_SUGGESTIONS = "/public/produit/suggestions/";
export const URL_BACK_PRODUCT_TREND = "/public/produit/isTrend";
export const URL_BACK_PRODUCT_BEST_PROMO = "/public/produit/bestPromo";
export const URL_BACK_PROMOTIONS = "/public/produit/promotions";

// Routes BLOG
export const URL_BACK_BLOG = '/public/blog/';
export const URL_BACK_COUNT_BLOG = '/public/blog/count/'
export const URL_BACK_BLOG_FIND = '/public/blog/find/';
export const URL_BACK_BLOG_LAST_ARTICLE = '/public/blog/lastArticle';
export const URL_BACK_CREATE_BLOG = '/admin/blog/add'
export const URL_BACK_DELETE_BLOG = '/admin/blog/remove/'
export const URL_BACK_UPDATE_BLOG = '/admin/blog/update'
export const URL_BACK_MULTIPLE_DELETE_BLOG = '/admin/blog/multipleRemove'

// Routes USER
export const URL_BACK_USERS ="/admin/user/"
export const URL_BACK_REGISTER = "/public/user/register";
export const URL_BACK_USER_BY_MAIL = "/public/user/getUserByMail";
export const URL_SEND_MAIL_FORGOT_PASSWORD = "/reset-password/sendMail";
export const URL_RESET_PASSWORD = "/reset-password/reset/";
export const URL_USER_STATS_REGISTER = "/public/user/stats/register/"
export const URL_USER_STATS_COUNT = "/admin/user/stats/count"

// Routes CONTACT
export const URL_BACK_COUNT_CONTACT ='/admin/contact/countNotFinish'
export const URL_BACK_ADD_CONTACT = "/public/contact/add";
export const URL_BACK_CONTACT = "/admin/contact/";
export const URL_BACK_REMOVE_CONTACT = "/admin/contact/remove/";
export const URL_BACK_MULTIPLE_REMOVE_CONTACT = "/admin/contact/multipleRemove";
export const URL_BACK_CONTACT_UPDATE_ISFINISH = "/admin/contact/update/isFinish/"
export const URL_BACK_MULTIPLE_CONTACT_UPDATE_ISFINISH = "/admin/contact/multipleUpdate/isFinish/";

// Routes CATEGORIE
export const URL_BACK_CATEGORIES = "/public/categorie/"
export const URL_BACK_CATEGORIES_ADMIN = "/admin/categorie/forAdmin"
export const URL_BACK_CATEGORIES_CREATE = "/admin/categorie/create"
export const URL_BACK_CATEGORIES_UPDATE = "/admin/categorie/update"
export const URL_BACK_CATEGORIES_DELETE = "/admin/categorie/delete/"
export const URL_BACK_CATEGORIES_MULTIPLE_DELETE = "/admin/categorie/multipleDelete"
export const URL_BACK_CATEGORIES_TREND = "/public/categorie/isTrend"
export const URL_BACK_CATEGORIES_UPDATE_TREND = "/admin/categorie/updateIsTrend/"
export const URL_BACK_CATEGORIES_MULTIPLE_UPDATE_TREND = "/admin/categorie/multipleUpdateIsTrend/"
export const URL_BACK_CATEGORIES_UPDATE_AVAILABLE = "/admin/categorie/updateAvailable/"
export const URL_BACK_CATEGORIES_MULTIPLE_UPDATE_AVAILABLE = "/admin/categorie/multipleUpdateAvailable/"

// Route TAILLE
export const URL_BACK_SIZE = "/public/size/";
export const URL_BACK_SIZE_PRODUCT = "/public/size/allSizeProduct/";
export const URL_BACK_TYPE_TAILLE = "/public/size/typeTaille/";

// Routes ADRESSES
export const URL_BACK_ADRESSE_FIND_BY_USER = "/authenticated/adresse/findByUser/"
export const URL_BACK_ADRESSE_CREATE = "/authenticated/adresse/create"
export const URL_BACK_ADRESSE_UPDATE = "/authenticated/adresse/update"
export const URL_BACK_ADRESSE_DELETE = "/authenticated/adresse/delete/"

// Route TAILLE
export const URL_BACK_NOTATION_UPDATE = "/authenticated/notation/noteUser/"

// Routes PROMOTIONS
export const URL_BACK_PROMOS = "/public/promotion/";
export const URL_BACK_DELETE_PROMOTION = "/admin/promotion/remove/"
export const URL_BACK_MULTIPLE_DELETE_PROMOTION = "/admin/promotion/multipleRemove"
export const URL_BACK_CREATE_PROMOTION = "/admin/promotion/add/"
export const URL_BACK_UPDATE_PROMOTION = "/admin/promotion/update/"

// Routes ADMIN PRODUITS
export const URL_BACK_COUNT_PRODUCT ='/public/produit/count'
export const URL_BACK_CREATE_PRODUCT = '/admin/produit/add'
export const URL_BACK_DELETE_PRODUCT = '/admin/produit/remove/'
export const URL_BACK_UPDATE_PRODUCT = '/admin/produit/update'
export const URL_BACK_UPDATE_TREND_PRODUCT = '/admin/produit/update/trend/'
export const URL_BACK_UPDATE_MULTIPLE_TREND_PRODUCT = '/admin/produit/update/multipleTrend/'
export const URL_BACK_UPDATE_AVAILABLE_PRODUCT = '/admin/produit/update/available/'
export const URL_BACK_UPDATE_MULTIPLE_AVAILABLE_PRODUCT = '/admin/produit/update/multipleAvailable/'
export const URL_BACK_MULTIPLE_DELETE_PRODUCT = '/admin/produit/multipleRemove'

// ADMIN CODE PROMO
export const URL_BACK_CODE_PROMOS ='/admin/code/promo/findForAdmin'
export const URL_BACK_CODE_PROMOS_CREATE ='/admin/code/promo/create'
export const URL_BACK_CODE_PROMOS_UPDATE ='/admin/code/promo/update'
export const URL_BACK_CODE_PROMOS_DELETE ='/admin/code/promo/delete/'
export const URL_BACK_CODE_PROMOS_MULTIPLE_REMOVE ='/admin/code/promo/multipleRemove'

export const URL_BACK_CODE_PROMOS_FIND_BY_NAME ='/authenticated/code/promo/findByName'

// Routes ADMIN USER
export const URL_BACK_RECENT_USER ='/admin/user/recentUser'
export const URL_BACK_CREATE_USER = '/admin/user/create/'
export const URL_BACK_DELETE_USER = '/admin/user/delete/'
export const URL_BACK_UPDATE_USER = '/authenticated/user/update/'
export const URL_BACK_MULTIPLE_DELETE_USER = '/admin/user/multipleDelete'

// Routes ADMIN COMMANDES
export const URL_BACK_RECENT_COMMANDE='/admin/commande/recentCommande'
export const URL_BACK_COUNT_COMMANDE ='/admin/commande/countMonth'
export const URL_BACK_UPDATE_ORDER = '/admin/commande/update/'
export const URL_BACK_UPDATE_ORDER_DETAILS = '/public/produitInCommande/single_order/update/'
export const URL_BACK_CANCEL_ORDER = '/admin/commande/cancel/'
export const URL_BACK_DELETE_ORDER_DETAILS = '/produitInCommande/single_order/delete/'
export const URL_BACK_MULTIPLE_CANCEL_ORDER = '/admin/commande/multipleCancel'

// Routes COMMANDES CLIENT
export const URL_BACK_SINGLE_ORDER = "/authenticated/produitInCommande/single_order/";
export const URL_BACK_LIST_ORDERS = "/authenticated/commande/byUser/";
export const URL_BACK_COMMANDES ="/admin/commande/"

export const ULR_BACK_CREATE_COMMANDES = "/authenticated/commande/createCommande"

export const URL_STRIPE_PAYMENTINTENT = "stripe/paymentIntent/"
export const URL_STRIPE_CLIENTSECRET = "stripe/clientSecret/"
export const URL_UPDATE_PAYMENTMETHOD = "stripe/setPaymentIntent/PaymentMethod/"
export const URL_CONFIRM_PAYMENT = "stripe/confirmPayment/"

export const URL_STRIPE_PAYMENTINTENT_UPDATE_AMOUNT = "stripe/setPaymentIntent/amount/"
export const URL_STRIPE_PAYMENTINTENT_CANCEL = "stripe/cancelPaymentIntent/"

export const URL_PRODUITBYSIZE_UPDATE_IN_CART = "authenticated/produit/by/size/updateStockInCart/"

export const URL_PRODUIT_BY_SEARCHBAR = "/public/produit/bySearchBar/"
