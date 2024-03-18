import fs from "fs/promises";

import path from "path";

import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export const updateContacts = async (contact) => {
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
};

export const getAllContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

export const getContactById = async (id) => {
  const data = await getAllContacts();
  const result = data.find((contact) => contact.id === id);
  return result || null;
};

export const addContact = async (contact) => {
  const data = await getAllContacts();
  const newContact = { ...contact, id: nanoid() };
  data.push(newContact);
  await updateContacts(data);
  return newContact;
};

export const updateContact = async (id, contactsInfo) => {
  const data = await getAllContacts();
  const index = data.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  data[index] = { id, ...contactsInfo };
  await updateContacts(data);
  return data[index];
};

export const deleteContact = async (id) => {
  const data = await getAllContacts();
  const index = data.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  await updateContacts(data);
  return result;
};
