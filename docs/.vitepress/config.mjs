import { defineConfig } from 'vitepress'

// === Shared config ===
const sharedHead = [
  ['link', { rel: 'icon', type: 'image/svg+xml', href: '/qa-engineer-hub/favicon.svg' }],
  ['meta', { name: 'theme-color', content: '#6366f1' }],
  ['meta', { name: 'og:type', content: 'website' }],
  ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
  ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
  ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap', rel: 'stylesheet' }],
]

// === Vietnamese sidebar ===
const viSidebar = {
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
        { text: 'Test Management Tools', link: '/manual-testing/test-management-tools' },
      ]
    }
  ],
  '/automation/': [
    {
      text: 'Automation Testing',
      collapsed: false,
      items: [
        { text: 'Tổng quan', link: '/automation/' },
        { text: 'Lập trình cơ bản', link: '/automation/programming-basics' },
        { text: 'JavaScript & TypeScript cho QA', link: '/automation/javascript-for-qa' },
        { text: 'Automation Framework', link: '/automation/framework' },
        { text: 'Playwright (Focus)', link: '/automation/playwright' },
        { text: 'Selenium', link: '/automation/selenium' },
        { text: 'Cypress', link: '/automation/cypress' },
        { text: 'Automation Strategy', link: '/automation/automation-strategy' },
      ]
    }
  ],
  '/api-testing/': [
    {
      text: 'API Testing',
      collapsed: false,
      items: [
        { text: 'Tổng quan', link: '/api-testing/' },
        { text: 'API Fundamentals', link: '/api-testing/api-fundamentals' },
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
}

// === English sidebar ===
const enSidebar = {
  '/en/fundamentals/': [
    {
      text: 'Fundamentals',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/en/fundamentals/' },
        { text: 'Testing Concepts', link: '/en/fundamentals/testing-concepts' },
        { text: 'SDLC & STLC', link: '/en/fundamentals/sdlc-stlc' },
        { text: 'Agile & Scrum for QA', link: '/en/fundamentals/agile-scrum' },
        { text: 'Test Design Techniques', link: '/en/fundamentals/test-design-techniques' },
        { text: 'Testing Levels', link: '/en/fundamentals/testing-levels' },
        { text: 'Testing Types', link: '/en/fundamentals/testing-types' },
        { text: 'SQL for QA', link: '/en/fundamentals/sql-for-qa' },
      ]
    }
  ],
  '/en/automation/': [
    {
      text: 'Automation Testing',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/en/automation/' },
        { text: 'Programming Basics', link: '/en/automation/programming-basics' },
        { text: 'JavaScript & TypeScript for QA', link: '/en/automation/javascript-for-qa' },
        { text: 'Automation Framework', link: '/en/automation/framework' },
        { text: 'Playwright (Focus)', link: '/en/automation/playwright' },
        { text: 'Selenium', link: '/en/automation/selenium' },
        { text: 'Cypress', link: '/en/automation/cypress' },
        { text: 'Automation Strategy', link: '/en/automation/automation-strategy' },
      ]
    }
  ],
  '/en/api-testing/': [
    {
      text: 'API Testing',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/en/api-testing/' },
        { text: 'API Fundamentals', link: '/en/api-testing/api-fundamentals' },
        { text: 'REST API Testing', link: '/en/api-testing/rest-api' },
        { text: 'Postman', link: '/en/api-testing/postman' },
        { text: 'API Automation', link: '/en/api-testing/api-automation' },
      ]
    }
  ],
  '/en/manual-testing/': [
    {
      text: 'Manual Testing',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/en/manual-testing/' },
        { text: 'Test Plan & Strategy', link: '/en/manual-testing/test-plan' },
        { text: 'Test Case Design', link: '/en/manual-testing/test-case-design' },
        { text: 'Bug Reporting', link: '/en/manual-testing/bug-reporting' },
        { text: 'Exploratory Testing', link: '/en/manual-testing/exploratory-testing' },
        { text: 'Test Management Tools', link: '/en/manual-testing/test-management-tools' },
      ]
    }
  ],
  '/en/performance/': [
    { text: 'Performance Testing', collapsed: false, items: [
      { text: 'Overview', link: '/en/performance/' },
      { text: 'Performance Concepts', link: '/en/performance/concepts' },
      { text: 'JMeter', link: '/en/performance/jmeter' },
      { text: 'K6', link: '/en/performance/k6' },
    ]}
  ],
  '/en/security/': [
    { text: 'Security Testing', collapsed: false, items: [
      { text: 'Overview', link: '/en/security/' },
      { text: 'OWASP Top 10', link: '/en/security/owasp-top-10' },
      { text: 'Security Testing Tools', link: '/en/security/tools' },
    ]}
  ],
  '/en/cicd/': [
    { text: 'CI/CD', collapsed: false, items: [
      { text: 'Overview', link: '/en/cicd/' },
      { text: 'Git & Version Control', link: '/en/cicd/git' },
      { text: 'GitHub Actions', link: '/en/cicd/github-actions' },
      { text: 'Docker for QA', link: '/en/cicd/docker' },
    ]}
  ],
  '/en/best-practices/': [
    { text: 'Best Practices', collapsed: false, items: [
      { text: 'Overview', link: '/en/best-practices/' },
      { text: 'QA Mindset', link: '/en/best-practices/qa-mindset' },
      { text: 'Communication Skills', link: '/en/best-practices/communication' },
      { text: 'Career Path', link: '/en/best-practices/career-path' },
    ]}
  ],
}

