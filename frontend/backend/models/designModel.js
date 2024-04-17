const { model, Schema } = require("mongoose");

const designs_schema = new Schema(
  {
    institute_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Institute",
    },
    templateTitle: {
      type: String,
      default: "",
    },
    components: {
      type: Array,
      default: [],
    },
    image_url: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = model("designs", designs_schema);
