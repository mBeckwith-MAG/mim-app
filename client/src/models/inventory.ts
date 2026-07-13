import type { ColVal, Item } from "../types/inventory"
import { Columns } from "../constants/inventory"

export class InventoryItem {
  public uid: string
  public name: string
  public subtasks: ColVal | null
  public assigned_person: ColVal | null
  public start_date: ColVal | null
  public status: ColVal | null
  public priority: ColVal | null
  public store: ColVal | null
  public form_notes: ColVal | null
  public attachments: ColVal | null
  public car_type: ColVal | null
  public new_origin: ColVal | null
  public used_origin: ColVal | null
  public wholesale_transaction_method: ColVal | null
  public auction_transaction_method: ColVal | null
  public title_or_payoff: ColVal | null
  public title_status: ColVal | null
  public payoff_amount: ColVal | null
  public stock_number: ColVal | null
  public stock_numbers: ColVal | null
  public good_till_date: ColVal | null
  public lien_holder: ColVal | null
  public per_diam: ColVal | null
  public payment_tracking: ColVal | null
  public check_status: ColVal | null
  public reversal: ColVal | null
  public inventory_notes: ColVal | null
  public end_date: ColVal | null
  public submission_link: ColVal | null
  public return_email: ColVal | null
  public assigned_controller: ColVal | null
  public vendor_created: ColVal | null
  public vehicle_count: ColVal | null
  constructor(item: Item) {
    this.uid = item.id
      this.name = item.name
      this.subtasks = item.column_values.find(i => i.id === Columns.SUBTASKS) || null
      this.assigned_person = item.column_values.find(i => i.id === Columns.ASSIGNED_PERSON) || null
      this.start_date = item.column_values.find(i => i.id === Columns.START_DATE) || null
      this.status = item.column_values.find(i => i.id === Columns.STATUS) || null
      this.priority = item.column_values.find(i => i.id === Columns.PRIORITY) || null
      this.store = item.column_values.find(i => i.id === Columns.STORE) || null
      this.form_notes = item.column_values.find(i => i.id === Columns.FORM_NOTES) || null
      this.attachments = item.column_values.find(i => i.id === Columns.ATTACHMENTS) || null
      this.car_type = item.column_values.find(i => i.id === Columns.CAR_TYPE) || null
      this.new_origin = item.column_values.find(i => i.id === Columns.NEW_ORIGIN) || null
      this.used_origin = item.column_values.find(i => i.id === Columns.USED_ORIGIN) || null
      this.wholesale_transaction_method = item.column_values.find(i => i.id === Columns.WHOLESALE_TRANSACTION_METHOD) || null
      this.auction_transaction_method = item.column_values.find(i => i.id === Columns.AUCTION_TRANSACTION_METHOD) || null
      this.title_or_payoff = item.column_values.find(i => i.id === Columns.TITLE_OR_PAYOFF) || null
      this.title_status = item.column_values.find(i => i.id === Columns.TITLE_STATUS) || null
      this.payoff_amount = item.column_values.find(i => i.id === Columns.PAYOFF_AMOUNT) || null
      this.stock_number = item.column_values.find(i => i.id === Columns.STOCK_NUMBER) || null
      this.stock_numbers = item.column_values.find(i => i.id === Columns.STOCK_NUMBERS) || null
      this.good_till_date = item.column_values.find(i => i.id === Columns.GOOD_TILL_DATE) || null
      this.lien_holder = item.column_values.find(i => i.id === Columns.LIEN_HOLDER) || null
      this.per_diam = item.column_values.find(i => i.id === Columns.PER_DIAM) || null
      this.payment_tracking = item.column_values.find(i => i.id === Columns.PAYMENT_TRACKING) || null
      this.check_status = item.column_values.find(i => i.id === Columns.CHECK_STATUS) || null
      this.reversal = item.column_values.find(i => i.id === Columns.REVERSAL) || null
      this.inventory_notes = item.column_values.find(i => i.id === Columns.INVENTORY_NOTES) || null
      this.end_date = item.column_values.find(i => i.id === Columns.END_DATE) || null
      this.submission_link = item.column_values.find(i => i.id === Columns.SUBMISSION_LINK) || null
      this.return_email = item.column_values.find(i => i.id === Columns.RETURN_EMAIL) || null
      this.assigned_controller = item.column_values.find(i => i.id === Columns.ASSIGNED_CONTROLLER) || null
      this.vendor_created = item.column_values.find(i => i.id === Columns.VENDOR_CREATED) || null
      this.vehicle_count = item.column_values.find(i => i.id === Columns.VEHICLE_COUNT) || null
  }
}