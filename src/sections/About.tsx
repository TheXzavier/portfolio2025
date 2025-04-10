"use client";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import StarIcon from "@/assets/icons/star.svg";
import bookImage from "@/assets/images/book3.jpg";
import Image from "next/image";
import JavascriptIcon from "@/assets/icons/square-js.svg";
import CSSIcon from "@/assets/icons/css3.svg";
import ReactIcon from "@/assets/icons/react.svg";
import GithubIcon from "@/assets/icons/github.svg";
import FlutterIcon from "@/assets/icons/flutter.svg";
import CPPIcon from "@/assets/icons/cpp.svg";
import blockchainIcon from "@/assets/icons/blockchain.svg";
import htmlIcon from "@/assets/icons/html5.svg";
import MapImage from "@/assets/images/map.jpg";
import smileMemoji from "@/assets/images/smile-memoji2.png";
import { CardHeader } from "@/components/CardHeader";
import { ToolboxItems } from "@/components/ToolboxItems";
import {motion} from 'framer-motion';
import { useRef} from "react";
import RandomMover from "@/components/RandomMover";


const toolboxItems = [
  {
    title : 'Javascript',
    iconType : JavascriptIcon,
  },
  {
    title : 'CSS3',
    iconType : CSSIcon,
  },
  {
    title : 'React',
    iconType : ReactIcon,
  },
  {
    title : 'Github',
    iconType :GithubIcon},
  {
    title : 'HTML5',
    iconType :htmlIcon},
  {
    title : 'CPP',
    iconType :CPPIcon
  },
  {
    title : 'Blockchain',
    iconType :blockchainIcon
  },
  {
    title : 'Flutter',
    iconType :FlutterIcon},
]

const hobbies = [
  {
    title : 'Reading',
    emoji : '📚',
    left : '5%',
    top : '5%',

  },
  {
    title : 'Travelling',
    emoji : '🌍',
    left : '50%',
    top : '5%',

  },
  {
    title : 'Movies',
    emoji : '🎬',
    left : '10%',
    top : '35%',

  },
  {
    title : 'Music',
    emoji : '🎵',
    left : '35%',
    top : '40%',

  },
  {
    title : 'Gaming',
    emoji : '🎮',
    left : '70%',
    top : '45%',

  },
  {
    title : 'Cooking',
    emoji : '🍳',
    left : '5%',
    top : '65%',
  },
  {
    title : 'Editing',
    emoji : '🎞️',
    left : '45%',
    top : '70%',
  },
]


export const AboutSection = () => {
  const constraintRef = useRef(null);
  return (
  <div id = "about" className = "py-20 lg:py-28">
    <div className="container">
    <SectionHeader eyebrow="About Me" title = "A Look Inside My Life & Work" 
    description="Get to know the mind behind the work and the inspirations that drive me forward."/>

    <div className="mt-20 flex flex-col gap-8">
    <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
    <Card className="h-[320px] md:col-span-2 lg:col-span-1">
      <CardHeader title="My Reads" description="Explore the books shaping my perspectives."/>
      <div className="w-40 mx-auto mt-2 md:mt-0">
      <Image src={bookImage} alt="Book Image" />
      </div>
    </Card>

    <Card className="h-[320px] md:col-span-3 lg:col-span-2">
    <CardHeader title="My Toolbox" description="Explore the technologies and tools I use to craft exceptional digital experiences." className=""/>
    <ToolboxItems items={toolboxItems} className="" itemsWrapperClassName="animate-move-left [animation-duration:30s]"/>
    <ToolboxItems items={toolboxItems} className="mt-6" itemsWrapperClassName="animate-move-right [animation-duration:15s]"/>
    
    </Card>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-8 ">
    <Card className="h-[320px] p-0 flex flex-col md:col-span-3 lg:col-span-2">
    <CardHeader title="Beyond The Code" description="Explore my interests and hobbies beyond the digital realm." className="px-6 py-6"/>
      <div className="relative flex-1" ref={constraintRef}>
        {
          hobbies.map(item => (
            <RandomMover key={item.title} item={item} containerRef={constraintRef}/>
          )
        )
        }
      </div>
    </Card>

    <Card className="h-[320px] p-0 relative md:col-span-2 lg:col-span-1">
      <Image src={MapImage} alt="Map Image" className="h-full w-full  object-cover object-left-top" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 
      rounded-full after:content-[''] after:absolute after:inset-0 after:outline 
      after:outline-2 after:-outline-offset-2 
      after:rounded-full after:outline-gray-950/30">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-20 animate-ping [animation-duration:2s]"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-10"></div>
        <Image src={smileMemoji} alt="Smile Memoji" className="size-20" />
      </div>
    </Card>
    </div>
    </div>
  </div>
  </div>
  );
};
