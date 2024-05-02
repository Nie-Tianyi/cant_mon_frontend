"use client";

import Image from "next/image";
import {useEffect, useState} from "react";

export default function Home() {

  const [waitingInfo, setWaitingInfo] = useState({waiting_time:0,waiting_people:0})

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`http://${process.env.BACKEND_IP}/estimated_waiting_info`)
        .then(response => response.json())
        .then(data => setWaitingInfo(data));
    },1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full flex-col border-2 border-rose-900 rounded-lg p-3 bg-[#FDF0E6]">
        <div className="flex w-full flex-row justify-between items-end">
          <Image alt={"Hong Kong Polytechnic University"} src={"/polyu.png"} width={200} height={100}/>
          <h1 className="font-bold text-2xl text-rose-900">VA Student Canteen</h1>
          <h2 className="font-bold text-sm font-serif">Canteen Queue Shunt System</h2>
        </div>
        <div className="flex flex-col p-1 items-center border-2">
          <video className="border-2" src={`http://${process.env.BACKEND_IP}/video_feed`} width={500} height={500}/>
          <p className="">Current Waiting People:{waitingInfo.waiting_people}</p>
          <p className="">Estimated Waiting Time:{waitingInfo.waiting_time}</p>
        </div>
      </div>
    </main>
  );
}
