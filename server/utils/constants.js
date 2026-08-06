export const BOARDS = {
  inventory_og: 18400257085,
  inventory: 18423287724
}

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

export const GetBoardQuery = `
    query getBoardItems($boardId: ID!, $limit: Int) {
        boards(ids: [$boardId]) {
            items_page(limit: $limit) {
            cursor
            items {
                id
                name
                column_values {
                    id
                    text
                    value
                }
            }
            }
        }
    }`

export const GetItemQuery = `
    query getItem($itemId: [ID!]) {
        items(ids: $itemId) {
            id
            name
            board {
                id
                name
            }
            column_values {
                id
                text
                value
            }
        }
    }`

export const CreateItemQuery = `
    mutation CreateNewItem($boardId: ID!, $stockNumber: String!, $columnData: JSON) {
        create_item(
            board_id: $boardId
            item_name: $stockNumber
            column_values: $columnData
        ) {
            id    
        }
    }`

export const AddFileQuery = `
    mutation AddFileToItem($itemId: ID!, $fileColumnId: String!, $file: File!) {
        add_file_to_column(
            item_id: $itemId
            column_id: $fileColumnId
            file: $file
        ) {
            id
            name 
            url    
        }
    }`

export const UpdateItemQuery = `
    mutation UpdateMultipleColumnValues($boardId: ID!, $itemId: ID!, $columnData: JSON!) {
        change_multiple_column_values(
            board_id: $boardId
            item_id: $itemId
            column_values: $columnData
        ) {
            id
        }
    }`

export const GetAssetQuery = `
    query GetAsset($assetId: ID!) {
        assets(ids: [$assetId]) {
            id
            name
            public_url
        }
    }`