import Blog from "@/components/blog-page/Blog";
import BlogLayout from "@/components/blog-page/BlogLayout";
import { getBlogBySlug } from "@/lib/blog";
import { updateGalleryRowAspectRatio } from "@/lib/utils";
import type { Post } from "@ts-ghost/content-api";
import { notFound } from "next/navigation";

export default async function BlogPage({
  params,
  searchParams
}: {
  params: {
    slug: string;
  };
  searchParams: { windowWidth: string | undefined }
}) {
  const { slug } = params;
  let blog: Post | null = await getBlogBySlug(slug.toString());
  if (!blog) {
    return notFound();
  }

  // [Explain] Thay đổi link ảnh có trong nội dung post từ localhost sang domain của mình vì thực tế ghostcms đang được host trên local và public bằng cloudflare tunnel
  const formatedHtml = `<div class='space-y-4 w-full'>${blog.html}</div>`.replaceAll(
    "http://localhost:8080",
    "https://ghost.kienttt.site"
  );

  // Chuyển windowWidth thành số, nếu thất baị thì mặc định là 1920
  const windowWidthNumber = parseInt(searchParams.windowWidth || "1920");

  const updateStyleOfGallery = updateGalleryRowAspectRatio(formatedHtml, windowWidthNumber);

  blog = {
    ...blog,
    html: updateStyleOfGallery || formatedHtml,
  }


  return (
    <BlogLayout>
      <Blog blog={blog} />
    </BlogLayout>
  );
}
