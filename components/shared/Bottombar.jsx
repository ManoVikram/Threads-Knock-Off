import React from 'react'
import { Button } from '../ui/button'

function Bottombar() {
  return (
    <div className="bottombar">
      <p>© 2025</p>

      <Button variant="link" className="text-white text-subtle-medium">
        Threads Terms
      </Button>

      <Button variant="link" className="text-white text-subtle-medium">
        Privacy Policy
      </Button>

      <Button variant="link" className="text-white text-subtle-medium">
        Cookies Policy
      </Button>

      <Button variant="link" className="text-white text-subtle-medium">
        Report a problem
      </Button>
    </div>
  )
}

export default Bottombar