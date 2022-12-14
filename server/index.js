const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT =
  "bd167e2d7211b619bdbc1c7a883ddfc7c4c205bec1134678f2b0265825b87e95";

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;

  // TODO: prove that a name is in the list
  const isInTheList = verifyProof(body.proof, body.name, MERKLE_ROOT);
  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

// const name = 'Norman Block';
// const index = niceList.findIndex(n => n === name);
// const proof = merkleTree.getProof(index);

// // verify proof against the Merkle Root
// console.log( verifyProof(proof, name, root) );
