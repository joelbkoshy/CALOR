import React from 'react'
import './style.css'
import ImageSwitcher from '../components/ImageSwitcher'
import { useNavigate } from 'react-router-dom';

import Type from '../components/Type'
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='home-container'>
      <div className='home-main'>
        <div className='image-switcher-container'>
          <h1>CALOR</h1>
          <ImageSwitcher />
        </div>
        <div className='content-container'>
          <div className='home-main-content'>
            <div className='TypeWriter'>
              <Type />
            </div>
            <div className='content'>
              <div className='header'>
                <div className='get-started-container'>
                  <button className='get-started' onClick={() => navigate("/main")}>Get Started</button>
                </div>
              </div>
              <>
                {/* < BarChart data={[{label:"hi",value:10}]} /> */}
              </>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home