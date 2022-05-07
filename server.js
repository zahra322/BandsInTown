const express =  require ("express");
const path =  require ("path");

const app = express();
app.use(express.static("assets"));
app.get("/" , ( req , res ) => {
    res.sendFile(path.resolve("assignment.html"))
});
app.listen(5050,() => console.log("Server running...."));

