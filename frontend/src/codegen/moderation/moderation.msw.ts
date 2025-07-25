/**
 * Generated by orval 🍺
 * Do not edit manually.
 * Flathub API
 * OpenAPI spec version: 0.1.0
 */
import { faker } from "@faker-js/faker"

import { HttpResponse, delay, http } from "msw"

import { ModerationRequestType } from ".././model"
import type {
  ModerationApp,
  ModerationAppsResponse,
  ReviewRequestResponse,
  SubmitReviewModerationRequestsIdReviewPost200,
} from ".././model"

export const getGetModerationAppsModerationAppsGetResponseMock = (
  overrideResponse: Partial<ModerationAppsResponse> = {},
): ModerationAppsResponse => ({
  apps: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    appid: faker.string.alpha({ length: { min: 10, max: 20 } }),
    is_new_submission: faker.datatype.boolean(),
    updated_at: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        `${faker.date.past().toISOString().split(".")[0]}Z`,
        null,
      ]),
      undefined,
    ]),
    request_types: faker.helpers.arrayElements(
      Object.values(ModerationRequestType),
    ),
  })),
  apps_count: faker.number.int({
    min: undefined,
    max: undefined,
    multipleOf: undefined,
  }),
  ...overrideResponse,
})

export const getGetModerationAppModerationAppsAppIdGetResponseMock = (
  overrideResponse: Partial<ModerationApp> = {},
): ModerationApp => ({
  requests: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    id: faker.number.int({
      min: undefined,
      max: undefined,
      multipleOf: undefined,
    }),
    app_id: faker.string.alpha({ length: { min: 10, max: 20 } }),
    created_at: `${faker.date.past().toISOString().split(".")[0]}Z`,
    build_id: faker.number.int({
      min: undefined,
      max: undefined,
      multipleOf: undefined,
    }),
    job_id: faker.number.int({
      min: undefined,
      max: undefined,
      multipleOf: undefined,
    }),
    is_outdated: faker.datatype.boolean(),
    request_type: faker.helpers.arrayElement(
      Object.values(ModerationRequestType),
    ),
    request_data: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        {
          keys: {
            [faker.string.alphanumeric(5)]: faker.helpers.arrayElement([
              faker.string.alpha({ length: { min: 10, max: 20 } }),
              Array.from(
                { length: faker.number.int({ min: 1, max: 10 }) },
                (_, i) => i + 1,
              ).map(() => ({})),
              faker.datatype.boolean(),
              null,
            ]),
          },
          current_values: {
            [faker.string.alphanumeric(5)]: faker.helpers.arrayElement([
              faker.string.alpha({ length: { min: 10, max: 20 } }),
              Array.from(
                { length: faker.number.int({ min: 1, max: 10 }) },
                (_, i) => i + 1,
              ).map(() => ({})),
              faker.datatype.boolean(),
              null,
            ]),
          },
        },
        null,
      ]),
      undefined,
    ]),
    is_new_submission: faker.datatype.boolean(),
    handled_by: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    handled_at: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        `${faker.date.past().toISOString().split(".")[0]}Z`,
        null,
      ]),
      undefined,
    ]),
    is_approved: faker.helpers.arrayElement([
      faker.helpers.arrayElement([faker.datatype.boolean(), null]),
      undefined,
    ]),
    comment: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
  })),
  requests_count: faker.number.int({
    min: undefined,
    max: undefined,
    multipleOf: undefined,
  }),
  ...overrideResponse,
})

export const getSubmitReviewRequestModerationSubmitReviewRequestPostResponseMock =
  (
    overrideResponse: Partial<ReviewRequestResponse> = {},
  ): ReviewRequestResponse => ({
    requires_review: faker.datatype.boolean(),
    ...overrideResponse,
  })

export const getSubmitReviewModerationRequestsIdReviewPostResponseMock =
  (): SubmitReviewModerationRequestsIdReviewPost200 =>
    faker.helpers.arrayElement([
      {
        github_issue_url: faker.string.alpha({ length: { min: 10, max: 20 } }),
      },
      null,
    ])

export const getGetModerationAppsModerationAppsGetMockHandler = (
  overrideResponse?:
    | ModerationAppsResponse
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<ModerationAppsResponse> | ModerationAppsResponse),
) => {
  return http.get("*/moderation/apps", async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === "function"
            ? await overrideResponse(info)
            : overrideResponse
          : getGetModerationAppsModerationAppsGetResponseMock(),
      ),
      { status: 200, headers: { "Content-Type": "application/json" } },
    )
  })
}

export const getGetModerationAppModerationAppsAppIdGetMockHandler = (
  overrideResponse?:
    | ModerationApp
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<ModerationApp> | ModerationApp),
) => {
  return http.get("*/moderation/apps/:appId", async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === "function"
            ? await overrideResponse(info)
            : overrideResponse
          : getGetModerationAppModerationAppsAppIdGetResponseMock(),
      ),
      { status: 200, headers: { "Content-Type": "application/json" } },
    )
  })
}

export const getSubmitReviewRequestModerationSubmitReviewRequestPostMockHandler =
  (
    overrideResponse?:
      | ReviewRequestResponse
      | ((
          info: Parameters<Parameters<typeof http.post>[1]>[0],
        ) => Promise<ReviewRequestResponse> | ReviewRequestResponse),
  ) => {
    return http.post("*/moderation/submit_review_request", async (info) => {
      await delay(1000)

      return new HttpResponse(
        JSON.stringify(
          overrideResponse !== undefined
            ? typeof overrideResponse === "function"
              ? await overrideResponse(info)
              : overrideResponse
            : getSubmitReviewRequestModerationSubmitReviewRequestPostResponseMock(),
        ),
        { status: 200, headers: { "Content-Type": "application/json" } },
      )
    })
  }

export const getSubmitReviewModerationRequestsIdReviewPostMockHandler = (
  overrideResponse?:
    | SubmitReviewModerationRequestsIdReviewPost200
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0],
      ) =>
        | Promise<SubmitReviewModerationRequestsIdReviewPost200>
        | SubmitReviewModerationRequestsIdReviewPost200),
) => {
  return http.post("*/moderation/requests/:id/review", async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === "function"
            ? await overrideResponse(info)
            : overrideResponse
          : getSubmitReviewModerationRequestsIdReviewPostResponseMock(),
      ),
      { status: 200, headers: { "Content-Type": "application/json" } },
    )
  })
}
export const getModerationMock = () => [
  getGetModerationAppsModerationAppsGetMockHandler(),
  getGetModerationAppModerationAppsAppIdGetMockHandler(),
  getSubmitReviewRequestModerationSubmitReviewRequestPostMockHandler(),
  getSubmitReviewModerationRequestsIdReviewPostMockHandler(),
]
