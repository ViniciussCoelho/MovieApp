const express = require("express");

const PORT = process.env.PORT || 3001;

const cors = require("cors");

const app = express();

const KEY = "a33fc21d";

const whitelist = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

app.get("/search", (req, res) => {
  const url = `http://www.omdbapi.com/?apikey=${KEY}&t=${req.query.title}`;
  console.log(url);
  fetch(url)
    .then(response => response.json())
    .then(data => res.json(data));
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

