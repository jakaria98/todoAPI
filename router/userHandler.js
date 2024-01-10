const router = require('express').Router();
const User = require('../schemas/userSchema');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password,10);
        const user = new User({
            name: req.body.name,
            userName: req.body.userName,
            password: hashedPass,
        });
        await user.save();
        res.status(200).json({
            message: 'User Created',
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: 'User Creation Failed',
        });
    }
});

module.exports = router;
