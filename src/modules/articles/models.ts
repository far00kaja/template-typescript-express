import { Schema, model, connect } from 'mongoose';

const dataSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
    },
    slug: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    authors: {
      required: true,
      type: Schema.Types.UUID,
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
  }, {
  // versionKey: false
}
  // { timestamps: true }
);
dataSchema.set("toJSON", { getters: true });
dataSchema.set("toObject", { getters: true });

export default model("Articles", dataSchema);
