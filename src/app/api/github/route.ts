import { NextResponse } from "next/server";
import { GITHUB_USERNAME } from "@/data/github";

export const revalidate = 300;

interface GitHubEvent {
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    commits?: { message: string }[];
    size?: number;
  };
}

export interface CommitActivity {
  repo: string;
  message: string;
  date: string;
  count: number;
  repoUrl: string;
}

export async function GET() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "portfolio-grs",
        },
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Falha ao buscar dados do GitHub" },
        { status: res.status }
      );
    }

    const events: GitHubEvent[] = await res.json();

    const commits: CommitActivity[] = events
      .filter((e) => e.type === "PushEvent")
      .slice(0, 6)
      .map((e) => ({
        repo: e.repo.name,
        message:
          e.payload.commits?.[0]?.message ?? "sem mensagem de commit",
        date: e.created_at,
        count: e.payload.size ?? 1,
        repoUrl: `https://github.com/${e.repo.name}`,
      }));

    return NextResponse.json(commits);
  } catch {
    return NextResponse.json(
      { error: "Erro ao conectar com GitHub API" },
      { status: 500 }
    );
  }
}
