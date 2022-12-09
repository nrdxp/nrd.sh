import type{ NavItems } from './types'

export const NAV_ITEMS: NavItems = {
    home: {
        path: '/',
        title: 'home'
    },
    blog: {
        path: '/blog',
        title: 'blog'
    },
    tags: {
        path: '/tags',
        title: 'tags'
    },
    // media: {
    //     path: '/media',
    //     title: 'media'
    // },
    about: {
        path: '/about',
        title: 'about'
    }
}

export const SITE = {
    name: 'nrdlg',
    title: 'nrdlg',
    description: 'Personal blog of Tim DeHerrera',
    url: 'https://nrd.sh',
    ghUser: 'nrdxp',
    githubUrl: 'https://github.com/nrdxp',
    listDrafts: false
}

export const PAGE_SIZE = 8
