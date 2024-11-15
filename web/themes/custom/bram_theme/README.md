# 📖 Theme guide

## 🚀 Quick start
```
nvm use
npm install
npm run build
npm run watch
```
**Within the Drupal Base Project these commands can be run with ddev as well**

## 💥 Create theme
To create a theme you can run the command ``` composer create-theme <themename> ```
from the theme folder. This will create the theme in the themes/custom folder.
The <themename> argument is optional. When omitted the theme will be called bram_theme.

## ♿ Accessibility & WCAG
The theme/website should comply to the WCAG 2.2 AA

Also don't forget to add the skip links for the searchbar and menu to your theme.

## 🏗️ Grid
We are now using the utop.fyi grid system. It is installed via npm and included in the theme by importing it in the src/scss/libraries/utopia.scss file.
You can customize the grid system to your needs by modifying the variables provided in utop.fyi.

For more detailed instructions on how to adjust the grid and its settings, refer to the utop.fyi Grid Documentation.


## 🧩 Components
We use Single Directory Components, which is now standard in Drupal core.
Components are reusable pieces of code that consist of:
- twig template
- scss
- css (compiled from scss)
- js
- yml

When using components, always use the **only** tag in the end, to prevent variables to be shared throughout components. (see example below).

Also use **| default()** when passing variables to prevent errors.


### Title Component
```php
{% include 'bram_theme:title' with {
  'element': 'h2',
  'title': paragraph.field_title.value | default(''),
} only %}
```

## 🎨 BEM
We name our css classes with the BEM approach in mind.
```scss
.opinions_box {
    margin: 0 0 8px 0;
    text-align: center;

    &__view-more {
        text-decoration: underline;
    }

    &__text-input {
        border: 1px solid #ccc;
    }

    &--is-inactive {
        color: gray;
    }
}
```
[More documenatation about BEM here](https://getbem.com/)


## 🏳️ Fontawesome
It is possible to use Fontawesome Free in this theme.
This needs to be enabled in the theme settings (admin/appearance/settings/bram_theme).

Using fontawesome the default way:
```html
<i class="fa-solid fa-ghost"></i>
```

Example of using fontawesome with [pseudoelements](https://fontawesome.com/docs/web/add-icons/pseudo-elements)
```scss
.ghost::before {
  font: var(--fa-font-solid);
  content: "\f6e2";
}

```
[Fontawesome documentation can be found here](https://fontawesome.com/docs)

## 🏳️ Fonts
For the fonts we are using [Fontsource](https://fontsource.org/)
You can easily add font with composer and scss Mixins in the weights you want.

See (web/themes/finalist-contrib/bram_theme/src/scss/config/_typography.scss) for a setup.

[Fontsource documentation can be found here](https://fontsource.org/docs/getting-started/introduction)

## 👷🏻‍ ToDo
- News paragraph?
- News overview

