"use client";
import { exportToPdf, formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import type { Post } from "@ts-ghost/content-api";
import { useEffect, useState } from "react";
import LoadingText from "../LoadingText";

const Blog = ({ blog }: { blog: Post }) => {
  const route = useRouter();
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const { title, slug, primary_author, html, published_at } = blog;

  const {
    value: dateValue,
    title: dateTitle,
    datetime,
  } = formatDate(published_at) || {};

  // [Explain] Thay đổi link ảnh có trong nội dung post từ localhost sang domain của mình vì thực tế ghostcms đang được host trên local và public bằng cloudflare tunnel
  const formatedHtml = `<div class='space-y-4 w-full'>${html}</div>`.replaceAll(
    "http://localhost:8080",
    "https://ghost.kienttt.site"
  );

  const handleExportToPdf = async () => {
    setIsPdfLoading(true);
    setPdfError(null);

    await exportToPdf(document, slug)
      .then((errorMes) => {
        setPdfError(errorMes);
      })
      .catch((error) => {
        setPdfError(error.message);
      })
      .finally(() => {
        setIsPdfLoading(false);
      });
  };

  /**
   * Thêm style aspect-ratio cho .kg-gallery-row để giữ nguyên tỉ lệ hình ảnh trong gallery
   * @param document Document của trang
   * @returns
   */
  function updateGalleryRowAspectRatio(document: Document) {
    // Lấy tất cả các thẻ .kg-gallery-row
    const galleryRows: NodeListOf<HTMLElement> =
      document.querySelectorAll(".kg-gallery-row");
    if (!galleryRows) return;

    // Hàm để tính toán chiều cao nhỏ nhất của các hình ảnh
    function calculateMinHeight(images: NodeListOf<HTMLImageElement>) {
      let minHeight = Number.MAX_SAFE_INTEGER;
      images.forEach((image) => {
        minHeight = Math.min(minHeight, image.naturalHeight);
      });
      return minHeight;
    }

    // Thiết lập chiều cao cho từng .kg-gallery-row
    galleryRows.forEach((row) => {
      const images = row.querySelectorAll("img");
      if (!images) return;

      // Tính chiều cao nhỏ nhất của các hình ảnh trong .kg-gallery-row
      const minHeight = calculateMinHeight(images);

      // Tính tổng chiều dài của các hình ảnh trong .kg-gallery-row khi nhân chiều cao nhỏ nhất với tỷ lệ của ảnh
      let totalWidth = 0;
      images.forEach((image) => {
        // Tính tỷ lệ của ảnh
        const imgAspectRatio: number = image.naturalWidth / image.naturalHeight;
        totalWidth += minHeight * imgAspectRatio;
      });

      // Thiết lập aspect-ratio cho .kg-gallery-row
      row.style.aspectRatio = `${totalWidth / minHeight}`;
    });
  }

  useEffect(() => {
    updateGalleryRowAspectRatio(document);
  }, [isPdfLoading]);

  return (
    <>
      {/* Thẻ main là bài blog + phần comment */}
      <main className="pt-8 pb-16 lg:pt-24 lg:pb-24 text-white antialiased font-gotham-book">
        <div className="flex flex-col justify-between px-4 mx-auto max-w-screen-xl">
          {/* Style padding `p-1` của thẻ <article> dùng để tránh lỗi nội dung chữ của pdf bị cắt xén. */}
          <div className="mx-auto w-full max-w-2xl lg:format-lg space-y-4 pb-1">
            {/* Back button */}
            {/* Prop data-html2canvas-ignore dùng để tránh thẻ đó bị xuất thành pdf */}
            {/* Lưu ý: không nên dùng data-html2canvas-ignore vì làm cho pagebreak đặt không đúng chỗ */}
            <div className="mb-4">
              <button
                type="button"
                className="flex items-center p-2 text-white bg-green hover:underline"
                onClick={() => route.back()}
              >
                Back
              </button>
            </div>
            <article id="blog">
              <header className="mb-4 lg:mb-6">
                {/* Tựa bài blog */}
                <h1 className="mb-4 text-3xl font-extrabold leading-tight lg:mb-6 font-conthrax-bold">
                  {title.toUpperCase()}
                </h1>
                <p id="author">
                  <i>
                    By{" "}
                    <b>{primary_author ? primary_author.name : "Anonymous"}</b>
                  </i>{" "}
                  on{" "}
                  <time dateTime={datetime} title={dateTitle}>
                    {dateValue}
                  </time>
                </p>
              </header>
              {/* Nội dung bài blog */}
              {/* [Explain] Để áp dụng style cho các thẻ html trong nội dung bài viết thì cần khai báo style ở global.css, nhưng nếu làm vậy các style ở tất cả các trang khác sẽ bị ảnh hưởng. 
            Vì thế chưa có cách nào khác để áp dụng style cho nội dung bài viết*/}
              {formatedHtml && (
                <div
                  className=""
                  dangerouslySetInnerHTML={{ __html: formatedHtml }}
                ></div>
              )}
            </article>
            {/* Export to PDF button */}
            <section>
              <div className="mt-8">
                <button
                  disabled={isPdfLoading}
                  type="button"
                  className={
                    `flex items-center justify-center p-2 text-white bg-green hover:underline w-36 ` +
                    (isPdfLoading
                      ? "pointer-events-none hover:no-underline opacity-80"
                      : "")
                  }
                  onClick={() => handleExportToPdf()}
                >
                  {!isPdfLoading ? "Export to PDF" : <LoadingText />}
                </button>
                {pdfError && <p className="text-red-500 mt-4">{pdfError}</p>}
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default Blog;
