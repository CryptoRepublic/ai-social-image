# ✨ AI Image Generator (Advanced)

A lightweight, powerful web application to generate AI images directly from your browser. Powered by the [Pollinations.ai](https://pollinations.ai/) API, this static web app includes advanced customization options and custom API Key authentication.

## 🚀 Features
- **No Backend Required**: 100% static frontend (HTML, CSS, JS).
- **Authentication / Login**: Enter your Pollinations API Token (stored securely in `localStorage`) to bypass free-tier rate limits.
- **Advanced Options**:
  - Choose specific AI models (Flux, Turbo, Any Dark, etc.).
  - Set a custom **Seed** for reproducible results.
  - **Enhance Prompt** toggle (Let AI expand your idea for better results).
- **Instant Download**: Images are fetched as Blobs, meaning clicking "Download" saves the image instantly without reloading.
- **Regenerate Button**: Easily create a new variation with a single click.
- **No Watermarks**: Native clean outputs (`nologo=true`).

## 🛠️ Technologies
- **HTML5 & CSS3**: Clean, responsive, modern user interface.
- **Vanilla JavaScript**: Handles state, API fetching, Auth storage, and Blob URLs.
- **Pollinations API**: Core generation engine.

## 💻 How to run locally
1. Clone or download this repository.
2. Open the `index.html` file in any modern web browser.
3. (Optional) Click **Login / API Key** to add your token from *enter.pollinations.ai*.
4. Type your prompt, adjust settings in "Advanced Options", and generate!

## 🌐 Deploy to Netlify
Since this app is completely static, it's perfect for free Netlify hosting:
1. Push this project to GitHub.
2. Log in to [Netlify](https://www.netlify.com/) and click **"Add new site"** -> **"Import an existing project"**.
3. Connect your GitHub and select the repository.
4. Leave "Build command" and "Publish directory" empty.
5. Click **"Deploy site"**.

You will get a live public URL in seconds!

---
*Created as a lightweight interface for exploring text-to-image API capabilities.*
