import * as R from "ramda"
import React from "react"
import Route from "route-parser"

import testRunner from "./testRunner"
import view2 from "./view2"

const routeMappings = {
  "/": () => (document.location = "/testRunner"), //Go to the default view
  "/testRunner": testRunner,
  "/view2": view2
}

const routes = R.pipe(
  R.keys,
  R.map(k => ({ route: new Route(k), component: routeMappings[k] }))
)(routeMappings)

export default routes
