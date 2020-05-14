var utility_controller = require('../controllers/UtilityController');
var  express = require('express');
var  router = express.Router();


// CREATE Student
router.route('/create-utility').post(utility_controller.create_utility);

// READ Utilities
router.route('/').get(utility_controller.getAllUtilities);

// Get Single Utilities
router.route('/edit-utility/:id').get(utility_controller.editUtility);

// Update Utilities
router.route('/update-utility/:id').put(utility_controller.updateUtility);

// Delete Utilities
router.route('/delete-utility/:id').delete(utility_controller.deleteUtility);

module.exports = router;