
const routes = [
  /*   {
      path: '/',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { path: '', component: () => import('pages/IndexPage.vue') },
        // { path: 'aratick', component: () => import('pages/Aratick-countrietask.vue') },
        // { path: 'aratick/:id', name: 'aratickCountry', component: () => import('pages/ShowCountry.vue') },
      ]
    }, */
  {
    path: '/',
    name: 'countriesLayout',
    component: () => import('layouts/TemplateCountry.vue'),
    children: [
      { path: '', name: 'countries', component: () => import('pages/IndexCountry.vue') },
      { path: 'name/:id', name: 'countryName', component: () => import('pages/ShowCountry.vue') },
      { path: 'name/:pathMatch(.*)*', name: 'countryNotFound', component: () => import('pages/ErrorNotFound.vue') },
      { path: '/:pathMatch(.*)*', name: 'countriesNotFound', component: () => import('pages/ErrorNotFound.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
  //aratick company project "Aratick REST Countries API" , https://aratick-rest-countrie-task.vercel.app/
  /*   {
      path: '/aratick', name: 'countriesLayout',
      component: () => import('layouts/TemplateCountry.vue'),
      children: [
        { path: '', name: 'countries', component: () => import('pages/IndexCountry.vue') },
        { path: 'name/:id', name: 'countryName', component: () => import('pages/ShowCountry.vue') },
        { path: 'name/:pathMatch(.*)*', name: 'countryNotFound', component: () => import('pages/ErrorNotFound.vue') },
        { path: '/:pathMatch(.*)*', name: 'countriesNotFound', component: () => import('pages/ErrorNotFound.vue') }
      ]
    }, */
]

export default routes
