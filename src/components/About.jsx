import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      id="about"
      className="section card"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2>About Me</h2>
      <p>
        I’m Yash Girish Chaudhari — a Computer science diploma student 
        from R C Patel Polytechnic. Passionate about DevOps, AWS Cloud,
        full-stack development, CI/CD pipelines and automation.
      </p>
    </motion.section>
  );
}
