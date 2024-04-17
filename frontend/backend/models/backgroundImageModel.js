const { model, Schema } = require("mongoose");

const background_image_schema = new Schema(
  {
    institute_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Institute",
    },
    image_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("background_images", background_image_schema);
