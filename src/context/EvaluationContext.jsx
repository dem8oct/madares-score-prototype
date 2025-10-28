import React, { createContext, useContext, useState, useMemo } from 'react';
import { mockEvaluations, mockSchools } from '../data/mockData';

const EvaluationContext = createContext();

export const useEvaluation = () => {
  const context = useContext(EvaluationContext);
  if (!context) {
    throw new Error('useEvaluation must be used within EvaluationProvider');
  }
  return context;
};

export const EvaluationProvider = ({ children }) => {
  // Store evaluations in state (starts with mock data)
  const [baseEvaluations, setBaseEvaluations] = useState(mockEvaluations);

  // Enrich evaluations with school data
  const evaluations = useMemo(() => {
    return baseEvaluations.map(evaluation => {
      const school = mockSchools.find(s => s.id === evaluation.school_id);
      return {
        ...evaluation,
        gender_model: school?.gender_model || 'Unknown',
      };
    });
  }, [baseEvaluations]);

  // Get evaluation by ID
  const getEvaluation = (id) => {
    return evaluations.find(e => e.id === id);
  };

  // Update evaluation (simulates saving changes)
  const updateEvaluation = (id, updates) => {
    setBaseEvaluations(prev =>
      prev.map(e => e.id === id ? { ...e, ...updates } : e)
    );
  };

  // Update compliance answer
  const updateComplianceAnswer = (evalId, questionId, answer, evidence = []) => {
    setBaseEvaluations(prev =>
      prev.map(e => {
        if (e.id !== evalId) return e;

        return {
          ...e,
          compliance_data: {
            ...e.compliance_data,
            questions: e.compliance_data.questions.map(q =>
              q.id === questionId
                ? { ...q, answer, evidence, status: answer ? 'complete' : 'pending' }
                : q
            ),
          },
        };
      })
    );

    // Recalculate completion percentage
    recalculateCompletion(evalId);
  };

  // Update Ops review for a question
  const updateOpsReview = (evalId, questionId, reviewStatus, comment) => {
    setBaseEvaluations(prev =>
      prev.map(e => {
        if (e.id !== evalId) return e;

        return {
          ...e,
          compliance_data: {
            ...e.compliance_data,
            questions: e.compliance_data.questions.map(q =>
              q.id === questionId
                ? {
                    ...q,
                    ops_review: {
                      status: reviewStatus,
                      comment: comment,
                      reviewer: 'user002', // Mock reviewer
                      review_date: new Date().toISOString().split('T')[0],
                    },
                    status: reviewStatus === 'accepted' ? 'accepted' : 'returned_for_correction',
                  }
                : q
            ),
          },
        };
      })
    );
  };

  // Submit evaluation for review
  const submitEvaluation = (evalId) => {
    setBaseEvaluations(prev =>
      prev.map(e =>
        e.id === evalId
          ? {
              ...e,
              status: 'submitted',
              submission_date: new Date().toISOString().split('T')[0],
            }
          : e
      )
    );
  };

  // Return for correction (increments version)
  const returnForCorrection = (evalId) => {
    setBaseEvaluations(prev =>
      prev.map(e => {
        if (e.id !== evalId) return e;

        const [current, max] = e.version.split('/');
        const newVersion = `${parseInt(current) + 1}/${max}`;

        return {
          ...e,
          status: 'returned_for_correction',
          version: newVersion,
          correction_count: e.correction_count + 1,
        };
      })
    );

    // Update pending items based on corrections
    updatePendingItems(evalId);
  };

  // Approve evaluation
  const approveEvaluation = (evalId) => {
    setBaseEvaluations(prev =>
      prev.map(e =>
        e.id === evalId
          ? {
              ...e,
              status: 'approved',
              approved_date: new Date().toISOString().split('T')[0],
            }
          : e
      )
    );
  };

  // Recalculate completion percentage
  const recalculateCompletion = (evalId) => {
    setBaseEvaluations(prev =>
      prev.map(e => {
        if (e.id !== evalId) return e;

        const questions = e.compliance_data.questions;
        const completedQuestions = questions.filter(q => q.status === 'complete').length;
        const percentage = Math.round((completedQuestions / questions.length) * 100);

        return { ...e, completion_percentage: percentage };
      })
    );
  };

  // Update pending items based on current state
  const updatePendingItems = (evalId) => {
    setBaseEvaluations(prev =>
      prev.map(e => {
        if (e.id !== evalId) return e;

        const pendingItems = [];

        // Check for missing data
        e.compliance_data.questions.forEach(q => {
          if (!q.answer || q.answer === null) {
            pendingItems.push({
              type: 'missing_data',
              question_id: q.id,
              description: `${q.question}`,
              description_ar: `${q.question_ar}`,
            });
          }

          // Check for corrections
          if (q.ops_review && q.ops_review.status === 'return_for_correction') {
            pendingItems.push({
              type: 'correction_requested',
              question_id: q.id,
              description: q.ops_review.comment,
              description_ar: q.ops_review.comment_ar || q.ops_review.comment,
              ops_comment: q.ops_review.comment,
            });
          }
        });

        return { ...e, pending_items: pendingItems };
      })
    );
  };

  const value = {
    evaluations,
    getEvaluation,
    updateEvaluation,
    updateComplianceAnswer,
    updateOpsReview,
    submitEvaluation,
    returnForCorrection,
    approveEvaluation,
  };

  return (
    <EvaluationContext.Provider value={value}>
      {children}
    </EvaluationContext.Provider>
  );
};
