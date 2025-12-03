import { motion } from "framer-motion";

export default function Projects() {
  return (
    <motion.section
      id="projects"
      className="section card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2>Projects</h2>

      <ul>
        <li>Full Stack React + Node.js + AWS RDS Integration</li>
        <li>CI/CD Pipeline (GitHub → Jenkins → EC2)</li>
        <li>Furniture Shop Website</li>
        <li>Online Money Transaction Website</li>
        <li>or many more ..... (check git repo...)           <p>GitHub:<a style={{color:'white'}} target="_blank" href="https://github.com/yashchaudhari07?tab=repositories">www.github.com/yashchaudhari07/</a></p>
</li>
      </ul>
    </motion.section>
  );
}
