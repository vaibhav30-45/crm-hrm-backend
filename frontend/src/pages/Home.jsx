import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to CRM-HRM System
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          This is a public page accessible to everyone
        </p>
        <div className="space-x-4">
          <a
            href="/login"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
          >
            Login
          </a>
          <a
            href="/dashboard"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md"
          >
            Dashboard (Protected)
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
