const app = require("./app");

const port = 4500;
app.listen(port, (err) => {
  if (!err) {
    console.log(`Server Online! running at http://localhost:${port}`);
  }
});
