import Link from "next/link";
import { CMS_SCHEMA } from "@/lib/cms";
import { ChevronRight, FileText } from "lucide-react";

export default function CmsIndex() {
  return (
    <div className="px-8 py-8 max-w-5xl">
      <header className="mb-8 pb-6 border-b border-slate-200">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-400 mb-1">
          Site Content
        </p>
        <h1 className="text-2xl font-semibold text-[#1A1A2E] tracking-tight">
          Content Management
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Edit text, images, and calls-to-action across every page of the site.
        </p>
      </header>

      <div className="space-y-5">
        {Object.entries(CMS_SCHEMA).map(([pageKey, page]) => (
          <div
            key={pageKey}
            className="bg-white border border-slate-200 rounded-lg overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-[#1A1A2E]/5 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[#1A1A2E]" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-[#1A1A2E]">
                    {page.label}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {Object.keys(page.sections).length} section
                    {Object.keys(page.sections).length === 1 ? "" : "s"}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-x divide-y divide-slate-100">
              {Object.entries(page.sections).map(([secKey, sec]) => (
                <Link
                  key={secKey}
                  href={`/admin/cms/${pageKey}/${secKey}`}
                  className="group flex items-center justify-between px-5 py-3.5 hover:bg-slate-50/80 transition-colors"
                >
                  <span className="text-sm text-slate-700 group-hover:text-[#1A1A2E]">
                    {sec.label}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#C41E3A] group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
