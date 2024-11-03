export const Global = {
    baseUrl: '',
    excludedUrls: [
      '/api/login',
      '/api/register',
      '/api/forgot-password',
      '/api/verify-token'
    ],
    timeout: 5000, // Thời gian timeout cho các request
    listHeader: [
      {
        "label": "Dashboard",
        "icon": "fas fa-th",
        "link": 'dashboard',
        "value": 'dashboard'
      },
      {
        "label": "User",
        "icon": "fas fa-users",
        "link": 'user',
        "value": 'user'
      },
      {
        "label": "Channel",
        "icon": "fas fa-home",
        "link": 'channel',
        "value": 'channel'
      },
      {
        "label": "Task",
        "icon": "fas fa-home",
        "link": 'task',
        "value": 'task'
      }
    ]
  };
