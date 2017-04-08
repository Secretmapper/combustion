# Prerequisites

Install node modules `(i.e. yarn install)`, and install brunch

# Developing

Launch a development server to preview edits. The website is generated using brunch and the `lazy-static-site-gen` skeleton

```
brunch w --server
```

# Publish the website

## Setup

The publish script expects you to have two sibling folders named `combustion` and `combustion-gh-pages`

```
# From combustion/website/
(
  cd ../../
  git clone git@github.com:Secretmapper/combustion.git combustion-gh-pages
  cd combustion-gh-pages
  git checkout gh-pages
)
```

## Building

```
# From combustion/website/
(cd ../; ./website/publish.sh)
```

## Publishing

The build system has now built the website into combustion-gh-pages. All that's left to do is to check it over, commit it, and push it to origin/gh-pages.

```
cd ../../combustion-gh-pages
git status  # Check it over to see if the changes look right
git diff --word-diff=color  # Or go over it in detail
git add --all && git commit -m "Updating the website in preparation for v0.3.0"
git push
```
