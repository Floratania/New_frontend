import PropTypes from "prop-types";
import React, { useState } from "react";
import { motion } from "framer-motion";
import './styles.css'; 

const Light = ({ tlColor = "red", handleClick, clickCount, blinkCount = 3, brightness = 0.5 }) => {
  const [isBlinking, setIsBlinking] = useState(false);

  const handleLightClick = () => {
    setIsBlinking(true); 
    handleClick(); 
  };

  return (
    <motion.div
      className="light"
      style={{ backgroundColor: tlColor }}
      onClick={handleLightClick}
      animate={isBlinking ? { opacity: [1, brightness, 0.9] } : {}} 
      transition={{
        duration: 0.5, 
        repeat: blinkCount - 1, 
        onComplete: () => setIsBlinking(false), 
      }}
    >
      {/* <p className="click-count">{clickCount}</p>  */}
    </motion.div>
  );
};

Light.propTypes = {
  tlColor: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  clickCount: PropTypes.number.isRequired,
  blinkCount: PropTypes.number, 
  brightness: PropTypes.number, 
};

export default Light;
