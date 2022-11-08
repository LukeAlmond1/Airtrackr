import axios from "axios";

export default async function handler(req, res) {
    const { value, type } = req.body;

    const { data } = await axios.get(
        `https://api.duffel.com/places/suggestions?query=${value}&type=${type}`,
        {
        headers: {
            Authorization: "Bearer " + process.env.DUFFLE_KEY,
            "Duffel-Version": "beta",
        },
        }
    );

    const dataArray = data.data.filter((e) => e.iata_code !== "");

    res.json({ dataArray });
}
