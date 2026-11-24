import React from 'react';
import {createRoot} from 'react-dom/client';
import {ExperienceGrid} from './ExperienceGrid';
import {ResearchTimeline} from './ResearchTimeline';
import './education.css';

function Experience({roles}){return <ExperienceGrid roles={roles}/>;}
const workMount=document.getElementById('work-exploration');
if(workMount)createRoot(workMount).render(<Experience roles={JSON.parse(document.getElementById('work-data').textContent)}/>);
const newsMount=document.getElementById('research-news-timeline');
if(newsMount){
 const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
 const news=JSON.parse(document.getElementById('research-news-data').textContent).map(item=>{
  const [month,year]=item.date.split(' ');
  return {...item,isoDate:year+'-'+String(months.indexOf(month)+1).padStart(2,'0')};
 }).sort((a,b)=>b.isoDate.localeCompare(a.isoDate));
 createRoot(newsMount).render(<ResearchTimeline data={news}/>);
}
