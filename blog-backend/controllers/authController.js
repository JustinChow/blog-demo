const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { body, validationResult } = require('express-validator');



// Handle POST on login
exports.login = function(req, res) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }

           payload = {
               username: user.get('username'),
               isAdmin: user.get('isAdmin'),
           }

           // generate a signed son web token with the contents of user object and return it in the response
           const token = jwt.sign(payload, process.env.JWT_SECRET);
           return res.json({payload, token});
        });
    })(req, res);
};

// Handle POST on signup
exports.signup = [
    // Validate fields
    body('username').trim().isLength({ min: 1 })
        .withMessage('Username must be specified.')
        .isAlphanumeric()
        .withMessage('Username has non-alphanumeric characters.')
        .custom((value, { req }) => {
            return User.findOne({ username: value }).then(
                (user) => {
                    if (user) {
                        return Promise.reject('Username already exists.');
                    }
                    return Promise.resolve();
                },
                (reason) => {
                    return Promise.reject(reason);
                }
            );
        }),
    body('password').trim().isLength({ min: 8 })
        .withMessage('Password must be at least 8 chars long'),
    body('password_confirm', 'Password confirmation field must have the same value as the password field')
        .exists()
        .custom((value, { req }) => value === req.body.password),

    
    
    // Process request after validation and sanitization
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            res.status(400).send(errors);
            return;
        }
        else {
            // Data is valid

            // Hash password and save user object
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                const user = new User({
                    username: req.body.username,
                    password: hashedPassword,
                    isAdmin: false
                }).save((err, savedDoc) => {
                    if (err) {
                        return next(err);
                    };
                    res.status(200).send(savedDoc);
                });
            });
        }
    }
];
