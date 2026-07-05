import React from 'react';
import TodoPage from './pages/TodoPage';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" richColors closeButton />
      
      <TodoPage />
    </div>
  );
}