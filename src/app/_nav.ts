import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Components'
  },
  {
    name: 'Chức năng chính',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Lập phiếu khám bệnh',
        url: '/base/forms',
        icon: 'icon-pencil'
      },
      {
        name: 'Danh sách',
        url: '/base/tables',
        icon: 'icon-puzzle'
      },
      {
        name: 'Lập hoá đơn',
        url: '/base/tooltips',
        icon: 'icon-puzzle'
      },
      {
        name: 'Báo cáo',
        url: '/base/progress',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'icon-star'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'icon-star'
      }
    ]
  },
];
