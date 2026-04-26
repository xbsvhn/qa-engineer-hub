import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "QA Engineer Hub",
  description: "Kiến thức chuyên sâu dành cho QA Engineer - Testing Knowledge Base",
  base: '/qa-engineer-hub/',
  lang: 'vi-VN',
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/qa-engineer-hub/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#6366f1' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: 'QA Engineer Hub' }],
    ['meta', { name: 'og:description', content: 'Kiến thức chuyên sâu dành cho QA Engineer' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap', rel: 'stylesheet' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'QA Engineer Hub',

    nav: [
      { text: 'Trang chủ', link: '/' },
      { text: 'Fundamentals', link: '/fundamentals/' },
      {
        text: 'Testing',
        items: [
          { text: 'Manual Testing', link: '/manual-testing/' },
          { text: 'Automation Testing', link: '/automation/' },
          { text: 'API Testing', link: '/api-testing/' },
          { text: 'Performance Testing', link: '/performance/' },
          { text: 'Security Testing', link: '/security/' },
        ]
      },
      { text: 'CI/CD', link: '/cicd/' },
      { text: 'Best Practices', link: '/best-practices/' },
    ],

    sidebar: {
      '/fundamentals/': [
        {
          text: 'Fundamentals',
          collapsed: false,
          items: [
            { text: 'Tổng quan', link: '/fundamentals/' },
            { text: 'Testing Concepts', link: '/fundamentals/testing-concepts' },
            { text: 'SDLC & STLC', link: '/fundamentals/sdlc-stlc' },
            { text: 'Agile & Scrum cho QA', link: '/fundamentals/agile-scrum' },
            { text: 'Test Design Techniques', link: '/fundamentals/test-design-techniques' },
            { text: 'Testing Levels', link: '/fundamentals/testing-levels' },
            { text: 'Testing Types', link: '/fundamentals/testing-types' },
            { text: 'SQL cho QA', link: '/fundamentals/sql-for-qa' },
          ]
        }
      ],
      '/manual-testing/': [
        {
          text: 'Manual Testing',
          collapsed: false,
          items: [
            { text: 'Tổng quan', link: '/manual-testing/' },
            { text: 'Test Plan & Strategy', link: '/manual-testing/test-plan' },
            { text: 'Test Case Design', link: '/manual-testing/test-case-design' },
            { text: 'Bug Reporting', link: '/manual-testing/bug-reporting' },
            { text: 'Exploratory Testing', link: '/manual-testing/exploratory-testing' },
          ]
        }
      ],
      '/automation/': [
        {
          text: 'Automation Testing',
          collapsed: false,
          items: [
            { text: 'Tổng quan', link: '/automation/' },
            { text: 'Automation Framework', link: '/automation/framework' },
            { text: 'Selenium', link: '/automation/selenium' },
            { text: 'Playwright', link: '/automation/playwright' },
            { text: 'Cypress', link: '/automation/cypress' },
          ]
        }
      ],
      '/api-testing/': [
        {
          text: 'API Testing',
          collapsed: false,
          items: [
            { text: 'Tổng quan', link: '/api-testing/' },
            { text: 'REST API Testing', link: '/api-testing/rest-api' },
            { text: 'Postman', link: '/api-testing/postman' },
            { text: 'API Automation', link: '/api-testing/api-automation' },
          ]
        }
      ],
      '/performance/': [
        {
          text: 'Performance Testing',
          collapsed: false,
          items: [
            { text: 'Tổng quan', link: '/performance/' },
            { text: 'Performance Concepts', link: '/performance/concepts' },
            { text: 'JMeter', link: '/performance/jmeter' },
            { text: 'K6', link: '/performance/k6' },
          ]
        }
      ],
      '/security/': [
        {
          text: 'Security Testing',
          collapsed: false,
          items: [
            { text: 'Tổng quan', link: '/security/' },
            { text: 'OWASP Top 10', link: '/security/owasp-top-10' },
            { text: 'Security Testing Tools', link: '/security/tools' },
          ]
        }
      ],
      '/cicd/': [
        {
          text: 'CI/CD',
          collapsed: false,
          items: [
            { text: 'Tổng quan', link: '/cicd/' },
            { text: 'Git & Version Control', link: '/cicd/git' },
            { text: 'GitHub Actions', link: '/cicd/github-actions' },
            { text: 'Docker cho QA', link: '/cicd/docker' },
          ]
        }
      ],
      '/best-practices/': [
        {
          text: 'Best Practices',
          collapsed: false,
          items: [
            { text: 'Tổng quan', link: '/best-practices/' },
            { text: 'QA Mindset', link: '/best-practices/qa-mindset' },
            { text: 'Communication Skills', link: '/best-practices/communication' },
            { text: 'Career Path', link: '/best-practices/career-path' },
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xbsvhn/qa-engineer-hub' }
    ],

    footer: {
      message: 'Open-source QA knowledge base — Built with VitePress',
      copyright: 'Copyright © 2026 QA Engineer Hub. Made with passion for the QA community.'
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: 'Tìm kiếm',
            buttonAriaLabel: 'Tìm kiếm'
          },
          modal: {
            noResultsText: 'Không tìm thấy kết quả',
            resetButtonTitle: 'Xóa tìm kiếm',
            footer: {
              selectText: 'Chọn',
              navigateText: 'Di chuyển',
              closeText: 'Đóng'
            }
          }
        }
      }
    },

    outline: {
      label: 'Nội dung trang',
      level: [2, 3]
    },

    lastUpdated: {
      text: 'Cập nhật lần cuối'
    },

    docFooter: {
      prev: 'Trang trước',
      next: 'Trang tiếp'
    },

    returnToTopLabel: 'Lên đầu trang',
  }
})
