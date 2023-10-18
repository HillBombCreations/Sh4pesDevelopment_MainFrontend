import { motion } from "framer-motion";
function ContactPage() {
    // const bgColor = 'blue';
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div style={{ display: 'flex', width: '1280px', height: '80vh' }} className='background-red'>
          <h1>This is the Contact Page</h1>
        </div>
      </motion.div>
    );
}
export default ContactPage;