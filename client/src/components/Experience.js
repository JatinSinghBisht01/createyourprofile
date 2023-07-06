import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
import "../css/Experience.css";
import RotateLoader from "react-spinners/RotateLoader";

const url = 'https://course-api.com/react-tabs-project'
function Experience() {
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState([])
  const [value, setValue] = useState(0)

  const fetchJobs = async()=>{
    const response = await fetch(url)
    const newJobs = await response.json()
    setJobs(newJobs);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  useEffect(()=>{
    fetchJobs();
  }, [])


  if(loading){
    return (
      <section className="section loading">
        <RotateLoader color='#36d7b7' className='loader' ></RotateLoader>
        
        </section>
    )
  }
  const {company, dates, duties, title} = jobs[value]
  return (
  <section className="section"> 
  <div className="title">
  <h2>experience</h2>
  <div className="underline"></div>
  </div>
  <div className="jobs-center">
    <div className="btn-container">
      {
        jobs.map((item, index)=>{
          return <button className={`job-btn ${index===value &&'active-btn' }`} key={item.id} onClick={()=>
          setValue(index)} >{item.company}</button>
        })
      }
    </div>
    <article className="job-info">
      <h3>{title}</h3>
      <h4>{company}</h4>
      <p className="job-date">{dates}</p>
      {duties.map((duty, index)=>{
        return <div key={index} className="job-desc">
          <FaAngleDoubleRight className="job-icon" />
          <p>{duty}</p>

        </div>
      })}
      </article>
  </div>
  
  </section>
  )
}

export default Experience