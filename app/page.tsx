"use client";

import Image from "next/image";
import {ReactNode, useEffect, useState} from "react";

export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 sm:p-24 gap-3 sm:gap-20">
      <Panel title={"VA Student Canteen"}>
        <Moniter
          key={1}
          video_api={`http://${process.env.NEXT_PUBLIC_BACKEND_IP}/video_feed`}
          info_api={`http://${process.env.NEXT_PUBLIC_BACKEND_IP}/estimated_waiting_info`}
        />
        <Moniter
          key={2}
          video_api={`http://${process.env.NEXT_PUBLIC_BACKEND_IP}/video_feed`}
          info_api={`http://${process.env.NEXT_PUBLIC_BACKEND_IP}/estimated_waiting_info`}
        />
        <Moniter
          key={3}
          video_api={`http://${process.env.NEXT_PUBLIC_BACKEND_IP}/video_feed`}
          info_api={`http://${process.env.NEXT_PUBLIC_BACKEND_IP}/estimated_waiting_info`}
        />
      </Panel>
    </main>
  );
}

type PanelProps = {
  title: string,
  children: ReactNode,
}

const Panel = ({title, children}:PanelProps) => {
  return (
    <div className="flex w-full flex-col border-2 border-rose-900 rounded-lg p-3 bg-[#FDF0E6]">
      <div className="flex w-full flex-col justify-between items-center sm:items-end sm:flex-row">
        <Image alt={"Hong Kong Polytechnic University"} src={"/polyu.png"} width={200} height={100}/>
        <h1 className="font-bold text-2xl text-rose-900">{title}</h1>
        <h2 className="font-bold text-sm font-serif">Canteen Queue Shunt System</h2>
      </div>
      <div className="flex flex-col sm:grid sm:grid-cols-3">
        {children}
      </div>
    </div>
  )
}

type MoniterProps = {
  video_api: string,
  info_api: string,
}

const Moniter = ({video_api, info_api}: MoniterProps) => {
  const [waitingInfo, setWaitingInfo] = useState({waiting_time: 0, waiting_people: 0})
  const colorValue = Math.min(waitingInfo.waiting_time / 30, 1); // Assuming max waiting time is 30 minutes
  const greenValue = Math.floor((1 - colorValue) * 255);
  const redValue = Math.floor(colorValue * 255);
  const color = `rgb(${redValue}, ${greenValue}, 0)`;

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(info_api)
        .then(response => response.json())
        .then(data => {
          setWaitingInfo(data);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col p-1 items-center gap-2">
      <img className="rounded-xl w-full" src={video_api} alt={"Queue"}/>
      <p className="font-serif">Current Waiting People: {waitingInfo.waiting_people}</p>
      <p className="font-serif">Estimated Waiting Time: {waitingInfo.waiting_time} minutes</p>
      <div className="h-5 w-40 rounded-md" style={{background: color}}/>
    </div>
  )
}