/**
 * Generated by orval 🍺
 * Do not edit manually.
 * Flathub API
 * OpenAPI spec version: 0.1.0
 */

export type TransactionSummaryStatus =
  (typeof TransactionSummaryStatus)[keyof typeof TransactionSummaryStatus]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TransactionSummaryStatus = {
  new: "new",
  retry: "retry",
  pending: "pending",
  success: "success",
  cancelled: "cancelled",
} as const
