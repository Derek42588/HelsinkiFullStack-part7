import React from 'react'

const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
  
    return (
      <div style={footerStyle}>
        <br />
        <em>Blog app, Derek Pyle, 2019</em>
      </div> 
    )
  }

export default Footer