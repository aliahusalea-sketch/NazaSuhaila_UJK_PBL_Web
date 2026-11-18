import dotenv from "dotenv";
import app from "./app";
import { pool } from "./config/database";

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

const startServer = async () => {
  try {
    // Test koneksi database
    await pool.query("SELECT NOW()");

    console.log("Database berhasil terhubung!");

    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Gagal menghubungkan database:", error);
    process.exit(1);
  }
};

startServer();
