import { motion } from "framer-motion";
import yash1 from "../assets/yash1.png";
import resume from "../assets/resume.pdf";   // ✅ FIX

export default function Hero() {
  return (
    <section className="section" style={{ textAlign: "center" }}>

      <motion.img
        src={yash1}
        alt="Yash"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
         style={{
    width: "450px",   // ✅ SMALL + CLEAN
    borderRadius: "14px",
    marginBottom: "20px",
    marginTop: "-200px"
  }}
      />

      <h1>Hi, I'm Yash Girish Chaudhari 🚀</h1>

      <a href={resume} download>   {/* ✅ FIX */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          style={{
            marginTop: "25px",
            padding: "12px 26px",
            borderRadius: "12px",
            border: "none",
            background: "var(--accent)",
            color: "#000",
            cursor: "pointer"
          }}
        >
          Download Resume
        </motion.button>
      </a>

    </section>
  );
}
