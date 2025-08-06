import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Brain, Code, Target } from "lucide-react";
import { PsychometricSection } from "./PsychometricSection";
import { TechnicalSection } from "./TechnicalSection";
import { WiscarSection } from "./WiscarSection";

interface AssessmentFlowProps {
  onComplete: (results: AssessmentResults) => void;
  onBack: () => void;
}

export interface AssessmentResults {
  psychometric: {
    personalityScore: number;
    interestScore: number;
    motivationScore: number;
    overallScore: number;
  };
  technical: {
    aptitudeScore: number;
    knowledgeScore: number;
    domainScore: number;
    overallScore: number;
  };
  wiscar: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
    overallScore: number;
  };
}

const SECTIONS = [
  {
    id: "psychometric",
    title: "Psychometric Assessment",
    description: "Evaluate your personality traits and motivational patterns",
    icon: Brain,
    color: "bg-primary"
  },
  {
    id: "technical",
    title: "Technical & Aptitude",
    description: "Assess your current skills and learning foundation",
    icon: Code,
    color: "bg-accent"
  },
  {
    id: "wiscar",
    title: "WISCAR Framework",
    description: "Comprehensive evaluation of your readiness factors",
    icon: Target,
    color: "bg-primary"
  }
];

export const AssessmentFlow = ({ onComplete, onBack }: AssessmentFlowProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [results, setResults] = useState<Partial<AssessmentResults>>({});

  const handleSectionComplete = (sectionId: string, sectionResults: any) => {
    const newResults = { ...results, [sectionId]: sectionResults };
    setResults(newResults);
    
    if (currentSection < SECTIONS.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      // Assessment complete
      onComplete(newResults as AssessmentResults);
    }
  };

  const progress = ((currentSection + 1) / SECTIONS.length) * 100;
  const currentSectionData = SECTIONS[currentSection];

  const renderCurrentSection = () => {
    switch (currentSectionData.id) {
      case "psychometric":
        return <PsychometricSection onComplete={(results) => handleSectionComplete("psychometric", results)} />;
      case "technical":
        return <TechnicalSection onComplete={(results) => handleSectionComplete("technical", results)} />;
      case "wiscar":
        return <WiscarSection onComplete={(results) => handleSectionComplete("wiscar", results)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <div className="bg-white shadow-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            
            <div className="flex items-center gap-4">
              <Badge variant="secondary">
                Section {currentSection + 1} of {SECTIONS.length}
              </Badge>
              <div className="text-sm text-muted-foreground">
                {Math.round(progress)}% Complete
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            {SECTIONS.map((section, index) => {
              const Icon = section.icon;
              const isActive = index === currentSection;
              const isCompleted = index < currentSection;
              
              return (
                <div key={section.id} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-12 h-12 rounded-full text-white transition-all
                    ${isActive ? section.color : isCompleted ? "bg-green-500" : "bg-muted"}
                  `}>
                    <Icon className="h-6 w-6" />
                  </div>
                  {index < SECTIONS.length - 1 && (
                    <div className={`w-8 h-1 mx-2 rounded ${isCompleted ? "bg-green-500" : "bg-muted"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section Header */}
        <Card className="max-w-4xl mx-auto mb-8 bg-gradient-card shadow-card">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className={`p-4 rounded-full ${currentSectionData.color} text-white`}>
                <currentSectionData.icon className="h-8 w-8" />
              </div>
            </div>
            <CardTitle className="text-3xl">{currentSectionData.title}</CardTitle>
            <p className="text-muted-foreground text-lg">{currentSectionData.description}</p>
          </CardHeader>
        </Card>

        {/* Current Section Content */}
        <div className="max-w-4xl mx-auto">
          {renderCurrentSection()}
        </div>
      </div>
    </div>
  );
};