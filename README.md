# ayush-3d-portfolio

Dark, dashboard-style developer portfolio for Ayush Singh. React + Vite + Tailwind CSS + Lucide + Framer Motion.

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
npm run preview
```

## Customize
All content lives in `src/data.js`:
- `PHOTO_URL` – add your photo to `public/` (e.g. `/photo.jpg`).
- `RESUME_URL` – add `public/resume.pdf`, then set `'/resume.pdf'` to enable the download button.
- `certifications` – add only verified entries (`title`, `issuer`, `date`, `url`).
- `projects` – replace the placeholder visual by adding an `image` field and rendering it in `Preview` (`Dashboard.jsx`).

## GitHub activity
The heatmap fetches real data from the public `github-contributions-api.jogruber.de` service. If it is unreachable, an empty grid and a notice are shown; no activity is invented.

## Deploy to Vercel
1. Push this folder to a new public repo named `ayush-3d-portfolio`.
2. On vercel.com choose **Add New → Project** and import the repo.
3. Framework preset: **Vite** (build `npm run build`, output `dist`). Deploy.

No API keys or secrets are used.
