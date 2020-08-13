import React from 'react'
import { motion } from 'framer-motion'

const Modal = ({ selectedImg, setSelectedImg }) => {
    // console.log(selectedImg)
    const handleClick = (e) => {
        if (e.target.classList.contains('backdrop')) {
            setSelectedImg(null);
        }
    }
    return (
        <motion.div className='backdrop' onClick={handleClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}>
            <motion.img src={selectedImg} alt="enlarged pic"
                initial={{ y: "-100vh" }}
                animate={{ y: 0 }}
                transition={{ delay: 1 }} />
        </motion.div>
    )
}

export default Modal