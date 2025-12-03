import { motion } from "framer-motion";

export default function Education() {
  return (
    <motion.section
      id="education"
      className="section card"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2>Education</h2>
      <ul>
        <li>Diploma in Computer Science – R C Patel Polytechnic (2023–2026)</li>
        <li>Completed SSC</li>
      </ul>
    </motion.section>
  );
}
