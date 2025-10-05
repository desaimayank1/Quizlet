import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StartPage } from './components/StartPage';
import { QuizPage } from './components/QuizPage';
import { ResultPage } from './components/ResultPage';
import { AnalysisPage } from './components/AnalysisPage';

const router = createBrowserRouter([
  { path: "/", element: <StartPage /> },
  { path: "/quiz", element: <QuizPage /> },
  { path: "/result", element: <ResultPage /> },
  { path: "/analysis", element: <AnalysisPage /> },
]);


const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;