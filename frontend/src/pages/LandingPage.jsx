import React, { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import FeatureCard from '../components/landing/FeatureCard';
import Step from '../components/landing/Step';
import { FaGithub } from 'react-icons/fa';

const LandingPage = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);
  if (loading) return <div>loading</div>;
  return (
    <main className='bg-gray-100 text-gray-900 min-h-screen'>
      {/* Hero Section */}
      <section
        id='landing-hero'
        className='relative h-screen flex flex-col items-center justify-center text-center bg-linear-to-r from-cyan-500 to-blue-500 text-white px-6'
      >
        <h1 className='text-5xl font-extrabold leading-tight'>AMS</h1>
        <p className='mt-4 text-lg max-w-2xl'>
          Efficient and hassle-free attendance management.
        </p>
        <button
          onClick={() =>
            document
              .getElementById('landing-A')
              .scrollIntoView({ behavior: 'smooth' })
          }
          className='mt-6 px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200'
        >
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section id='landing-A' className='py-20 max-w-6xl mx-auto text-center'>
        <h2 className='text-4xl font-bold mt-30'>For Admin</h2>
        <div className='grid md:grid-cols-3 gap-8 mt-12'>
          <FeatureCard
            title='Dashboard'
            desc='Seamless, Overview Dashboard for records'
          />
          <FeatureCard
            title='Real-time Reports'
            desc='Instant attendance insights and analytics.'
          />
          <FeatureCard
            title='Notification'
            desc='Remind Employees for check in/out.'
          />
        </div>
      </section>

      {/* How It Works */}
      <section className='bg-white py-20 text-center'>
        <h2 className='text-4xl font-bold'>For Employees</h2>
        <div className='flex flex-col md:flex-row justify-center mt-12 gap-12'>
          <Step number='1' title='Login' desc='Login to your account' />
          <Step
            number='2'
            title='Check in/out'
            desc='Check in/out with just a click of a button.'
          />
          <Step
            number='3'
            title='View History'
            desc='Track and analyze attendance effortlessly.'
          />
        </div>
      </section>

      {/* Footer */}
      <footer className='py-8 bg-gray-900 text-white text-center'>
        <p>© {new Date().getFullYear()} AMS. All rights reserved.</p>
        <div className='flex justify-center mt-2'>
          <FaGithub size={24} />
          <Link
            to='https://github.com/GaneshSrambikal/AMS'
            target='_blank'
            className='ml-3'
          >
            GaneshSrambikal
          </Link>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
