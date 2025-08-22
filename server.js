const path = require("path");
const express = require("express");
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 3000;


// Allow FCC test suite to reach your API
app.use(cors({ optionsSuccessStatus: 200 }));


// If running behind a proxy (Render, Vercel, etc.) so req.ip works
app.set("trust proxy", true);


// Serve static demo page
app.use(express.static(path.join(__dirname, "public")));


// Home page
app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "public", "index.html"));
});


// API: Request Header Parser
app.get("/api/whoami", (req, res) => {
// IP address: prefer X-Forwarded-For if present, else req.ip
const xff = req.headers["x-forwarded-for"]; // may be a list "client, proxy1, proxy2"
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