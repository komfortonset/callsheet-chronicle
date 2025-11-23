import { RecapCarousel } from "@/components/recap/RecapCarousel";
import { WelcomeSlide } from "@/components/recap/WelcomeSlide";
import { StatsSlide } from "@/components/recap/StatsSlide";
import { ArchetypeSlide } from "@/components/recap/ArchetypeSlide";
import { TopCollaboratorsSlide } from "@/components/recap/TopCollaboratorsSlide";
import { HotSpotsSlide } from "@/components/recap/HotSpotsSlide";
import { ShareSlide } from "@/components/recap/ShareSlide";

const Index = () => {
  const slides = [
    <WelcomeSlide key="welcome" />,
    <StatsSlide key="stats" />,
    <ArchetypeSlide key="archetype" />,
    <TopCollaboratorsSlide key="collaborators" />,
    <HotSpotsSlide key="hotspots" />,
    <ShareSlide key="share" />,
  ];

  return <RecapCarousel slides={slides} />;
};

export default Index;
