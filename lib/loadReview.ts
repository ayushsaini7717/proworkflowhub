import fs from "fs";
import path from "path";
import matter from "gray-matter";

const reviewsDirectory = path.join(
  process.cwd(),
  "src/content/reviews"
);

export function loadReviewBySlug(slug: string) {
  const fullPath = path.join(reviewsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);

  return {
    content,
    meta: data,
  };
}
