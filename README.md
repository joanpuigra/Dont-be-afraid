# Deploy

You can view the [demo](https://github.com/joanpuigra/Dont-be-afraid).

# Installation

Clone the git repository

```sh
git clone https://github.com/joanpuigra/Dont-be-afraid.git
```

## Dependencies

- Kaboom v3000.1.17
- Esbuild v0.21.3 (only to run development environment)

We need to have a running node environment.

```sh
npm install
```

## Development

To start a developer build you need to install `esbuild` with `npm install esbuild`.

```sh
npm run dev
```

Will start a dev server at <http://localhost:8000>

## Distribution

To build your js files into `www/main.js`

```sh
npm run build
```

To create a bundle for distribution or deployment.

```sh
npm run bundle
```

Will build the game and package into a .zip file.
