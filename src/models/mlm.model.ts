import mongoose from "mongoose";

// Create the interface
export interface MLMDocument extends mongoose.Document {
	mID: number;
	mlmData: Object;
}

const MLMSchema = new mongoose.Schema<MLMDocument>(
	{
		mID: {
			type: Number,
			required: true,
		},
		mlmData: {
			type: Object,
		},
	},
	{
		minimize: true,
	}
);

// Create and export mlm model
export const MLMModel = mongoose.model<MLMDocument>("MLM", MLMSchema);
