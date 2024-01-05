const router = require('express').Router();

//get all todo
router.get('/', async (req, res) => {});

//get a todo by id
router.get('/:id', async (req, res) => {});

//post a todo
router.post('/', async (req, res) => {});

//post multiple todo
router.post('/all', async (req, res) => {});

//update a todo
router.put('/:id', async (req, res) => {});

//delete a todo
router.delete('/:id', async (req, res) => {});
module.exports = router;
