module.exports = {
  title: 'twaver笔记',  // 设置网站标题
  description : 'twaver笔记',
  base : '/tw/',
  themeConfig : {
    nav : [
      { text: 'twaver', link: '/twaver/' },
      { text: 't', link: '/t/' },
      { text: 'tt', link: '/tt/' },
    ],
    sidebar: {
      '/twaver/': [
      ],
      '/t/': [
        {
          title: '基础配置',
          children: ['base', 'camera'],
        },
        {
          title: 'entity',
          children: ['billboard', 'cube', 'obj', 'link'],
        },
        {
          title: '交互',
          children: ['event', 'editInteraction'],
        },
        {
          title: '效果',
          children: ['articulation'],
        },
      ],
      '/tt/': [
      ],
    },
    sidebarDepth : 3,

    displayAllHeaders: true,
    // sidebar: 'auto',

    lastUpdated: 'Last Updated',

    repo: 'emloxe/tw',
    repoLabel: 'GitHub',
    docsRepo: 'emloxe/tw',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页'
  }
}