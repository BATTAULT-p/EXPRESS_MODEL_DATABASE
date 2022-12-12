const express = require("express");
require ('dotenv').config();

const app = express();
app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.post("/api/movies", movieHandlers.addMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.delete("/api/movies/:id", movieHandlers.deleteMovieById);
app.get("/api/users", movieHandlers.getUsers);
app.post("/api/users", movieHandlers.addUsers);
app.put("/api/users/:id", movieHandlers.updateUsers);
app.get("/api/users/:id", movieHandlers.getUsersById);
app.delete("/api/users/:id", movieHandlers.deleteUsersById);


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
