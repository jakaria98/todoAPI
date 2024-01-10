const router = require('express').Router();
const User = require('../schemas/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10);
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
router.post('/login', async (req, res) => {
    try {
        const user = await User.find({ userName: req.body.userName });
        if (user && user.length > 0) {
            const isValidPass = await bcrypt.compare(req.body.password, user[0].password);
            if (isValidPass) {
                const token = jwt.sign(
                    {
                        userName: user[0].userName,
                        userId: user[0]._id,
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '1hr' }
                );
                res.status(200).json({
                    message: 'User Logged in',
                    token,
                });
            } else {
                res.status(401).json({
                    message: 'Authentication Failed',
                });
            }
        } else {
            res.status(500).json({
                message: 'Authentication Failed',
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: 'Authentication Failed',
        });
    }
});

module.exports = router;
