

const movies = [
  {
    id: 1,
    title: "Citizen Kane",
    director: "Orson Wells",
    year: "1941",
    colors: false,
    duration: 120,
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    colors: true,
    duration: 180,
  },
  {
    id: 3,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: "1994",
    color: true,
    duration: 180,
  },
];

const database = require("./database");

const getMovies = (req, res) => {
  let sql = "select * from movies";
  const sqlValues = [];

  if (req.query.color != null) {
    sql += " where color = ?";
    sqlValues.push(req.query.color);
 
    if (req.query.max_duration != null) {
    sql += " and duration <= ?";
    sqlValues.push(req.query.max_duration);
  }
  } else if (req.query.max_duration != null) {
  sql += " where duration <= ?";
  sqlValues.push(req.query.max_duration);
}

  database
    .query(sql, sqlValues)
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};
// const getMovies = (req, res) => {
//   const initialSql = "select * from movies";
//   const where = [];

//   if (req.query.color != null) {
//     where.push({
//       column: "color",
//       value: req.query.color,
//       operator: "=",
//     });
//   }
//   if (req.query.max_duration != null) {
//     where.push({
//       column: "duration",
//       value: req.query.max_duration,
//       operator: "<=",
//     });
//   }

//   database
//     .query(
//       where.reduce(
//         (sql, { column, operator }, index) =>
//           `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ?`,
//         initialSql
//       ),
//       where.map(({ value }) => value)
//     )
//     .then(([movies]) => {
//       res.json(movies);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("Error retrieving data from database");
//     });
// };

const addMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      res.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movie");
    });
};
const updateMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?",
      [title, director, year, color, duration, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the movie");
    });
};

const deleteMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query(
      "DELETE FROM movies where id = ?",
      [id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the movie");
    });
};

const getUsers = (req, res) => {
  let sql = "select * from users";
  const sqlValues = [];

  if (req.query.language != null) {
    sql += " where language = ?";
    sqlValues.push(req.query.language);
 
    if (req.query.city != null) {
    sql += " and city = ?";
    sqlValues.push(req.query.city);
  }
  } else if (req.query.city != null) {
  sql += " where city = ?";
  sqlValues.push(req.query.city);
}
  database
    .query(sql, sqlValues)
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const addUsers = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movie");
    });
};
const updateUsers = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?",
      [firstname, lastname, email, city, language, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the user");
    });
};
const deleteUsersById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query(
      "DELETE FROM users where id = ?",
      [id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.status(204).send("user deleted");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the movie");
    });
};


const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query("select * from users where id = ?",[id])
    .then(([users]) => {
      if (users[0] != null){
        res.json(users[0]);
      }else{
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

    database
    .query("select * from movies where id = ?", [id])
    .then(([movies]) => {
        if (movies[0] != null) {
    res.json(movies[0]);
  } else {
    res.status(404).send("Not Found");
  }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  getMovies,
  getMovieById,
  getUsers,
  getUsersById,
  addMovie,
  addUsers,
  updateMovie,
  updateUsers,
  deleteMovieById,
  deleteUsersById,
};
