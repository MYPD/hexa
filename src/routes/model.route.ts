import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
    return res.json({ message: "Model Hexa" });
});

export default router;