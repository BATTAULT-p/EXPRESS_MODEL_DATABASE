const express = require("express");
const { hashPassword, verifyPassword, verifyToken, verifyId } = require("./auth.js");
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
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", movieHandlers.getUsers);
app.get("/api/users/:id", movieHandlers.getUsersById);

app.post("/api/users", hashPassword, movieHandlers.addUsers);
app.post("/api/login", movieHandlers.getUserByEmailWithPasswordAndPassToNext, verifyPassword);

app.use(verifyToken);

app.post("/api/movies", movieHandlers.addMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovieById);

// app.use(verifyId);

app.put("/api/users/:id", verifyId, movieHandlers.updateUsers);
app.delete("/api/users/:id", verifyId, movieHandlers.deleteUsersById);


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
