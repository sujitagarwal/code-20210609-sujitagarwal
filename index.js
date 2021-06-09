// Express JS Server Initialization functions.

const express = require("express");
const app = express();

app.get("/", function (req, res) {
    run(res);
});

app.listen(8080, function () {
    console.log("Visit http://localhost:8080");
});

//------------------------------------------------------------------
// Core Logic Functions START
/**
 * Calculates BMI value for given weight and height
 * @param {number} height 
 * @param {number} weight 
 * @param {number} isHeightCM 
 * @returns number
 */
function calculateBMI(height, weight, isHeightCM = false)
{
    if(isHeightCM)
        height = height / 100;
    return (weight / (height * height)).toFixed(1);
}

/**
 * Calculates range, category, risk factors for given BMI input
 * @param {number} bmi 
 * @returns Object
 */
function fetchBMIStatistics(bmi)
{
    bmiStats = {range: "", category: "", risk: ""};
    if (bmi <= 18.4){
        bmiStats.range = "18.4 and Below";
        bmiStats.category = "Underweight";
        bmiStats.risk = "Malnutrition Risk";
    }
    else if (bmi >= 18.5 && bmi <= 24.9){
        bmiStats.range = "18.5 - 24.9";
        bmiStats.category = "Normal Weight";
        bmiStats.risk = "Low Risk";
    }
    else if (bmi >= 25 && bmi <= 29.9){
        bmiStats.range = "25 - 29.9";
        bmiStats.category = "Overweight";
        bmiStats.risk = "Enhanced Risk";
    }
    else if (bmi >= 30 && bmi <= 34.9){
        bmiStats.range = "30 - 34.9";
        bmiStats.category = "Moderately Obese";
        bmiStats.risk = "Medium Risk";
    }
    else if (bmi >= 35 && bmi <= 39.9){
        bmiStats.range = "35 - 39.9";
        bmiStats.category = "Severely Obese";
        bmiStats.risk = "High Risk";
    }
    else
    {
        bmiStats.range = "40 and above";
        bmiStats.category = "Very Severely Obese";
        bmiStats.risk = "Very High Risk";
    }
    return bmiStats;
}

// Core Logic Functions END



//------------------------------------------------------------------
// Output Rendering Utility Functions

/**
 * Prints the label and value with a line break.
 * @param {response} res 
 * @param {string} label 
 * @param {*} value 
 */
function writeToResponse(res, label, value)
{
    res.write(label + ": " + value + "<br/>");
}

/**
 * Prints a horizontal rule
 * @param {response} res 
 */
function drawLineToResponse(res)
{
    res.write("<hr/>");
}

// Sample Data Excecution
/**
 * Runs the BMI calculations on sample data
 * @param {response} res 
 */
function run(res)
{
    sampleData = [
        {
            "Gender": "Male",
            "HeightCm": 171,
            "WeightKg": 96
        },
        {
            "Gender": "Male",
            "HeightCm": 161,
            "WeightKg": 85
        },
        {
            "Gender": "Male",
            "HeightCm": 180,
            "WeightKg": 77
        },
        {
            "Gender": "Female",
            "HeightCm": 166,
            "WeightKg": 62
        },
        {
            "Gender": "Female",
            "HeightCm": 150,
            "WeightKg": 70
        },
        {
            "Gender": "Female",
            "HeightCm": 167,
            "WeightKg": 82
        }
    ];
    res.setHeader('Content-Type', 'text/html');
    sampleData.forEach(data => {
        bmi = calculateBMI(data.HeightCm, data.WeightKg, true);
        bmiStats = fetchBMIStatistics(bmi);
        writeToResponse(res, "Gender", data.Gender);
        writeToResponse(res, "Height (cm)", data.HeightCm);
        writeToResponse(res, "Weight (kg)", data.WeightKg) ;
        writeToResponse(res, "BMI", bmi) ;
        writeToResponse(res, "BMI Category", bmiStats.category) ;
        writeToResponse(res, "BMI Range", bmiStats.range) ;
        writeToResponse(res, "Health Risk", bmiStats.risk) ;
        drawLineToResponse(res);
    });
    res.end();
}
