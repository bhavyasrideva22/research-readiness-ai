import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";

interface TechnicalSectionProps {
  onComplete: (results: {
    aptitudeScore: number;
    knowledgeScore: number;
    domainScore: number;
    overallScore: number;
  }) => void;
}

const TECHNICAL_QUESTIONS = [
  // General Aptitude (10 questions)
  {
    id: "aptitude_1",
    category: "aptitude",
    question: "Which pattern comes next in this sequence: 2, 4, 8, 16, ?",
    type: "multiple_choice",
    options: [
      { value: "20", label: "20" },
      { value: "24", label: "24" },
      { value: "32", label: "32", correct: true },
      { value: "36", label: "36" }
    ]
  },
  {
    id: "aptitude_2",
    category: "aptitude",
    question: "A user says they 'love the app' but their behavior shows they rarely use it. This suggests:",
    type: "multiple_choice",
    options: [
      { value: "satisfaction", label: "High user satisfaction" },
      { value: "lying", label: "The user is lying" },
      { value: "bias", label: "Potential social desirability bias", correct: true },
      { value: "technical", label: "Technical issues preventing usage" }
    ]
  },
  {
    id: "aptitude_3",
    category: "aptitude",
    question: "In data analysis, correlation implies:",
    type: "multiple_choice",
    options: [
      { value: "causation", label: "Causation" },
      { value: "relationship", label: "A potential relationship", correct: true },
      { value: "error", label: "Data collection error" },
      { value: "nothing", label: "Nothing meaningful" }
    ]
  },
  
  // Prerequisite Knowledge (8 questions)
  {
    id: "knowledge_1",
    category: "knowledge",
    question: "What is the primary goal of user-centered design?",
    type: "multiple_choice",
    options: [
      { value: "aesthetics", label: "Creating beautiful interfaces" },
      { value: "users", label: "Solving real user problems", correct: true },
      { value: "technology", label: "Showcasing advanced technology" },
      { value: "business", label: "Maximizing business revenue" }
    ]
  },
  {
    id: "knowledge_2",
    category: "knowledge",
    question: "Which research method is best for understanding 'why' users behave in certain ways?",
    type: "multiple_choice",
    options: [
      { value: "surveys", label: "Surveys" },
      { value: "analytics", label: "Analytics data" },
      { value: "interviews", label: "In-depth interviews", correct: true },
      { value: "ab_testing", label: "A/B testing" }
    ]
  },
  {
    id: "knowledge_3",
    category: "knowledge",
    question: "A persona is:",
    type: "multiple_choice",
    options: [
      { value: "real_user", label: "A real user profile" },
      { value: "fictional", label: "A fictional character representing user segments", correct: true },
      { value: "demographic", label: "A demographic summary" },
      { value: "customer", label: "The ideal customer" }
    ]
  },
  
  // Domain-Specific Quiz (10 questions)
  {
    id: "domain_1",
    category: "domain",
    question: "Which method would best uncover hidden user motivations?",
    type: "multiple_choice",
    options: [
      { value: "surveys", label: "Online surveys" },
      { value: "ethnography", label: "Ethnographic research", correct: true },
      { value: "analytics", label: "Usage analytics" },
      { value: "focus_groups", label: "Focus groups" }
    ]
  },
  {
    id: "domain_2",
    category: "domain",
    question: "When should you use qualitative vs. quantitative research?",
    type: "multiple_choice",
    options: [
      { value: "always_qual", label: "Always use qualitative" },
      { value: "always_quant", label: "Always use quantitative" },
      { value: "depends", label: "Depends on research questions and goals", correct: true },
      { value: "budget", label: "Depends on budget constraints" }
    ]
  },
  {
    id: "domain_3",
    category: "domain",
    question: "What is the main purpose of usability testing?",
    type: "multiple_choice",
    options: [
      { value: "validate", label: "Validate design assumptions" },
      { value: "identify", label: "Identify usability issues", correct: true },
      { value: "measure", label: "Measure user satisfaction" },
      { value: "compare", label: "Compare with competitors" }
    ]
  },
  {
    id: "domain_4",
    category: "domain",
    question: "In design research, triangulation means:",
    type: "multiple_choice",
    options: [
      { value: "geometry", label: "Using geometric analysis" },
      { value: "multiple_methods", label: "Using multiple research methods to validate findings", correct: true },
      { value: "three_users", label: "Testing with exactly three users" },
      { value: "three_phases", label: "Conducting research in three phases" }
    ]
  }
];

export const TechnicalSection = ({ onComplete }: TechnicalSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [TECHNICAL_QUESTIONS[currentQuestion].id]: value };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < TECHNICAL_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate results
      const results = calculateTechnicalResults(answers);
      onComplete(results);
    }
  };

  const calculateTechnicalResults = (answers: Record<string, string>) => {
    const categories = {
      aptitude: TECHNICAL_QUESTIONS.filter(q => q.category === "aptitude"),
      knowledge: TECHNICAL_QUESTIONS.filter(q => q.category === "knowledge"),
      domain: TECHNICAL_QUESTIONS.filter(q => q.category === "domain")
    };

    const calculateCategoryScore = (questions: typeof TECHNICAL_QUESTIONS) => {
      const correctAnswers = questions.filter(q => {
        const userAnswer = answers[q.id];
        const correctOption = q.options?.find(opt => opt.correct);
        return userAnswer === correctOption?.value;
      }).length;
      
      return Math.round((correctAnswers / questions.length) * 100);
    };

    const aptitudeScore = calculateCategoryScore(categories.aptitude);
    const knowledgeScore = calculateCategoryScore(categories.knowledge);
    const domainScore = calculateCategoryScore(categories.domain);
    const overallScore = Math.round((aptitudeScore + knowledgeScore + domainScore) / 3);

    return {
      aptitudeScore,
      knowledgeScore,
      domainScore,
      overallScore
    };
  };

  const progress = ((currentQuestion + 1) / TECHNICAL_QUESTIONS.length) * 100;
  const question = TECHNICAL_QUESTIONS[currentQuestion];
  const currentAnswer = answers[question.id];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">
              Question {currentQuestion + 1} of {TECHNICAL_QUESTIONS.length}
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
      </Card>

      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={currentAnswer} onValueChange={handleAnswer} className="space-y-4">
            {question.options?.map((option, index) => (
              <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label 
                  htmlFor={option.value} 
                  className="flex-1 cursor-pointer text-base"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        
        <Button 
          onClick={handleNext}
          disabled={!currentAnswer}
          variant="assessment"
          className="gap-2"
        >
          {currentQuestion === TECHNICAL_QUESTIONS.length - 1 ? "Complete Section" : "Next Question"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};