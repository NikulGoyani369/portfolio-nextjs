import { MetadataRoute } from 'next';
import { blogPosts } from '../data/blog';
import { featuredProject, projects } from '../data/projects';

const BASE = 'https://nikulgoyani.de';

export default function sitemap(): MetadataRoute.Sitemap {
  const allProjects = [featuredProject, ...projects];

  const projectUrls = allProjects.map((p) => ({
    url: `${BASE}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogUrls = blogPosts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...projectUrls,
    ...blogUrls,
  ] as MetadataRoute.Sitemap;
}