import { GitHubContent } from '@/components/github-content';
import { personalInfo } from '@/data/portfolio';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  homepage?: string | null;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
}

async function getCachedRepos(): Promise<GitHubRepo[]> {
  const owner = personalInfo.social.github.split('/').filter(Boolean).pop();

  const githubFilter = (personalInfo as any).githubFilter as
    | { include?: string[]; topic?: string; per_page?: number }
    | undefined;

  const headers: Record<string, string> = {};
  if (process.env.GITHUB_TOKEN) {
    headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  // 1) If user specified explicit repo names, fetch them individually
  if (githubFilter?.include && githubFilter.include.length > 0) {
    try {
      const fetchRepo = async (repoSlug: string) => {
        const full = repoSlug.includes('/') ? repoSlug : `${owner}/${repoSlug}`;
        const res = await fetch(`https://api.github.com/repos/${full}`, {
          headers,
          next: { revalidate: 3600 },
        });
        if (!res.ok) return null;
        return res.json();
      };

      const results = await Promise.all(githubFilter.include.map(fetchRepo));
      return results.filter(Boolean) as GitHubRepo[];
    } catch {
      return [];
    }
  }

  // 2) If a topic filter is configured, use the Search API to get repos by topic
  if (githubFilter?.topic) {
    try {
      const perPage = githubFilter.per_page ?? 6;
      const q = `user:${owner}+topic:${githubFilter.topic}+fork:false`;
      const res = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&sort=updated&per_page=${perPage}`,
        { headers, next: { revalidate: 3600 } },
      );
      if (!res.ok) return [];
      const data = await res.json();
      return data.items || [];
    } catch {
      return [];
    }
  }

  // 3) Fallback: list most recently updated repos (same behavior as before)
  try {
    const res = await fetch(`https://api.github.com/users/${owner}/repos?sort=updated&per_page=6`, {
      headers,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getCachedUser(): Promise<GitHubUser | null> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${personalInfo.social.github.split('/').pop()}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function GitHubSection() {
  const [repos, user] = await Promise.all([getCachedRepos(), getCachedUser()]);

  if (repos.length === 0) return null;

  return <GitHubContent repos={repos} user={user} />;
}
