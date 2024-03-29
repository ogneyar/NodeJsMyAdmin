# NodeJsMyAdmin (still in the process of development)
## NPM library 

<p align="center">
  <img src="https://github.com/ogneyar/NodeJsMyAdmin/blob/master/static/images/NJMA%20logo.bmp" alt="NodeJsMyAdmin Logo" width="120px" >
</p>

NodeJsMyAdmin (NJMA) is a tool that helps to develop Node.js applications using databases. NJMA is the database administrator page.

To work with NJMA, you need to have a locally installed database and just run "njma" (with a global package installation) or write a script in package.json with the word "njma" (when installing the package as a development dependency).


# Installation

Install the package globally using [npm](http://npmjs.org ) (recommended method):

```bash
npm install -g njma
```

And NJMA will be installed globally to your system path.

You can also install NJMA as a development dependency:

```bash
npm install --save-dev njma
```


# Usage

When installing the package globally:

```bash
njma
```

With a local installation, NJMA will not be available in your system path or you can't use it directly from the command line. Instead, the local installation of NJMA can be run by calling it from within an npm script (such as `npm start`).


```json
{
    "scripts": {
        "start": "njma"
    }
}
```

after that, run:

```bash
npm run start
```


If you create a .env file in the root directory and put user and password data in it, then there will be no need to enter this data every time you log in.

```env
DB_USER=user_name
DB_PASS=password
```