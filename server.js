// backend/index.js
import express from "express";
import crypto from "crypto";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// ⚠️ NEVER expose private key on frontend
const IMAGEKIT_PRIVATE_KEY = "private_wa9qXbOG8Voy23k0qRtXmXW6JNE="; 
const IMAGEKIT_PUBLIC_KEY = "public_0vKRiE5ybPhdxTm+HVagm5o5Z/Q=";

// API route to generate ImageKit upload signature
app.post("/api/imagekit-signature", (req, res) => {
  try {
    // Expiry time (5 mins = 300s). You can increase if needed.
    const expire = Math.floor(Date.now() / 1000) + 300;

    // Unique token
    const token = crypto.randomBytes(16).toString("hex");

    // Create signature
    const signature = crypto
      .createHmac("sha1", IMAGEKIT_PRIVATE_KEY)
      .update(token + expire)
      .digest("hex");

    res.json({
      signature,
      expire,
      token,
      publicKey: IMAGEKIT_PUBLIC_KEY,
    });
  } catch (error) {
    console.error("Error generating ImageKit signature:", error);
    res.status(500).json({ error: "Failed to generate signature" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

