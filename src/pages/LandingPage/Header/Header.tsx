import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/context/AuthContext';
import { signOut } from '@/features/auth/api/authApi';
import { useCart } from '@/features/cart/context/useCart';
import { useProducts } from '@/features/products/hooks/useProducts';
import useMedia from '@/shared/hooks/useMediaQuery';
import classes from './Header.module.scss';

const Header = () => {
  const { isSmallDevice, isMediumDevice, isLargeDevice } = useMedia();
  const { cartProducts } = useCart();
  const { user } = useAuth();
  const { products, isLoading, isError } = useProducts();

  const [searchText, setSearchText] = useState('');
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpenBurger, setIsOpenBurger] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  const filteredProducts =
    !searchText || isLoading || isError
      ? []
      : products.filter((product) =>
          product.title.toLowerCase().includes(searchText.toLowerCase()),
        );

  const handleInputChange = (value: string) => {
    setSearchText(value);
    setIsSearchDropdownOpen(!!value);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutsideDesktop =
        !desktopSearchRef.current || !desktopSearchRef.current.contains(event.target as Node);

      const clickedOutsideMobile =
        !mobileSearchRef.current || !mobileSearchRef.current.contains(event.target as Node);

      const clickedOnSearchButton = searchButtonRef.current?.contains(event.target as Node);

      if (clickedOutsideDesktop && clickedOutsideMobile && !clickedOnSearchButton) {
        setIsSearchDropdownOpen(false);
        setIsMobileSearchOpen(false);
        setSearchText('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`${classes.header} ${isScrolled ? classes.scrolled : ''}`}>
      <div className="container">
        <nav className={classes.menu} style={{ gap: isMediumDevice ? '20px' : '40px' }}>
          {isLargeDevice && (
            <button
              className={classes.burger}
              onClick={() => {
                setIsOpenBurger((prev) => !prev);
                if (!isOpenBurger) setIsMobileSearchOpen(false);
              }}
              aria-label={isOpenBurger ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpenBurger}>
              <span className={`${classes.burgerLine} ${isOpenBurger ? classes.active : ''}`} />
            </button>
          )}

          <Link to="/" className="logo">
            xshop
          </Link>

          <ul
            onClick={() => setIsOpenBurger(false)}
            className={`${classes.menuList} ${isLargeDevice ? classes.menuListMobile : ''} ${
              isLargeDevice && isOpenBurger ? classes.open : ''
            }`}
            style={{ justifyContent: isOpenBurger ? undefined : 'space-between' }}>
            <li className={classes.menuItem}>
              <Link
                to="productsCatalog"
                className={`${classes.menuLink} ${classes.menuLinkProducts}`}>
                Products
              </Link>
            </li>
            <li className={classes.menuItem}>
              <Link to="/#topSelling" className={classes.menuLink}>
                Top Sale
              </Link>
            </li>
            <li className={classes.menuItem}>
              <Link to="/#newArrivals" className={classes.menuLink}>
                New Arrivals
              </Link>
            </li>
            <li className={classes.menuItem}>
              <Link to="/#brands" className={classes.menuLink}>
                Brands
              </Link>
            </li>
          </ul>

          {!isSmallDevice && (
            <div className={classes.menuSearch} ref={desktopSearchRef}>
              <label htmlFor="searchInput" className={classes.menuSearchLabel}>
                <span className="sr_only">Search products</span>
                <input
                  className={classes.menuSearchInput}
                  value={searchText}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onClick={() => {
                    setIsSearchDropdownOpen(true);
                    setIsOpenBurger(false);
                  }}
                  id="searchInput"
                  placeholder="Search for products..."
                />
                <svg
                  className={classes.iconInput}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  aria-hidden="true">
                  <path
                    fill="#000"
                    fillOpacity=".4"
                    d="m21.796 20.204-4.452-4.454a8.636 8.636 0 1 0-1.594 1.594l4.456 4.457a1.126 1.126 0 1 0 1.594-1.594zM4.125 10.5a6.375 6.375 0 1 1 6.375 6.375A6.38 6.38 0 0 1 4.125 10.5"
                  />
                </svg>
              </label>

              <ul
                className={`${classes.menuSearchList} ${
                  isSearchDropdownOpen ? classes.menuSearchListActive : ''
                }`}>
                {searchText &&
                  isSearchDropdownOpen &&
                  filteredProducts.map(({ id, thumbnail, title }) => (
                    <li key={id} className={classes.menuSearchItem}>
                      <Link
                        to={`/productsCatalog/${id}`}
                        onClick={() => {
                          setSearchText('');
                          setIsSearchDropdownOpen(false);
                        }}>
                        <div className={classes.menuSearchWrap}>
                          <div className={classes.menuSearchContent}>
                            <img
                              className={classes.menuSearchImg}
                              src={thumbnail}
                              width={80}
                              height={80}
                              alt={title}
                              loading="lazy"
                            />
                            <p className={classes.menuSearchTitle}>{title}</p>
                          </div>
                          <span className={classes.menuSearchButton}>Details</span>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          <div className={classes.menuBoxButton}>
            {isSmallDevice && (
              <button
                ref={searchButtonRef}
                className={classes.buttonSearch}
                onClick={() => {
                  setIsMobileSearchOpen(!isMobileSearchOpen);
                  if (!isMobileSearchOpen) setIsOpenBurger(false);
                }}
                aria-label={isMobileSearchOpen ? 'Close search' : 'Open search'}
                aria-expanded={isMobileSearchOpen}>
                <svg
                  className={classes.iconSearch}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  aria-hidden="true">
                  <path
                    fill="currentColor"
                    fillOpacity=".4"
                    d="m21.796 20.204-4.452-4.454a8.636 8.636 0 1 0-1.594 1.594l4.456 4.457a1.126 1.126 0 1 0 1.594-1.594zM4.125 10.5a6.375 6.375 0 1 1 6.375 6.375A6.38 6.38 0 0 1 4.125 10.5"
                  />
                </svg>
              </button>
            )}

            <Link
              to="/cart"
              className={classes.menuLinkCart}
              onClick={() => setIsOpenBurger(false)}
              aria-label="Cart">
              <svg
                className={classes.iconCart}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                aria-hidden="true">
                <path
                  fill="#000"
                  d="M9.375 20.25a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0m7.875-1.875a1.875 1.875 0 1 0 0 3.75 1.875 1.875 0 0 0 0-3.75m4.825-11.294-2.558 8.316a2.61 2.61 0 0 1-2.51 1.853H7.775a2.64 2.64 0 0 1-2.525-1.904L2.045 4.125h-.92a1.125 1.125 0 0 1 0-2.25h1.202a1.88 1.88 0 0 1 1.803 1.36l.683 2.39H21a1.125 1.125 0 0 1 1.075 1.456m-2.598.794H5.455l1.959 6.853a.375.375 0 0 0 .36.272h9.233a.375.375 0 0 0 .36-.264z"
                />
              </svg>
              {cartProducts.length > 0 && (
                <span className={classes.menuCounter}>{cartProducts.length}</span>
              )}
            </Link>

            {user ? (
              <button
                type="button"
                aria-label="Sign out"
                onClick={() => {
                  setIsOpenBurger(false);
                  signOut();
                }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M19 21L22 18M22 18L19 15M22 18H16M15.5 3.29076C16.9659 3.88415 18 5.32131 18 7C18 8.67869 16.9659 10.1159 15.5 10.7092M12 15H8C6.13623 15 5.20435 15 4.46927 15.3045C3.48915 15.7105 2.71046 16.4892 2.30448 17.4693C2 18.2044 2 19.1362 2 21M13.5 7C13.5 9.20914 11.7091 11 9.5 11C7.29086 11 5.5 9.20914 5.5 7C5.5 4.79086 7.29086 3 9.5 3C11.7091 3 13.5 4.79086 13.5 7Z"
                    stroke="#000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ) : (
              <Link to="/login" onClick={() => setIsOpenBurger(false)} aria-label="Sign in">
                <svg
                  className={classes.iconLogin}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  aria-hidden="true">
                  <path
                    fill="#000"
                    d="M12 1.875A10.125 10.125 0 1 0 22.125 12 10.137 10.137 0 0 0 12 1.875M7.46 18.428a5.625 5.625 0 0 1 9.08 0 7.85 7.85 0 0 1-9.08 0m1.915-7.178a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0m8.813 5.62a7.8 7.8 0 0 0-2.72-2.196 4.875 4.875 0 1 0-6.937 0 7.8 7.8 0 0 0-2.719 2.195 7.875 7.875 0 1 1 12.366 0h.01Z"
                  />
                </svg>
              </Link>
            )}
          </div>
        </nav>

        {isSmallDevice && (
          <div
            className={`${classes.mobileSearchWrapper} ${
              isMobileSearchOpen ? classes.mobileSearchOpen : ''
            }`}
            ref={mobileSearchRef}>
            <input
              className={classes.menuSearchInput}
              value={searchText}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Search for products..."
            />
            <ul
              className={`${classes.menuSearchList} ${
                isSearchDropdownOpen ? classes.menuSearchListActive : ''
              }`}>
              {searchText &&
                filteredProducts.map(({ id, thumbnail, title }) => (
                  <li key={id} className={classes.menuSearchItem}>
                    <Link
                      to={`/productsCatalog/${id}`}
                      onClick={() => {
                        setSearchText('');
                        setIsMobileSearchOpen(false);
                      }}>
                      <div className={classes.menuSearchWrap}>
                        <div className={classes.menuSearchContent}>
                          <img
                            className={classes.menuSearchImg}
                            src={thumbnail}
                            width={80}
                            height={80}
                            alt={title}
                            loading="lazy"
                          />
                          <p className={classes.menuSearchTitle}>{title}</p>
                        </div>
                        <span className={classes.menuSearchButton}>Details</span>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
