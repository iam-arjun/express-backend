const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/database1",
    { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("Connected successfully")).catch((err) => console.log(err));


// Defining the document schema or structure of the document

const db1schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ctype: String,
    videos: Number,
    author: String,
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
})
//Defining the model i.e the collection name..... 

const Db1model = new mongoose.model("Collection1", db1schema);


// // Inserting the values into the collection defined

// const createDocument = async () => {
//     try {
//         const reactPlaylist = new Db1model({
//             name: "Node Js",
//             ctype: "BackEnd",
//             videos: 50,
//             author: "Thapa Technical",
//             active: true
//         })

//         const result = await reactPlaylist.save(); // saving the first document
//         console.log(result);
//     }
//     catch (err) {
//         console.log(err) // instead of error generate while creating or saving the document;
//     }
// }

// createDocument(); // calling the function for creating the very first document in predefined collection.




