import { useLocation, useNavigate } from 'react-router-dom';
import type { LessonExerciseData } from '../types';
import { LessonRunner } from '../components/exercises/LessonRunner';

interface LessonState {
  exercises: LessonExerciseData[];
  accentColor?: string;
  returnTo?: string;
}

export function Lesson() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LessonState | null;

  if (!state || !state.exercises) {
    navigate('/', { replace: true });
    return null;
  }

  return (
    <LessonRunner
      exercises={state.exercises}
      accentColor={state.accentColor}
      onExit={() => navigate(state.returnTo ?? '/', { replace: true })}
    />
  );
}
