## Configuring the .env-file

1. Copy the .env.sample and rename it to .env.
2. Change the values in the .env file.

```properties
VITE_AUTH_CLIENT_ID=
VITE_AUTH_URL=http://localhost:8080
VITE_API_URL=http://127.0.0.1:3000
```
3. Set the VITE_AUTH_CLIENT_ID to your client ID which you can get from the Authorizer Dashboard (http://localhost:8080/).

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
