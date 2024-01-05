const router = require('express').Router();
const Todo = require('../schemas/todoSchema');
//get all todo
router.get('/', async (req, res) => {
    try {
        const result = await Todo.find();
        res.status(200).json({
            message: 'Data fetched Successfully',
            result,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Server Error',
        });
    }
});

//get a todo by id
router.get('/:id', async (req, res) => {
    try {
        const result = await Todo.findById(req.params.id);
        res.status(200).json({
            message: 'Data fetched Successfully',
            result,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Server Error',
        });
    }
});

//post a todo
router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);
    try {
        await newTodo.save();
        res.status(200).json({
            message: 'Todo created',
        });
    } catch (err) {
        res.status(500).json({
            message: 'there was a server side error',
        });
    }
});

//post multiple todo
router.post('/all', async (req, res) => {
    try {
        await Todo.insertMany(req.body);
        res.status(200).json({
            message: 'Todo created',
        });
    } catch (err) {
        res.status(500).json({
            message: 'there was a server side error',
        });
    }
});

//update a todo
router.put('/:id', async (req, res) => {
    try {
        await Todo.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: { status: 'active' } },
            { useFindAndModify: false, new: true }
        );
        res.status(200).json({
            message: 'Todo updated Successfully',
        });
    } catch (err) {
        res.status(500).json({
            message: 'there was a server side error',
        });
    }
});

//delete a todo
router.delete('/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({
            message: 'Todo deleted Successfully',
        });
    } catch (err) {
        res.status(500).json({
            message: 'there was a server side error',
        });
    }
});
module.exports = router;
