# Nidum Voice Agent

This is a [Next.js](https://nextjs.org/) project bootstrapped with `create-next-app`.

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/NidumAI-Inc/agent-studio-ui.git
cd agent-studio-ui
```

Then, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Note: You need to clone `Nidum Bot` to access chat bot inside the app. To setup `Nidum Bot`, visit [`Nidum Bot`](https://github.com/NidumAI-Inc/agent-studio-vui-widget.git) repo.

## Environment Configuration
This project uses environment variables for configuration. Before running the project, you need to set up your environment:

```
MONGODB_URI=

NEXTAUTH_SECRET=

LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
NEXT_PUBLIC_LIVEKIT_URL=

GMAIL_ID=
GMAIL_PASS=

NEXT_PUBLIC_ML_BACKEND_URL=
ALLOWED_BOT_ORIGINS=[]
NEXT_PUBLIC_BOT_LIVE_URL=
```

You can check `.env.example` file for more details.

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Learn More

To learn more about project resources, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Livekit](https://livekit.io/)
- [Next-Auth](https://next-auth.js.org)
- [Mongo DB](https://github.com/mongodb/node-mongodb-native)
- [Shadcn](https://ui.shadcn.com)
- [React Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Tailwindcss](https://tailwindcss.com)
