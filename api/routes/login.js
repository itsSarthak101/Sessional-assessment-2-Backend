const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const Signup = require('../model/signup')

// localhost:5001/users/login
router.get('/', (req, res) => {
    res.status(200).json( {msg: 'Session in use', loggedInUser: req.session.user} )
})

router.get('/:variableId', (req, res) => {
    
    const queryParam = req.params.variableId
    res.status(200).json( {msg: `GET request to /users/login/${queryParam}`} )
})


router.post('/', (req, res) => {
    const userEmail = req.body.email
    const userPassword = req.body.password
    
    Signup.find( {email: userEmail } )
        
        .then(result => {
            if(result.length === 0) {
                res.status(400).json( { message: 'Records Not Found!', records: result } )
            } else {
                // Decryption
                bcrypt.compare(req.body.password, result[0].password)
                    .then(result => {
                        if(result) {
                            const loggedInUser = {
                                email: req.body.email,
                                password: req.body.password
                            }
        
                            // Create a session for the user which is logged-in
                            req.session.user = loggedInUser
                            req.session.save()
                            res.status(200).json( { message: `User Authenticated! Session started for the user with the email of ${req.session.user.email}` } )
                        } else {
                            res.status(400).json( { message: 'User Authentication Failed!' } )
                        }
                    })
                    .catch(err => res.status(500).json( {message: 'Server Encountered an Error', error: err } ))
            }
        })
        .catch(err => res.status(500).json( {message: 'Server Encountered an Error', error: err } ))
})

router.patch('/', (req, res) => {
    res.status(200).json( {msg: 'PATCH request to /users/login'} )
})

router.delete('/', (req, res) => {
    res.status(200).json( {msg: 'DELETE request to /users/login'} )
})

module.exports = router;