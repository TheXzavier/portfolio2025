import SmartStreetParkingIMG from "@/assets/images/Smart-Street-Parking.jpeg";
import CrowdFundingBlockchain from "@/assets/images/CrowdFundingBlockchain.jpeg";
import WebPentesting from "@/assets/images/WebPentesting3.jpeg"

import Image from "next/image";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import { Card } from "@/components/Card";

const portfolioProjects = [
  {
    tech: "ReactJS | Blockchain | Solidity",
    year: "2024",
    title: "CrowdFunding Using Blockchain",
    results: [
      { title: "Built a Decentralized Crowdfunding Platform with ThirdWeb & ReactJS" },
      { title: "Solidity Smart Contracts for Reliable & Transparent Finance" },
      { title: "Enhanced Accessibility with MetaMask Wallet Integration" },
    ],
    link: "https://github.com/TheXzavier/CrowdFunding-Using-Blockchain",
    image: CrowdFundingBlockchain,
  },
  {
    tech: "Flutter | Firebase | Python",
    year: "2023",
    title: "Smart Street Parking",
    results: [
      { title: "Built Python backend with efficient APIs for real-time mobile data" },
      { title: "Implemented dynamic pricing for parking based on real-time traffic" },
      { title: "Leveraged Firebase for scalable and efficient data handling for multiple users" },
    ],
    link: "https://github.com/TheXzavier/Street-Parking-Hackathon",
    image: SmartStreetParkingIMG,
  },

  {
    tech: "Python | Telegram Bot",
    year: "2022",
    title: "Web Penetration Testing Tool",
    results: [
      { title: "Created a Web Pentesting Tool for Enhanced Security Assessments." },
      { title: "Conducted vulnerability assessments, identifying SQL injection, XSS, 403 bypass, and CVEs." },
      { title: "Implemented advanced features including DNS lookup, Reverse IP lookup, CORS scanning" },
    ],
    link: "https://github.com/TheXzavier/WebPentestOnline",
    image: WebPentesting,
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="pb-16 lg:py-24">
      <div className="container">
        {/* Title Section */}
        <div className="flex justify-center">
          <p className="uppercase font-semibold tracking-widest bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text text-center">
            Achieved Results
          </p>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl text-center mt-6">Featured Projects</h2>
        <p className="text-center md:text-lg lg:text-xl text-white/60 mt-4 max-w-md mx-auto">
          Witness my ability to translate ideas into compelling digital experiences
        </p>

        {/* Projects List */}
        <div className="mt-10 md:mt-20 flex flex-col gap-20">
          {portfolioProjects.map((project, projectIndex) => (
            <Card
              key={project.title}
              className="px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:pt-16 lg:px-20 sticky" style={{
                top : `calc(64px + ${projectIndex * 20}px)`,
              }}
            >

              {/* Project Details */}
              <div className="lg:grid lg:grid-cols-2 lg:gap-16">
              <div className="lg:pb-16">
              <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text">
                <span>{project.tech}</span>
                <span>&bull;</span>
                <span>{project.year}</span>
              </div>
              <h3 className="font-serif text-2xl mt-2 md:mt-5 md:text-4xl">{project.title}</h3>
              <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />
              <ul className="flex flex-col gap-4 mt-4 md:mt-5">
                {project.results.map((result) => (
                  <li key={result.title} className="flex gap-2 text-sm md:text-base text-white/50">
                    <CheckCircleIcon className="size-5 md:size-6" />
                    <span>{result.title}</span>
                  </li>
                ))}
              </ul>

              {/* Link Button */}
              <a href={project.link}>
                <button
                  className="bg-white text-gray-950 h-12 w-full md:w-auto px-6 rounded-xl font-semibold 
                  inline-flex items-center justify-center gap-2 mt-8 "
                >
                  <span>View Github Link</span>
                  <ArrowUpRightIcon className="size-4" />
                </button>
              </a>
                </div>
              {/* Project Image */}
              <div className="relative">
              {/* mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none rounded-full */}
<Image src={project.image} alt={project.title} className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none rounded-2xl" />
              </div>
              </div> 
            </Card>
          ))}
        </div>
        {/* End of Projects List */}
      </div>
      {/* End of Container */}
    </section>
  );
};
