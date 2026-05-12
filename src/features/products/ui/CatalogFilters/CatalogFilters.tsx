import classes from './CatalogFilters.module.scss';
import { useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import '@/styles/rangeSlider.css';
import useMedia from '@/shared/hooks/useMediaQuery';
import Button from '@/shared/ui/Button/Button';
import type { Brand } from '@/types/brand';
import type { Category } from '@/types/category';

type PriceRange = [number, number];

type CatalogFiltersProps = {
  categories: Category[];
  activeCategories: string[];
  onCategoryToggle: (categorySlug: string) => void;
  brands: Brand[];
  activeBrand: string[];
  onBrandsToggle: (brandSlug: string) => void;
  onPriceChange?: (range: PriceRange) => void;
  onResetFilters: () => void;
};

const CatalogFilters = ({
  categories,
  activeCategories,
  onCategoryToggle,
  brands,
  activeBrand,
  onBrandsToggle,
  onPriceChange,
  onResetFilters,
}: CatalogFiltersProps) => {
  const { isLargeDevice } = useMedia();

  const [priceRange, setPriceRange] = useState<PriceRange>([0, 200]);

  return (
    <div
      className={classes.catalogFilters}
      style={{
        width: isLargeDevice ? '' : '295px',
      }}>
      <div className={classes.filtersSection}>
        <div className={classes.filtersHeader}>
          <p className={classes.filtersTitle}>Filter</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" fill="none">
            <path
              fill="#000"
              fillOpacity=".4"
              d="M13.125 12.125v8.625a1.125 1.125 0 1 1-2.25 0v-8.625a1.125 1.125 0 1 1 2.25 0M18.75 18.5a1.125 1.125 0 0 0-1.125 1.125v1.125a1.125 1.125 0 1 0 2.25 0v-1.125A1.125 1.125 0 0 0 18.75 18.5M21 14.75h-1.125V4.25a1.125 1.125 0 1 0-2.25 0v10.5H16.5a1.125 1.125 0 1 0 0 2.25H21a1.125 1.125 0 1 0 0-2.25m-15.75.75a1.125 1.125 0 0 0-1.125 1.125v4.125a1.125 1.125 0 0 0 2.25 0v-4.125A1.125 1.125 0 0 0 5.25 15.5m2.25-3.75H6.375v-7.5a1.125 1.125 0 0 0-2.25 0v7.5H3A1.125 1.125 0 1 0 3 14h4.5a1.125 1.125 0 1 0 0-2.25m6.75-4.5h-1.125v-3a1.125 1.125 0 1 0-2.25 0v3H9.75a1.125 1.125 0 0 0 0 2.25h4.5a1.125 1.125 0 0 0 0-2.25"
            />
          </svg>
        </div>
      </div>

      <div className="line"></div>

      <ul className={classes.filterCategoryList}>
        {categories.map((category) => (
          <li key={category.id} className={classes.filterCategoryItem}>
            <button
              type="button"
              className={`${classes.filterCategoryButton} ${
                activeCategories.includes(category.slug) ? classes.filterCategoryButtonActive : ''
              }`}
              onClick={() => onCategoryToggle(category.slug)}>
              {category.title}
              <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" fill="none">
                <path
                  fill="#000"
                  fillOpacity=".6"
                  d="m1.53.47 5 5a.75.75 0 0 1 0 1.062l-5 5a.751.751 0 1 1-1.062-1.063L4.938 6 .468 1.53A.751.751 0 1 1 1.53.469z"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>

      <div className="line"></div>

      <div className={classes.filtersSection}>
        <p className={classes.filtersTitle}>Price</p>

        <RangeSlider
          min={0}
          max={200}
          step={10}
          value={priceRange}
          onInput={(newRange) => {
            setPriceRange(newRange);

            if (onPriceChange) {
              onPriceChange(newRange);
            }
          }}
          className="range-slider"
        />
        <div className={classes.filterPracies}>
          <p className={classes.filterPracie}>${priceRange[0]}</p>
          <p className={classes.filterPracie}>${priceRange[1]} </p>
        </div>
      </div>

      <div className="line"></div>

      <div className={classes.filtersSection}>
        <p className={classes.filtersTitle}>Brand</p>

        <ul className={classes.brandList}>
          {brands.map((brand) => (
            <li key={brand.id} className={classes.brandItem}>
              <button
                type="button"
                className={`${classes.brandButton} ${
                  activeBrand.includes(brand.slug) ? classes.brandButtoActive : ''
                }`}
                onClick={() => onBrandsToggle(brand.slug)}>
                {brand.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="line"></div>

      <div className={classes.filtersFooter}>
        <Button
          variant="dark"
          text="Reset Filter"
          style={{ width: '100%' }}
          onClick={() => {
            setPriceRange([0, 200]);
            onResetFilters();
          }}
        />
      </div>
    </div>
  );
};

export default CatalogFilters;
