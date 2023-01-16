const express = require("express");
const { json } = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const countriesModel = require("./model/countriesModel");
const citiesModel = require("./model/citiesModel")
const categoriesModel = require("./model/categoriesModel")
const earningModel = require("./model/earningsModel");
const expensesModel = require("./model/expensesModel");

const app = express()
app.use(json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/FinTrackDB")
.then(()=>console.log("DB Connected!"))
.catch((err)=>console.log(err))

app.get("/", (req, res)=>{
    res.send("Welcome to Financial Tracking app for your business")
})

app.get("/categories", async (req, res)=> {
    const result = await categoriesModel.find({})
    res.json(result)
});

app.get("/catdd", async (req, res)=>{
    const result = await categoriesModel.find({})
    const newData = result.map((item) => ({
        value: item.id,
        label: item.name,
    }));
    res.json(newData)
})

app.post("/addearning", (req, res)=>{
    try{
    const payload = req.body;
    const newEarning = new earningModel(payload)
    newEarning.save()
    res.send("Successfully added the earning")
} catch (err) {
    res.send(err)
}
})

app.get("/getearning", async (req, res)=>{
    const result = await earningModel.find({})
    res.json(result)
})

app.post("/earningdelete", (req, res)=>{
    const payload = {_id: (req.body._id)};
    const result = earningModel.findOneAndDelete(payload, (err, doc)=>{
        if(err) {
            res.json(err)
        }
     else {
        res.json(doc)
    }
})})

app.post("/addexpenses", (req, res)=>{
    try{
        const payload = req.body
        const newExpenses = new expensesModel(payload)
        newExpenses.save()
        res.send("Successfully added the expenses")
    } catch (err) {
        res.send(err)
    }
})

app.get("/getexpenses", async (req, res)=>{
    const result = await expensesModel.find({})
    res.json(result)
})

app.post("/citiesfilt", async (req, res)=>{
    const result = await citiesModel.find(req.body)
    res.json({ result })
});

app.post("/citiesfilt", async (req, res)=>{
    const result = await citiesModel.find(req.body)
    res.json({ result })
});

app.get("/countries",async (req, res)=>{
    const result = await countriesModel.find({})
    res.json({result})
})

app.get("/cities", async (req, res)=>{
    const result = await citiesModel.find({})
    res.json({result})
})

app.post("/addtrans", (req, res)=>{

})

app.listen(4040,(req, res)=>{
    console.log("Server is up and running at 4040");
})