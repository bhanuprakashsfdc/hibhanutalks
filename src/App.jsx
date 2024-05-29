import { useState } from 'react'
import Header from './components/Header/Header';
import Calculators from './components/Calculator/Calculators/Calculators';
import Footer from './components/Footer/Footer';
import './App.css'
import './index.css'
function App() {

  return (
    <>
      <div>
        <Header />
        <Calculators />
        <Footer />
      </div>
    </>
  )
}

export default App
