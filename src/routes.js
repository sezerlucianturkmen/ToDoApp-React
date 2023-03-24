import React from 'react'

const Login = React.lazy(() => import('./views/pages/login/Login'))
const Todays = React.lazy(() => import('./views/pages/todo/Todays'))
const Progress = React.lazy(() => import('./views/pages/todo/Progress'))
const Done = React.lazy(() => import('./views/pages/todo/Done'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/*', name: 'Home', element: Todays },
  { path: '/todays', name: 'Todays', element: Todays },
  { path: '/progress', name: 'Progress', element: Progress },
  { path: '/done', name: 'Done', element: Done },
]
export default routes
