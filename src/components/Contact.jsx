import { color, motion } from "framer-motion";
import yash2 from "../assets/yash2.png";

export default function Contact() {
  return (
    <motion.section
      id="contact"
      className="section card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2>Contact</h2>

      <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
        <img 
          src={yash2} 
          alt="Yash" 
          style={{ width: "200px", borderRadius: "14px" }} 
        />

        <div>
          <p>Email: yc98908277@gmail.com</p>
          <p>Phone: 8999383092</p>
          <p>Address: Songir, Dhule, Maharashtra</p>
          <p>GitHub:<a style={{color:'white'}} target="_blank" href="https://github.com/yashchaudhari07?tab=repositories">www.github.com/yashchaudhari07/</a></p>
        </div>
      </div>
    </motion.section>
  );
}
