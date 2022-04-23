const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

//user middleware
app.use(cors());
app.use(express.json());

//username: dbTest1
//password:147369

const uri =
  "mongodb+srv://dbTest1:147369@cluster0.wizj9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const userCollection = client.db("foodExpress").collection("user");

    //get users
    app.get("/user", async (req, res) => {
      const query = {};
      const cursor = userCollection.find();
      const users = await cursor.toArray();
      res.send(users);
    });

    //create new user
    app.post("/user", async (req, res) => {
      const newUser = req.body;
      console.log("user created", newUser);
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    //delete user
    app.delete("/user/:id", (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
    });
  } finally {
    // await client.close()
  }
}

run().catch(console.dir());

app.get("/", (req, res) => {
  res.send("running my node CRUD server");
});

app.listen(port, () => {
  console.log("CRUD server is running");
});
