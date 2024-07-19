"use client";
import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Chart from "chart.js/auto";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const isStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches;

const useStandaloneMode = () => {
  const [standalone, setStandalone] = useState(isStandalone());

  useEffect(() => {
    const mediaQuery = window.matchMedia("(display-mode: standalone)");

    const handleChange = () => {
      setStandalone(mediaQuery.matches);
    };
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return standalone;
};

export default function Home() {
  const standalone = useStandaloneMode();
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const data = {
    labels: ["Sqli", "XSS", "XXE", "Open Redirect", "Broken Authentication", "Sqli", "XSS", "XXE", "Open Redirect", "Broken Authentication"],
    datasets: [
      {
        label: "# of vulnerabilities",
        data: [155, 112, 226, 117, 334, 155, 112, 226, 117, 334],
        backgroundColor: ["#FFECEC"],
        borderColor: "orange",
        borderWidth: 0, // Adjust border width as needed
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          stepSize: 100, // Specify the step size for y-axis values
          callback: function(value) {
            if (value % 100 === 0) {
              return value;
            }
          },
        },
        beginAtZero: true, // Ensure the y-axis starts at zero
        grid: {
          borderDash: [5, 5], // Create dotted lines
          color: 'rgba(0, 0, 0, 0.1)', // Light gray color for dotted lines
        },
      },
      x: {
        ticks: {
          maxTicksLimit: 12, // Ensure all months appear
          callback: function(value, index) {
            const labels = [
              "January", "February", "March", "April", "May",
              "June", "July", "August", "September", "October",
              "November", "December"
            ];
            return labels[index % labels.length];
          },
        },
        grid: {
          display: false, // Remove vertical lines
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    elements: {
      bar: {
        borderRadius: 20, // Add border radius to the bars
        barThickness: 10, // Set the width of the bars
      },
    },
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };
  

  useEffect(() => {
    const handleAppInstalled = () => {
      // Check if the PWA is installed
      if (!isStandalone()) {
        // PWA is uninstalled, clear local storage
        localStorage.clear();
      }
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);
  const Navbar = () => (
    <nav className="bg-indigo-600 p-4 text-white w-full flex justify-between items-center">
      <div className="text-lg font-bold">MyApp</div>
      <div className="space-x-4">
        <a href="#" className="hover:text-gray-200">
          Home
        </a>
        <a href="#" className="hover:text-gray-200">
          About
        </a>
        <a href="#" className="hover:text-gray-200">
          Contact
        </a>
      </div>
    </nav>
  );

  const Footer = () => (
    <footer className="bg-indigo-600 p-4 w-full text-white text-center">
      <p>&copy; 2024 MyApp. All rights reserved.</p>
    </footer>
  );

  const HomePage = ({ standalone, deferredPrompt, handleInstallClick }) => (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col justify-between">
      <Navbar />
      <div className="container mx-auto px-6 py-12 flex flex-col items-center">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Home</h1>
          {!standalone && deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="bg-indigo-600 text-white py-2 px-4 mt-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            >
              Install PWA
            </button>
          )}
        </div>

        {/* <BarChart
          xAxis={[
            { scaleType: "band", data: ["group A", "group B", "group C"] },
          ]}
          series={[
            { data: [4, 3, 5] },
            { data: [1, 6, 3] },
            { data: [2, 5, 6] },
          ]}
          width={500}
          height={300}
        /> */}

        {/* <div>
          <Bar
            data={{
              labels: [
                "Sqli",
                "XSS",
                "XXE",
                "Open Redirect",
                "Broken Authentication",
              ],
              datasets: [
                {
                  label: "# of vulnerabilities",
                  data: [15, 12, 6, 7, 4],
                  backgroundColor: ["red", "yellow", "blue", "black", "green"],
                  borderColor: "orange",
                  borderWidth: 1,
                },
              ],
            }}
            height={300}
            width={500}
            options={{
              maintainAspectRatio: false,
            }}
          />
        </div> */}
        <div style={{ width: '686px', height: '350px' }}>
      <Bar data={data} options={options} />
    </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Card 1</h2>
            <p className="text-gray-700"></p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Card 2</h2>
            <p className="text-gray-700">
              This is the content of the second card.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="conatiner w-full bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className=" text-center">
        <HomePage />
        {!standalone && deferredPrompt && (
          <button
            onClick={handleInstallClick}
            className="bg-indigo-600 text-white py-2 px-4 mt-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            Install PWA
          </button>
        )}
      </div>
    </div>
  );
}
