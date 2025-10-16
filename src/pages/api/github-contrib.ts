import type { APIRoute } from "astro";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

type ContributionDay = {
  date: string;
  contributionCount: number;
  color: string;
};

type ContributionCalendar = {
  totalContributions: number;
  weeks: { contributionDays: ContributionDay[] }[];
};

type GitHubResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: ContributionCalendar;
      };
    };
  };
  errors?: unknown;
};

export const GET: APIRoute = async ({ url }) => {
  const userName = url.searchParams.get("username") ?? "tarabakz25";

  const token = import.meta.env.GITHUB_TOKEN;
  if (!token) {
    return new Response("GitHub token is not set", { status: 500 });
  }

  const now = new Date();
  const yearAgo = new Date(now);
  yearAgo.setFullYear(now.getFullYear() - 1);

  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        login: userName,
        from: yearAgo.toISOString(),
        to: now.toISOString(),
      },
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    return new Response(errorBody || "Failed to fetch data from GitHub", {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = (await res.json()) as GitHubResponse;

  if (data.errors) {
    return new Response(JSON.stringify(data.errors), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  const calendar = data.data?.user?.contributionsCollection?.contributionCalendar;

  if (!calendar) {
    return new Response("GitHub user or contributions not found", { status: 404 });
  }

  const days = calendar.weeks.flatMap((week, weekIndex) =>
    week.contributionDays.map((day, dayIndex) => ({
      x: weekIndex,
      y: dayIndex,
      date: day.date,
      count: day.contributionCount,
      color: day.color,
    })),
  );

  const width = calendar.weeks.length;
  const height = days.length ? Math.max(...days.map((d) => d.y)) + 1 : 7;

  return new Response(
    JSON.stringify({
      total: calendar.totalContributions,
      width,
      height,
      days,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
