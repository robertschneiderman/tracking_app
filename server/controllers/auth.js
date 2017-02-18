const User = require('../models').User;
const jwt = require('jwt-simple');

const config = require('../environment');
const bcrypt = require('bcrypt-nodejs');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

module.exports = {
    signup(req, res) {
        let {email, name, password} = req.body;

        if (!email || !password) {
            res.status(422).send({ error: "You must provide email and password" });
        }

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt, null);

        User.findOrCreate({ where: {email}, defaults: {password: hash}}).spread((user, created) => {
            // if (err) { return next(err); }
            if (!created) {
                return res.status(422).send({ error: 'Email is in use'} );
            }
            res.status(201).send({token: tokenForUser(user), id: user.id});
        }).catch(error => res.status(400).send(error));
    },

    signin(req, res, next) {
        res.send({ token: tokenForUser(req.user), user: {id: req.user.id, email: req.user.email} });
    }
};