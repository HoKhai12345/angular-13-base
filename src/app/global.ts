export const Global = {
    baseUrl: '',
    excludedUrls: [
      '/api/login',
      '/api/register',
      '/api/forgot-password',
      '/api/verify-token'
    ],
    timeout: 5000, // Thời gian timeout cho các request
    listHeaders: {
      admin: [
        {
          "label": "User",
          "icon": "fas fa-users",
          "link": '/admin/user',
          "value": 'user'
        },
      ],
      user: [
        {
          "label": "Dashboard",
          "icon": "fas fa-th",
          "link": '/dashboard',
          "value": 'dashboard',
          "children": []
        },
        // {
        //   "label": "Channel",
        //   "icon": "fas fa-home",
        //   "link": '/channel',
        //   "value": 'channel',
        //   "children": []
        // },
        // {
        //   "label": "Task",
        //   "icon": "fas fa-home",
        //   "link": '/task',
        //   "value": 'task',
        //   "children": []
        // },
        // {
        //   "label": "Product",
        //   "icon": "fa-brands fa-product-hunt",
        //   "link": '/products',
        //   "value": 'products',
        //   "children": []
        // },
      ]
    },
    listRole: {

    }
  };
