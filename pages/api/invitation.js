export default async function handler(req, res) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    res.status(200).json({ result: false})
}
