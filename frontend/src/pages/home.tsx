import React from 'react';
import { ArrowRight, BookOpen, Users, Clock, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';

const HomePage = () => {
  const { user } = useAuth();
  //const router = useRouter();
  
  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Diverse Courses",
      description: "Access a wide range of courses taught by expert instructors"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Expert Instructors",
      description: "Learn from industry professionals with real-world experience"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Flexible Learning",
      description: "Study at your own pace with lifetime access to course content"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Certified Learning",
      description: "Earn certificates upon successful course completion"
    }
  ];

  // Determine the appropriate CTA buttons based on auth state
  const renderCTAButtons = () => {
    if (user) {
      return (
        <div className="flex justify-center gap-4">
          <a 
            href="/courses" 
            className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition"
          >
            Browse Courses
          </a>
          {user.role === 'admin' ? (
            <a 
              href="/dashboard" 
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
            >
              Go to Dashboard
            </a>
          ) : (
            <a 
              href="/courses/my-courses" 
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
            >
              My Courses
            </a>
          )}
        </div>
      );
    }

    return (
      <div className="flex justify-center gap-4">
        <a 
          href="/signup" 
          className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition"
        >
          Get Started
        </a>
        <a 
          href="/courses" 
          className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
        >
          Browse Courses
        </a>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Future with Online Learning
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              Access quality education from anywhere in the world
            </p>
            {renderCTAButtons()}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform
            </h2>
            <p className="text-xl text-gray-600">
              Discover the benefits of learning with us
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-orange-50 p-6 rounded-xl hover:shadow-lg transition">
                <div className="text-orange-500 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!user && (
        <div className="bg-orange-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-orange-600 rounded-2xl p-8 md:p-16 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Start Learning?
              </h2>
              <p className="text-xl mb-8 text-orange-100">
                Join thousands of students already learning on our platform
              </p>
              <a 
                href="/signup" 
                className="inline-flex items-center bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;