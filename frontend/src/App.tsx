import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StartPage } from './components/StartPage';
import { QuizPage } from './components/QuizPage';
import { ResultPage } from './components/ResultPage';
import { AnalysisPage } from './components/AnalysisPage';
import { Protected } from './components/Protected';

const router = createBrowserRouter([
  { path: "/", element: <StartPage /> },
  { path: "/quiz", element: <Protected><QuizPage /></Protected> },
  { path: "/result", element: <Protected><ResultPage /></Protected> },
  { path: "/analysis", element: <Protected><AnalysisPage /></Protected> },
]);


const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;