import { Router } from "express";
import modelRoutes from "./model.route";

const router: Router = Router();

router.use("/model", modelRoutes);

export default router;
