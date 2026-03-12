# Movie ETL Frontend

A React + Vite frontend for displaying movie data from a protected backend API. This project uses JWT-based authorization and automatically refreshes the access token when it is missing or close to expiration.

## Features

- Built with **React**, **TypeScript**, and **Vite**
- Fetches movie data from a backend API
- Sends JWT in the `Authorization` header
- Detects token expiration using the JWT `exp` claim
- Refreshes token before expiry
- Retries failed requests once after a `401 Unauthorized`
- Keeps token logic separated from UI code

## Project Structure

```text
src/
  services/
    authService.ts     # token storage, parsing, refresh logic
    apiFetch.ts        # reusable authenticated fetch wrapper
  App.tsx              # main UI
  main.tsx             # app entry point
```

## Prerequisites

Make sure you have:

- **Node.js** 18+
- **npm** or **yarn**
- A backend API that provides:
  - `GET /movies`
  - `POST /auth/token` (or your equivalent token endpoint)

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:3000
```

> In Vite, environment variables must start with `VITE_`.

3. Start the development server:

```bash
npm run dev
```

## How Authentication Works

This project does not use a traditional login page.

Instead, the frontend requests a short-lived access token from the backend when:

- no token is stored yet
- the stored token is expired
- the token is close to expiring
- a protected API request returns `401`

### Token flow

1. App tries to call a protected API (`/movies`)
2. `apiFetch()` asks `authService` for a valid token
3. If token is missing or near expiry, `authService` calls `/auth/token`
4. Backend returns a fresh JWT
5. Frontend stores the token in `localStorage`
6. Request is sent with:

```http
Authorization: Bearer <token>
```

7. If the API still returns `401`, the app requests one new token and retries once

## Example Backend Token Response

Your backend token endpoint should return JSON like this:

```json
{
  "token": "your-jwt-token"
}
```

If your backend returns `accessToken` instead of `token`, update the frontend code accordingly.

## Core Files

### `src/services/authService.ts`

Responsible for:

- reading token from `localStorage`
- saving token
- clearing token
- parsing JWT payload
- checking expiry from `exp`
- requesting a new token from the backend
- making sure only one refresh request runs at a time

### `src/services/apiFetch.ts`

Responsible for:

- getting a valid token before every protected request
- attaching the `Authorization` header
- retrying once on `401`

### `src/App.tsx`

Responsible for:

- calling the API
- storing movie data in component state
- rendering loading, error, and movie list UI

## Sample `authService.ts`

```ts
// Example responsibilities only:
// - getStoredToken()
// - saveToken()
// - clearToken()
// - isTokenExpiredOrNearExpiry()
// - requestNewAccessToken()
// - getValidAccessToken()
```

## Sample `apiFetch.ts`

```ts
// Example responsibilities only:
// - call getValidAccessToken()
// - add Authorization header
// - retry once after 401
```

## Security Notes

- This project stores the access token in `localStorage` for simplicity.
- A more secure production design is:
  - short-lived access token in memory
  - refresh token in an **HttpOnly cookie**
- If possible, ask your backend team to support refresh-token-based auth.

## Common Issues

### 1. `import.meta.env.VITE_API_BASE_URL` is undefined

Make sure:

- `.env` exists in the project root
- variable name is exactly `VITE_API_BASE_URL`
- you restarted the Vite dev server after editing `.env`

### 2. Token refresh is not working

Check that:

- `/auth/token` returns a **new valid token**
- the token contains an `exp` field
- the response field name matches your frontend code (`token` vs `accessToken`)
- `credentials: 'include'` is set if your backend uses cookies

### 3. API always returns `401`

Possible causes:

- token is expired
- token is malformed
- backend expects a different header format
- backend does not trust the token issued by `/auth/token`
- CORS or cookie configuration is blocking refresh

### 4. Multiple requests trigger multiple token refresh calls

This project avoids that by using a shared refresh promise in `authService.ts`.

## Development Tips

- Keep token logic out of components
- Use `apiFetch()` for all protected endpoints
- Add more typed models for better TypeScript safety
- Add route-level loading and error states if the app grows

## Future Improvements

- Add Axios with interceptors
- Move auth state to React Context
- Add refresh token support with HttpOnly cookies
- Add route protection
- Add pagination/search for movies
- Add better TypeScript types for API responses

## Scripts

Typical Vite scripts:

```bash
npm run dev      # start local dev server
npm run build    # build for production
npm run preview  # preview production build
```

## Troubleshooting Checklist

Before debugging the frontend, verify:

- `.env` is correct
- backend is running
- `/auth/token` works in Postman or browser dev tools
- `/movies` accepts a valid bearer token
- browser Network tab shows the correct `Authorization` header

## License

This project is for learning and internal development use unless you add your own license.
