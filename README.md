# Ayush Singh: Developer Portfolio

My personal portfolio site, where I keep my projects, skills, and background in one place. I'm a B.Tech Computer Science student focused on cloud computing, AWS, and DevOps, and I built this site to practice the same things I'm learning: shipping something real, deploying it properly, and keeping it maintainable.

**Live site:** [mrayushsingh.in](https://mrayushsingh.in/)

## Built With

- **React** and **Vite** for the frontend
- **Tailwind CSS** for styling
- **Vercel** for hosting and automatic deployments
- **GoDaddy** for the custom domain

## What's Inside

- A project showcase with descriptions and links to source code
- A skills section covering cloud, DevOps, and development tools
- A responsive layout that works on phones, tablets, and desktops
- Smooth navigation and light animations
- Continuous deployment: every push to `main` goes live automatically

## Running It Locally

You'll need [Node.js](https://nodejs.org/) (v18 or later), npm, and Git.

```bash
git clone https://github.com/mrayushsingh08-dot/mrayushsingh.in.git
cd mrayushsingh.in
npm install
npm run dev
```

The site will be available at `http://localhost:5173`.

To create and preview a production build:

```bash
npm run build
npm run preview
```

## Deployment

The repository is connected to Vercel. Pushing to `main` triggers a new build and deploys it without any manual steps.

For the custom domain, I added the domain in Vercel and pointed the GoDaddy DNS records to the values Vercel provides. Once DNS propagated, Vercel issued an SSL certificate and now renews it automatically.

## Project Structure

```text
portfolio/
├── public/            # Static files
├── src/
│   ├── assets/        # Images and icons
│   ├── components/    # Reusable UI components
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## About Me

I'm a Computer Science undergraduate who likes building practical projects and understanding how systems run in production. Right now I'm working on AWS, CI/CD pipelines, and scalable application design.

## Contact

- **GitHub:** [github.com/mrayushsingh08-dot](https://github.com/mrayushsingh08-dot)
- **LinkedIn:** [linkedin.com/in/ayush-singh-7796572a1](https://www.linkedin.com/in/ayush-singh-7796572a1/)
- **Email:** [ayush4dot@gmail.com](mailto:ayush4dot@gmail.com)
