import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowRight, 
  Download, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Brain,
  Code,
  Target,
  TrendingUp,
  Users,
  Eye,
  BarChart3
} from "lucide-react";
import { AssessmentResults } from "./AssessmentFlow";

interface ResultsPageProps {
  results: AssessmentResults;
  onRestart: () => void;
}

export const ResultsPage = ({ results, onRestart }: ResultsPageProps) => {
  // Calculate overall readiness score
  const overallScore = Math.round(
    (results.psychometric.overallScore + results.technical.overallScore + results.wiscar.overallScore) / 3
  );

  const getScoreInterpretation = (score: number) => {
    if (score >= 80) return { 
      level: "Strong Match", 
      icon: CheckCircle, 
      color: "text-green-600", 
      bgColor: "bg-green-50",
      description: "You're well-suited for Design Research!" 
    };
    if (score >= 50) return { 
      level: "Conditional Fit", 
      icon: AlertTriangle, 
      color: "text-orange-600", 
      bgColor: "bg-orange-50",
      description: "With some development, you could thrive in this field." 
    };
    return { 
      level: "Needs Development", 
      icon: XCircle, 
      color: "text-red-600", 
      bgColor: "bg-red-50",
      description: "Consider building foundational skills first." 
    };
  };

  const interpretation = getScoreInterpretation(overallScore);
  const Icon = interpretation.icon;

  const getRecommendations = () => {
    if (overallScore >= 80) {
      return {
        decision: "Yes - Pursue Design Research",
        nextSteps: [
          "Enroll in 'Introduction to User Research' course",
          "Learn tools: Figma, Dovetail, Optimal Workshop",
          "Join communities: IXDA, UX Research Collective",
          "Start building a research portfolio"
        ],
        resources: [
          { title: "User Research Fundamentals", type: "Course" },
          { title: "Design Research Toolkit", type: "Resource" },
          { title: "UX Research Community", type: "Network" }
        ]
      };
    } else if (overallScore >= 50) {
      return {
        decision: "Maybe - Explore Further",
        nextSteps: [
          "Take foundational UX design courses",
          "Practice user interview techniques",
          "Develop analytical thinking skills",
          "Shadow a design researcher"
        ],
        resources: [
          { title: "UX Design Basics", type: "Course" },
          { title: "Research Methods Guide", type: "Resource" },
          { title: "Design Mentorship Program", type: "Network" }
        ]
      };
    } else {
      return {
        decision: "Not Yet - Consider Alternatives",
        nextSteps: [
          "Explore related roles: Visual Designer, UI Engineer",
          "Build foundational design skills",
          "Develop communication abilities",
          "Consider business analysis roles"
        ],
        resources: [
          { title: "Exploring UX Roles", type: "Course" },
          { title: "Design Career Guide", type: "Resource" },
          { title: "Alternative Paths Workshop", type: "Network" }
        ]
      };
    }
  };

  const recommendations = getRecommendations();

  const careerMatches = [
    {
      role: "UX Researcher",
      description: "Conducts studies to inform UX/UI design",
      match: Math.round((results.psychometric.overallScore + results.wiscar.interest + results.wiscar.skill) / 3),
      icon: Users,
      skills: ["User Interviews", "Data Analysis", "Research Design"]
    },
    {
      role: "Design Strategist",
      description: "Combines business and research for product strategy",
      match: Math.round((results.wiscar.cognitive + results.technical.overallScore + results.wiscar.realWorld) / 3),
      icon: TrendingUp,
      skills: ["Strategic Thinking", "Business Analysis", "Design Vision"]
    },
    {
      role: "Service Designer",
      description: "Designs holistic customer journeys",
      match: Math.round((results.wiscar.will + results.psychometric.overallScore + results.wiscar.realWorld) / 3),
      icon: Eye,
      skills: ["Journey Mapping", "Service Design", "Stakeholder Management"]
    },
    {
      role: "Accessibility Researcher",
      description: "Focuses on inclusive design research",
      match: Math.round((results.psychometric.overallScore + results.wiscar.ability + results.technical.overallScore) / 3),
      icon: BarChart3,
      skills: ["Accessibility Standards", "Inclusive Research", "User Empathy"]
    }
  ].sort((a, b) => b.match - a.match);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <div className="bg-white shadow-card">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Your Assessment Results</h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive evaluation of your Design Research readiness
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Overall Score */}
        <Card className={`mb-8 ${interpretation.bgColor} border-2`}>
          <CardHeader>
            <div className="flex items-center justify-center gap-4">
              <Icon className={`h-12 w-12 ${interpretation.color}`} />
              <div className="text-center">
                <CardTitle className="text-3xl mb-2">{overallScore}% Overall Readiness</CardTitle>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {interpretation.level}
                </Badge>
              </div>
            </div>
            <p className="text-center text-lg mt-4">{interpretation.description}</p>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Section Scores */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                Assessment Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Psychometric Fit</span>
                  <span className="text-lg font-bold">{results.psychometric.overallScore}%</span>
                </div>
                <Progress value={results.psychometric.overallScore} className="h-3" />
                <div className="grid grid-cols-3 gap-2 mt-2 text-sm text-muted-foreground">
                  <div>Personality: {results.psychometric.personalityScore}%</div>
                  <div>Interest: {results.psychometric.interestScore}%</div>
                  <div>Motivation: {results.psychometric.motivationScore}%</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Technical Readiness</span>
                  <span className="text-lg font-bold">{results.technical.overallScore}%</span>
                </div>
                <Progress value={results.technical.overallScore} className="h-3" />
                <div className="grid grid-cols-3 gap-2 mt-2 text-sm text-muted-foreground">
                  <div>Aptitude: {results.technical.aptitudeScore}%</div>
                  <div>Knowledge: {results.technical.knowledgeScore}%</div>
                  <div>Domain: {results.technical.domainScore}%</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">WISCAR Framework</span>
                  <span className="text-lg font-bold">{results.wiscar.overallScore}%</span>
                </div>
                <Progress value={results.wiscar.overallScore} className="h-3" />
                <div className="grid grid-cols-3 gap-2 mt-2 text-sm text-muted-foreground">
                  <div>Will: {results.wiscar.will}%</div>
                  <div>Interest: {results.wiscar.interest}%</div>
                  <div>Skill: {results.wiscar.skill}%</div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-1 text-sm text-muted-foreground">
                  <div>Cognitive: {results.wiscar.cognitive}%</div>
                  <div>Ability: {results.wiscar.ability}%</div>
                  <div>Real-world: {results.wiscar.realWorld}%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-accent" />
                Personalized Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{recommendations.decision}</h3>
                <p className="text-muted-foreground mb-4">
                  Based on your assessment results, here's what we recommend:
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Next Steps:</h4>
                  <ul className="space-y-2">
                    {recommendations.nextSteps.map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Recommended Resources:</h4>
                  <div className="space-y-2">
                    {recommendations.resources.map((resource, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {resource.type}
                        </Badge>
                        <span className="text-sm">{resource.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Career Matches */}
        <Card className="mb-8 bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-6 w-6 text-primary" />
              Top Career Matches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {careerMatches.map((career, index) => {
                const CareerIcon = career.icon;
                return (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-card transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <CareerIcon className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="font-semibold">{career.role}</h3>
                          <p className="text-sm text-muted-foreground">{career.description}</p>
                        </div>
                      </div>
                      <Badge variant={career.match >= 70 ? "default" : "secondary"}>
                        {career.match}% match
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {career.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" className="gap-2">
            <Download className="h-5 w-5" />
            Download Full Report
          </Button>
          <Button variant="outline" size="lg" onClick={onRestart} className="gap-2">
            <RefreshCw className="h-5 w-5" />
            Retake Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};