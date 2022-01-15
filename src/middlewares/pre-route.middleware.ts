import path from "path";
import dotenv from "dotenv";
import express, { Application } from "express";

const HOC = (app: Application) => {
	// Set Env File
	dotenv.config({
		path: path.resolve(__dirname, "..", "..", ".env"),
	});

	// Tell express to recognize the incoming Request Object as a JSON Object
	app.use(express.json());

	// Express Static Engine to serve static files
	app.use("/", express.static(path.join(__dirname, "..", "..", "public")));

	// Express body parser
	app.use(express.urlencoded({ extended: true }));

	return app;
};

export default HOC;
