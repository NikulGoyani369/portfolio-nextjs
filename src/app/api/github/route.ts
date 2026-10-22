export const revalidate = 3600;
export const runtime = 'nodejs';

const USERNAME = 'NikulGoyani369';

interface Repo {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
}

const respond = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export async function GET() {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, { headers }),
      fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`, { headers }),
    ]);

    const [user, repos] = await Promise.all([userRes.json(), reposRes.json()]);

    if (!userRes.ok) {
      return respond({ error: true, detail: user?.message ?? 'GitHub user fetch failed' }, 502);
    }
    if (!reposRes.ok || !Array.isArray(repos)) {
      return respond({ error: true, detail: repos?.message ?? 'GitHub repos fetch failed' }, 502);
    }

    const safeRepos: Repo[] = repos;
    const totalStars = safeRepos.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0);

    const langCounts: Record<string, number> = {};
    safeRepos.forEach((r) => {
      if (r.language) langCounts[r.language] = (langCounts[r.language] ?? 0) + 1;
    });

    const topRepos = [...safeRepos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 3)
      .map((r) => ({
        name: r.name,
        description: r.description,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
        url: r.html_url,
      }));

    return respond({
      publicRepos: user.public_repos ?? 0,
      followers: user.followers ?? 0,
      totalStars,
      langCounts,
      topRepos,
    });
  } catch (err) {
    return respond({ error: true, detail: String(err) }, 500);
  }
}