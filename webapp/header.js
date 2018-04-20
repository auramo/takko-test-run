import React from 'react'
import * as R from 'ramda'
import { Link } from './router'

const tabs = {
  tab1: { label: 'View 1', location: '/view1' },
  tab2: { label: 'View 2', location: '/view2' }
}

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <header className="navbar">
        <section className="navbar-section">
          {R.map(
            ([tab, { label, location }]) => (
              <Link key={tab} className="btn btn-link" href={location}>
                {tab === this.props.selectedTab ? <strong>{label}</strong> : label}
              </Link>
            ),
            R.toPairs(tabs)
          )}
        </section>
      </header>
    )
  }
}
