
let COLLABORATEURS = require('./data/collaborateurs.js')

let nextInsertId = COLLABORATEURS.length;
let emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

module.exports = {

  /*
      GET /collaborateurs
      Renvoie la liste de tous les collaborateurs en base
  */
  findAll: (req, res) => {
    res.json(COLLABORATEURS)
  },

  /*
      GET /collaborateur/:id
      Renvoie le collaborateur portant l'identifiant ":id" en base
  */
  findOne: (req, res) => {
    const collaborateur = COLLABORATEURS.find(c => c.id == req.params.id);

    if (collaborateur) {
      res.json(collaborateur)
    } else {
      res.json({
        error: 1,
        message: 'Collaborateur non trouvé'
      })
    }
  },

  /*
      POST /collaborateur
      Insère un nouveau collaborateur en base
  */
  create: (req, res) => {

    if (!req.body.gender || (req.body.gender !== 'male' && req.body.gender !== 'female'))
      return res.json({ error: 1, message: `Field 'gender' must be present and equal to 'male' or 'female'` });

    if (!req.body.firstname)
      return res.json({ error: 1, message: `Field 'firstname' must be present` });

    if (!req.body.lastname)
      return res.json({ error: 1, message: `Field 'lastname' must be present` });

    if (!req.body.email)
      return res.json({ error: 1, message: `Field 'email' must be present` });
    else if (!emailRegExp.test(req.body.email))
      return res.json({ error: 1, message: `Field 'email' must be a valid RFC email` });

    if (!req.body.phone)
      return res.json({ error: 1, message: `Field 'phone' must be present` });

    if (!req.body.birthdate)
      return res.json({ error: 1, message: `Field 'birthdate' must be present` });

    if (!req.body.city)
      return res.json({ error: 1, message: `Field 'city' must be present` });

    if (!req.body.country)
      return res.json({ error: 1, message: `Field 'country' must be present` });

    if (req.body.photo && !req.body.photo.startsWith('http'))
      return res.json({ error: 1, message: `Field 'photo' must be a valid URL` });


    const nouveauCollaborateur = {
      id       : ++nextInsertId,
      gender   : req.body.gender,
      firstname: req.body.firstname,
      lastname : req.body.lastname,
      email    : req.body.email,
      phone    : req.body.phone,
      birthdate: req.body.birthdate,
      city     : req.body.city,
      country  : req.body.country,
      photo    : req.body.photo
    }

    COLLABORATEURS.push(nouveauCollaborateur)

    res.json({
      success: 1,
      message: 'Collaborateur inséré',
      inserted: nouveauCollaborateur
    })
  },

  /*
      PUT /collaborateur/:id
      Modifie le collaborateur portant l'identifiant ":id" en base
  */
  update: (req, res) => {

    const collaborateur = COLLABORATEURS.find(c => c.id == req.params.id);

    if (!collaborateur) {
      return res.json({
        error: 1,
        message: 'Collaborateur non trouvé'
      })
    }

    if (req.body.gender && req.body.gender !== 'male' && req.body.gender !== 'female')
      return res.json({ error: 1, message: `Field 'gender' must be present and equal to 'male' or 'female'` });

    collaborateur.gender    = req.body.gender || collaborateur.gender
    collaborateur.firstname = req.body.firstname || collaborateur.firstname
    collaborateur.lastname  = req.body.lastname || collaborateur.lastname

    if (req.body.email && !emailRegExp.test(req.body.email))
      return res.json({ error: 1, message: `Field 'email' must be a valid RFC email` });

    collaborateur.email     = req.body.email || collaborateur.email
    collaborateur.phone     = req.body.phone || collaborateur.phone
    collaborateur.birthdate = req.body.birthdate || collaborateur.birthdate
    collaborateur.city      = req.body.city || collaborateur.city
    collaborateur.country   = req.body.country || collaborateur.country

    if (req.body.photo && !req.body.photo.startsWith('http'))
      return res.json({ error: 1, message: `Field 'photo' must be a valid URL` });

    collaborateur.photo     = req.body.photo || collaborateur.photo

    res.json({
      success: 1,
      message: 'Collaborateur modifié',
      updated: collaborateur
    })

  },

  /*
      DELETE /collaborateur/:id
      Supprime le collaborateur portant l'identifiant ":id" en base
  */
  remove: (req, res) => {

    let index = COLLABORATEURS.findIndex(c => c.id == req.params.id)
    if (index === -1) {
      res.json({
        error: 1,
        message: 'Collaborateur non trouvé'
      })
    } else {
      let collaborateur = COLLABORATEURS.splice(index, 1)[0]
      res.json({
        success: 1,
        message: 'Collaborateur supprimé',
        removed: collaborateur
      })
    }

  }

}
