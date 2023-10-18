import { motion } from "framer-motion";
function LandingPage() {
    // const bgColor = 'red';
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div style={{ display: 'flex'}} className='background-red'>
          <h1>This is the Landing Page</h1>
        </div>
      </motion.div>
    );
}
export default LandingPage;