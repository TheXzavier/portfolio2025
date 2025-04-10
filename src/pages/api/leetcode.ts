import { NextApiRequest, NextApiResponse } from "next";
import { GraphQLClient, gql } from "graphql-request";

const endpoint = "https://leetcode.com/graphql";
const graphQLClient = new GraphQLClient(endpoint);

// Define GraphQL Query for Problems Solved
const PROBLEMS_SOLVED_QUERY = gql`
  query userSessionProgress($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
        totalSubmissionNum {
          difficulty
          count
          submissions
        }
      }
    }
  }
`;

// Define GraphQL Query for Contest Ranking
const CONTEST_RANKING_QUERY = gql`
  query userContestRankingInfo($username: String!) {
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage
      badge {
        name
      }
    }
    userContestRankingHistory(username: $username) {
      attended
      trendDirection
      problemsSolved
      totalProblems
      finishTimeInSeconds
      rating
      ranking
      contest {
        title
        startTime
      }
    }
  }
`;

// Define GraphQL Query for Submission Calendar
const SUBMISSION_CALENDAR_QUERY = gql`
  query userProfileCalendar($username: String!) {
    matchedUser(username: $username) {
      userCalendar {
        activeYears
        streak
        totalActiveDays
        dccBadges {
          timestamp
          badge {
            name
            icon
          }
        }
        submissionCalendar
      }
    }
  }
`;



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Only GET requests are allowed" });
  }

  try {
    const { username } = req.query; // Get username from query params

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    // Fetch Problems Solved Data
    const problemsData = await graphQLClient.request(PROBLEMS_SOLVED_QUERY, {
      username,
    });

    // Fetch Contest Ranking Data
    const contestData = await graphQLClient.request(CONTEST_RANKING_QUERY, {
      username,
    });

    const submissionCalendarData = await graphQLClient.request(
      SUBMISSION_CALENDAR_QUERY,
      {
        username,
      }
    );


  // Combine and return all datasets
  res.status(200).json({
    problemsData,
    contestData,
    submissionCalendarData,
  });
} catch (error) {
  console.error("Error fetching LeetCode data:", error);
  res.status(500).json({ error: "Failed to fetch data from LeetCode" });
}
}