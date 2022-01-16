class ML {
	constructor() {
		this.TOPK = 10;
		this.modelID = 1;
	}

	async init(mode) {
		console.log("Models Loading...");

		// Inits
		await this.initKNNClassifier();
		await this.initFeatureExtractor();

		// Camera Setup
		await this.initCamera();

		// Load Custom Model Trained
		await this.loadCustomModel();

		// Add event listener to the run button
		document.querySelector("#run-button").addEventListener("click", async () => this.run());

		// Add event listener to the camera toggle button
		document.querySelector("#toggle-button").addEventListener("click", async () => this.toggleCamera());

		if (mode === "train") {
			// Setup Training UI
			await this.setupLabelTrainingButtons();

			// Add event listener to the DOWNLOAD Button
			document.querySelector("#download-button").addEventListener("click", async () => this.save());
		}
	}

	async initKNNClassifier() {
		this.knnClassifier = ml5.KNNClassifier();
	}

	async initFeatureExtractor() {
		this.featureExtractor = ml5.featureExtractor("MobileNet", () => {
			console.log("[featureExtractor] Model Loaded!");
		});
	}

	async initCamera() {
		const videoElement = document.querySelector("#webcam");
		const webcam = new Webcam(videoElement, "enviroment");
		this.CAMERA = await webcam;
		await this.CAMERA.start();
	}

	async toggleCamera() {
		this.CAMERA.flip();
	}

	async loadCustomModel() {
		await this.knnClassifier.load("/api/model/" + this.modelID);
		this.counts = this.knnClassifier.getCountByLabel();
	}

	async run() {
		const output = document.querySelector("#output-result");

		// Add this as a bit of data for knn
		const numofLabels = this.knnClassifier.getNumLabels();

		// If no label has been added, stop
		if (numofLabels === 0) return;

		// Hide the Start button
		document.querySelector("#run-button").style.display = "none";

		// Clear any previous interval
		if (this.classify) clearInterval(this.classify);

		this.classify = setInterval(async () => {
			// const image = await this.CAMERA.snap();
			const image = document.getElementById("webcam");

			// Get the features of an image
			const features = this.featureExtractor.infer(image);

			// Use KNN Classifier to classify these features
			const result = await this.knnClassifier.classify(features, this.TOPK);

			output.innerText = this.getTopConfidenceLabel(result.confidencesByLabel);

			// Delete memory
			if (features != null) features.dispose();
		}, 500);
	}

	async setupLabelTrainingButtons() {
		// Set the multiple event listeners with class name "label"
		const labels = document.querySelectorAll(".label");

		labels.forEach((label) => {
			const infoText = label.querySelector("span");
			const label_text = label.querySelector("input").value;

			// Restore existing labels example count
			if (this.counts[label_text] !== undefined) {
				infoText.innerText = this.counts[label_text];
			}

			label.querySelector("button").addEventListener("click", async () => {
				// Increment the with number of times the label is trained
				infoText.innerText = parseInt(infoText.innerText) + 1;

				// Train the label
				// ============================================================

				// Start grabbing an image of the video
				const image = document.querySelector("#webcam");

				// Get the features of an image
				const features = await this.featureExtractor.infer(image);

				// Add the image with a label to the KNN Classifier
				this.knnClassifier.addExample(features, label_text);

				// Delete memory
				if (features != null) features.dispose();
			});
		});
	}

	async save() {
		const data = await this.knnClassifier.save(null, true);

		// Make a PUT request to the server
		const response = await fetch("/api/model/" + this.modelID, {
			method: "PUT",
			body: data,
			headers: {
				"Content-Type": "application/json",
			},
		});

		// Check the response status
		if (response.status === 200) {
			console.log("Model Saved!");
			alert("Model Saved!");
		}
	}

	async saveToFile() {
		this.knnClassifier.save("Hexa Model - " + String(Date.now()));
	}

	getTopConfidenceLabel(confidences) {
		let topConfidenceLabel;
		let topConfidence = 0;

		for (let label in confidences) {
			if (confidences[label] > topConfidence) {
				topConfidenceLabel = label;
			}
		}

		return topConfidenceLabel;
	}
}
