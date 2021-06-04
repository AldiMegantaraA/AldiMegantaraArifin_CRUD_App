const Userdb = require('../model/model');

// save & create user baru
exports.create=(req, res) => {
    // validasi request
    if(!req.body) {
        res.status(400).send({message : "Field cannot be empty!"});
        return;
    }

    // user baru
    const user = new Userdb({
        userName:req.body.userName,
        accountNumber:req.body.accountNumber,
        emailAdress:req.body.emailAdress,
        identityNumber:req.body.identityNumber,
        status:req.body.status
    })

    // store to db
    user
     .save(user)
     .then(data => {
        //  res.send(data)
        res.redirect('/')
     })
     .catch(err => {
         res.status(500).send({
             message : err.message || "Some error while creating new user"
         });
     });
}

// ambil dan kembalikan semua user || salah satu
exports.find = (req, res) => {
    if(req.query.id) {
        const id = req.query.id;

        Userdb.findById(id)
         .then(data => {
             if(!data) {
                 res.status(404).send({ message : "Cannot find user with id :"+ id })
             }else {
                 res.send(data)
             }
         })
         .catch(err => {
            res.status(500).send({ message: "Could not delete user with id :" + id })
         })
    }else {
        Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "error while retriving user information"
            })
        })
    }
}

// update identifikasi berdasarakan user ID
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({message : "Field cannot be empty!"});
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify:false })
        .then(data => {
            if(!data) {
                res.status(404).send({ message: `Cannot update user with ${id}, maybe user not found!` })
            }else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error update user information"})
        })
}

// hapus spesifik user
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
     .then(data => {
        if(!data) {
            res.status(404).send({ message: `Cannot delete user with ${id}, maybe the id is wrong!` })
        }else {
            res.send({
                message : `User with id : ${id} was deleted successfully!`
            })
        }
     })
     .catch(err => {
        res.status(500).send({ message: "Could not delete user with id :" + id })
     })
}