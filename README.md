### electron-react-weather app use [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate) as starter kit


## Install

* **Note: requires a node version >= 7 and an npm version >= 4.**
* **If you have installation or compilation issues with this project, please see [our debugging guide](https://github.com/chentsulin/electron-react-boilerplate/issues/400)**

First, clone the repo via git:

```bash
git clone --depth=1 https://github.com/chentsulin/electron-react-boilerplate.git your-project-name
```

And then install dependencies with yarn.

```bash
$ cd your-project-name
$ yarn
```
**Note**: If you can't use [yarn](https://github.com/yarnpkg/yarn) for some reason, try `npm install`.

## Run

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a server that sends hot updates to the renderer process:

```bash
$ npm run dev
```

Alternatively, you can run the renderer and main processes separately. This way, you can restart one process without waiting for the other. Run these two commands **simultaneously** in different console tabs:

```bash
$ npm run start-renderer-dev
$ npm run start-main-dev
```


## Further commands

To run the application without packaging run

```bash
$ npm run build
$ npm start
```


## License
MIT © [Nisarg Thakkar](https://github.com/nisargrthakkar)

