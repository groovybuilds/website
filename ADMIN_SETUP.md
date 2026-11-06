# Private website dashboard

`/admin` has server-side access checks, a private Google OAuth login, encrypted HttpOnly session cookies, and no public analytics endpoint. No credentials or sample statistics are committed. The page fails closed until sign-in is configured.

## Connect the owner's account and Analytics

1. Use the existing GA4 property for groovybuilds.com, or create one if none exists. Copy its numeric property ID and the web stream's `G-...` measurement ID. Confirm the stream is for this website.
2. In the same Google Cloud project, enable **Google Analytics Data API**. Configure the OAuth consent screen and a Web Application OAuth client with `openid`, `email`, and `https://www.googleapis.com/auth/analytics.readonly`. If using Testing mode, add the owner as a test user. Use an Internal app only if available for the owner's Workspace organization. Follow Google's publishing/verification requirements if expanding beyond test users.
3. Register this exact redirect URI: `https://groovybuilds.com/api/admin/callback`. Use the canonical domain when signing in. Add a separate localhost URI for development only.
4. Obtain the owner's stable Google subject ID (`sub`) from Google's authenticated OpenID Connect userinfo endpoint using the owner's Google account (for example via Google's OAuth Playground with the OpenID/email scopes). This is an account ID, not an email or access token. Verify the account before setting it. There is no first-user registration or public claim flow.
5. Set these environment variables in the **Vercel project serving groovybuilds.com**:

| Variable                        | Value                                                          |
| ------------------------------- | -------------------------------------------------------------- |
| `GOOGLE_CLIENT_ID`              | Web OAuth client ID                                            |
| `GOOGLE_CLIENT_SECRET`          | OAuth client secret, server-only                               |
| `ADMIN_GOOGLE_SUB`              | Owner's exact stable Google account ID                         |
| `ADMIN_SESSION_SECRET`          | 32 cryptographically random bytes encoded as 64 hex characters |
| `ADMIN_APP_ORIGIN`              | `https://groovybuilds.com`                                     |
| `GA_PROPERTY_ID`                | Numeric GA4 property ID                                        |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Web stream measurement ID beginning `G-`                       |

Generate the session secret using a password manager or `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. Enter secrets directly in hosting settings, never in chat, source code, or screenshots. Redeploy after setting variables; the public measurement ID is build-time configuration.

6. In GA4's web stream enhanced measurement settings, disable automatic page-view tracking **based on browser history events**, because the website sends one explicit page_view on navigation. Disable automatic form interactions for the JobTread form to avoid treating generic form submissions as confirmed leads. Existing GA installations outside this repository must also be checked for duplicate tracking.
7. Give the owner's Google account at least Viewer access to this property. Sign in at `/admin`; a different Google account must be denied. Sessions last up to one hour, with no long-lived refresh token stored.
8. Verify public page visits and the custom `contact_form_start`, `phone_click`, and `email_click` events in GA4 Realtime/DebugView. Visit multiple pages through client-side navigation and browser back. Check each visit is counted once. The dashboard reports complete days through yesterday; allow for Google processing time.

## What is measured

Active visitors, sessions, page views, engagement rate, daily sessions, top source/medium pairs, top pages, and contact-action event counts. No entered form fields or contact details are sent by our event code. Page locations retain only path and known campaign parameters. No fabricated history: collection begins when GA is configured, unless an existing property already has data. Tracking protection and consent settings affect coverage.

JobTread confirmed submissions, ad spend, booked jobs, and revenue are **not** available in this version. Form starts and phone/email link clicks are explicitly labeled as actions rather than completed leads. Advertising tags remain separate from GA. Review the site's privacy/consent setup for the tracking actually enabled before activation.

## Validation

- `node --test tests/admin-session.test.mjs`: encryption, tampering, expired sessions, wrong accounts, missing configuration, key rotation, state comparisons.
- `node --test tests/admin-routes.test.mjs`: production-server access and response tests; requires an existing build and available port 3017.
- `npm exec eslint -- app/admin app/api/admin components/WebsiteAnalytics.tsx lib`
- `npm run build -- --webpack`

Live OAuth consent, actual Analytics permissions, event collection, and real report values cannot be verified without the owner's configuration. Rotate `ADMIN_SESSION_SECRET` to invalidate all sessions. Changing `ADMIN_GOOGLE_SUB` immediately rejects sessions for the previous account. Credentials remain on the server; access tokens are encrypted in cookies and never returned in rendered dashboard content.
