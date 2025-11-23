import { RecapCarousel } from "@/components/recap/RecapCarousel";
import { WelcomeSlide } from "@/components/recap/WelcomeSlide";
import { StatsSlide } from "@/components/recap/StatsSlide";
import { ArchetypeSlide } from "@/components/recap/ArchetypeSlide";
import { TopCollaboratorsSlide } from "@/components/recap/TopCollaboratorsSlide";
import { HotSpotsSlide } from "@/components/recap/HotSpotsSlide";
import { ShareSlide } from "@/components/recap/ShareSlide";
import { LoadingSlide } from "@/components/recap/LoadingSlide";
import { ErrorSlide } from "@/components/recap/ErrorSlide";
import { useRecapData } from "@/hooks/useRecapData";

const Index = () => {
  // TODO: Backend team - Replace this hardcoded userId with actual authenticated user ID
  // from AWS Cognito or your auth system
  const userId = "demo-user-123";
  const year = 2025;
  
  const { data, loading, error } = useRecapData(userId, year);

  if (loading) {
    return <LoadingSlide />;
  }

  if (error || !data) {
    return <ErrorSlide onRetry={() => window.location.reload()} />;
  }

  const slides = [
    <WelcomeSlide key="welcome" />,
    <StatsSlide key="stats" stats={data.stats} />,
    <ArchetypeSlide key="archetype" archetype={data.archetype} />,
    <TopCollaboratorsSlide key="collaborators" collaborators={data.collaborators} />,
    <HotSpotsSlide key="hotspots" locations={data.locations} />,
    <ShareSlide key="share" />,
  ];

  return <RecapCarousel slides={slides} />;
};

export default Index;
