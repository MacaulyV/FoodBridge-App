// src/routes/donationRoutes.js
const express        = require('express');
const path           = require('path');
const multer         = require('multer');
const validateBody   = require('../middlewares/validateBody');
const validateParams = require('../middlewares/validateParams');
const {
    donationCreateSchema,
    donationUpdateSchema,  // schema já sem user_id
    idParamSchema,
    userIdParamSchema
} = require('../validation/schemas');

const {
    createDonation,
    getAllDonations,
    getDonationById,
    updateDonation,
    deleteDonation,
    getGallery,
    getDonationsByUserId
} = require('../controllers/donationController');

const router = express.Router();

// Multer fica igual
const uploadsPath = path.resolve(__dirname, '../../uploads');
const storage     = multer.diskStorage({
    destination: uploadsPath,
    filename:    (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage }).array('imagens', 5);

// CREATE
router.post(
    '/',
    upload,
    validateBody(donationCreateSchema),
    createDonation
);

// READ ALL
router.get('/', getAllDonations);

// READ ONE
router.get(
    '/:id',
    validateParams(idParamSchema),
    getDonationById
);

// UPDATE  <-- aqui removemos user_id
router.put(
    '/:id',
    validateParams(idParamSchema),
    upload,
    validateBody(donationUpdateSchema),
    updateDonation
);

// DELETE
router.delete(
    '/:id',
    validateParams(idParamSchema),
    deleteDonation
);

// GALLERY
router.get(
    '/:id/gallery',
    validateParams(idParamSchema),
    getGallery
);

// GET ALL DONATIONS BY USER ID
router.get(
    '/user/:userId',
    validateParams(userIdParamSchema),
    getDonationsByUserId
);

module.exports = router;
