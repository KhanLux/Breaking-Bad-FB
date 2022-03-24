const express = require("express");
const routes = express.Router();

routes.get("/", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("SELECT * FROM users_ratings", (err, rows) => {
      if (err) return res.send(err);

      res.json(rows);
    });
  });
});

routes.get("/ratings/:quote", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      `SELECT * FROM users_ratings WHERE quote_id = ${req.params.quote}`,
      (err, rows) => {
        if (err) return res.send(err);

        res.json(rows);
      }
    );
  });
});

routes.get("/favs/:user_id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      `SELECT * FROM favs WHERE user_id = '${req.params.user_id}'`,
      (err, rows) => {
        if (err) return res.send(err);

        res.json(rows);
      }
    );
  });
});

routes.delete("/favs/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      `DELETE FROM favs WHERE id = '${req.params.id}'`,
      (err, rows) => {
        if (err) return res.send({
          status: 0,
          msg: err,
          error: true
        });

        res.json({
          status: 1,
          msg: "succesfull",
          ok: true
        });
      }
    );
  });
});

routes.post("/", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    const rating = req.body.rating;
    const comment = req.body.comment;
    const user_info = req.body.user_info;
    const quote_id = req.body.quote_id;
    const user_id = req.body.user_id;

    conn.query(
      "INSERT INTO users_ratings set ?",
      {
        rating: rating,
        comment: comment,
        user_info: user_info,
        quote_id: quote_id,
        user_id: user_id,
      },
      (err, rows) => {
        if (err)
          return res.send({
            status: 0,
            msg: err,
            error: true,
          });

        res.send({
          status: 1,
          msg: "succesfull",
          ok: true,
        });
      }
    );
  });
});

routes.post("/register_fav", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(`SELECT * FROM favs where user_id = '${req.body.user_id}' AND quote_id = ${req.body.quote_id}`, (err, rows) => {
      if(rows.length > 0) {
        return res.send({
          status: 1,
          msg: "Opps la frase ya se encuentra añadida!",
          ok: true,
        });
      }

      conn.query("INSERT INTO favs set ?", [req.body], (err, rows) => {
        if (err)
          return res.send({
            status: 0,
            msg: err,
            error: true,
          });
  
        res.send({
          status: 1,
          msg: "Frase añadida correctamente!",
          ok: true,
        });
      });
    })
  });
});

module.exports = routes;
