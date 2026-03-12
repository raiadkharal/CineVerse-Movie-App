# 🚀 How to Deploy CineVerse for Free

Since this is a client-side React application built with Vite, it is incredibly easy and completely **free** to host. The two best platforms for this are **Vercel** and **Netlify**.

Here is a step-by-step guide for both platforms.

---

## Preparation (Required for all platforms)

Before deploying, ensure your code is pushed to a GitHub repository:
1. Initialize git in your project: `git init`
2. Commit your code: `git add .` and `git commit -m "Initial commit"`
3. Create a new repository on [GitHub](https://github.com/)
4. Push your code to GitHub:
   ```bash
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

---

## Option 1: Deploy with Vercel (Recommended)
Vercel is the creator of Next.js and offers heavily optimized, zero-config deployments for Vite apps.

1. Go to [Vercel.com](https://vercel.com/) and sign up with your GitHub account.
2. Click **"Add New..."** button and select **"Project"**.
3. Import your CineVerse GitHub repository.
4. Vercel will auto-detect that it's a Vite project. The build settings should automatically be:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **Environment Variables**: Open the "Environment Variables" section and add the variables from your local `.env` file:
   - `VITE_TMDB_API_KEY` = `your_tmdb_api_key`
   - `VITE_TMDB_ACCESS_TOKEN` = `your_tmdb_access_token`
   - `VITE_TMDB_BASE_URL` = `https://api.themoviedb.org/3`
   - `VITE_TMDB_IMAGE_BASE_URL` = `https://image.tmdb.org/t/p`
6. Click **Deploy**. In about a minute, your app will be live on a free `.vercel.app` domain!

---

## Option 2: Deploy with Netlify
Netlify is another phenomenal free hosting provider for static sites and frontend frameworks.

1. Go to [Netlify.com](https://www.netlify.com/) and sign up with your GitHub account.
2. Click **"Add new site"** -> **"Import an existing project"**.
3. Connect to GitHub and select your CineVerse repository.
4. Netlify should automatically detect Vite. Settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **"Show advanced"** -> **"New variable"** and add your environment variables:
   - `VITE_TMDB_API_KEY` = `your_tmdb_api_key`
   - `...` (add the rest of them just like you did for Vercel)
6. Click **Deploy site**.
7. **Important for Netlify routing**: Because this app uses React Router (client-side routing), you must tell Netlify to redirect all traffic to `index.html`. 
   - Create a file named `public/_redirects` in your project folder.
   - Add this single line of text into that file: `/* /index.html 200`
   - Push this file to GitHub, and Netlify will auto-rebuild.

---

## 🔑 A Note on API Keys 
In a production app, frontend environment variables (`VITE_...`) are visible to anyone who inspects your network requests in the browser. 
Since TMDB is a free, public API, this is completely fine for a portfolio project! Just make sure you don't expose any private database credentials or payment keys in future projects.
