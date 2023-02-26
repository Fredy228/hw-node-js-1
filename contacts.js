const fs = require('fs').promises;
const path = require('path');
const uniqid = require('uniqid');

const contactsPath = path.join('db', 'contacts.json');
const resonse = fs.readFile(contactsPath, 'utf-8');

async function listContacts() {
  const data = await resonse;

  console.table(JSON.parse(data));
}

async function getContactById(contactId) {
  const data = await resonse;

  const list = JSON.parse(data);
  const contactById = list.find(contact => contact.id === contactId);
  if (contactById) return console.table(contactById);
  console.log('Oops.... Not found contact :(');
}

async function removeContact(contactId) {
  const data = await resonse;

  const list = JSON.parse(data);
  const contactById = list.find(contact => contact.id === contactId);
  if (contactById) {
    const filterContacts = list.filter(contact => contact.id !== contactId);

    await fs.writeFile(contactsPath, JSON.stringify(filterContacts), 'utf-8');
    console.table(filterContacts);
    console.log('Contact deleted successfully!');
    return;
  }
  console.log('Oops.... Not found contact :(');
}

async function addContact(name, email, phone) {
  const data = await resonse;

  const list = JSON.parse(data);
  list.push({
    id: uniqid(),
    name,
    email,
    phone,
  });
  await fs.writeFile(contactsPath, JSON.stringify(list), 'utf-8');
  console.table(list);
  console.log('Contact added successfully!');
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
