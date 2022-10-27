import Cookie from 'js-cookie'
// import router from '../router'
export default {
    state: {
        isCollapse: false,
        tabsList: [
            // 一开始只有首页这个标签页
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        currentMenu: null,
        menu: []
    },
    mutations: {
        // 控制左侧菜单栏的展开与收缩
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // 点击左侧菜单栏时
        selectMenu(state, val) {
            if (val.name !== 'home') {
                state.currentMenu = val
                const result = state.tabsList.findIndex(item => item.name === val.name)
                if (result === -1) {
                    state.tabsList.push(val)
                }
            } else {
                state.currentMenu = null
            }
        },
        closeTag(state, val) {
            const result = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(result, 1)
        },
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        clearMenu(state) {
            state.menu = []
            Cookie.remove('menu')
        },
        addMenu(state, router) {
            if (!Cookie.get('menu')) {
                return
            }
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                // 有二级菜单
                if (item.children) {
                    item.children = item.children.map(item => {
                        // 路由信息是由模拟后端返回的
                        // 从模拟后端返回的数据中，是没有component属性的，而路由的跳转这个属性必不可少，故给其添加component属性
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    // 没有二级菜单
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            // 路由的动态添加 此步之后，定义在router下的子路由即可注释掉。
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        }
    }
}