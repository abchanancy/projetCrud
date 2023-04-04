let mongoose = require("mongoose"),
express = require("express"),
router = express.Router();

// Student Model
let Student = require("../models/Student");

// CREATE Student
router.post("/create-student", async(req, res, next) => {
    const student = new Student({
        name:req.body.name,
        email:req.body.email,
        rollno:req.body.rollno
    })
    try {
        const result = await student.save()
        res.json(result)
    } catch (error) {
        res.status(400).json(error)
    }

});

// READ Students
router.get("/", async(req, res) => {
    try {
        const students = await Student.find()
        res.json(students)
    } catch (error) {
        res.status(400).json(error)
    }
    

});

// UPDATE student
router
.route("/update-student/:id")
// Get Single Student
.get((req, res) => {
	studentSchema.findById(
		req.params.id, (error, data) => {
	if (error) {
		return next(error);
	} else {
		res.json(data);
	}
	});
})

// Update Student Data
.put((req, res, next) => {
	studentSchema.findByIdAndUpdate(
	req.params.id,
	{
		$set: req.body,
	},
	(error, data) => {
		if (error) {
		return next(error);
		console.log(error);
		} else {
		res.json(data);
		console.log("Student updated successfully !");
		}
	}
	);
});

// Delete Student
router.delete("/delete-student/:id",async(req, res, next) => {
    try {
        const result = await Student.findByIdAndDelete(
            req.params.id
        )
        res.json(result)
    } catch (error) {
        res.status(400).json(error)
    }
});

module.exports = router;
