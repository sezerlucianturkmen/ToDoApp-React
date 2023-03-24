import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilLockLocked,
  cilMagnifyingGlass,
  cilPuzzle,
  cilGem,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    to: '/home',
  },
  {
    component: CNavTitle,
    name: ' ',
  },
  {
    component: CNavGroup,
    name: 'My ToDo List',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Todays',
        to: '/todays',
      },
      {
        component: CNavItem,
        name: 'Progress',
        to: '/progress',
      },
      {
        component: CNavItem,
        name: 'Done',
        to: '/done',
      },
    ],
  },
]

export default _nav
