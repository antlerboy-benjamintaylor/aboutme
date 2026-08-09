# Moving antlerboy.com from About.me to GitHub Pages

Do this only after the GitHub Pages preview works.

## 1. Publish and test the GitHub Pages site

In this repository go to `Settings` → `Pages` and set `Source` to `GitHub Actions`.

The workflow in `.github/workflows/pages.yml` will publish the site. Test the GitHub Pages URL before changing the domain.

## 2. Add the custom domain in GitHub

In `Settings` → `Pages`, under `Custom domain`, enter:

`antlerboy.com`

and save it.

Because this repository uses a custom GitHub Actions workflow, a `CNAME` file is not required.

## 3. Change DNS at the domain provider

For the apex domain `antlerboy.com`, set A records to GitHub Pages:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

For `www.antlerboy.com`, set a CNAME record to:

`antlerboy-benjamintaylor.github.io`

Remove or replace the old About.me records that conflict with these.

Do not use a wildcard DNS record.

## 4. Wait for DNS and HTTPS

DNS changes can take up to 24 hours to propagate. GitHub can then issue the HTTPS certificate. Turn on `Enforce HTTPS` in Pages settings once it becomes available.

## 5. Check before cancelling About.me

Test:

- `https://antlerboy.com/`
- `https://www.antlerboy.com/`
- email and telephone links;
- all external links;
- mobile layout;
- page title and search-engine description.

Only then cancel the About.me subscription.

## Sources

Current GitHub Pages instructions: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

Publishing source instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
