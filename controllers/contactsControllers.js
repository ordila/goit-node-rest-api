import ctrlWrapper from "../decoration/ctrlWrapper.js";

import * as contactsServices from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

const getAllContacts = async (req, res) => {
  const result = await contactsServices.getAllContacts();

  res.json(result);
};

const getContactByID = async (req, res) => {
  const { id } = req.params;

  const result = await contactsServices.getContactById(id);

  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;

  const result = await contactsServices.deleteContact(id);

  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export const createContact = async (req, res) => {
  const result = await contactsServices.addContact(req.body);

  res.status(201).json(result);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;

  const result = await contactsServices.updateContact(id, req.body);

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

export default {
  getAll: ctrlWrapper(getAllContacts),
  getContactByID: ctrlWrapper(getContactByID),
  addContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContactByID: ctrlWrapper(deleteContact),
};
