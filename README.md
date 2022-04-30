# NodeJsMyAdmin

<!-- <p align="center">
  <img src="#" alt="NodeJsMyAdmin Logo">
</p> -->

NodeJsMyAdmin (NJMA) is a tool that helps to develop Node.js applications using databases. NJMA is the database administrator page.

To work with NJMA, you need to have a locally installed database and just run "njma" (with a global package installation) or write a script in package.json with the word "njma" (when installing the package as a development dependency).


# Installation

Install the package globally using [npm](http://npmjs.org ) (recommended method):

```bash
npm install -g nodejsmyadmin
```

And NJMA will be installed globally to your system path.

You can also install NJMA as a development dependency:

```bash
npm install --save-dev nodejsmyadmin
```


# Usage

When installing the package globally:

```bash
njma
```

With a local installation, NJMA will not be available in your system path or you can't use it directly from the command line. Instead, the local installation of NJMA can be run by calling it from within an npm script (such as `npm start`).
