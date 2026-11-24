// Adapted from Aceternity UI Timeline: https://ui.aceternity.com/components/timeline
// Uses its scroll-linked Motion spine with plain CSS to match this static site.
import React, {useEffect, useRef, useState} from 'react';
import {motion, useReducedMotion, useScroll, useTransform} from 'motion/react';
import './research-timeline.css';

export function ResearchTimeline({data}){
 const ref=useRef(null);
 const containerRef=useRef(null);
 const [{top,height},setTrack]=useState({top:0,height:0});
 const reduced=useReducedMotion();
 useEffect(()=>{
  const node=ref.current;
  if(!node)return;
  const update=()=>{
   const first=node.firstElementChild;
   const last=node.lastElementChild;
   if(!first||!last){setTrack({top:0,height:0});return;}
   // Use row positions so sticky dates do not affect the measured endpoints.
   const start=first.offsetTop+first.querySelector('.research-timeline-date').offsetHeight/2;
   const end=last.offsetTop+last.querySelector('.research-timeline-date').offsetHeight/2;
   setTrack({top:start,height:Math.max(0,end-start)});
  };
  update();
  const observer=new ResizeObserver(update);
  observer.observe(node);
  return ()=>observer.disconnect();
 },[]);
 const {scrollYProgress}=useScroll({target:containerRef,offset:['start 80%','end end']});
 const heightTransform=useTransform(scrollYProgress,[0,1],[0,height]);
 const opacityTransform=useTransform(scrollYProgress,[0,.1],[0,1]);
 return <div className="research-timeline" ref={containerRef}>
  <ol ref={ref} className="research-timeline-entries" aria-label="Research news timeline">
   {data.map(item=><li className="research-timeline-entry" key={item.date+item.content}>
    <div className="research-timeline-date"><span className="research-timeline-dot" aria-hidden="true"/><time dateTime={item.isoDate}>{item.date}</time></div>
    <div className="research-timeline-content"><p>{item.content}</p></div>
   </li>)}
  </ol>
  <div className="research-timeline-track" style={{top,height}} aria-hidden="true">
   <motion.div className="research-timeline-progress" style={{height:reduced?height:heightTransform,opacity:reduced?1:opacityTransform}}/>
  </div>
 </div>;
}
