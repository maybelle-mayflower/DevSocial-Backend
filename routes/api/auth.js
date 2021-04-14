const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

//@route  GET api/auth
//@desc   Test route
//@access public

router.get('/', auth, async (req, res) => {
    try {
         const id = req.user.id;
         const user = await User.findById(id).select('-password');
         
         res.status(200).send({user});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
   
});

//@route POST api/auth
//@desc authenticate users
//@access public

router.post('/',
[
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is requires').exists()
],
async(req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({errors: [{msg:'Invalid credentials'}]});
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
        {
            return res.status(400).json({errors: [{msg:'Invalid credentials'}]});
        }

         const payload = {
             user:{
                 id:user.id
             }
         }

         jwt.sign(payload, config.get('jwtSecret'),
         { expiresIn : 360000},
         (err, token) => {
             if(err) throw err;
             res.json({ token });
         });
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }

});
module.exports = router;