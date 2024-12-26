# Iqbal Abdurrahman Personal Website

Portfolio website that showcases my projects, blog posts, and other information
about me. Built with TypeScript, React, Hono, React Router, Velite, Tailwind
CSS, Vite, and deployed to Cloudflare Workers.

See Demo Website:
[`Iqbal Abdurrahman Personal Website`](https://abrhmniqbal.my.id)

## Overview

- `/` — Home page.
- `/posts` — Posts list page.
- `/projects` — Project list page.
- `/sitemap.xml` — Sitemap.
- `/resource/*` — Resource routes (i.e. switch theme route).

## Running Locally

```bash
$ git clone https://github.com/abdrhmniqbal/personal-website.git
$ cd personal-website
$ bun i
$ bun dev
```

Update your `environment` in
[`wrangler.toml`](https://github.com/abdrhmniqbal/personal-website/blob/master/wrangler.toml).

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
$ bun run build
```

## Deployment

Deployment is done using the Wrangler CLI.

To deploy directly to production:

```bash
$ bun wrangler deploy
```

## License

1. Feel free to take inspiration from this code.
2. Avoid directly copying it, please.
3. Crediting the author is appreciated.

No complicated licensing. Be kind and help others learn.

---

## Authors

Iqbal Abdurrahman <https://github.com/abdrhmniqbal>

Built with ❤️ using React Router and Hono.
