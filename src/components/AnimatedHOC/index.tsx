import React, { FC,ReactNode, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const animations = {
  initial: { opacity: 0.5 },
  animate: { opacity: 1 },
  exit: { opacity: 0.5 },
};
interface Props {
  children: ReactNode;
}

const AnimatedHOC :FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={pathname}
        variants={animations}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ height:'100%' }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>  
  )
};


export default AnimatedHOC;
