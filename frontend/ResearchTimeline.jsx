// Adapted from Aceternity UI Timeline: https://ui.aceternity.com/components/timeline
// Static spine with plain CSS, anchored to the first and last dots.
import React, {useEffect, useRef, useState} from 'react';
import './research-timeline.css';

export function ResearchTimeline({data}){
 const ref=useRef(null);
 const [{top,height},setTrack]=useState({top:0,height:0});
 useEffect(()=>{
  const node=ref.current;
  if(!node)return;
  const update=()=>{
   const first=node.firstElementChild;
   const last=node.lastElementChild;
   if(!first||!last){setTrack({top:0,height:0});return;}
   // Anchor the spine to the first and last row centers after resizing.
   const start=first.offsetTop+first.querySelector('.research-timeline-date').offsetHeight/2;
   const end=last.offsetTop+last.querySelector('.research-timeline-date').offsetHeight/2;
   setTrack({top:start,height:Math.max(0,end-start)});
  };
  update();
  const observer=new ResizeObserver(update);
  observer.observe(node);
  return ()=>observer.disconnect();
 },[]);
 return <div className="research-timeline">
  <ol ref={ref} className="research-timeline-entries" aria-label="Research news timeline">
   {data.map(item=><li className="research-timeline-entry" key={item.date+item.content}>
    <div className="research-timeline-date"><span className="research-timeline-dot" aria-hidden="true"/><time dateTime={item.isoDate}>{item.date}</time></div>
    <div className="research-timeline-content"><p>{item.content}</p></div>
   </li>)}
  </ol>
  <div className="research-timeline-track" style={{top,height}} aria-hidden="true"/>
 </div>;
}
