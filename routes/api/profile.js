const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User'); 

//@route  GET profile
//@desc   Get all profiles
//@access public

router.get('/me', auth,  async (req, res) => {
    try {
        const profile = await Profile
        .findOne({user:req.user.id})
        .populate('user', ['name', 'avatar']);

        if(!profile){
            return res.status(400).json({msg: 'No profile found for this user'});
        }

        res.json({profile});

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

//@route  POST profile
//@desc   Create or update logged in user's profile
//@access private

router.post('/', [auth, [
    check('status', 'Your status is required').not().isEmpty(),
    check('skills', 'Skills are required').not().isEmpty(),
]], async(req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }

    const {
        company, website, location, bio, status, skills, youtube,
        facebook, twitter, instagram, linkedin, githubusername
    } = req.body;

    //Build profile object
    const profileFields = { };
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website
    if(location) profileFields.location = location
    if(bio) profileFields.bio = bio
    if(status) profileFields.status = status
    if(githubusername) profileFields.githubusername = githubusername
    if(skills){
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    //Build social object
    profileFields.social = { };
    if(youtube) profileFields.social.youtube = youtube
    if(facebook) profileFields.social.facebook = facebook
    if(twitter) profileFields.social.twitter = twitter
    if(instagram) profileFields.social.instagram = instagram
    if(linkedin) profileFields.social.linkedin = linkedin

    try {
        let profile = await Profile.findOne({user: req.user.id});
        if(profile){
            //update
            console.log('update');

            profile = await Profile.findOneAndUpdate(
                { user:req.user.id },
                { $set : profileFields },
                {new : true }
            );

            return res.json(profile);
        }

        //Create
        console.log('create');

        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

//@route  GET api/profile
//@desc   Get all profiles
//@access public 

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', [
            'name', 'avatar'
        ]);

        res.json(profiles);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

//@route  GET api/profile/:user_id
//@desc   Get profile by user ID
//@access public 

router.get('/user/:user_id', async(req, res) => {
   
    try {
        const profile = await Profile.findOne({user:req.params.user_id}).populate(
            'user', ['name', 'avatar']
        );

        if(!profile){
            return res.status(400).json({msg: 'Profile not found'});
        }

        res.json(profile);

    } catch (error) {
        console.error(error.message);
        if(error.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Profile not found'});
        }

        res.status(500).send('Server Error');
    }
});

//@route  DELETE api/profile
//@desc   Delete profile, user & posts
//@access Private 

router.delete('/', auth, async(req, res) => {
    try {
        await Profile.findOneAndRemove({user: req.user.id});
        await User.findOneAndRemove({_id: req.user.id});

        res.json({msg: 'User deleted'});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

//@route  PUT api/profile/experience
//@desc   Add experience to profile
//@access Private 

router.put('/experience', [auth, [
    check('title', 'Title is required for this experience').not().isEmpty(),
    check('company', 'Company is required for this experience').not().isEmpty(),
    check('from', 'A From date is required for this experience').not().isEmpty(),

]],  async (req, res) => {
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({errors: errors.array()});
        }

        const { title, company, from, to, location, current, description } = req.body;
        const newExp = { title, company, from, to, location, current, description };

        const profile = await Profile.findOne({user : req.user.id});
        if(profile){
            profile.experience.unshift(newExp);

            await profile.save();
        }
        res.json(profile);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

//@route  DELETE api/profile/experience/:exp_id
//@desc   Remove experience from profile
//@access Private 

router.delete('/experience/:exp_id', auth,async (req, res) =>{

    try {
        profile = await Profile.findOne({user: req.user.id});
        if(profile){
            let removeIndex = profile.experience.map((exp) => {
                return exp.id;
            }).indexOf(req.params.exp_id);

            if(removeIndex === -1){
                return res.status(400).json({msg: 'Experience not found'});
            }

            profile.experience.splice(removeIndex, 1);
            
            profile.save();

            res.json(profile);
        }
    } catch (error) {
        
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

//@route  PUT api/profile/education
//@desc   Add education to profile
//@access Private 

router.put('/education', [auth, [
    check('school', 'School name is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required').not().isEmpty(),
    check('from', 'A From date is required').not().isEmpty(),

]],  async (req, res) => {
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({errors: errors.array()});
        }

        const { school, degree, from, to, fieldofstudy, current, description } = req.body;
        const newEd = { school, degree, from, to, fieldofstudy, current, description };

        const profile = await Profile.findOne({user : req.user.id});
        if(profile){
            profile.education.unshift(newEd);

            await profile.save();
        }
        res.json(profile);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

//@route  DELETE api/profile/education/:edu_id
//@desc   Remove education from profile
//@access Private 

router.delete('/education/:edu_id', auth,async (req, res) =>{

    try {
        profile = await Profile.findOne({user: req.user.id});
        if(profile){
            let removeIndex = profile.education.map((edu) => {
                return edu.id;
            }).indexOf(req.params.edu_id);

            if(removeIndex === -1){
                return res.status(400).json({msg: 'Education not found'});
            }

            profile.education.splice(removeIndex, 1);
            
            profile.save();

            res.json(profile);
        }
    } catch (error) {
        
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;