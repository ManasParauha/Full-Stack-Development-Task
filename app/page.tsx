import ClientSection from "@/components/landingPage/ClientSection";
import Navbar from "@/components/landingPage/Navbar";
import ProjectSection from "@/components/landingPage/ProjectSection";


export default function Home() {
  return (
    <div>
      <Navbar/>
      <ProjectSection/>
     <ClientSection/>
    </div>
  );
}
