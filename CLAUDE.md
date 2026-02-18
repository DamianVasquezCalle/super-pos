# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Production build (output to dist/)
npm run lint      # ESLint with zero warnings allowed
npm run preview   # Preview production build locally
```

There are no tests configured in this project.

## Architecture

**Stack:** React 18 + Vite, React Router v6, NextUI v2, Tailwind CSS, Auth0 (`@auth0/auth0-react`), Supabase (`@supabase/supabase-js`), FontAwesome.

**Auth flow:**
- `Auth0Provider` wraps the entire app in [src/App.jsx](src/App.jsx), reading `VITE_AUTH0_DOMAIN` and `VITE_AUTH0_CLIENT_ID` from `.env.local`.
- `ProtectedRoute` (`src/components/common/ProtectedRoute.jsx`) gates all non-public routes: shows a spinner while Auth0 initializes, redirects to `/login` if unauthenticated.
- Public route: `/login` → `Login.jsx`. All other routes are wrapped in `ProtectedRoute`.

**Routing** is defined entirely in [src/App.routes.jsx](src/App.routes.jsx). Add new routes there. Protected routes follow this pattern:
```jsx
<Route path="/new" element={<ProtectedRoute><NewComponent /></ProtectedRoute>} />
```
Use `lazy()` for all page-level components (already the pattern for `Home` and `MyProfile`).

**UI components:** Use NextUI v2 components (imported from `@nextui-org/react`). Use `onPress` (not `onClick`) for NextUI interactive components like `Button`, `DropdownItem`. Theme colors are defined in [tailwind.config.js](tailwind.config.js): primary `#294C60`, secondary `#34E4EA`.

**Icons:** Use the `Icon` wrapper at `src/components/common/Icon.jsx`, which accepts a `icon` string (e.g. `"fa-solid fa-bars"`) and passes all props to `FontAwesomeIcon`. The full icon library is pre-loaded.

**Auth0 user data:** Inside any protected component, call `useAuth0()` to access `user`, `logout`, `loginWithRedirect`, `isAuthenticated`, `isLoading`. The `user` object contains `name`, `email`, `picture`, `nickname`, `sub`, `email_verified`, `updated_at`.

**Logout pattern:**
```js
logout({ logoutParams: { returnTo: window.location.origin + "/login" } })
```

## Supabase service

**Client factory:** `src/services/supabase.js` — exports `createSupabaseClient(accessToken)`. It disables Supabase's own auth handling (session persistence, auto-refresh, URL detection) because Auth0 owns authentication. The Auth0 token is sent as `Authorization: Bearer <token>`, which Supabase forwards to RLS policies via `auth.jwt()`.

**Hook:** `src/hooks/useSupabase.js` — use this inside any protected component:
```js
const { getClient } = useSupabase();

const fetchItems = async () => {
  const supabase = await getClient();
  const { data, error } = await supabase.from("items").select("*");
};
```
`getClient()` calls Auth0's `getAccessTokenSilently()` (which caches and silently refreshes tokens) and returns a fresh authenticated client. Always `await getClient()` per operation rather than storing the client in state.

**Adding a table-specific service:** Create a file in `src/services/` that accepts a `supabase` client and exports async functions wrapping Supabase queries.

**Supabase dashboard setup required:**
- Add Auth0 as a custom JWT provider under Project Settings → Auth → JWT Secret (use your Auth0 tenant's JWKS endpoint).
- RLS policies reference `auth.jwt() ->> 'sub'` for the Auth0 user ID.

## Environment

Requires `.env.local` at the project root:
```
VITE_AUTH0_DOMAIN=...
VITE_AUTH0_CLIENT_ID=...
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=...
```
Auth0 dashboard must have `http://localhost:5173` in Allowed Callback URLs, Allowed Logout URLs, and Allowed Web Origins.
