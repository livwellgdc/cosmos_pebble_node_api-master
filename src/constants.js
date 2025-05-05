import config from './config/config'

const FILE_TYPE = ['.csv', '.xls', '.xlsx'];

const HTTP_STATUS = {
    "OK": 200
}

const DEFAULT_STATUS_LIST = {
    "STATUS_ACTIVE": 1,
    "STATUS_INACTIVE": 0,
    "STATUS_DELETED": 2,
};

const STATUS_ACTIVE = 'active';
const STATUS_INACTIVE = 'inactive';
const STATUS_PENDING = 'pending';
const STATUS_DELETE = 'deleted';
const STATUS_APPROVED = 'approved';
const STATUS_REJECTED = 'rejected';

const COMMON_CONST = {
    "IMAGE_LIST_LIMIT": 100,
    "IS_DOWNLOAD": 1,
    "IS_ONLY_TRAILING_PATH": 1,
};

const ADMIN_TYPE = [
    "admin",
    "super_admin",
]

const CRON_SCHEDULE = {
    "DELETE_USER_TOKEN_DAYS": 7,
};

const USER_TYPE = {
    "TYPE_ADMIN": "admin",
    "TYPE_SUPER_ADMIN": "super_admin",
    "TYPE_MEMBER": "member"
}

const PERMISSION_TYPE = {
    "USER_TYPE_BASED": "user",
    "MODULE_TYPE_BASED": "module"
}

const MODULE_LIST = {
    "PROFILE": "profile",
    "CLIENT": "client-agency",
    "PACKAGE": "package",
    "PROPOSAL_STAGE": "proposal-stage",
    "SALES_INDUSTRY": "sales-industry",
    "PROPOSAL": 'proposal',
    "INVOICE": "invoice",
    "LEADS": "leads-master",
    "TARGET": "target-master",
    "BUDGET": "budget",
    "INFLUENCER" : "influencer"
}

const ACTION_LIST = {
    "READ": "read",
    "ADD": "add",
    "UPDATE": "update",
    "PUBLISH": "publish",
    "UNPUBLISH": "unpublish",
    "DELETE": "delete",
}

const APPROVAL_TYPE = {
    "CLIENT": "client",
    "PROPOSAL": "proposal",
    "BUDGET": "budget",
}

const BUDGET_CATEGORY = [
    { id: 'shoot_editorial', label: 'Shoot Editorial' },
    { id: 'shoot_branded', label: 'Shoot Branded' },
    { id: 'subscription', label: 'Subscription' },
    { id: 'travel', label: 'Travel' },
    { id: 'bd', label: 'BD' },
    { id: 'others', label: 'Others' }
]

const SUPPORT_EMAIL = "iln.backend@timesinternet.in";

const ILN_DETAIL = {
    "gst_num": config.cleartax.gstNumber,
    "supplier_state": "HARYANA",
    "supplier_state_gst_code": "06",
    "gst_per": 18.00,
    "cgst_per": 9.00,
    "sgst_per": 9.00,
    "trade_discount_per": 5.00,
    "pan_num": "AAOCM5326J",
    "tan_num": "BLRM37385F",
    "cin": "U74999KA2021PTC146740",
    "trade_name": "Mensa Brand Technologies Pvt Ltd",
    "address1": "D1-404, Tulip Petals",
    "address2": "Pataudi Road, Sector-89",
    "city": "Gurugram",
    "pincode": "122505", //-- gurgoan pincode    
    "trade_logo_url": "https://img.mensxp.com/media/ro/mensa-logo.png",
    "incorp_offc_address": "Vistar Builders and Developers, #120, 14th Main, 5th Sector HSR Layout Bengaluru Karnataka India-560102",
    "bank": "HSBC",
    "account_num": "073-646911-001",
    "ifsc": "HSBC0560002",
    "contact_num": "8867779602",
    "email": "gstcompliance@mensabrands.com",
}

const SOCIAL_PLATFORM = [
    { id: "instagram", label: "Instagram" },
    { id: "facebook", label: "Facebook" },
    { id: "twitter", label: "Twitter" },
    { id: "other", label: "Other" },
]

const SOCIAL_POST_TYPE = [
    { id: "post", label: "Post" },
    { id: "story", label: "Story" },
    { id: "reel", label: "Reel" },
    { id: "other", label: "Other" },
]

const PROPOSAL_TYPE = [
    { id: "CPD", label: "CPD" },
    { id: "CPM", label: "CPM" },
    { id: "HYPP", label: "HYPP" },
    { id: "text", label: "Text" },
    { id: "video", label: "Video" },
    { id: "others", label: "Others" },
    { id: "whitelabel", label: "White Label" },
    { id: "digitalcover", label: "Digital Cover" }
]


module.exports = {
    FILE_TYPE,
    HTTP_STATUS,
    DEFAULT_STATUS_LIST,
    COMMON_CONST,
    ADMIN_TYPE,
    CRON_SCHEDULE,
    USER_TYPE,
    STATUS_ACTIVE,
    STATUS_INACTIVE,
    STATUS_PENDING,
    STATUS_DELETE,
    PERMISSION_TYPE,
    MODULE_LIST,
    ACTION_LIST,
    APPROVAL_TYPE,
    SUPPORT_EMAIL,
    STATUS_APPROVED,
    STATUS_REJECTED,
    ILN_DETAIL,
    BUDGET_CATEGORY,
    SOCIAL_PLATFORM,
    SOCIAL_POST_TYPE,
    PROPOSAL_TYPE
}