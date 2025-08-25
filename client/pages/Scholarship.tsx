import React from 'react'
import ScholarshipHero from '../Component/ScholarshipHero'
import ScholarshipForm from '../Component/ScholarshipForm'
import Navbar from '@/Component/Navbar'
import Footer from '@/Component/Footer'

function Scholarship() {
  return (
    <div>
        <Navbar />
        <ScholarshipHero />
        <ScholarshipForm />
        <Footer />
    </div>
  )
}

export default Scholarship
