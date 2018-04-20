# Nothing Burger

This is a template Node.js Web application which has the following things configured and working
out of the box:

* Basic React build with webpack
* Client-side routing without hashes (two example routes are provided)

## Installing prerequisites and running the server

### Install Node

[You can get Node.js here](https://nodejs.org/en/).

### Install yarn

Yarn is a replacement for Node Package Manager (npm). This project probably works
with `npm` as well, but hasn't been tested.
[Insructions on how to install Yarn for different platforms](https://yarnpkg.com/en/docs/install)

### Run the server

Run commands:

```
yarn install
yarn watch
```

and wait until you see webpack build output and: `server listening on
port 8080`. After those you can go to the following address in your
browser:

`http://localhost:8080/`

And view1 should appear.

## Client-side routing

The routing uses [route-parser](https://github.com/rcs/route-parser) for defining the route paths and parameters.
The routes do not use hash (#). Instead, going to _view1_ with a parameter _x_ looks like this:

```http://localhost:8080/view1/x```

Avoiding hashes allows the server to see the route paths as well when they are first loaded. This means that if
you have not yet logged in, the server can redirect you back to `view1/x` after google authentication. The downside
is that the server also has to know in a finer grained way which routes are for the client. That is why `server/server.js`
has these rows:

```
const clientAppHtml = (req, res) => res.sendFile(path.resolve(`${__dirname}/../dist/index.html`))
app.use('/view1*', clientAppHtml)
app.use('/view2*', clientAppHtml)
``` 

You will have to define all "main client routes" like that on the server side _or_ you can skip the hassle 
by prefixing all client routes with something like this:

```
app.use('/ui*', clientAppHtml)

```

The router avoids full page reloads by using [browser history API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) 
after the client-side web application is first loaded.

The router code is in `webapp/router.js` and a few example routes are in `webapp/routes.js`. 

## Styles

The main page `web-resources/index.html` (and login page) includes styles from 
[Spectre.css](https://picturepan2.github.io/spectre/getting-started.html)
just because they are nicer than browser defaults. But they are not deeply coupled into this template application in 
any way, you can just throw them away and define your own.
