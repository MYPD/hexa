const mongoose = require("mongoose");

const connect = () => {
	const databaseURI = process.env.MONGODB_URI || process.env.MONGO_ATLAS_URI;

	mongoose.connect(
		databaseURI,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
		(err: Error) => {
			if (err) {
				console.error("<::: Couldn't connect to database", err);
			} else {
				console.log(`:::> Connected to MongoDB database. ${databaseURI}`);
			}
		}
	);
};

export default connect;
