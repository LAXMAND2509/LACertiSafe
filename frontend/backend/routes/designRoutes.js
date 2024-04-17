const designController = require("../controllers/designController");
const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

// create new design
router.post("/create-user-design", auth, designController.create_user_design);

// get single design
router.get("/user-design/:design_id", auth, designController.get_user_design);

// update single design
router.put(
  "/update-user-design/:design_id",
  auth,
  designController.update_user_design
);

// get all user-designs
router.get("/user-designs", auth, designController.get_user_designs);

// delete single design
router.put(
  "/delete-user-design/:design_id",
  auth,
  designController.delete_user_design
);

router.post("/add-user-image", auth, designController.add_user_image);
router.get("/get-user-image", auth, designController.get_user_image);

router.post(
  "/add-background-image",
  auth,
  designController.add_background_image
);
router.get(
  "/get-background-image",
  auth,
  designController.get_background_image
);

//
//
//

// router.get("/templates", auth, designController.get_templates);
// router.get(
//   "/add-user-template/:template_id",
//   auth,
//   designController.add_user_template
// );

module.exports = router;
