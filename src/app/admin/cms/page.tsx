import Link from "next/link";
import { CMS_SCHEMA } from "@/lib/cms";
import { ChevronRight } from "lucide-react";

export default function CmsIndex() {
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-serif font-bold mb-2">Content (CMS)</h1>
      <p className="text-white/50 text-sm mb-8">
        Edit text, images, and calls-to-action across the site.
      </p>

      <div className="space-y-4">
        {Object.entries(CMS_SCHEMA).map(([pageKey, page]) => (
          <div
            key={pageKey}
            className="bg-white/[0.04] border border-white/10 rounded-xl p-6"
          >
            <h2 className="font-serif font-semibold text-lg mb-4">
              {page.label}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.entries(page.sections).map(([secKey, sec]) => (
                <Link
                  key={secKey}
                  href={`/admin/cms/${pageKey}/${secKey}`}
                  className="flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 rounded-md text-sm transition-colors"
                >
                  <span>{sec.label}</span>
                  <ChevronRight className="w-4 h-4 text-white/40" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
