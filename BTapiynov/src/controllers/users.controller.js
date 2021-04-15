const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../configs');
const userValidationSchema = require('../middlewares/validatiors/user.validation');

exports.register = (req, res) => {
    
    let hashedPassword = bcrypt.hashSync(req.body.password,10);

	const user = new User(
			{
                firstName: req.body.firstName,
                password: hashedPassword,
				lastName: req.body.lastName,
				email: req.body.email,
                isAdmin: req.body.isAdmin,
                telephone: req.body.telephone,
                adresse: req.body.adresse
			});

   
  const validation = userValidationSchema.validate(req.body);

  console.log(validation);
  if (validation.error) {
      return res.status(400).send(validation.error);
  }

    user.save()
        .then(data => {
            let userToken = jwt.sign(
                {
                    id: data._id,
                    isAdmin: data.isAdmin,
                },
                config.jwt.secret, 
                {
                    expiresIn: 86400
                }
            )
            res.send({
                auth: true,
                token: userToken
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured"
            })
        })
}

exports.updateUser = (req, res) => {
    // let hashedPassword = bcrypt.hashSync(req.body.password,10);
    // req.body.password = hashedPassword;
	User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
		if(err){
			console.log(err);
		}
       
		res.send(user);
	});
}

exports.getAllUser = (req, res) => {
	User.find((err, user) => {
		if(err){
			console.log(err);
		}
		res.send(user);
	});
}


exports.getUser = (req, res) => {
	User.findById(req.params.id)
    .then((user) => {
        if(!user) {
            return res.status(404).send({
                message: 'user not found'
            })
        }
        res.send(user)
    })
    .catch((err) => {
        return res.status(404).send({
            message: 'error'
        })
    });
}

exports.login = (req,res) => {
    User.findOne({
        email: req.body.email
    })
    .then((user) => {
        if(!user) {
            return res.status(404).send({
                message: `no user find with email ${req.body.email}`
            })
        }
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid) {
            res.status(401).send({
                auth: false,
                token: null,
		message: "password invalid"
            })
        }
        let userToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            config.jwt.secret,
            {
                expiresIn: 86400
            }
        )
        res.status(200).send({
            auth: true,
            token: userToken
        })
    })
    .catch((err) => {
        res.send(err);
    });
}

exports.logout = (req, res) => {
    res.status(200).send({
        auth: false,
        token: null
    });
}

   