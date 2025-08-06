import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";

interface PsychometricSectionProps {
  onComplete: (results: {
    personalityScore: number;
    interestScore: number;
    motivationScore: number;
    overallScore: number;
  }) => void;
}

const PSYCHOMETRIC_QUESTIONS = [
  // Interest Scale (10 questions)
  {
    id: "interest_1",
    category: "interest",
    question: "I enjoy observing how people interact with technology.",
    type: "likert"
  },
  {
    id: "interest_2",
    category: "interest",
    question: "Understanding user behavior patterns fascinates me.",
    type: "likert"
  },
  {
    id: "interest_3",
    category: "interest",
    question: "I find myself naturally curious about why people make certain choices.",
    type: "likert"
  },
  {
    id: "interest_4",
    category: "interest",
    question: "I enjoy conducting interviews and listening to user stories.",
    type: "likert"
  },
  {
    id: "interest_5",
    category: "interest",
    question: "Analyzing data to uncover insights excites me.",
    type: "likert"
  },
  
  // Personality Compatibility (Big 5-based)
  {
    id: "personality_1",
    category: "personality",
    question: "I enjoy exploring new ideas and concepts (Openness).",
    type: "likert"
  },
  {
    id: "personality_2",
    category: "personality",
    question: "I pay attention to details and am thorough in my work (Conscientiousness).",
    type: "likert"
  },
  {
    id: "personality_3",
    category: "personality",
    question: "I work well with others and enjoy collaborative environments (Agreeableness).",
    type: "likert"
  },
  {
    id: "personality_4",
    category: "personality",
    question: "I remain calm under pressure and adapt well to change (Emotional Stability).",
    type: "likert"
  },
  {
    id: "personality_5",
    category: "personality",
    question: "I communicate effectively and enjoy presenting ideas (Extraversion).",
    type: "likert"
  },
  
  // Motivation Assessment
  {
    id: "motivation_1",
    category: "motivation",
    question: "I am primarily motivated by the opportunity to learn and grow.",
    type: "likert"
  },
  {
    id: "motivation_2",
    category: "motivation",
    question: "Making a positive impact on user experiences drives me.",
    type: "likert"
  },
  {
    id: "motivation_3",
    category: "motivation",
    question: "I prefer work that allows for creative problem-solving.",
    type: "likert"
  },
  {
    id: "motivation_4",
    category: "motivation",
    question: "I am willing to invest time in developing deep expertise.",
    type: "likert"
  },
  {
    id: "motivation_5",
    category: "motivation",
    question: "I find satisfaction in translating complex insights into actionable recommendations.",
    type: "likert"
  }
];

const LIKERT_OPTIONS = [
  { value: "1", label: "Strongly Disagree" },
  { value: "2", label: "Disagree" },
  { value: "3", label: "Neutral" },
  { value: "4", label: "Agree" },
  { value: "5", label: "Strongly Agree" }
];

export const PsychometricSection = ({ onComplete }: PsychometricSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [PSYCHOMETRIC_QUESTIONS[currentQuestion].id]: value };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < PSYCHOMETRIC_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate results
      const results = calculatePsychometricResults(answers);
      onComplete(results);
    }
  };

  const calculatePsychometricResults = (answers: Record<string, string>) => {
    const categories = {
      interest: PSYCHOMETRIC_QUESTIONS.filter(q => q.category === "interest"),
      personality: PSYCHOMETRIC_QUESTIONS.filter(q => q.category === "personality"),
      motivation: PSYCHOMETRIC_QUESTIONS.filter(q => q.category === "motivation")
    };

    const calculateCategoryScore = (questions: typeof PSYCHOMETRIC_QUESTIONS) => {
      const scores = questions.map(q => parseInt(answers[q.id] || "1"));
      const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      return Math.round((average / 5) * 100);
    };

    const interestScore = calculateCategoryScore(categories.interest);
    const personalityScore = calculateCategoryScore(categories.personality);
    const motivationScore = calculateCategoryScore(categories.motivation);
    const overallScore = Math.round((interestScore + personalityScore + motivationScore) / 3);

    return {
      interestScore,
      personalityScore,
      motivationScore,
      overallScore
    };
  };

  const progress = ((currentQuestion + 1) / PSYCHOMETRIC_QUESTIONS.length) * 100;
  const question = PSYCHOMETRIC_QUESTIONS[currentQuestion];
  const currentAnswer = answers[question.id];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">
              Question {currentQuestion + 1} of {PSYCHOMETRIC_QUESTIONS.length}
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
            {LIKERT_OPTIONS.map((option) => (
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
          {currentQuestion === PSYCHOMETRIC_QUESTIONS.length - 1 ? "Complete Section" : "Next Question"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};