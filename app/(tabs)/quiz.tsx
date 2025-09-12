import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CircleCheck as CheckCircle, Circle as XCircle, Award, RotateCcw } from 'lucide-react-native';
import { Colors } from '../../constants/Colors';

const quizQuestions = [
  {
    id: 1,
    question: "When was the Taj Mahal completed?",
    options: ["1648", "1653", "1665", "1672"],
    correct: 1,
    explanation: "The Taj Mahal was completed in 1653 after 22 years of construction."
  },
  {
    id: 2,
    question: "Which empire built the Konark Sun Temple?",
    options: ["Mughal Empire", "Chola Empire", "Eastern Ganga Dynasty", "Vijayanagara Empire"],
    correct: 2,
    explanation: "The Konark Sun Temple was built by the Eastern Ganga Dynasty in the 13th century."
  },
  {
    id: 3,
    question: "How many caves are there in total at Ajanta and Ellora?",
    options: ["64", "68", "72", "76"],
    correct: 0,
    explanation: "There are 30 caves at Ajanta and 34 caves at Ellora, making a total of 64 caves."
  },
  {
    id: 4,
    question: "Which goddess is the Meenakshi Temple primarily dedicated to?",
    options: ["Lakshmi", "Saraswati", "Parvati", "Kali"],
    correct: 2,
    explanation: "The Meenakshi Temple is dedicated to Goddess Parvati (Meenakshi) and Lord Shiva."
  },
  {
    id: 5,
    question: "What architectural style is the Amer Fort known for?",
    options: ["Dravidian", "Indo-Islamic", "Nagara", "Rajput-Mughal"],
    correct: 3,
    explanation: "Amer Fort showcases a blend of Rajput and Mughal architectural styles."
  }
];

interface Answer {
  questionId: number;
  selected: number;
  correct: number;
  isCorrect: boolean;
}

