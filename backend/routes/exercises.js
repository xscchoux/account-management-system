const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    console.log("here")
    const username = req.body.username;
    const Month = req.body.Month;
    const amount = Number(req.body.amount);
    const date = Date.parse(req.body.date);
    const newExercise = new Exercise({
        username,
        Month,
        amount,
        date,
    });

    newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get by ID
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete by ID
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//update by ID
router.route('/update/:id').post((req,res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.Month = req.body.Month;
            exercise.amount = Number(req.body.amount);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
            .then(() => res.json('Exercise updated'))
            .catch(err => res.status(400).json('Error: ' + err));
        
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;