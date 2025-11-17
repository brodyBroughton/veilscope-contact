# Veilscope Contact Form

A Next.js 16 single-page contact experience for Veilscope with server-side email delivery through Nodemailer. The app provides accessibility-friendly navigation, responsive styling, and validation on both the client and server to ensure dependable submissions.

## Features
- **Contact workflow** with name, email, topic, and message fields, client-side validation, submission feedback, and loading states before sending to the API route.【F:app/page.js†L5-L76】【F:app/page.js†L101-L173】
- **Email delivery** via a server-side route that validates payloads and sends messages through an SMTP transporter using environment variables.【F:app/api/contact/route.js†L1-L63】【F:app/api/contact/route.js†L66-L83】
- **Responsive layout and accessibility** including skip links, keyboard-focus styling, and mobile navigation drawer backed by the shared CSS theme.【F:app/page.js†L80-L193】【F:app/contact.css†L1-L120】
- **Brand-aligned UI** leveraging custom typography, header/footer chrome, and sectioned layouts to match the marketing site.【F:app/layout.js†L1-L27】【F:app/page.js†L181-L230】【F:app/contact.css†L120-L260】

## Tech Stack
- [Next.js 16](https://nextjs.org/) (App Router)
- React 19
- Nodemailer for SMTP email delivery
- Vanilla CSS with custom design tokens

## Getting Started

### Prerequisites
- Node.js 18.18+ (aligned with Next.js 16 requirements)
- npm (bundled with Node.js)

### Installation
```bash
npm install
```

### Local Development
```bash
npm run dev
```
The app will be available at [http://localhost:3000](http://localhost:3000).

### Production Build
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

## Environment Variables
Define the following variables (for example in a `.env.local` file) to enable SMTP delivery:

| Variable | Description |
| --- | --- |
| `SMTP_HOST` | SMTP server host. |
| `SMTP_PORT` | SMTP server port (defaults to `465` if not set). |
| `SMTP_SECURE` | Set to `false` to disable TLS; defaults to secure mode. |
| `SMTP_USER` | Username for SMTP authentication. |
| `SMTP_PASS` | Password for SMTP authentication. |
| `FROM_NAME` | Friendly sender name shown in outgoing emails. |
| `FROM_EMAIL` | Sender email address used in the `from` header. |
| `SUPPORT_TO` | Destination address that receives contact form submissions. |

## API
- **POST `/api/contact`** — Accepts `{ name, email, topic, message }` JSON payloads. Performs server-side validation, then sends the email via Nodemailer using the configured SMTP transport. Returns `200` on success or `4xx/5xx` JSON errors on validation or delivery issues.【F:app/api/contact/route.js†L8-L83】

## Project Structure
- `app/layout.js` — Global metadata, font loading, and root HTML shell.【F:app/layout.js†L1-L27】
- `app/page.js` — Contact page UI and client-side submission logic.【F:app/page.js†L1-L230】
- `app/api/contact/route.js` — API route handling validation and email sending.【F:app/api/contact/route.js†L1-L83】
- `app/contact.css` — Shared design system and page styling for layout, navigation, and forms.【F:app/contact.css†L1-L260】

## Accessibility and UX Notes
- Includes a “Skip to main content” link, focus-visible outlines, and ARIA labeling for navigation menus to support keyboard and screen-reader users.【F:app/page.js†L78-L119】【F:app/contact.css†L15-L45】
- Displays contextual error and success messaging near the submit button and disables inputs while requests are in-flight to prevent duplicate submissions.【F:app/page.js†L11-L76】【F:app/page.js†L141-L174】

## Deployment
The app is compatible with standard Next.js hosting providers. Ensure all environment variables are configured on the target platform before deploying, then run `npm run build` followed by `npm run start` or use your platform’s build pipeline.
