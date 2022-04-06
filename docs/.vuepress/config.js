/*
 * @Author: dingpanfeng
 * @Date: 2021-01-28 15:18:37
 * @LastEditors: dingpanfeng
 * @LastEditTime: 2021-05-05 09:34:29
 * @FilePath: /dora-vuepress/docs/.vuepress/config.js
 */
module.exports = {
    title: '信息中心FE',
    description: '总部信息信息中心前端团队',
    // 注入到当前页面的 HTML <head> 中的标签
    //   head: [
    //     ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
    //   ],
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    themeConfig: {
        sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
        //lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
        smoothScroll: true,
        nav: [ 
            { text: '首页', link: '/' },
            {
                text: '分类', 
                ariaLabel: '分类', 
                items: [
                    { text: 'js规范', link: '/js/lang' },
                    { text: 'vue规范', link: '/vue/' },
                ]
            },
        ],
        sidebar: {
            '/js/': [
                {
                    title: 'js',
                    collapsable: false,
                    children: [
                        { title: '语言规范', path: '/js/lang' },
                        { title: '代码规范', path: '/js/' },
                    ]
                },
            ],
            '/vue/': [
                {
                    title: 'vue',
                    collapsable: false,
                    children: [
                        { title: 'vue规范', path: '/vue/' },
                    ]
                }
            ]
        }
    }
}
