const path = require("path");
const express = require("express");
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ optionsSuccessStatus: 200 }));

app.set("trust proxy", true);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/whoami", (req, res) => {
const xff = req.headers["x-forwarded-for"]; 
const ip = (xff || req.ip || "").toString().split(",")[0].trim();


const language = req.headers["accept-language"] || "";
const software = req.headers["user-agent"] || "";


res.json({
ipaddress: ip,
language,
software,
});
});


app.listen(PORT, () => {
console.log(`\nRequest Header Parser listening on http://localhost:${PORT}`);
});
