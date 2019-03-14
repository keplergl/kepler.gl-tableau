# Kepler.gl Tableau

## Introduction
This is the kepler.gl tableau extension. It will load a kepler.gl map visualization inside your Tableau Desktop App.

## Links
- [kepler.gl](http://kepler.gl)
- [Tableau Extensions API](https://tableau.github.io/extensions-api/#)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Local Development

### Start node app
##### 1. Clone repo
```sh
git clone <>
```

##### 2. Install
```sh
yarn --ignore-engines
```

##### 3. Start local app session
```sh
yarn start
```

### Setup local extension in Tableau Desktop
##### 1. Launch Tableau
open tableau workbook (get it from public folder of this repo)
- NOTE: if you want to enable remote debugging, use this command in terminal to open tableau

```sh
open /Applications/Tableau\ Desktop\ 2018\.3.app --args --remote-debugging-port=8696
```

A debug session will be available in browser http://localhost:8696

##### 2. Execute extension in tableau

- copy the `datablick-kepler-gl.trex` file (inside the `public` folder) into your `extensions` folder of the `My Tableau Repository` (likely in your `Documents` folder).

- Go to the Tableau window that opened when running the above command.

- Drag the extension onto view and select the trex file from your my tableau repository\extensions folder.

- More information on Tableau Extension API about [Get Started with Dashboard Extensions
](https://tableau.github.io/extensions-api/docs/trex_getstarted.html)


