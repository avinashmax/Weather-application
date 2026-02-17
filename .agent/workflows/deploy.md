---
description: How to deploy the weather application to a public URL
---
# Deployment Workflow

This workflow guides you through deploying your weather application to the public using **Vercel** or **Netlify**.

### 1. Initialize Git Repository
If you haven't already, turn your project folder into a Git repository:
```bash
git init
git add .
git commit -m "Prepare for deployment"
```

### 2. Create Public Repository
Create a new repository on [GitHub](https://github.com/new) and follow the instructions to "push an existing repository from the command line".

### 3. Connect to Deployment Platform
Log in to [Vercel](https://vercel.com) or [Netlify](https://netlify.com) and import your new GitHub repository.

### 4. Configure Environment Variables
**This is the most important step.**
In the project settings on Vercel/Netlify:
- Add a variable named `VITE_WEATHER_API_KEY`.
- Set its value to `69ee9518437b477f91816555251702`.

### 5. Deploy
Click the **Deploy** button. Once it's done, your weather application will be live at a public URL!
