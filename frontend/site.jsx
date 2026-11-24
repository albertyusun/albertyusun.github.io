import React from 'react';
import {createRoot} from 'react-dom/client';
import CircularGallery from './CircularGallery';
import './circular-experience.css';
import {ResearchTimeline} from './ResearchTimeline';
import './work-experience.css';
import './education.css';

function Experience({roles}){
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const items=roles.map((role,i)=>({
  image:'static/media/experience/role-'+i+'.svg?v=1',
  text:role.organization,
  alt:role.organization+', '+role.title+', '+role.years
 }));
 return <div id="circular-experience"><CircularGallery items={items} bend={2.5} textColor="#426c54" borderRadius={.055} font="400 22px Arial"
  scrollSpeed={1.2} scrollEase={reduced?1:.065} itemSize={1} itemAspect={1} gap={.10}
  wave={reduced?0:.08} fadeEdges={.07} shadow={.08} showTitles={false} snap autoScroll={0}
  intro={!reduced} aria-label="Work experience"/></div>;
}
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
