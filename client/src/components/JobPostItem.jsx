import React from 'react';

const JobPostItem=(props)=>(

    <div>
  <span>{props.job.jobName}</span>
  <span>{props.job.jobDescription}</span>
    </div>
)


export default JobPostItem;
