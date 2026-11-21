# Switch on Bricko accounts

Bricko uses **Supabase** (free plan is enough) for sign-up, sign-in and saving each person's builds and finished tasks. Until you do these steps, the app still works but saves on the device only.

## 1. Create the Supabase project (about 3 minutes)
1. Go to https://supabase.com, sign up, and press **New project**.
2. Give it a name (for example `bricko`), set a database password, pick the region closest to your players (Mumbai for India), and press **Create**.

## 2. Create the tables
1. In the project, open **SQL Editor → New query**.
2. Paste everything from `supabase-setup.sql` and press **Run**. You should see "Success".

This makes two tables, `builds` and `progress`, and switches on row-level security so each person can only ever read and change their own saves.

## 3. Choose how sign-up works
Open **Authentication → Providers → Email**.
- **Easiest for players:** turn **Confirm email** off. People can sign up and start saving straight away.
- **Safer:** leave it on. People get a confirmation email, tap the link, then sign in inside the app. The link opens a browser page that may say it can't connect; that's fine, the account is confirmed anyway.

## 4. Paste your keys into the app
1. Open **Project Settings → API**.
2. Copy the **Project URL** and the **anon public** key. (Never use the `service_role` key in the app.)
3. Open `www/config.js` in the Bricko-Desktop and Bricko-Android folders and fill them in:

```js
window.BRICKO_CONFIG = {
  supabaseUrl: "https://YOURPROJECT.supabase.co",
  supabaseAnonKey: "eyJhbGciOi...your anon key..."
};
```

The anon key is meant to be inside apps; the security comes from the row-level rules you created in step 2.

## 5. Rebuild
- **Windows:** in Bricko-Desktop run `npm install` then `npm run dist:win`.
- **Android:** in Bricko-Android run `npm install` then `npx cap sync android`, then build the APK (or push to GitHub and let the Actions job build it).

## What players see
- A **Sign in** button in the top bar opens Sign in / Create account / Forgot password.
- Once signed in, the top bar says "Signed in as <name>", and every save and finished task goes to their account, so it appears on any phone or computer they sign in on.
- If they built things before signing in, the shelf offers **Copy N builds from this device** to move them into the account.
- **Sign out** switches back to device-only saving.

## Looking after accounts
- See and manage players under **Authentication → Users** (you can delete an account there; their builds are deleted with it).
- See saved builds under **Table Editor → builds**.
