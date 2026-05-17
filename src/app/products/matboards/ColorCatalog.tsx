"use client";

import { useMemo, useState } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";

export type ColorCard = {
  name?: string;
  code?: string;
  hex?: string;
  gradient?: string;
  image?: string;
  size?: string;
  ply?: string;
  tags?: string;
  description?: string;
};

export type ColorCatalogLabels = {
  filterTitle?: string;
  mobileFilterLabel?: string;
  searchPlaceholder?: string;
  sizeFilterLabel?: string;
  plyFilterLabel?: string;
  tagFilterLabel?: string;
  emptyText?: string;
  clearLabel?: string;
};

function splitTags(raw?: string): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function uniqueValues(items: ColorCard[], key: "size" | "ply"): string[] {
  const set = new Set<string>();
  items.forEach((it) => {
    const v = it[key];
    if (v && v.trim()) set.add(v.trim());
  });
  return [...set].sort();
}

function uniqueTags(items: ColorCard[]): string[] {
  const set = new Set<string>();
  items.forEach((it) => {
    splitTags(it.tags).forEach((t) => set.add(t));
  });
  return [...set].sort();
}

export function ColorCatalog({
  colors,
  idPrefix,
  labels = {},
}: {
  colors: ColorCard[];
  idPrefix: string;
  labels?: ColorCatalogLabels;
}) {
  const sizes = useMemo(() => uniqueValues(colors, "size"), [colors]);
  const plies = useMemo(() => uniqueValues(colors, "ply"), [colors]);
  const tags = useMemo(() => uniqueTags(colors), [colors]);

  const [query, setQuery] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(new Set());
  const [selectedPlies, setSelectedPlies] = useState<Set<string>>(new Set());
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const rawQ = query.trim().toLowerCase();
    // Strip leading '#' so "#101" and "101" behave the same.
    const q = rawQ.replace(/^#/, "");

    return colors.filter((c) => {
      if (selectedSizes.size > 0 && !(c.size && selectedSizes.has(c.size))) {
        return false;
      }
      if (selectedPlies.size > 0 && !(c.ply && selectedPlies.has(c.ply))) {
        return false;
      }
      if (selectedTags.size > 0) {
        const cardTags = new Set(splitTags(c.tags));
        let hit = false;
        selectedTags.forEach((t) => {
          if (cardTags.has(t)) hit = true;
        });
        if (!hit) return false;
      }
      if (q) {
        const name = (c.name || "").toLowerCase();
        const code = (c.code || "").toLowerCase().replace(/^#/, "");
        const tagList = splitTags(c.tags).map((t) => t.toLowerCase());
        const tagBlob = tagList.join(" ");

        // Tokenize the query so multi-word searches like "true blue" work.
        const queryTokens = q.split(/\s+/).filter(Boolean);

        // A card matches when the whole query is a substring of name/code/tags
        // OR when every query token starts a word in the name (handles "true blue").
        const nameWords = name.split(/\s+/);
        const everyTokenHitsName = queryTokens.every((qt) =>
          nameWords.some((nw) => nw.startsWith(qt))
        );

        const matches =
          name.includes(q) ||
          everyTokenHitsName ||
          code.startsWith(q) ||
          code.includes(q) ||
          tagBlob.includes(q);

        if (!matches) return false;
      }
      return true;
    });
  }, [colors, query, selectedSizes, selectedPlies, selectedTags]);

  function toggle(set: Set<string>, v: string, setter: (s: Set<string>) => void) {
    const next = new Set(set);
    if (next.has(v)) next.delete(v);
    else next.add(v);
    setter(next);
  }

  function clearAll() {
    setQuery("");
    setSelectedSizes(new Set());
    setSelectedPlies(new Set());
    setSelectedTags(new Set());
  }

  const activeCount =
    (query ? 1 : 0) +
    selectedSizes.size +
    selectedPlies.size +
    selectedTags.size;

  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-8">
      {/* Mobile filter toggle */}
      <button
        type="button"
        onClick={() => setFiltersOpen((v) => !v)}
        className="lg:hidden inline-flex items-center justify-between w-full px-4 py-3 bg-warm-white border border-border rounded-md text-sm font-medium text-charcoal"
      >
        <span className="inline-flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          {labels.mobileFilterLabel || "Filters"}
          {activeCount > 0 && (
            <span className="ml-1 inline-flex items-center justify-center bg-accent text-white text-[10px] font-semibold rounded-full px-1.5 min-w-[18px] h-[18px]">
              {activeCount}
            </span>
          )}
        </span>
        <span className="text-xs text-muted">
          {filtered.length} / {colors.length}
        </span>
      </button>

      {/* Filters */}
      <aside
        className={`${filtersOpen ? "block" : "hidden"} lg:block lg:sticky lg:top-28 self-start`}
      >
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-charcoal">
              {labels.filterTitle || "Filter colors"}
            </h3>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="text-xs text-accent hover:text-accent-dark inline-flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                {labels.clearLabel || "Clear"}
              </button>
            )}
          </div>

          <div className="relative mb-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
            <input
              id={`${idPrefix}-search`}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={labels.searchPlaceholder || "Search by name or code..."}
              className="w-full pl-9 pr-3 py-2 text-sm bg-warm-white border border-border rounded-md text-charcoal placeholder:text-muted focus:outline-none focus:border-accent"
            />
          </div>

          {sizes.length > 0 && (
            <FacetGroup
              title={labels.sizeFilterLabel || "Sheet Size"}
              values={sizes}
              selected={selectedSizes}
              onToggle={(v) => toggle(selectedSizes, v, setSelectedSizes)}
            />
          )}
          {plies.length > 0 && (
            <FacetGroup
              title={labels.plyFilterLabel || "Ply / Caliper"}
              values={plies}
              selected={selectedPlies}
              onToggle={(v) => toggle(selectedPlies, v, setSelectedPlies)}
            />
          )}
          {tags.length > 0 && (
            <FacetGroup
              title={labels.tagFilterLabel || "Badges"}
              values={tags}
              selected={selectedTags}
              onToggle={(v) => toggle(selectedTags, v, setSelectedTags)}
            />
          )}

          <p className="text-xs text-muted pt-3 border-t border-border">
            Showing <span className="font-semibold text-charcoal">{filtered.length}</span>{" "}
            of {colors.length}
          </p>
        </div>
      </aside>

      {/* Cards */}
      <div>
        {filtered.length === 0 ? (
          <div className="bg-warm-white border border-border rounded-xl p-12 text-center">
            <p className="text-sm text-muted mb-3">
              {labels.emptyText || "No colors match the current filters."}
            </p>
            <button
              onClick={clearAll}
              className="text-sm font-semibold text-accent hover:text-accent-dark"
            >
              {labels.clearLabel || "Clear filters"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((color, i) => (
              <div key={`${color.code || color.name || i}`} className="group h-full">
                <div className="h-full min-h-[320px] flex bg-surface rounded-xl overflow-hidden border border-border hover:border-accent/40 hover:shadow-lg transition-[transform,box-shadow,border-color] duration-300">
                  {color.image ? (
                    <div className="w-32 sm:w-36 shrink-0 border-r border-border overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={color.image}
                        alt={color.name || "Color swatch"}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div
                      className="w-32 sm:w-36 shrink-0 border-r border-border"
                      style={{ background: color.gradient || color.hex || "#E5E5E5" }}
                      aria-label={color.name || "Color swatch"}
                    />
                  )}
                  <div className="flex-1 min-w-0 p-5 sm:p-6 flex flex-col">
                    <div className="flex items-baseline justify-between gap-2 mb-2">
                      <h4 className="font-serif font-semibold text-charcoal text-lg truncate">
                        {color.name || "Untitled"}
                      </h4>
                      {color.code && (
                        <span className="text-[11px] font-mono text-accent shrink-0">
                          {color.code}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {color.size && (
                        <span className="inline-flex items-center text-[10px] font-medium uppercase tracking-wider text-charcoal bg-warm-white border border-border rounded-full px-2 py-0.5">
                          {color.size}
                        </span>
                      )}
                      {color.ply && (
                        <span className="inline-flex items-center text-[10px] font-medium uppercase tracking-wider text-charcoal bg-warm-white border border-border rounded-full px-2 py-0.5">
                          {color.ply}
                        </span>
                      )}
                      {splitTags(color.tags).map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center text-[10px] font-medium uppercase tracking-wider text-charcoal bg-warm-white border border-border rounded-full px-2 py-0.5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {color.description && (
                      <p className="text-sm text-muted leading-relaxed">
                        {color.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FacetGroup({
  title,
  values,
  selected,
  onToggle,
}: {
  title: string;
  values: string[];
  selected: Set<string>;
  onToggle: (v: string) => void;
}) {
  return (
    <div className="mb-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted mb-2">
        {title}
      </p>
      <div className="space-y-1.5">
        {values.map((v) => {
          const checked = selected.has(v);
          return (
            <label
              key={v}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(v)}
                className="w-3.5 h-3.5 rounded border-border accent-accent cursor-pointer"
              />
              <span
                className={`text-xs ${
                  checked ? "text-charcoal font-medium" : "text-slate-dark"
                } group-hover:text-charcoal`}
              >
                {v}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
