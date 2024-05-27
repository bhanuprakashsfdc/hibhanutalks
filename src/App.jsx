import { useState } from 'react'
import Header from './components/Header/Header';
import Calculators from './components/Calculators/Calculators';
import Footer from './components/Footer/Footer';
import './App.css'

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
