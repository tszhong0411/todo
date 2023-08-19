<p align="center">
  <img src="https://honghong.me/images/projects/todo/cover.png">
</p>

## ⚡️ Tech Stack

- Framework: [Next.js](https://nextjs.org/)
- Authentication & Database: [Firebase](https://firebase.google.com/)
- Deployment: [Vercel](https://vercel.com)
- Favicon: [realfavicongenerator](https://realfavicongenerator.net/)
- Styling: [Tailwindcss](https://tailwindcss.com)

## 👋 Running Locally

1. Clone the repository

```sh
git clone https://github.com/tszhong0411/todo.git
```

2. Go to the project directory

```sh
cd todo
```

3. Install dependencies

```sh
pnpm
```

4. Create a `.env.local` file and input environment variables based on the `.env.example` file so that the project can run properly.

```
# Firebase
# https://firebase.google.com/docs/web/setup
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

5. Run the development server

```sh
pnpm dev
```

<hr>
<p align="center">
Made with ❤️ in Hong Kong
</p>
