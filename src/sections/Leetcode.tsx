"use client";
import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Line,
} from "recharts";
// @ts-ignore
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

export const LeetCodeSection = () => {
  const [data, setData] = useState<any>(null);
  const [hoveredContest, setHoveredContest] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/leetcode?username=TheXzavier`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-40">Loading...</div>
    );
  }

  const { problemsData, contestData, submissionCalendarData } = data;

  // Problems Solved Calculations
  const calculateTotalSolved = () => {
    if (
      !problemsData ||
      !problemsData.matchedUser?.submitStats?.acSubmissionNum
    )
      return 0;
    const allSolved = problemsData.matchedUser.submitStats.acSubmissionNum.find(
      (item: any) => item.difficulty === "All"
    );
    return allSolved ? allSolved.count : 0;
  };

  const calculateTotalQuestions = () => {
    if (!problemsData || !problemsData.allQuestionsCount) return 0;
    const allQuestions = problemsData.allQuestionsCount.find(
      (item: any) => item.difficulty === "All"
    );
    return allQuestions ? allQuestions.count : 0;
  };

  const totalSolved = calculateTotalSolved();
  const totalQuestions = calculateTotalQuestions();
  const percentage = Math.round((totalSolved / totalQuestions) * 100);

  const contestHistory = contestData.userContestRankingHistory
    .filter((contest: any) => contest.attended)
    .map((contest: any) => ({
      name: new Date(contest.contest.startTime * 1000).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      ),
      rating: contest.rating.toFixed(2),
      problemsSolved: contest.problemsSolved,
      totalProblems: contest.totalProblems,
      ranking: contest.ranking,
    }));

  const latestContest =
    contestHistory.length > 0
      ? contestHistory[contestHistory.length - 1]
      : null;

  // Parse and Filter Submission Calendar
  const parseSubmissionCalendar = () => {
    const submissionCalendar =
      submissionCalendarData?.matchedUser?.userCalendar?.submissionCalendar;
    if (!submissionCalendar) return [];

    // Parse and filter the submission calendar
    const parsedData = Object.entries(JSON.parse(submissionCalendar))
      .filter(([timestamp, count]) => (count as number) > 0) // Exclude days with 0 submissions
      .map(([timestamp, count]) => {
        try {
          const date = new Date(parseInt(timestamp, 10) * 1000)
            .toISOString()
            .split("T")[0];
          return { date, count: count as number };
        } catch (error) {
          console.error("Invalid timestamp:", timestamp);
          return null;
        }
      })
      .filter(
        (entry): entry is { date: string; count: number } => entry !== null
      );

    // Calculate date range (last 12 months)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - 12);

    // Filter data to the last 12 months
    return parsedData.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= startDate && entryDate <= endDate;
    });
  };

  const submissionHeatmapData = parseSubmissionCalendar();

  // Calculate Date Range for Last 12 Months
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(endDate.getMonth() - 12);

  return (
    <div id="Leetcode" className="py-20 lg:py-28">
      <div className="container">
        <SectionHeader
          title="Look At My Coding Progress"
          eyebrow="Leetcode"
          description=""
        />
        <div className="mt-10 md:mt-20 flex flex-col gap-20">
          <Card className="px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:pt-16 lg:px-20">
            <div className="flex lg:flex-row sm:flex-col gap-20">
              <div className="flex sm:gap-10 lg:gap-20 items-center justify-center">
              {/* Left Side: Circular Progress Bar */}
              <div className="flex flex-col items-center">
                <div style={{ width: "150px", height: "150px" }}>
                  <CircularProgressbar
                    value={percentage}
                    text={`${totalSolved}/${totalQuestions}`}
                    styles={buildStyles({
                      rotation: 0,
                      strokeLinecap: "round",
                      textSize: "16px",
                      pathColor: "#3d9aff",
                      trailColor: "#d6d6da",
                      textColor: "#fff",
                    })}
                  />
                </div>
                <h3 className="text-md font-bold text-center mt-2">Solved</h3>
              </div>
              

              {/* Right Side: Difficulty Statistics */}
              <div className="flex flex-col gap-2">
                {problemsData &&
                  problemsData.allQuestionsCount.map((item: any) => {
                    if (item.difficulty === "All") return null;
                    return (
                      <div
                        key={item.difficulty}
                        style={{
                          padding: "4px 8px",
                          borderRadius: "5px",
                          transition: "transform 0.2s, box-shadow 0.2s",
                        }}
                        className="text-center text-xs cursor-pointer bg-gradient-to-r from-emerald-300 to-sky-400"
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "scale(1.05)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      >
                        <span style={{ color: "black" }}>
                          {item.difficulty}
                        </span>
                        <br />
                        <span style={{ color: "black" }}>
                          {problemsData.matchedUser.submitStats.acSubmissionNum.find(
                            (x: any) => x.difficulty === item.difficulty
                          )?.count || 0}
                          /{item.count}
                        </span>
                      </div>
                    );
                  })}
              </div>
              </div>

              {/* Contest Details + Line Chart */}
              <div className="flex flex-col flex-grow gap-4">
                <div className="flex flex-row lg:gap-6 md:gap-6 sm:gap-2 text-sm justify-center pb-2">
                  {/* Date */}
                  <div className="flex flex-col items-center">
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="font-semibold">
                      {hoveredContest?.name ||
                        latestContest?.name ||
                        "No contests"}
                    </p>
                  </div>
                  {/* Rating */}
                  <div className="flex flex-col items-center">
                    <p className="text-xs text-gray-500">Rating</p>
                    <p className="font-semibold">
                      {hoveredContest?.rating || latestContest?.rating || "N/A"}
                    </p>
                  </div>
                  {/* Solved */}
                  <div className="flex flex-col items-center">
                    <p className="text-xs text-gray-500">Solved</p>
                    <p className="font-semibold">
                      {hoveredContest
                        ? `${hoveredContest.problemsSolved}/${hoveredContest.totalProblems}`
                        : latestContest
                        ? `${latestContest.problemsSolved}/${latestContest.totalProblems}`
                        : "N/A"}
                    </p>
                  </div>
                  {/* Rank */}
                  <div className="flex flex-col items-center">
                    <p className="text-xs text-gray-500">Rank</p>
                    <p className="font-semibold">
                      {hoveredContest?.ranking ||
                        latestContest?.ranking ||
                        "N/A"}
                    </p>
                  </div>
                </div>

                {/* Line Chart */}
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={contestHistory}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                      onMouseMove={(state) => {
                        if (
                          state.activePayload &&
                          state.activePayload.length > 0
                        ) {
                          setHoveredContest(state.activePayload[0].payload);
                        }
                      }}
                      onMouseLeave={() => setHoveredContest(null)}
                    >
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 12, fill: "#666" }}
                      />
                      <YAxis tick={{ fontSize: 12, fill: "#666" }} />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                        labelStyle={{ fontWeight: "bold", color: "#333" }}
                        itemStyle={{ color: "#3d9aff" }}
                      />
                      <Legend wrapperStyle={{ fontSize: 14, color: "#333" }} />
                      <defs>
                        <linearGradient
                          id="colorRating"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#3d9aff"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#3d9aff"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <Line
                        type="monotone"
                        dataKey="rating"
                        stroke="#3d9aff"
                        strokeWidth={2}
                        dot={{
                          r: 5,
                          fill: "#fff",
                          stroke: "#3d9aff",
                          strokeWidth: 2,
                        }}
                        activeDot={{ r: 8 }}
                      />
                      <Area
                        type="monotone"
                        dataKey="rating"
                        stroke="#3d9aff"
                        fill="url(#colorRating)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Submission Calendar */}
            <div className="mt-6 sm:hidden lg:block md:block">
              {/* Centered Title */}
              <h3 className="text-lg font-bold text-center mb-4 sm:text-sm md:text-2xl">
                Submission Calendar
              </h3>
              {/* Heatmap Container */}
              <div className="w-full overflow-x-auto">
                <CalendarHeatmap
                  startDate={startDate} // Start of the last 12 months
                  endDate={endDate} // Today's date
                  values={submissionHeatmapData}
                  classForValue={(value: { count: number } | null) => {
                    if (!value) return "color-empty";
                    return `color-scale-${Math.min(value.count, 4)}`;
                  }}
                  tooltipDataAttrs={(value: { date: string; count: number } | null) => {
                    return value && value.count > 0
                      ? {
                          "data-tooltip-id": "heatmap-tooltip",
                          "data-tooltip-content": `${value.count} submissions on ${value.date}`,
                        }
                      : {};
                  }}
                  gutterSize={3} // Add spacing between squares
                  showMonthLabels={true} // Show month labels
                />
                {/* ReactTooltip Provider */}
                <ReactTooltip
                  id="heatmap-tooltip"
                  variant="dark"
                  style={{
                    backgroundColor: "#333",
                    color: "#fff",
                    border: "1px solid #555"
                  }}
                />
              </div>
              {/* Padding Below Heatmap */}
              <div className="pb-6 sm:pb-8 md:pb-10"></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
