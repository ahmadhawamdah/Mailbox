const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.selectEmails = async (mailbox) => {
  let select = '';
  if (mailbox == undefined) {
    select = `SELECT id, mailbox, mail, starred from mail`;
  } else if (mailbox) {
    select = `SELECT id, mailbox, mail, starred FROM mail WHERE mailbox = $1`;
  }
  const query = {
    text: select,
    values: mailbox ? [`${mailbox}`] : [],
  };
  const {rows} = await pool.query(query);
  const emails = [];
  for (const row of rows) {
    emails.push({name: row.mailbox,
      id: row.id, mail: row.mail, starred: row.starred});
  }
  return emails;
};

exports.selectEmail = async (id) => {
  const select = 'SELECT * FROM mail WHERE id = $1';
  const query = {
    text: select,
    values: [id],
  };
  const {rows} = await pool.query(query);
  // console.log(rows[0].starred);
  return rows.length == 1 ?
  [
    {name: rows[0].mailbox, mail: rows[0].mail, starred: rows[0].starred},
  ] : undefined;
};

exports.insertEmail = async (mail) => {
  // https://stackoverflow.com/questions/51357215/destructuring-object-having-hyphen-in-property-name
  const date = new Date();
  const sqlDate = date.toISOString();

  const {'to-name': toName} = mail;
  const {'to-email': toEmail} = mail;
  const {'from-name': fromName} = mail;

  const insert =
  `INSERT INTO mail(mailbox, mail) VALUES ('sent','{"to":{
    "name": "${toName}",
    "email":"${toEmail}"},
    "from":{"name":"${fromName}",
    "email":"cse183student@ucsc.edu"},
    "sent":"${sqlDate}",
    "received":"${sqlDate}",
    "content":"${mail.content}",
    "subject": "${mail.subject}"}') RETURNING id`;

  const query = {
    text: insert};

  await pool.query(query);
};
// "from":{"name":"CSE183 Student",
exports.moveMail = async (id, mailbox, starred) => {
  const select = `SELECT id, mailbox, mail, starred from mail`;
  const query = {
    text: select,
  };
  const ids = [];
  const {rows} = await pool.query(query);
  for (const row of rows) {
    ids.push({id: row.id});
  }
  const emailsID = ids.find((email) => email.id == id);

  if (emailsID) {
    const update = 'UPDATE mail SET mailbox = $2, starred = $3 WHERE id = $1';
    const query = {
      text: update,
      values: [id, mailbox, starred],
    };
    await pool.query(query);
  }
  return emailsID;
};

// exports.readMail = async (id, mailbox) => {
//   const select = `SELECT id, mailbox, mail, from mail`;
//   const query = {
//     text: select,
//   };
//   const ids = [];
//   const {rows} = await pool.query(query);
//   for (const row of rows) {
//     ids.push({id: row.id});
//   }
//   const emailsID = ids.find((email) => email.id == id);

//   if (emailsID) {
//     const update = 'UPDATE mail SET mailbox = $2 WHERE id = $1';
//     const query = {
//       text: update,
//       values: [id, mailbox],
//     };
//     await pool.query(query);
//   }
//   return emailsID;
// };

