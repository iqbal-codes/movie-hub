import React from "react";
import { X } from "lucide-react";
import { Genre, SearchParams } from "../../types/movie";
import Button from "../atoms/Button";
import Badge from "../atoms/Badge";
import Dropdown from "../atoms/Dropdown";

interface FilterBarProps {
  genres: Genre[];
  onFilterChange: (filters: SearchParams) => void;
  selectedGenreId?: number;
  selectedYear?: number;
  selectedSortBy?: string;
  selectedMinRating?: number;
  selectedCategory?: SearchParams["category"];
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

const categoryOptions = [
  { value: "popular", label: "Popular" },
  { value: "now_playing", label: "Now Playing" },
  { value: "top_rated", label: "Top Rated" },
  { value: "upcoming", label: "Upcoming" },
];

const sortOptions = [
  { value: "vote_average.desc", label: "Highest Rated" },
  { value: "vote_average.asc", label: "Lowest Rated" },
  { value: "release_date.desc", label: "Newest" },
  { value: "release_date.asc", label: "Oldest" },
];

const ratingOptions = [
  { value: 0, label: "Any Rating" },
  { value: 5, label: "5+ Stars" },
  { value: 6, label: "6+ Stars" },
  { value: 7, label: "7+ Stars" },
  { value: 8, label: "8+ Stars" },
  { value: 9, label: "9+ Stars" },
];

const FilterBar: React.FC<FilterBarProps> = ({
  genres,
  onFilterChange,
  selectedGenreId,
  selectedYear,
  selectedSortBy,
  selectedMinRating = 0,
  selectedCategory = "popular",
}) => {
  const handleFilterChange = (
    key: keyof SearchParams,
    value: SearchParams[keyof SearchParams]
  ) => {
    const currentValue =
      key === "genreId"
        ? selectedGenreId
        : key === "year"
        ? selectedYear
        : key === "sortBy"
        ? selectedSortBy
        : key === "minRating"
        ? selectedMinRating
        : key === "category"
        ? selectedCategory
        : undefined;

    onFilterChange({
      genreId: selectedGenreId,
      year: selectedYear,
      sortBy: selectedSortBy,
      minRating: selectedMinRating,
      category: selectedCategory,
      [key]:
        key === "genreId" || key === "year"
          ? currentValue === value
            ? undefined
            : value
          : value,
    });
  };

  const clearFilters = () => {
    onFilterChange({
      genreId: undefined,
      year: undefined,
      sortBy: undefined,
      minRating: 0,
      category: "popular",
    });
  };

  const selectedGenre = genres.find((g) => g.id === selectedGenreId);

  const genreOptions = [
    { value: undefined, label: "All Genres" },
    ...genres.map((genre) => ({ value: genre.id, label: genre.name })),
  ];

  const yearOptions = [
    { value: undefined, label: "All Years" },
    ...years.map((year) => ({ value: year, label: year.toString() })),
  ];

  const hasActiveFilters =
    selectedGenreId ||
    selectedYear ||
    selectedMinRating > 0 ||
    selectedCategory !== "popular";

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-wrap gap-2">
        <Dropdown
          label="Category"
          value={selectedCategory}
          options={categoryOptions}
          onChange={(value) =>
            handleFilterChange("category", value as SearchParams["category"])
          }
          defaultLabel="All"
        />

        <Dropdown
          label="Genre"
          value={selectedGenreId}
          options={genreOptions}
          onChange={(value) => handleFilterChange("genreId", Number(value))}
          defaultLabel="All"
        />

        <Dropdown
          label="Year"
          value={selectedYear}
          options={yearOptions}
          onChange={(value) => handleFilterChange("year", Number(value))}
          defaultLabel="All"
        />

        <Dropdown
          label="Rating"
          value={selectedMinRating}
          options={ratingOptions}
          onChange={(value) => handleFilterChange("minRating", Number(value))}
          defaultLabel="Any"
        />

        {hasActiveFilters && (
          <Button
            variant="text"
            size="sm"
            onClick={clearFilters}
            startIcon={<X size={16} />}
            className="ml-2"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedCategory !== "popular" && (
            <Badge
              onClick={() => handleFilterChange("category", 'popular')}
            >
              {categoryOptions.find((o) => o.value === selectedCategory)?.label}{" "}
              <X size={14} className="ml-1" />
            </Badge>
          )}

          {selectedGenre && (
            <Badge
              onClick={() => handleFilterChange("genreId", selectedGenre.id)}
            >
              {selectedGenre.name} <X size={14} className="ml-1" />
            </Badge>
          )}

          {selectedYear && (
            <Badge
              onClick={() => handleFilterChange("year", selectedYear)}
            >
              {selectedYear} <X size={14} className="ml-1" />
            </Badge>
          )}

          {selectedSortBy && (
            <Badge
              onClick={() => handleFilterChange("sortBy", selectedSortBy)}
            >
              {sortOptions.find((o) => o.value === selectedSortBy)?.label}{" "}
              <X size={14} className="ml-1" />
            </Badge>
          )}

          {selectedMinRating > 0 && (
            <Badge
              onClick={() => handleFilterChange("minRating", 0)}
            >
              {ratingOptions.find((o) => o.value === selectedMinRating)?.label}{" "}
              <X size={14} className="ml-1" />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
