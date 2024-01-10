const router = require('express').Router();
const Todo = require('../schemas/todoSchema');
const User = require('../schemas/userSchema');
const checkLogin = require('../middlewares/checkLogin');
//get all todo
router.get('/', checkLogin, async (req, res) => {
    try {
        const result = await Todo.find().populate('user', 'name userName -_id');
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
router.get('/:id', checkLogin, async (req, res) => {
    try {
        const result = await Todo.findById(req.params.id).populate('user', 'name userName -_id');
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
router.post('/', checkLogin, async (req, res) => {
    const newTodo = new Todo({
        ...req.body,
        user: req.userId,
    });
    try {
        const todo = await newTodo.save();
        await User.updateOne(
            {
                _id: req.userId,
            },
            {
                $push: {
                    todos: todo._id,
                },
            }
        );
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
router.post('/all', checkLogin, async (req, res) => {
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
router.put('/:id', checkLogin, async (req, res) => {
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
router.delete('/:id', checkLogin, async (req, res) => {
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
