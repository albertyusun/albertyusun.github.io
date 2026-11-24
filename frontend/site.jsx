import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import CardSwap, {Card} from './CardSwap';
import {ResearchTimeline} from './ResearchTimeline';
import './work-experience.css';

const logos=['epiq.svg','dynamo.svg','curai.svg','microsoft.png','vera-full.svg','aclu.png'];
function Experience({roles}){
 const [small,setSmall]=useState(window.innerWidth<=650);
 useEffect(()=>{
  const mq=window.matchMedia('(max-width:650px)');
  const update=()=>setSmall(mq.matches);
  mq.addEventListener('change',update);
  return ()=>mq.removeEventListener('change',update);
 },[]);
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 return <div className="work-exploration variant-light"><div className="light-layout"><div className="light-deck">
  <CardSwap theme="light" width={small?300:620} height={small?210:230}
   cardDistance={small?12:72} verticalDistance={small?18:26} depth={small?35:22} skewAmount={small?0:1.5}
   visibleCards={Math.min(3,roles.length)} autoplay={false} parallax={.15} hoverSpread={.08} bounce={.2} intro={!reduced}>
   {roles.map((role,i)=><Card key={role.organization}><article className="work-tile">
    <img className="tile-logo" src={'static/images/companies/'+logos[i]} alt={role.organization+' logo'} draggable={false}/>
    <div><p className="tile-role">{role.title}</p><p className="tile-dates">{role.years.replace('-','–')}</p></div>
   </article></Card>)}
  </CardSwap>
 </div></div></div>;
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
