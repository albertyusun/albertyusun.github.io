import React from 'react';
import './experience-grid.css';
const logos=['epiq.svg','dynamo.svg','curai.svg','microsoft.png','vera-full.svg','aclu-blue.svg'];
export function ExperienceGrid({roles}){
 return <ul className="experience-grid" aria-label="Work experience">
  {roles.map((role,i)=><li className="experience-grid-card" key={role.organization}>
   <img src={'static/images/companies/'+logos[i]} alt={role.organization}/>
   <div><p className="grid-role">{role.title}</p><p className="grid-dates">{role.years.replace('-','–')}</p></div>
  </li>)}
 </ul>;
}
