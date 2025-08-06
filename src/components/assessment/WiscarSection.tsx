import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";

interface WiscarSectionProps {
  onComplete: (results: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
    overallScore: number;
  }) => void;
}

const WISCAR_QUESTIONS = [
  // Will - Consistency of purpose
  {
    id: "will_1",
    category: "will",
    question: "I stay focused on long-term goals even when I face obstacles.",
    type: "likert"
  },
  {
    id: "will_2",
    category: "will",
    question: "I persist with difficult tasks until I complete them successfully.",
    type: "likert"
  },
  {
    id: "will_3",
    category: "will",
    question: "I maintain motivation even when progress seems slow.",
    type: "likert"
  },
  
  // Interest - Curiosity in human behavior and systems
  {
    id: "interest_1",
    category: "interest",
    question: "I often wonder why people behave the way they do.",
    type: "likert"
  },
  {
    id: "interest_2",
    category: "interest",
    question: "Understanding human psychology and behavior fascinates me.",
    type: "likert"
  },
  {
    id: "interest_3",
    category: "interest",
    question: "I enjoy observing patterns in how people interact with systems.",
    type: "likert"
  },
  
  // Skill - Research, analysis, communication
  {
    id: "skill_1",
    category: "skill",
    question: "Rate your current proficiency in conducting user interviews.",
    type: "skill_rating"
  },
  {
    id: "skill_2",
    category: "skill",
    question: "Rate your ability to analyze qualitative data and identify patterns.",
    type: "skill_rating"
  },
  {
    id: "skill_3",
    category: "skill",
    question: "Rate your communication skills in presenting research findings.",
    type: "skill_rating"
  },
  
  // Cognitive Readiness - Learning agility, abstraction
  {
    id: "cognitive_1",
    category: "cognitive",
    question: "I enjoy solving ambiguous, messy problems without clear solutions.",
    type: "likert"
  },
  {
    id: "cognitive_2",
    category: "cognitive",
    question: "I can quickly learn and adapt to new research methodologies.",
    type: "likert"
  },
  {
    id: "cognitive_3",
    category: "cognitive",
    question: "I excel at seeing connections between seemingly unrelated pieces of information.",
    type: "likert"
  },
  
  // Ability to Learn - Feedback acceptance, metacognition
  {
    id: "ability_1",
    category: "ability",
    question: "I actively seek out feedback on how I interpret user data and insights.",
    type: "likert"
  },
  {
    id: "ability_2",
    category: "ability",
    question: "I reflect on my own thinking processes and biases regularly.",
    type: "likert"
  },
  {
    id: "ability_3",
    category: "ability",
    question: "I adapt my approach based on what I learn from failures or mistakes.",
    type: "likert"
  },
  
  // Real-World Alignment - Awareness of what the job involves
  {
    id: "realworld_1",
    category: "realWorld",
    question: "Design research involves extensive fieldwork and data synthesis. I find this appealing.",
    type: "likert"
  },
  {
    id: "realworld_2",
    category: "realWorld",
    question: "I understand that design research often requires working with ambiguous requirements.",
    type: "likert"
  },
  {
    id: "realworld_3",
    category: "realWorld",
    question: "I am comfortable with the collaborative and iterative nature of research work.",
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

const SKILL_RATING_OPTIONS = [
  { value: "1", label: "Beginner - No experience" },
  { value: "2", label: "Novice - Basic understanding" },
  { value: "3", label: "Intermediate - Some experience" },
  { value: "4", label: "Advanced - Significant experience" },
  { value: "5", label: "Expert - Professional level" }
];

export const WiscarSection = ({ onComplete }: WiscarSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [WISCAR_QUESTIONS[currentQuestion].id]: value };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < WISCAR_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate results
      const results = calculateWiscarResults(answers);
      onComplete(results);
    }
  };

  const calculateWiscarResults = (answers: Record<string, string>) => {
    const categories = {
      will: WISCAR_QUESTIONS.filter(q => q.category === "will"),
      interest: WISCAR_QUESTIONS.filter(q => q.category === "interest"),
      skill: WISCAR_QUESTIONS.filter(q => q.category === "skill"),
      cognitive: WISCAR_QUESTIONS.filter(q => q.category === "cognitive"),
      ability: WISCAR_QUESTIONS.filter(q => q.category === "ability"),
      realWorld: WISCAR_QUESTIONS.filter(q => q.category === "realWorld")
    };

    const calculateCategoryScore = (questions: typeof WISCAR_QUESTIONS) => {
      const scores = questions.map(q => parseInt(answers[q.id] || "1"));
      const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      return Math.round((average / 5) * 100);
    };

    const will = calculateCategoryScore(categories.will);
    const interest = calculateCategoryScore(categories.interest);
    const skill = calculateCategoryScore(categories.skill);
    const cognitive = calculateCategoryScore(categories.cognitive);
    const ability = calculateCategoryScore(categories.ability);
    const realWorld = calculateCategoryScore(categories.realWorld);
    
    const overallScore = Math.round((will + interest + skill + cognitive + ability + realWorld) / 6);

    return {
      will,
      interest,
      skill,
      cognitive,
      ability,
      realWorld,
      overallScore
    };
  };

  const progress = ((currentQuestion + 1) / WISCAR_QUESTIONS.length) * 100;
  const question = WISCAR_QUESTIONS[currentQuestion];
  const currentAnswer = answers[question.id];
  
  const options = question.type === "skill_rating" ? SKILL_RATING_OPTIONS : LIKERT_OPTIONS;

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">
              Question {currentQuestion + 1} of {WISCAR_QUESTIONS.length}
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
          <div className="mb-2">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
            </span>
          </div>
          <CardTitle className="text-xl leading-relaxed">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={currentAnswer} onValueChange={handleAnswer} className="space-y-4">
            {options.map((option) => (
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
          {currentQuestion === WISCAR_QUESTIONS.length - 1 ? "Complete Assessment" : "Next Question"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};