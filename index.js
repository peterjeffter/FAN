const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: "https://fan-f8x395s2v-0ngutor0s-projects.vercel.app" }));

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "test" && password === "test") {
        return res.json({ token: "your_jwt_token" });
    }
    res.status(401).json({ message: "Invalid credentials" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
