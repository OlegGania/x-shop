import classes from './ProductsCatalog.module.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Preloader from '@/shared/ui/Preloader/Preloader';
import CatalogFilters from '@/features/products/ui/CatalogFilters/CatalogFilters';
import ProductList from '@/features/products/ui/ProductList/ProductList';
import useMedia from '@/shared/hooks/useMediaQuery';
import { useBrands } from '@/features/products/hooks/useBrands';
import { useCategories } from '@/features/products/hooks/useCategories';
import { useProductService } from '@/features/products/model/productsService';
import { useProductsPaginated } from '@/features/products/hooks/useProductsPaginated';
import { SortType, SORT_TYPES, getSortType } from '@/types/filters';

type PriceRange = [number, number];

const ProductCatalogPage = () => {
  const { isSmallDevice, isMediumDevice } = useMedia();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPriceRange: PriceRange = [
    Number(searchParams.get('minPrice')) || 0,
    Number(searchParams.get('maxPrice')) || 200,
  ];

  const [priceRange, setPriceRange] = useState<PriceRange>(initialPriceRange);
  const currentPage: number = Number(searchParams.get('page')) || 1;
  const sortTypeFromUrl: SortType = getSortType(searchParams.get('sort'));
  const activeBrandsFromUrl: string[] = searchParams.getAll('brands');
  const activeCategoriesFromUrl: string[] = searchParams.getAll('categories');

  const { getProductsQueryUrl } = useProductService();

  const url = getProductsQueryUrl({
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    sortType: sortTypeFromUrl,
    brands: activeBrandsFromUrl,
    categories: activeCategoriesFromUrl,
  });

  const { brands, isLoading: brandsLoading, isError: brandsError } = useBrands();

  const { categories, isLoading: categoriesLoading, isError: categoriesError } = useCategories();

  const {
    items: products,
    totalPages,
    totalItems,
    isLoading: productsLoading,
    isError: productsError,
  } = useProductsPaginated({
    page: currentPage,
    limit: 6,
    url,
  });

  const changePage = (page: number): void => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(page));
    setSearchParams(newParams);
  };

  const handleSortChange = (newSortType: string): void => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', newSortType);
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const updatePriceRange = (minMax: PriceRange): void => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('minPrice', String(minMax[0]));
    newParams.set('maxPrice', String(minMax[1]));
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handleChangeSelectedCategories = (clickedCategory: string) => {
    const newParams = new URLSearchParams(searchParams);

    let currentCategories = newParams.getAll('categories');

    if (currentCategories.includes(clickedCategory)) {
      currentCategories = currentCategories.filter((category) => category !== clickedCategory);
    } else {
      currentCategories.push(clickedCategory);
    }

    newParams.delete('categories');

    currentCategories.forEach((category) => {
      newParams.append('categories', category);
    });
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handleChangeSelectedBrands = (clickedBrand: string) => {
    const newParams = new URLSearchParams(searchParams);

    let currentBrands = newParams.getAll('brands');

    if (currentBrands.includes(clickedBrand)) {
      currentBrands = currentBrands.filter((brand) => brand !== clickedBrand);
    } else {
      currentBrands.push(clickedBrand);
    }

    newParams.delete('brands');

    currentBrands.forEach((brand) => {
      newParams.append('brands', brand);
    });

    newParams.set('page', '1');

    setSearchParams(newParams);
  };

  const toggleBrands = (brandSlug: string) => {
    handleChangeSelectedBrands(brandSlug);
  };

  const toggleCategory = (categorySlug: string) => {
    handleChangeSelectedCategories(categorySlug);
  };

  const resetFilters = () => {
    setSearchParams({});
    setPriceRange([0, 200]);
  };

  useEffect(() => {
    const min = Number(searchParams.get('minPrice')) || 0;
    const max = Number(searchParams.get('maxPrice')) || 200;
    setPriceRange([min, max]);
  }, [searchParams]);

  const isLoading = productsLoading || brandsLoading || categoriesLoading;

  const isError = productsError || brandsError || categoriesError;

  if (isError) return <p>Error loading products!</p>;

  return isLoading ? (
    <Preloader width={'350px'} height={'350px'} />
  ) : (
    <section className={classes.section}>
      <div className="container">
        <ul className="navigateList">
          <li className="navigateItem">
            <Link to="/" className="navigateLink">
              Home
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                <path
                  d="M1.53073 0.469402L6.53073 5.4694C6.60065 5.53908 6.65613 5.62187 6.69399 5.71304C6.73184 5.8042 6.75133 5.90194 6.75133 6.00065C6.75133 6.09936 6.73184 6.1971 6.69399 6.28827C6.65613 6.37943 6.60065 6.46222 6.53073 6.5319L1.53073 11.5319C1.38984 11.6728 1.19874 11.752 0.999484 11.752C0.800227 11.752 0.609131 11.6728 0.468235 11.5319C0.327338 11.391 0.248184 11.1999 0.248184 11.0007C0.248184 10.8014 0.327338 10.6103 0.468235 10.4694L4.93761 6.00003L0.46761 1.53065C0.326714 1.38976 0.247559 1.19866 0.247559 0.999403C0.247559 0.800145 0.326714 0.609049 0.46761 0.468153C0.608506 0.327257 0.799603 0.2481 0.99886 0.2481C1.19812 0.2481 1.38921 0.327257 1.53011 0.468153L1.53073 0.469402Z"
                  fill="black"
                  fillOpacity="0.6"
                />
              </svg>
            </Link>
          </li>

          <li className="navigateItem">
            <span>Product</span>
          </li>
        </ul>

        <div
          className={classes.productsCatalog}
          style={{ flexDirection: isMediumDevice ? 'column' : undefined }}>
          <div className={classes.productsCatalogPanel}>
            <CatalogFilters
              brands={brands}
              categories={categories}
              activeCategories={activeCategoriesFromUrl}
              activeBrand={activeBrandsFromUrl}
              onCategoryToggle={toggleCategory}
              onBrandsToggle={toggleBrands}
              onPriceChange={updatePriceRange}
              onResetFilters={resetFilters}
            />
          </div>

          <div className={classes.productsCatalogWrap}>
            <div
              className={classes.productsCatalogInfo}
              style={{
                flexDirection: isSmallDevice ? 'column' : undefined,
                alignItems: isSmallDevice ? 'center' : undefined,
                gap: isSmallDevice ? '20px' : undefined,
              }}>
              <p className={classes.productsCatalogTitle}>All Products</p>

              <div className={classes.productsCatalogControls}>
                <div className={classes.productsCatalogLabel}>
                  <span className={classes.productsCatalogValue}>{totalItems}</span>
                  <span className={classes.productsCatalogValue}>Products</span>
                </div>

                <div className={classes.productsSort}>
                  <span className={classes.productsCatalogValue}>Sort by:</span>

                  <select
                    className={classes.productsSortSelect}
                    value={sortTypeFromUrl}
                    onChange={(e) => handleSortChange(e.target.value as SortType)}>
                    <option value={SORT_TYPES.NEWEST}>Newest</option>
                    <option value={SORT_TYPES.MOST_POPULAR}>Most Popular</option>
                    <option value={SORT_TYPES.HIGHEST_PRICE}>Highest Price</option>
                    <option value={SORT_TYPES.LOWEST_PRICE}>Lowest Price</option>
                  </select>
                </div>
              </div>
            </div>

            <ProductList products={products} totalPages={totalPages} onPageChange={changePage} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCatalogPage;
