import React from 'react'
import { CContainer, CHeader, CImage, CHeaderNav } from '@coreui/react'

import Image from '../assets/images/logo.png'
const AppHeader = () => {
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderNav className="headerColor d-none d-md-flex me-auto">
          <CImage className="mt-3 logo" align="center" src={Image} />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
