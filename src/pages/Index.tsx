import { useState } from "react";
import { LandingPage } from "@/components/assessment/LandingPage";
import { AssessmentFlow, AssessmentResults } from "@/components/assessment/AssessmentFlow";
import { ResultsPage } from "@/components/assessment/ResultsPage";

type AppState = "landing" | "assessment" | "results";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("landing");
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResults | null>(null);

  const handleStartAssessment = () => {
    setCurrentState("assessment");
  };

  const handleAssessmentComplete = (results: AssessmentResults) => {
    setAssessmentResults(results);
    setCurrentState("results");
  };

  const handleRestart = () => {
    setAssessmentResults(null);
    setCurrentState("landing");
  };

  const handleBackToLanding = () => {
    setCurrentState("landing");
  };

  return (
    <div className="min-h-screen">
      {currentState === "landing" && (
        <LandingPage onStart={handleStartAssessment} />
      )}
      
      {currentState === "assessment" && (
        <AssessmentFlow 
          onComplete={handleAssessmentComplete}
          onBack={handleBackToLanding}
        />
      )}
      
      {currentState === "results" && assessmentResults && (
        <ResultsPage 
          results={assessmentResults}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default Index;
