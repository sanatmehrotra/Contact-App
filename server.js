import express  from "express";
import route from "./routes/user.js";
import router from "./routes/contact.js";
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));  


app.use("/", route);
app.use("/contacts",router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  