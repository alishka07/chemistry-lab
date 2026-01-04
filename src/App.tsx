import { useState } from 'react';
import Login from './components/Login';
import Header from './components/Header';
import StudentDashboard from './components/StudentDashboard';
import QuarterView from './components/QuarterView';
import LabWorkDetail from './components/LabWorkDetail';
import TeacherDashboard from './components/TeacherDashboard';
import { User, Submission } from './types';

type View =
  | { type: 'dashboard' }
  | { type: 'quarter'; quarterId: number }
  | { type: 'labwork'; labWorkId: number };

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>({ type: 'dashboard' });
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentView({ type: 'dashboard' });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView({ type: 'dashboard' });
  };

  const handleSubmitQuiz = (submission: Submission) => {
    setSubmissions((prev) => [...prev, submission]);
  };

  const getExistingSubmission = (labWorkId: number): Submission | undefined => {
    if (!user) return undefined;
    return submissions.find(
      (sub) =>
        sub.labWorkId === labWorkId &&
        sub.studentName === user.name &&
        sub.studentSurname === user.surname
    );
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header user={user} onLogout={handleLogout} />

      {user.role === 'teacher' ? (
        <TeacherDashboard submissions={submissions} />
      ) : (
        <>
          {currentView.type === 'dashboard' && (
            <StudentDashboard
              user={user}
              onSelectQuarter={(quarterId) =>
                setCurrentView({ type: 'quarter', quarterId })
              }
            />
          )}

          {currentView.type === 'quarter' && (
            <QuarterView
              quarterId={currentView.quarterId}
              onBack={() => setCurrentView({ type: 'dashboard' })}
              onSelectLabWork={(labWorkId) =>
                setCurrentView({ type: 'labwork', labWorkId })
              }
            />
          )}

          {currentView.type === 'labwork' && (
            <LabWorkDetail
              labWorkId={currentView.labWorkId}
              user={user}
              onBack={() =>
                setCurrentView({ type: 'dashboard' })
              }
              onSubmitQuiz={handleSubmitQuiz}
              existingSubmission={getExistingSubmission(currentView.labWorkId)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
