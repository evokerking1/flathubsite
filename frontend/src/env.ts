import { MainCategory, SortBy } from "./codegen"

const BASE_URI: string = process.env.NEXT_PUBLIC_API_BASE_URI

const APPSTREAM_URL: string = `${BASE_URI}/appstream`
export const EOL_REBASE_URL = (id: string): string =>
  `${BASE_URI}/eol/rebase/${id}`
export const APP_DETAILS = (id: string, locale: string): string =>
  `${APPSTREAM_URL}/${id}?locale=${locale}`
export const SUMMARY_DETAILS = (id: string): string =>
  `${BASE_URI}/summary/${id}`
export const STATS_DETAILS = (id: string): string => `${BASE_URI}/stats/${id}`

export const POPULAR_LAST_MONTH_URL = (
  page?: number,
  per_page?: number,
  locale?: string,
): string => {
  const result = new URLSearchParams()

  if (page) {
    result.append("page", page.toString())
  }

  if (per_page) {
    result.append("per_page", per_page.toString())
  }

  if (locale) {
    result.append("locale", locale)
  }
  return `${BASE_URI}/collection/popular?${result.toString()}`
}

export const TRENDING_LAST_TWO_WEEKS_URL = (
  page?: number,
  per_page?: number,
  locale?: string,
): string => {
  const result = new URLSearchParams()

  if (page) {
    result.append("page", page.toString())
  }

  if (per_page) {
    result.append("per_page", per_page.toString())
  }

  if (locale) {
    result.append("locale", locale)
  }
  return `${BASE_URI}/collection/trending?${result.toString()}`
}

export const RECENTLY_UPDATED_URL = (
  page?: number,
  per_page?: number,
  locale?: string,
): string => {
  const result = new URLSearchParams()

  if (page) {
    result.append("page", page.toString())
  }

  if (per_page) {
    result.append("per_page", per_page.toString())
  }

  if (locale) {
    result.append("locale", locale)
  }
  return `${BASE_URI}/collection/recently-updated?${result.toString()}`
}

export const RECENTLY_ADDED_URL = (
  page?: number,
  per_page?: number,
  locale?: string,
): string => {
  const result = new URLSearchParams()

  if (page) {
    result.append("page", page.toString())
  }

  if (per_page) {
    result.append("per_page", per_page.toString())
  }

  if (locale) {
    result.append("locale", locale)
  }
  return `${BASE_URI}/collection/recently-added?${result.toString()}`
}

export const VERIFIED_APPS_URL = (
  page?: number,
  per_page?: number,
  locale?: string,
): string => {
  const result = new URLSearchParams()

  if (page) {
    result.append("page", page.toString())
  }

  if (per_page) {
    result.append("per_page", per_page.toString())
  }

  if (locale) {
    result.append("locale", locale)
  }
  return `${BASE_URI}/collection/verified?${result.toString()}`
}

export const MOBILE_APPS_URL = (
  page?: number,
  per_page?: number,
  locale?: string,
): string => {
  const result = new URLSearchParams()

  if (page) {
    result.append("page", page.toString())
  }

  if (per_page) {
    result.append("per_page", per_page.toString())
  }

  if (locale) {
    result.append("locale", locale)
  }
  return `${BASE_URI}/collection/mobile?${result.toString()}`
}

export const CATEGORY_URL = (
  category: keyof typeof MainCategory,
  page?: number,
  per_page?: number,
  locale?: string,
  exclude_subcategories?: string[],
  sort_by?: keyof typeof SortBy,
): string => {
  const result = new URLSearchParams()

  if (page) {
    result.append("page", page.toString())
  }

  if (per_page) {
    result.append("per_page", per_page.toString())
  }

  if (locale) {
    result.append("locale", locale)
  }

  if (exclude_subcategories) {
    result.append("exclude_subcategories", exclude_subcategories.join(","))
  }

  if (sort_by) {
    result.append("sort_by", sort_by)
  }

  return `${BASE_URI}/collection/category/${category}?${result.toString()}`
}

export const SUBCATEGORY_URL = (
  category: keyof typeof MainCategory,
  subcategory: string[],
  page?: number,
  per_page?: number,
  locale?: string,
  exclude_subcategories?: string[],
  sort_by?: keyof typeof SortBy,
): string => {
  const result = new URLSearchParams()

  if (subcategory.length > 0) {
    subcategory.map((s) => result.append("subcategory", s))
  }

  if (page) {
    result.append("page", page.toString())
  }

  if (per_page) {
    result.append("per_page", per_page.toString())
  }

  if (locale) {
    result.append("locale", locale)
  }

  if (exclude_subcategories) {
    result.append("exclude_subcategories", exclude_subcategories.join(","))
  }

  if (sort_by) {
    result.append("sort_by", sort_by)
  }

  return `${BASE_URI}/collection/category/${category}/subcategories?${result.toString()}`
}

export const ADDONS_URL = (appid: string): string =>
  `${BASE_URI}/addon/${appid}`

export const APPS_IN_PREVIEW_COUNT: number = 12

export const LOGIN_PROVIDERS_URL: string = `${BASE_URI}/auth/login`

export const VENDING_CONFIG_URL = `${BASE_URI}/vending/config`

export const IS_PRODUCTION: boolean =
  process.env.NEXT_PUBLIC_IS_PRODUCTION === "true"

// Stripe can handle at most an 8 digit single transaction
export const STRIPE_MAX_PAYMENT = 999999.99
// Flathub enforces a minimum payment amount of $1 to cover fees
export const FLATHUB_MIN_PAYMENT = 2

export const APP_VERIFICATION_STATUS = (id: string): string =>
  `${BASE_URI}/verification/${id}/status`

export const APPS_OF_THE_WEEK_URL = (date: string) =>
  `${BASE_URI}/app-picks/apps-of-the-week/${date}`
export const APP_OF_THE_DAY_URL = (date: string) =>
  `${BASE_URI}/app-picks/app-of-the-day/${date}`
