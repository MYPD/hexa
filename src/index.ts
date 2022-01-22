import "express-async-errors";
import apiRoutes from "./routes";
import connectDatabase from "./database";
import express, { Application, Request, Response } from "express";
import preRouteMiddleWares from "./middlewares/pre-route.middleware";

const app: Application = express();

// Pre-Route Middleware
preRouteMiddleWares(app);

app.get("/", (req: Request, res: Response) => {
	return res.redirect("https://www.haikoto.com//");
});

// API routes
app.use("/api", apiRoutes);

const PORT: any = process.env.PORT || 4000;

// Listen to server port
app.listen(PORT, async () => {
	// Initialize MongoDB connection
	await connectDatabase();

	console.log(`:::> Server listening on port ${PORT} @ http://localhost:${PORT}`);
});

// On server error
app.on("error", (error) => {
	console.error(`<::: An error occurred on the server: \n ${error}`);
});

module.exports = app;
