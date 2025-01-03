"use client";
import { exportToPdf, formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import type { Post } from "@ts-ghost/content-api";
import { useState } from "react";
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
              {html && (
                <div
                  className=""
                  dangerouslySetInnerHTML={{ __html: html }}
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
