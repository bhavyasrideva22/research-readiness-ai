import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain, Target, TrendingUp, Users, Eye, BarChart3 } from "lucide-react";
import heroImage from "@/assets/hero-research.jpg";

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage = ({ onStart }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-95"></div>
        <div className="relative container mx-auto px-4 py-20 text-center text-white">
          <Badge className="mb-6 bg-white/20 text-white border-white/30">
            AI-Powered Career Assessment
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Is Design Research Your{" "}
            <span className="bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent">
              Ideal Path?
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
            A comprehensive assessment evaluating your psychological fit, technical readiness, 
            and career alignment with Design Research
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={onStart}
              variant="hero" 
              size="xl"
              className="group"
            >
              Start Assessment
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              Learn More
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">20-30</div>
              <div className="text-sm text-white/80">minutes</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-white/80">assessment areas</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">AI</div>
              <div className="text-sm text-white/80">powered insights</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm text-white/80">personalized</div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* What is Design Research */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">What is Design Research?</h2>
            <p className="text-xl text-muted-foreground">
              Design Research is a user-centric approach to understanding behaviors, needs, and motivations 
              through observation and feedback to inform product or service design. It merges psychology, 
              anthropology, UX, and data to drive human-centered design.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div className="space-y-6">
              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    User Observation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Understanding user behaviors through ethnographic research, interviews, and usability testing.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-accent" />
                    Data Synthesis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Transforming qualitative and quantitative insights into actionable design recommendations.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Design Research Process" 
                className="rounded-lg shadow-elegant w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Career Outcomes */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Career Outcomes</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Design Research opens doors to exciting career paths across technology, 
              consulting, and innovation sectors.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Users,
                title: "UX Researcher",
                description: "Lead user studies and research initiatives for product teams",
                growth: "+22% growth"
              },
              {
                icon: Brain,
                title: "Human Factors Specialist",
                description: "Optimize human-system interactions in complex environments",
                growth: "+15% growth"
              },
              {
                icon: Target,
                title: "Product Designer",
                description: "Research-oriented design with focus on user needs",
                growth: "+13% growth"
              },
              {
                icon: TrendingUp,
                title: "Design Strategist",
                description: "Bridge business strategy with human-centered design",
                growth: "+18% growth"
              },
              {
                icon: Eye,
                title: "Service Designer",
                description: "Design end-to-end customer experiences and journeys",
                growth: "+25% growth"
              },
              {
                icon: BarChart3,
                title: "Innovation Consultant",
                description: "Apply research insights to drive business innovation",
                growth: "+20% growth"
              }
            ].map((career, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-gradient-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <career.icon className="h-8 w-8 text-primary" />
                    <Badge variant="secondary">{career.growth}</Badge>
                  </div>
                  <CardTitle className="text-lg">{career.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{career.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">What You'll Discover</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive assessment evaluates multiple dimensions of your fit 
              for Design Research using validated frameworks.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-gradient-primary text-white shadow-elegant">
              <CardHeader>
                <CardTitle>Psychometric Analysis</CardTitle>
                <CardDescription className="text-white/80">
                  Big Five personality traits, Holland Code, and Growth Mindset assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-white/90">
                  <li>• Personality compatibility</li>
                  <li>• Working preferences</li>
                  <li>• Motivation patterns</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-accent text-white shadow-elegant">
              <CardHeader>
                <CardTitle>Technical Readiness</CardTitle>
                <CardDescription className="text-white/80">
                  Evaluate your current skills and knowledge foundations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-white/90">
                  <li>• Research methodology</li>
                  <li>• UX fundamentals</li>
                  <li>• Analytical thinking</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-hero text-white shadow-elegant">
              <CardHeader>
                <CardTitle>WISCAR Framework</CardTitle>
                <CardDescription className="text-white/80">
                  Will, Interest, Skill, Cognitive readiness, Ability to learn, Real-world alignment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-white/90">
                  <li>• Holistic evaluation</li>
                  <li>• Personalized insights</li>
                  <li>• Career recommendations</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              onClick={onStart}
              variant="hero" 
              size="xl"
              className="group"
            >
              Begin Your Assessment Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};