export default function QuizScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const isCorrect = answerIndex === quizQuestions[currentQuestion].correct;
    const newAnswer = {
      questionId: quizQuestions[currentQuestion].id,
      selected: answerIndex,
      correct: quizQuestions[currentQuestion].correct,
      isCorrect
    };
    
    setAnswers([...answers, newAnswer]);
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
    setAnswers([]);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 80) return "Excellent! You're a heritage expert! 🏆";
    if (percentage >= 60) return "Great job! You know your Indian heritage well! 🎯";
    if (percentage >= 40) return "Good effort! Keep learning about our heritage! 📚";
    return "Keep exploring! There's so much to discover! 🌟";
  };

  const getScoreColor = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 80) return "#00FF00";
    if (percentage >= 60) return "#FF6A00";
    if (percentage >= 40) return "#FFD700";
    return "#FF6666";
  };

  if (quizCompleted) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.resultContainer}>
          <View style={styles.scoreHeader}>
            <Award size={80} color={getScoreColor()} />
            <Text style={styles.scoreTitle}>Quiz Complete!</Text>
            <Text style={[styles.scoreText, { color: getScoreColor() }]}>
              {score} / {quizQuestions.length}
            </Text>
            <Text style={styles.scoreMessage}>{getScoreMessage()}</Text>
          </View>

          <View style={styles.reviewSection}>
            <Text style={styles.reviewTitle}>Review Your Answers</Text>
            {quizQuestions.map((question, index) => {
              const userAnswer = answers[index];
              return (
                <View key={question.id} style={styles.reviewItem}>
                  <Text style={styles.reviewQuestion}>{question.question}</Text>
                  <View style={styles.reviewAnswers}>
                    <View style={styles.reviewAnswer}>
                      <Text style={styles.reviewLabel}>Your answer:</Text>
                      <View style={styles.answerRow}>
                        {userAnswer.isCorrect ? (
                          <CheckCircle size={16} color="#00FF00" />
                        ) : (
                          <XCircle size={16} color="#FF6666" />
                        )}
                        <Text style={[
                          styles.reviewText,
                          { color: userAnswer.isCorrect ? '#00FF00' : '#FF6666' }
                        ]}>
                          {question.options[userAnswer.selected]}
                        </Text>
                      </View>
                    </View>
                    {!userAnswer.isCorrect && (
                      <View style={styles.reviewAnswer}>
                        <Text style={styles.reviewLabel}>Correct answer:</Text>
                        <View style={styles.answerRow}>
                          <CheckCircle size={16} color="#00FF00" />
                          <Text style={[styles.reviewText, { color: '#00FF00' }]}>
                            {question.options[question.correct]}
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                  <Text style={styles.explanation}>{question.explanation}</Text>
                </View>
              );
            })}
          </View>

          <TouchableOpacity style={styles.restartButton} onPress={resetQuiz}>
            <LinearGradient colors={['#FF6A00', '#FF8C42']} style={styles.buttonGradient}>
              <RotateCcw size={20} color="#FFFFFF" />
              <Text style={styles.restartButtonText}>Try Again</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Heritage Quiz</Text>
        <Text style={styles.progressText}>
          Question {currentQuestion + 1} of {quizQuestions.length}
        </Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }
            ]} 
          />
        </View>
      </View>

      <ScrollView style={styles.quizContent}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedAnswer === index && styles.selectedOption,
                showResult && index === question.correct && styles.correctOption,
                showResult && selectedAnswer === index && index !== question.correct && styles.wrongOption
              ]}
              onPress={() => !showResult && handleAnswer(index)}
              disabled={showResult}
            >
              <Text style={[
                styles.optionText,
                selectedAnswer === index && styles.selectedOptionText,
                showResult && index === question.correct && styles.correctOptionText
              ]}>
                {option}
              </Text>
              {showResult && index === question.correct && (
                <CheckCircle size={20} color="#FFFFFF" />
              )}
              {showResult && selectedAnswer === index && index !== question.correct && (
                <XCircle size={20} color="#FFFFFF" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {showResult && (
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationTitle}>
              {selectedAnswer === question.correct ? "Correct! 🎉" : "Not quite! 🤔"}
            </Text>
            <Text style={styles.explanationText}>{question.explanation}</Text>
          </View>
        )}
      </ScrollView>

      {showResult && (
        <View style={styles.nextButtonContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
            <LinearGradient colors={['#FF6A00', '#FF8C42']} style={styles.buttonGradient}>
              <Text style={styles.nextButtonText}>
                {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'View Results'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.scoreDisplay}>
        <Text style={styles.currentScore}>Score: {score} / {currentQuestion + (showResult ? 1 : 0)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: Colors.headerBackground,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 10,
  },
  progressText: {
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 10,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.divider,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  quizContent: {
    flex: 1,
    padding: 20,
  },
  questionContainer: {
    marginBottom: 30,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    lineHeight: 28,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 15,
  },
  optionButton: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: Colors.cardBackground,
    borderWidth: 2,
    borderColor: Colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedOption: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(255, 106, 0, 0.1)',
  },
  correctOption: {
    borderColor: Colors.success,
    backgroundColor: 'rgba(40, 167, 69, 0.1)',
  },
  wrongOption: {
    borderColor: Colors.error,
    backgroundColor: 'rgba(220, 53, 69, 0.1)',
  },
  optionText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
    flex: 1,
  },
  selectedOptionText: {
    color: Colors.primary,
  },
  correctOptionText: {
    color: Colors.success,
  },
  explanationContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: Colors.cardBackground,
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
  },
  explanationText: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  nextButtonContainer: {
    padding: 20,
  },
  nextButton: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  nextButtonText: {
    color: Colors.buttonText,
    fontSize: 18,
    fontWeight: '600',
  },
  scoreDisplay: {
    padding: 20,
    backgroundColor: Colors.headerBackground,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  currentScore: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  resultContainer: {
    padding: 20,
  },
  scoreHeader: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 30,
  },
  scoreTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 20,
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scoreMessage: {
    fontSize: 18,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  reviewSection: {
    marginBottom: 30,
  },
  reviewTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 20,
  },
  reviewItem: {
    backgroundColor: Colors.cardBackground,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 15,
  },
  reviewAnswers: {
    marginBottom: 10,
  },
  reviewAnswer: {
    marginBottom: 8,
  },
  reviewLabel: {
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: 5,
  },
  answerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reviewText: {
    fontSize: 14,
    fontWeight: '500',
  },
  explanation: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  restartButton: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  restartButtonText: {
    color: Colors.buttonText,
    fontSize: 18,
    fontWeight: '600',
  },
});