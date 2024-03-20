/* eslint-disable @typescript-eslint/no-namespace */

export namespace Shopify {
  export namespace Order {
    export interface Created {
      id: number;
      admin_graphql_api_id: string;
      app_id: null;
      browser_ip: null;
      buyer_accepts_marketing: boolean;
      cancel_reason: string;
      cancelled_at: string;
      cart_token: null;
      checkout_id: null;
      checkout_token: null;
      client_details: null;
      closed_at: null;
      confirmation_number: null;
      confirmed: boolean;
      contact_email: string;
      created_at: string;
      currency: Currency;
      current_subtotal_price: string;
      current_subtotal_price_set: Set;
      current_total_additional_fees_set: null;
      current_total_discounts: string;
      current_total_discounts_set: Set;
      current_total_duties_set: null;
      current_total_price: string;
      current_total_price_set: Set;
      current_total_tax: string;
      current_total_tax_set: Set;
      customer_locale: string;
      device_id: null;
      discount_codes: any[];
      email: string;
      estimated_taxes: boolean;
      financial_status: string;
      fulfillment_status: string;
      landing_site: null;
      landing_site_ref: null;
      location_id: null;
      merchant_of_record_app_id: null;
      name: string;
      note: null;
      note_attributes: any[];
      number: number;
      order_number: number;
      order_status_url: string;
      original_total_additional_fees_set: null;
      original_total_duties_set: null;
      payment_gateway_names: string[];
      phone: null;
      po_number: null;
      presentment_currency: Currency;
      processed_at: null;
      reference: null;
      referring_site: null;
      source_identifier: null;
      source_name: string;
      source_url: null;
      subtotal_price: string;
      subtotal_price_set: Set;
      tags: string;
      tax_exempt: boolean;
      tax_lines: any[];
      taxes_included: boolean;
      test: boolean;
      token: string;
      total_discounts: string;
      total_discounts_set: Set;
      total_line_items_price: string;
      total_line_items_price_set: Set;
      total_outstanding: string;
      total_price: string;
      total_price_set: Set;
      total_shipping_price_set: Set;
      total_tax: string;
      total_tax_set: Set;
      total_tip_received: string;
      total_weight: number;
      updated_at: string;
      user_id: null;
      billing_address: Address;
      customer: Customer;
      discount_applications: any[];
      fulfillments: any[];
      line_items: LineItem[];
      payment_terms: null;
      refunds: any[];
      shipping_address: Address;
      shipping_lines: ShippingLine[];
    }
  }

  export interface Address {
    first_name: null | string;
    address1: string;
    phone: string;
    city: string;
    zip: string;
    province: string;
    country: string;
    last_name: null | string;
    address2: null;
    company: null | string;
    latitude?: null;
    longitude?: null;
    name: string;
    country_code: string;
    province_code: string;
    id?: number;
    customer_id?: number;
    country_name?: string;
    default?: boolean;
  }

  export enum Currency {
    Usd = 'USD',
  }

  export interface Set {
    shop_money: Money;
    presentment_money: Money;
  }

  export interface Money {
    amount: string;
    currency_code: Currency;
  }

  export interface Customer {
    id: number;
    email: string;
    created_at: null;
    updated_at: null;
    first_name: string;
    last_name: string;
    state: string;
    note: null;
    verified_email: boolean;
    multipass_identifier: null;
    tax_exempt: boolean;
    phone: null;
    email_marketing_consent: EmailMarketingConsent;
    sms_marketing_consent: null;
    tags: string;
    currency: Currency;
    tax_exemptions: any[];
    admin_graphql_api_id: string;
    default_address: Address;
  }

  export interface EmailMarketingConsent {
    state: string;
    opt_in_level: null;
    consent_updated_at: null;
  }

  export interface LineItem {
    id: number;
    admin_graphql_api_id: string;
    attributed_staffs: AttributedStaff[];
    current_quantity: number;
    fulfillable_quantity: number;
    fulfillment_service: string;
    fulfillment_status: null;
    gift_card: boolean;
    grams: number;
    name: string;
    price: string;
    price_set: Set;
    product_exists: boolean;
    product_id: number;
    properties: any[];
    quantity: number;
    requires_shipping: boolean;
    sku: string;
    taxable: boolean;
    title: string;
    total_discount: string;
    total_discount_set: Set;
    variant_id: number;
    variant_inventory_management: string;
    variant_title: null;
    vendor: null;
    tax_lines: any[];
    duties: any[];
    discount_allocations: any[];
  }

  export interface AttributedStaff {
    id: string;
    quantity: number;
  }

  export interface ShippingLine {
    id: number;
    carrier_identifier: null;
    code: null;
    discounted_price: string;
    discounted_price_set: Set;
    phone: null;
    price: string;
    price_set: Set;
    requested_fulfillment_service_id: null;
    source: string;
    title: string;
    tax_lines: any[];
    discount_allocations: any[];
  }
}
