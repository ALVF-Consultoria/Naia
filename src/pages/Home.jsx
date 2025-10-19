// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Particles from "@tsparticles/react";

const Home = () => {
  const particlesInit = async () => {
    // Não precisa mais do loadFull
  };

  const particlesOptions = {
    fullScreen: { enable: false }, // ocupa apenas a div
    background: { color: "#ffffff" },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { quantity: 4 },
      },
    },
    particles: {
      color: { value: "#3b82f6" },
      links: {
        enable: true,
        distance: 150,
        color: "#3b82f6",
        opacity: 0.3,
        width: 1,
      },
      move: {
        enable: true,
        random: true,
        speed: 1,
        outModes: { default: "bounce" },
      },
      number: { value: 80, density: { enable: true, area: 800 } },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 4 } },
    },
    detectRetina: true,
  };

  const features = [
    { title: "Create Characters", description: "Define heroes, villains, and their motivations.", icon: "👤" },
    { title: "Build Worlds", description: "Detailed environments and fascinating settings.", icon: "🌎" },
    { title: "Epic Plots", description: "Craft conflicts and climaxes that captivate.", icon: "📖" },
    { title: "Powerful Messages", description: "Inspire and move your audience with impactful themes.", icon: "💡" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50 overflow-hidden mt-12">
      {/* Particles */}
      <Particles id="tsparticles-home" className="absolute inset-0 z-0" init={particlesInit} options={particlesOptions} />

      {/* Content */}
      <main className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-5xl sm:text-6xl font-extrabold text-blue-700 tracking-tight drop-shadow-lg"
        >
          Imagine. Create. Live the Story.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-lg sm:text-xl text-gray-600 mt-4 max-w-2xl"
        >
          Transform ideas into complete worlds. Build characters, create conflicts, and watch your story come to life with just a few clicks.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-8 flex flex-col sm:flex-row gap-6"
        >
          <Link
            to="/create-history"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-2xl"
          >
            🚀 Start Now
          </Link>
          <button
            onClick={() => alert("Coming soon: Explore translated stories!")}
            className="bg-white hover:bg-blue-50 text-blue-600 font-bold py-3 px-10 rounded-full text-lg transition-all duration-300 shadow-lg border-2 border-blue-600 hover:shadow-2xl"
          >
            🔄 Translate Story
          </button>
        </motion.div>

        {/* Feature cards */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 + i * 0.2, duration: 0.8 }}
              className="bg-white bg-opacity-70 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold text-blue-700 mb-2">{f.title}</h3>
              <p className="text-gray-700">{f.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="mt-16 w-full max-w-4xl border-t border-gray-200 pt-10"
        >
          <p className="text-gray-500 italic">“Every great universe started with a single idea.”</p>
        </motion.div>
      </main>
    </div>
  );
};

export default Home;
