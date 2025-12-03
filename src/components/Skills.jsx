import { motion } from "framer-motion";

export default function Skills() {
  return (
    <motion.section
      id="skills"
      className="section card"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2>Skills</h2>
      <ul>
        <li>AWS (EC2, S3, RDS, Lambda, CloudFront, IAM)</li>
        <li>DevOps (Git, GitHub, Jenkins, CI/CD)</li>
        <li>Node.js + Express Backend</li>
        <li>React.js Frontend</li>
        <li>MySQL Database + AWS RDS</li>
        <li>Docker Basics</li>
        <li>C, C++, Java</li>
      </ul>
    </motion.section>
  );
}
