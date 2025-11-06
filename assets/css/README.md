# Leocyte Website

Static website for Leocyte pharmaceutical BD&L company, ready for deployment on GitHub Pages.

## Deployment to GitHub Pages

### Prerequisites
- GitHub account
- Git installed locally
- Basic terminal/command line knowledge

### Step-by-Step Deployment

1. **Create a new repository on GitHub**
   ```bash
   # Go to GitHub.com and create a new repository named "leocyte-website"
   # Or use GitHub CLI:
   gh repo create leocyte-website --public --description "Leocyte Pharmaceutical BD&L Website"

2. **Initialize local repository and push files**

# Navigate to your project directory
cd leocyte-website

# Initialize git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial website deployment"

# Add remote origin
git remote add origin https://github.com/yourusername/leocyte-website.git

# Push to main branch
git branch -M main
git push -u origin main
