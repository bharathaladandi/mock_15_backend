

// const { parse } = require("dotenv");
const express = require("express")


const { BMI } = require("../models/Calculetor.model")

const CalcRouter = express.Router();


CalcRouter.get("/", async (req, res) => {
    const cals = await BMI.find()
    res.send(cals)
})

CalcRouter.post("/create", async (req, res) => {
    const payload = req.body

    const weight = req.body.weight;
    const height = req.body.height;
    const bmi = weight / (height * height);


    try{
        if (bmi < 18.5) {
            res.send( "BMI is: " + bmi +
                     "You are Underweight");
        }
         else if (18.5 <= bmi && bmi < 24.9) {
            res.send("BMI is: " + bmi +
                     "Normal Weight");
        }
         else if (25 <= bmi && bmi < 29.9) {
            res.send("BMI is: " + bmi +
                     "Overweight");
        }
        else if (30 <= bmi && bmi < 34.9) {
            res.send("BMI is: " + bmi +
                     "Obesity");
        }
         else if (35 <= bmi && bmi < 39.9) {
            res.send("BMI is: " + bmi +
                     "Extreme Obesity");
        }


  
    }
    catch(err){
        console.log(err)
        res.send(500).json({"err" : "Something went wrong"})
    }

    const newBMI = new BMI({
        weight: weight,
        height: height,
        bmi: weight / (height * height)
    });

    await newBMI.save()
    .then(bmi => res.json(bmi))
    .catch(err => res.status(400).json('Error: ' + err));

    res.send({"msg" : "BMI created successfully"})

});


CalcRouter.post('/add', (req, res) => {
    const bmi = new BMI(req.body);


    if (bmi < 18.5) {
        res.send( "BMI is: " + bmi +
                 "You are Underweight");
    }
     else if (18.5 <= bmi && bmi < 24.9) {
        res.send("BMI is: " + bmi +
                 "Normal Weight");
    }
     else if (25 <= bmi && bmi < 29.9) {
        res.send("BMI is: " + bmi +
                 "Overweight");
    }
    else if (30 <= bmi && bmi < 34.9) {
        res.send("BMI is: " + bmi +
                 "Obesity");
    }
     else if (35 <= bmi && bmi < 39.9) {
        res.send("BMI is: " + bmi +
                 "Extreme Obesity");
    }
    bmi.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({error: err});
        });

  


});


module.exports = { CalcRouter }

