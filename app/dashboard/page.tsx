"use client";

// app/dashboard/page.tsx
import React, { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Roboto } from 'next/font/google';
import { DarkModeSwitch } from "react-toggle-dark-mode";
import Image from "next/image";
import { IoNotifications } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { FiSearch } from "react-icons/fi";

const roboto = Roboto({ subsets: ['latin'], weight: '400' });

const data = [
  { name: "Jan", questions: 100, time: 800, success: 100 },
  { name: "Feb", questions: 150, time: 700, success: 150 },
  { name: "Mar", questions: 180, time: 900, success: 200 },
  { name: "Apr", questions: 170, time: 600, success: 180 },
  { name: "May", questions: 220, time: 1000, success: 240 },
  { name: "Jun", questions: 280, time: 500, success: 300 },
];

const COLORS = ["#003366", "#003366cc", "#66cccc", "#ff9999", "#99e6e6", "#c2c2f0"];

export default function DashboardPage() {

  const [isDark, setIsDark] = useState(false);
  const toggleDarkMode = (checked: boolean) => {
    document.documentElement.classList.toggle('dark');
    setIsDark(checked);
  };
  return (
    <div className="flex flex-col h-full w-full">
      <div className="px-4 py-7 lg:py-3.5 border-b-2 border-border flex justify-start items-center gap-3.5 overflow-hidden bg-[#174fa3]">
        {/* Logo & Title */}
        <div className="flex flex-col justify-center items-start gap-1">
          <div className="flex justify-center items-center gap-2.5">
            <a className="block text-blue-600" href="/">
              <span className="sr-only">Home</span>
              <Image
                src="/aitutor.png"
                alt="banner"
                width={40}
                height={40}
                className="h-10 sm:h-10 w-auto rounded-full"
              />
            </a>
            <div className="text-white text-base font-normal font-mono lg:text-xl">
              Ai Tutor
            </div>
          </div>
        </div>
        <div className="flex-2" />
        {/* Search bar */}
        <div className="relative w-full max-w-[100px] sm:max-w-xs lg:max-w-lg mx-4">
          <span className="absolute inset-y-0 left-3 flex items-center text-white">
            <FiSearch size={18} />
          </span>
          <input
            type="text"
            placeholder="Search…"
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white/20 border border-transparent focus:bg-white/30 focus:border-white/60 focus:outline-none transition text-sm text-white placeholder-white/80 shadow-inner"
          />
        </div>
        {/* Icons */}
        <div className="flex justify-start items-center gap-5">
          <DarkModeSwitch
            checked={isDark}
            onChange={toggleDarkMode}
            size={24}
          />
          <IoNotifications size={24} className="cursor-pointer text-white" />
          <RxAvatar size={26} className="cursor-pointer text-white" />
        </div>
      </div>
      <div className="flex grid grid-cols-1 md:grid-cols-6 gap-4 p-5 w-full">
        {/* Line Chart */}
        <div className="bg-white rounded-2xl shadow-2xl p-4 h-72 md:h-96 flex flex-col md:col-span-4">
          <div className="text-xl md:text-2xl  text-[#174fa3] font-bold mb-2">
            Total Questions Answered
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Line type="monotone" dataKey="questions" stroke="#174fa3" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Stat Cards */}
        <div className="flex flex-col gap-4 w-full md:col-span-2">
          <div className="bg-blue-100 rounded-2xl p-4 flex-1 w-full shadow-2xl">
            <div>
              <div className="text-xl md:text-2xl  text-[#174fa3] font-bold mb-2">
                Total Questions Answered
              </div>
            </div>
            <div className="text-4xl md:text-6xl font-normal text-black">
              1,2000
            </div>
            <div className="text-xl md:text-2xl text-base font-normal text-gray-500">
              Questions
            </div>
          </div>
          <div className="bg-green-100 rounded-2xl p-4 flex-1 w-full shadow-2xl">
            <div>
              <div className="text-xl md:text-2xl  text-[#174fa3] font-bold mb-2">
                Total Time Spent
              </div>
            </div>
            <div className="text-4xl md:text-6xl font-normal text-black">
              6,000
            </div>
            <div className="text-xl md:text-2xltext-base font-normal text-gray-500">
              Hours
            </div>
          </div>
        </div>
        {/* Pie Chart */}
        <div className="h-72 md:h-96 bg-white rounded-2xl shadow-2xl p-4 flex flex-col md:col-span-3">
          <div className="text-xl md:text-2xl  text-[#174fa3] font-bold mb-2">
            Total Time Spent
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="time"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                // outerRadius={50}
                fill="#003366"
                label
              >
                {data.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Bar Chart */}
        <div className="h-72 md:h-96 bg-white rounded-2xl shadow-2xl p-4 flex flex-col md:col-span-3">
          <div className="text-xl md:text-2xl  text-[#174fa3] font-bold mb-2">
            Student Success Rate
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="success" fill="#174fa3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}