// === Main config ===
export default defineConfig({
  title: "QA Engineer Hub",
  description: "QA Engineer Knowledge Base",
  base: '/qa-engineer-hub/',
  lastUpdated: true,
  cleanUrls: true,

  head: sharedHead,

  locales: {
    root: {
      label: 'Tiếng Việt',
      lang: 'vi-VN',
      themeConfig: {
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
          { text: 'Roadmap', link: '/roadmap' },
        ],
        sidebar: viSidebar,
        outline: { label: 'Nội dung trang', level: [2, 3] },
        lastUpdated: { text: 'Cập nhật lần cuối' },
        docFooter: { prev: 'Trang trước', next: 'Trang tiếp' },
        returnToTopLabel: 'Lên đầu trang',
        search: {
          provider: 'local',
          options: {
            translations: {
              button: { buttonText: 'Tìm kiếm', buttonAriaLabel: 'Tìm kiếm' },
              modal: {
                noResultsText: 'Không tìm thấy kết quả',
                resetButtonTitle: 'Xóa tìm kiếm',
                footer: { selectText: 'Chọn', navigateText: 'Di chuyển', closeText: 'Đóng' }
              }
            }
          }
        },
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Fundamentals', link: '/en/fundamentals/' },
          {
            text: 'Testing',
            items: [
              { text: 'Manual Testing', link: '/en/manual-testing/' },
              { text: 'Automation Testing', link: '/en/automation/' },
              { text: 'API Testing', link: '/en/api-testing/' },
              { text: 'Performance Testing', link: '/en/performance/' },
              { text: 'Security Testing', link: '/en/security/' },
            ]
          },
          { text: 'CI/CD', link: '/en/cicd/' },
          { text: 'Best Practices', link: '/en/best-practices/' },
          { text: 'Roadmap', link: '/roadmap' },
        ],
        sidebar: enSidebar,
        outline: { label: 'On this page', level: [2, 3] },
        lastUpdated: { text: 'Last updated' },
        docFooter: { prev: 'Previous', next: 'Next' },
        returnToTopLabel: 'Back to top',
      }
    }
  },

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'QA Engineer Hub',

    socialLinks: [],

    footer: {
      message: 'Open-source QA knowledge base — Built with VitePress',
      copyright: 'Copyright © 2026 QA Engineer Hub. Made with passion for the QA community.'
    },

    search: {
      provider: 'local',
    },
  }
})
