const { PHASE_PRODUCTION_BUILD } = require("next/constants")
const { i18n } = require("./next-i18next.config")
const { withSentryConfig } = require("@sentry/nextjs")

const CONTENT_SECURITY_POLICY = `
  base-uri 'self' ${process.env.NEXT_PUBLIC_SITE_BASE_URI};
  default-src 'none';
  form-action 'none';
  script-src 'self' 'sha256-cd+HpnSsLaEz1lKWBNn+k+xOe1m2p5ZgfjoyNvHy9eU=' https://webstats.gnome.org https://js.stripe.com https://js.stripe.com https://maps.googleapis.com;
  style-src 'self' 'unsafe-inline' https://dl.flathub.org;
  font-src 'self';
  connect-src 'self' https://flathub.org https://flathub-vorarbeiter.apps.openshift.gnome.org/api/ https://webstats.gnome.org https://api.stripe.com https://maps.googleapis.com https://o467221.ingest.sentry.io/api/6610580/;
  img-src 'self' https://dl.flathub.org https://webstats.gnome.org https://avatars.githubusercontent.com https://gitlab.com https://gitlab.gnome.org https://lh3.googleusercontent.com https://secure.gravatar.com https://invent.kde.org data:;
  frame-ancestors 'none';
  frame-src 'self' https://*.js.stripe.com https://js.stripe.com https://hooks.stripe.com;
`

  .replace(/\s{2,}/g, " ")
  .trim()

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

const buildId = process.env.GITHUB_SHA

if (!buildId) {
  console.info(
    "No GITHUB_SHA environment variable found. Using the default Next.js buildId.",
  )
}

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = (phase) => ({
  output: "standalone",
  experimental: {
    scrollRestoration: true,
  },
  serverExternalPackages: ["@resvg/resvg-js"],
  i18n,
  cacheHandler:
    process.env.NODE_ENV === "production"
      ? require.resolve("./cache-handler.mjs")
      : undefined,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flathub.org",
      },
      {
        protocol: "https",
        hostname: "dl.flathub.org",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "gitlab.com",
      },
      {
        protocol: "https",
        hostname: "gitlab.gnome.org",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "invent.kde.org",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/apps/category/All/:page*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/apps",
        destination: "/",
        permanent: true,
      },
      {
        source: "/apps/search/:q",
        destination: "/apps/search?q=:q",
        permanent: true,
      },
      {
        source: "/apps/:path*/flatpakhttps",
        destination:
          "flatpak+https://dl.flathub.org/repo/appstream/:path*.flatpakref",
        permanent: false,
      },
      {
        source: "/apps/details/:path*",
        destination: "/apps/:path*",
        permanent: true,
      },
      {
        source: "/apps/collection/verified",
        destination: "/apps/collection/verified/1",
        permanent: true,
      },
      {
        source: "/apps/collection/recently-updated",
        destination: "/apps/collection/recently-updated/1",
        permanent: true,
      },
      {
        source: "/apps/collection/recently-added",
        destination: "/apps/collection/recently-added/1",
        permanent: true,
      },
      {
        source: "/apps/collection/popular",
        destination: "/apps/collection/popular/1",
        permanent: true,
      },
      {
        source: "/apps/collection/trending",
        destination: "/apps/collection/trending/1",
        permanent: true,
      },
      {
        source: "/apps/collection/mobile",
        destination: "/apps/collection/mobile/1",
        permanent: true,
      },
      {
        source: "/pipelines",
        destination: "/builds",
        permanent: true,
      },
      {
        source: "/pipelines/:buildId",
        destination: "/builds/:buildId",
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "Deny",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), cross-origin-isolated=(), display-capture=(), document-domain=(), encrypted-media=(), execution-while-not-rendered=(), execution-while-out-of-viewport=(), fullscreen=(), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), navigation-override=(), payment=(self), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=()",
          },
          {
            key: "Content-Security-Policy",
            value:
              /**
               * For testing adjustments use https://addons.mozilla.org/en-GB/firefox/addon/laboratory-by-mozilla/
               * (which allows you to overwrite the Content Security Policy of a particular website).
               *
               * Do not add `unsafe-inline` to `script-src`, as we are using dangerouslySetInnerHTML in a few places,
               * which makes us vulnerable to arbitrary code execution if we receive unsanitized data from the APIs.
               *
               * For the development environment we either need to maintain a separate CSP or disable it altogether.
               * This is because it makes use of `eval` and other features that we don't want to allow in the production environment.
               */
              phase === PHASE_PRODUCTION_BUILD ? CONTENT_SECURITY_POLICY : "",
          },
        ],
      },
      {
        source: "/",
        headers: [
          {
            key: "Surrogate-Control",
            value:
              "max-age=900, stale-while-revalidate=31557600, stale-if-error=31557600",
          },
        ],
      },
      {
        source: "/apps/(collection|category)/:path*",
        headers: [
          {
            key: "Surrogate-Control",
            value:
              "max-age=900, stale-while-revalidate=31557600, stale-if-error=31557600",
          },
        ],
      },
      {
        source: "/apps/:path",
        headers: [
          {
            key: "Surrogate-Control",
            value:
              "max-age=900, stale-while-revalidate=31557600, stale-if-error=31557600",
          },
        ],
      },
    ]
  },
  generateBuildId: buildId
    ? async () => {
        return buildId
      }
    : undefined,
})

const sentryExports = (phase) => {
  return {
    ...nextConfig(phase),
    sentry: {
      // For all available options, see:
      // https://github.com/getsentry/sentry-webpack-plugin#options

      org: "flathub",
      project: "frontend",

      // Only print logs for uploading source maps in CI
      silent: !process.env.CI,

      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

      // Upload a larger set of source maps for prettier stack traces (increases build time)
      widenClientFileUpload: true,

      // Automatically annotate React components to show their full name in breadcrumbs and session replay
      reactComponentAnnotation: {
        enabled: true,
      },

      // Hides source maps from generated client bundles
      hideSourceMaps: true,

      // Automatically tree-shake Sentry logger statements to reduce bundle size
      disableLogger: true,
    },
  }
}

module.exports = async (phase) => {
  /**
   * @type {import('next').NextConfig}
   */
  return process.env.ENABLE_SENTRY === "true"
    ? withSentryConfig(sentryExports(phase), sentryWebpackPluginOptions)
    : nextConfig(phase)
}
