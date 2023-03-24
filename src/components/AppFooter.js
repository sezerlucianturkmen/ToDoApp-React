import React from 'react'
import { CFooter, CLink } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter color="black">
      <div>
        <CLink className="headerColor" href="https://www.dista.com/">
          To do app{' '}
        </CLink>
        <span>&copy; 2023 </span>
      </div>
      <div>
        <span className="headerColor">Created by: </span>
        <span className="headerColor">Sezer Turkmen</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
