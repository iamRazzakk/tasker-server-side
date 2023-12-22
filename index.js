const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json());

//

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.pii6nyx.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const TaskCollection = client.db("TaskDB").collection("Task");
    app.post("/createTask", async (req, res) => {
      const TaskData = req.body;
      const result = await TaskCollection.insertOne(TaskData);
      res.send(result);
    });
    app.get("/createTask", async (req, res) => {
      const result = await TaskCollection.find().toArray();
      res.send(result);
    });
    app.get("/createTask/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await TaskCollection.findOne(query);
      res.send(result);
    });
    app.patch("/createTask/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateStatus = req.body;
      console.log(updateStatus);
      const updateDoc = {
        $set: {
          status: updateStatus.status,
        },
      };
      const result = await TaskCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
    app.delete("/createTask/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await TaskCollection.deleteOne(filter);
      res.send(result);
    });

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
