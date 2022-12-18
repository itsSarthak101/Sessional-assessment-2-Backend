const express = require('express')
const bcrypt = require('bcrypt')

const { default: mongoose } = require('mongoose')
const router = express.Router()

const Signup = require('../model/signup')

router.get('/', (req, res) => {
    res.status(200).json( {msg: 'GET request to /users/signup'} )
})

router.post('/', (req, res) => {
    Signup.find( {email: req.body.email} )
        .then(result => {
            if(result.length !== 0) {
                // The email already exists
                res.status(400).json( {message: 'Email already exists, try again with a different email'} )
            } else {
                const saltRounds = 10
                bcrypt.hash(req.body.password, saltRounds)
                    .then(result => {
                        
                        const newUser = new Signup({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: result
                        })
                    
                        newUser.save()
                            .then(result => res.status(201).json( {message: 'User Signup Successful', userDetails: result} ))
                            .catch(err => res.status(500).json( {message: 'Server Encountered an Error', error: err} ))
                            })
                    .catch(err => res.status(500).json( {message: 'Server Encountered an Error', error: err} ))
            }
        })
        .catch(err => res.status(500).json( {message: 'Server Encountered an Error', error: err} ))  
})

router.patch('/', (req, res) => {
    // Edit a password for an existing user
    const oldPassword = req.body.password
    const newPassword = req.body.newPassword
    // check if the user exists or not
    Signup.find( {email: req.body.email} )
        .then(result => {
            if(result.length === 0) {
                // The user does not exist
                res.status(400).json( {message: 'Email or password did not match, try again with a different email or password'} )
            } else {
                
                if(result[0].password === oldPassword) {
                    
                    const updatedUser = {
                        _id: result[0]._id,
                        email: result[0].email,
                        password: newPassword
                    }
                    Signup.findByIdAndUpdate(result[0]._id, updatedUser)
                        .then(result => res.status(200).json( {message: 'Password Changed', updatedUser: result} ))
                        .catch(err => res.status(500).json( {message: 'Server Encountered an Error', error: err} ))
                } else {
                    res.status(400).json( {message: 'Email or password did not match, try again with a different email or password'} )
                }
            }
        })
        .catch(err => res.status(500).json( {message: 'Server Encountered an Error', error: err} ))
})

router.delete('/', (req, res) => {
    res.status(200).json( {msg: 'DELETE request to /users/signup'} )
})

module.exports = router;