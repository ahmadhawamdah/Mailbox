const db = require('./db');


exports.getAll = async (req, res) => {
//   const from = await db.fromEmails(req.query.from);
//   if (from) {
//     res.status(200).json(from);
//   }
  let emails = await db.selectEmails(req.query.mailbox);
  if (emails.length != 0) {
    if (req.query.mailbox == undefined) {
      emails = await db.selectEmails(req.query.mailbox);
      res.status(200).json(emails);
    } else {
      emails = await db.selectEmails(req.query.mailbox);
      res.status(200).json(emails);
    }
  } else {
    res.status(404).send('unkown mailbox');
  }
};

exports.getById = async (req, res) => {
  const email = await db.selectEmail(req.params.id);
  if (email) {
    res.status(200).json(email);
  } else {
    res.status(404).send();
  }
};


exports.postMail = async (req, res) => {
  await db.insertEmail(req.body);
  res.status(201).send(req.body);
};

exports.moveMail = async (req, res) => {
  const movedMailID =
  await db.moveMail(req.params.id, req.query.mailbox, req.query.starred);
  if (movedMailID) {
    res.status(204).send(movedMailID);
  } else {
    res.status(404).send();
  }
};


// exports.moveMail = async (req, res) => {
//   const movedMailID = await db.moveMail(req.params.id, req.query.mailbox);
//   if ( req.query.mailbox != 'sent') {
//     if (movedMailID) {
//       res.status(204).send(movedMailID);
//     } else {
//       res.status(404).send();
//     }
//   } else {
//     res.status(409).send();
//   }
// };

