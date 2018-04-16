import React from 'react';
import JobPostItem from './JobPostItem.jsx';

const JobPostList =(props)=>(
  <div>
  {props.jobs.map( (job)=>(<JobPostItem job={job} key={job.id} />))}
  </div>
)

export default JobPostList;
