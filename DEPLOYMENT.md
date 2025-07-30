# GitHub Pages Setup Instructions

To enable automatic deployment to GitHub Pages when pushing to the `staging` branch:

## 1. Enable GitHub Pages

1. Go to your GitHub repository: `https://github.com/ryanoconnor285/lo-siento`
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**

## 2. Create staging branch

```bash
# Create and push the staging branch
git checkout -b staging
git push -u origin staging
```

## 3. Set up branch protection (Optional)

To prevent accidental pushes to main:

1. Go to **Settings** > **Branches**
2. Click **Add rule**
3. Set branch name pattern to `main`
4. Enable **Require pull request reviews before merging**

## 4. Deployment Process

Now when you want to deploy:

1. Make changes on any branch
2. Create a pull request to `staging`
3. Merge the PR - this will trigger the deployment
4. The site will be available at: `https://ryanoconnor285.github.io/lo-siento/`

## 5. Manual Deployment

If you need to deploy manually:

```bash
npm run deploy
```

This will build and deploy using gh-pages directly.

## Troubleshooting

If the GitHub Action fails:

1. Check the **Actions** tab in your GitHub repository
2. Look at the logs for the failed workflow
3. Common issues:
   - Audio files too large (GitHub has 100MB repo limit)
   - Missing secrets or permissions
   - Node.js version compatibility

## Notes

- The web app will work offline once loaded (audio files are bundled)
- Audio files are optimized for web delivery
- The app is responsive and works on mobile, tablet, and desktop
- SEO tags are included for better search engine visibility
