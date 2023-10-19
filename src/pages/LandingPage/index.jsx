import { motion } from "framer-motion";
function LandingPage() {
    // const bgColor = 'red';
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ height: '90vh' }}
      >
        <div>
          <h1>This is the Landing Page</h1>
        </div>
      </motion.div>
    );
}
export default LandingPage;