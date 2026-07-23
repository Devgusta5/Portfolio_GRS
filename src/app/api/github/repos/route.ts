import { NextResponse } from "next/server";
import { GITHUB_USERNAME } from "@/data/github";

export const revalidate = 300;

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
  archived: boolean;
}

export interface RepoSummary {
  name: string;
  description: string;
  stars: number;
  language: string | null;
  url: string;
}

export async function GET() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`,
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
        { error: "Falha ao buscar repositorios do GitHub" },
        { status: res.status }
      );
    }

    const repos: GitHubRepo[] = await res.json();

    const summary: RepoSummary[] = repos
      .filter((r) => !r.fork && !r.archived)
      .slice(0, 6)
      .map((r) => ({
        name: r.name,
        description: r.description ?? "",
        stars: r.stargazers_count,
        language: r.language,
        url: r.html_url,
      }));

    return NextResponse.json(summary);
  } catch {
    return NextResponse.json(
      { error: "Erro ao conectar com GitHub API" },
      { status: 500 }
    );
  }
}
