import TeachableMachine from "@sashido/teachablemachine-node";

export default async function classify(req, res) {
    const model = new TeachableMachine({
        modelUrl: "https://teachablemachine.withgoogle.com/models/Zmpf_xVav/"
    });

    const { image } = req.body;

    if (!image) return res.status(400).json({ error: "No image provided" });

    try {
        const predictions = await model.classify({
            imageUrl: image
        });

        res.status(200).json({ predictions });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            error
        });
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "5mb"
        }
    }
};
