# Candidate Rank

This is a template application by which a hiring manager would be able to answer a series of questions about potential candidates and have the program automatically place candidates into groups based upon a formula that calculates various traits in an individual. This is an alpha and the traits are limited and the scoring system is a bit arbitrary. This application was build in the Ionic 3 framework and ported to a desktop application using Github's electron framework.

## Getting Started

Clone the repository or download a zip onto your computer to get started. To see the app in action, releases are also availabe

### Prerequisites

Running this application in development will require the node.js with the Node Package Manager. You will also need to install ionic cli

```
npm install -g ionic
```

### Installing

To get up and running is simple!

First cd into the directory and run

```
npm install
```

Then start the desktop electron application using 

```
npm start
```

You can enter candidates and answer some questions and assessments about them and the app will rank them based on qualifications so you don't have to keep so much in your mind at once.

## Tests

Given the time limit was 4 hours I was unable to set up unit tests but those will be integrated in the next commit.

## Built With

* [Ionic](https://ionicframework.com/) - The development framework used.
* [Electron](https://electron.atom.io/docs/tutorial/quick-start/) - Used to launch as Desktop application.
* [.NET WebApi](https://www.asp.net/web-api) - Used to create the database and api to handle the CRUD operations.

## Contributing

Go ahead...

## Authors

* **Zachary Schwartz** - *Initial work*

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc