# Leocyte — Static site (GitHub Pages) — Deployment Guide

This repository contains a static website ready for GitHub Pages.

## Quick deploy (exact git commands)
Replace `your-github-username` and `your-repo` below.

1. Initialize and push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit — Leocyte site"
# create the repo on GitHub (or use GitHub UI)
git branch -M main
git remote add origin git@github.com:your-github-username/your-repo.git
git push -u origin main
