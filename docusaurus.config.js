// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Wholesome Club Extensions (WCE)',
  tagline: 'enhancements for the bondage club - fork of FBC 5.8',
  favicon: 'img/favicon.ico',

  url: 'https://wce-docs.vercel.app',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          sidebarCollapsible: true,
          sidebarCollapsed: false,
          showLastUpdateTime: true,
          editUrl: 'https://github.com/KittenApps/wce-docs/tree/main/',
        },
        blog: {
          showReadingTime: true,
          blogSidebarCount: 'ALL',
          showLastUpdateTime: true,
          editUrl: 'https://github.com/KittenApps/wce-docs/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: ['vercel-analytics'],
  themes: [[
    "@easyops-cn/docusaurus-search-local",
    /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
    ({
      hashed: true,
      language: ["en"],
      highlightSearchTermsOnTargetPage: true,
      explicitSearchResultPath: true,
    }),
  ]],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      metadata: [
        { property: 'og:image', content: 'https://wce-docs.vercel.app/img/logo.png' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' }
      ],
      docs: {
        sidebar: {
          hideable: true,
        }
      },
      navbar: {
        title: 'Wholesome Club Extensions (WCE)',
        logo: {
          alt: 'WCE Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/KittenApps/WCE',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'About',
                to: '/docs/intro',
              },
              {
                label: 'Installation',
                to: '/docs/installation',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Changelog',
                to: '/blog/tags/releases',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub (source code)',
                href: 'https://github.com/KittenApps/WCE',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} WCE. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
