# This is a simple crawler implementation and it's incomplete

Basic project structure is done. Work in progress.

# How to run

Git clone this repo and cd into it.

Then Run
```sh
$ docker compose up db
```
Then go to `web` folder and run `npm install` and then run, 
`npm start`

Docker has some issues with puppteer. Will fix later.

Now use postman/insomnia/cURL to send a post request to `http://localhost:5000/` with a json like
```sh
{
  "url": "https://example.com/",
}
```