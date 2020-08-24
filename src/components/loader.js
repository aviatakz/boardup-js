import React from "react";
import Loader from 'react-loader-spinner'

const Dots = () => {
  return (
    <div className='mx col-md-9 ml-sm-auto loader col-lg-10 px-md-4'>
    <Loader
    type="ThreeDots"
    color="#00BC00"
    height={60}
    width={60}
 />
 </div>
  );
}

export default Dots;