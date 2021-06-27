const express = require('express');
const router = express.Router();
const {
  getContactsList,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
} = require('../../model/index');
const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatusContact,
} = require('./validation');

router.get('/', async (_req, res, next) => {
  try {
    const contacts = await getContactsList();
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contactWithId = await getContactById(req.params.contactId);
    if (contactWithId) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contactWithId } });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
  } catch (err) {
    next(err);
  }
});

router.post('/', validateCreateContact, async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    return res
      .status(201)
      .json({ status: 'success', code: 201, data: { contact } });
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    next(err);
  }
});

router.patch('/:contactId', validateUpdateContact, async (req, res, next) => {
  try {
    const contactWithId = await updateContact(req.params.contactId, req.body);
    if (contactWithId) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contactWithId } });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
  } catch (err) {
    next(err);
  }
});

router.patch(
  '/:contactId/favorite',
  validateUpdateStatusContact,
  async (req, res, next) => {
    try {
      const contactWithId = await updateStatusContact(
        req.params.contactId,
        req.body
      );
      if (contactWithId) {
        return res
          .status(200)
          .json({ status: 'success', code: 200, data: contactWithId });
      }
      return res
        .status(404)
        .json({ status: 'error', code: 404, message: 'Not found' });
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contactWithId = await removeContact(req.params.contactId);
    if (contactWithId) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contactWithId } });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
