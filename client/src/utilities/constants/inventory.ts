export const BASE_URL = 'http://localhost:8080/api/'
export const BOARDS = {
  inventory_og: 18400257085,
  inventory: 18423287724
}

export const Stores = [
  {
    name: 'Audi Tampa',
    abbr: 'AT',
  },
  {
    name: 'BMW Sarasota',
    abbr: 'BMWS',
  },
  {
    name: 'BMW Tampa',
    abbr: 'BMWT',
  },
  {
    name: 'Kia Wesley Chapel',
    abbr: 'KWC',
  },
  {
    name: 'Lambo Sarasota',
    abbr: 'LOS',
  },
  {
    name: 'Land Rover Tampa',
    abbr: 'LRT',
  },
  {
    name: 'Maserati Tampa',
    abbr: 'MT',
  },
  {
    name: 'Mini-BMW Wesley Chapel',
    abbr: 'MINI',
  },
  {
    name: 'Morgan Chevy',
    abbr: 'MC',
  },
  {
    name: 'Nissan of Clearwater',
    abbr: 'NOC',
  },
  {
    name: 'Porsche Tampa',
    abbr: 'PT',
  },
  {
    name: 'Subaru North Tampa',
    abbr: 'SONT',
  },
  {
    name: 'Tampa Bay Motor Cars',
    abbr: 'TBMC',
  },
  {
    name: 'VW North Tampa',
    abbr: 'VWNT',
  },
  {
    name: 'Wesley Chapel Nissan',
    abbr: 'WCN',
  },
]

export const Columns = {
  PRIORITY: 'color_mm1rnnyt',
  ATTACHMENTS: 'file30p9d1mi',
  FORM_NOTES: 'long_texthgdlm5pj',
  NEW_ORIGIN: 'single_selectlvve0cy',
  USED_ORIGIN: 'single_select9eztorv',
  WHOLESALE_TRANSACTION_METHOD: 'single_selectmncalku',
  AUCTION_TRANSACTION_METHOD: 'single_selectpbbeiof',
  TITLE_OR_PAYOFF: 'single_select1h3ilkm',
  TITLE_STATUS: 'single_selecteuuhmw9',
  PAYOFF_AMOUNT: 'numberi3tr3ou7',
  GOOD_TILL_DATE: 'datexdlnpy7n',
  LIEN_HOLDER: 'short_textx0819yu8',
  PER_DIAM: 'number9da8ds1t',
  PAYMENT_TRACKING: 'text_mm1q6b7p',
  CHECK_STATUS: 'color_mm3bze8g',
  INVENTORY_NOTES: 'long_text_mm3fwbvx',
  STATUS: 'status',
  STORE: 'multi_selecti0j9cnxp',
  CREATED_DATE: 'date_mm4fys0d',
  START_DATE: 'date_mm14724t',
  END_DATE: 'date_mm14nqa2',
  SUBMIT_BY: 'short_textqtlua9rk',
  RETURN_EMAIL: 'emailn7wlj90n',
  SUBMISSION_LINK: 'wf_edit_link_cckuk',
  CAR_TYPE: 'single_selectdn7oazf',
  ASSIGNED_PERSON: 'person',
  ASSIGNED_CONTROLLER: 'multiple_person_mm395r9f',
  VENDOR_CREATED: 'boolean_mm3cp6sg',
  REVERSAL: 'boolean_mm29gzzj',
  SUBTASKS: 'subtasks_mm0zvda4',
}

export const carTypeOptions = [
  'New',
  'Used'
]

export const statusOptions = [
  'Working',
  'Reject',
  'Done'
]

export const newOriginOptions = [
  'Factory',
  'Dealer trade',
  'Ground Loaner'
]

export const usedOriginOptions = [
  'Grounded Loaner',
  'Inter-company Purchase / Sale',
  'Lease Buyout',
  'Lease passthrough',
  'Lease Purchase (for Inventory)',
  'Pre-Trade',
  'Street Purchase',
  'Wholesale/Auction Purchase',
  'Wholesale/Auction Sale'
]

export const titleOrPayoffOptions = [
  'Title',
  'Payoff'
]

export const SaleOptions = ['Single', 'Bulk']
export const TitleOptions = ['Paper', 'EFT', 'OOS']
export const PurchaseOptions = [...SaleOptions, 'Dealshield', 'Enterprise']