import fs from "fs";
import path from "path";
import { MLMModel, MLMDocument } from "../models/mlm.model";
import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/:modelID", async (req: Request, res: Response) => {
	const { modelID } = req.params;

	// check if mID exists
	const result = <MLMDocument>await MLMModel.findOne({ mID: modelID });
	const sampleJSON = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "..", "public", "model", "model.json"), "utf8"));

	if (!result) return res.json(sampleJSON);

	return res.json(result.mlmData);
});

router.put("/:modelID", async (req: Request, res: Response) => {
	const { modelID } = req.params;

	// FInd the mlm and update it
	const result = <MLMDocument>await MLMModel.findOneAndUpdate({ mID: modelID }, { mlmData: req.body }, { new: true }).exec();

	if (!result) <MLMDocument>await new MLMModel({ mID: modelID, mlmData: req.body }).save();

	// Save the updated mlm
	return res.json({ message: "[PUT]" });
});

export default router;
