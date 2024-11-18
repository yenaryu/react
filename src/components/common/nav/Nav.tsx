import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { searchValueAtom } from "@/stores";
import { useAtom } from "jotai";

import navJson from "./Nav.json";
import styles from "./nav.module.scss";

// 타입관리
interface Nav {
    index: number;
    path: string;
    label: string;
    searchValue: string;
    isActive: boolean;
}

function Nav() {
    // Link를 클릭했을 때 navMenu에서 map함수를 통해 순환하는 nav의 요소를 가지고 검색 기능 구현
    const { pathname } = useLocation();
    const [searchValue, setSearchValue] = useAtom(searchValueAtom); // searchValue 활용
    const [navMenu, setNavMenu] = useState<Nav[]>(navJson);

    useEffect(() => {
        navMenu.forEach((nav: Nav) => {
            nav.isActive = false;
            if (nav.path === pathname || pathname.includes(nav.path)) {
                nav.isActive = true;
                setSearchValue(nav.searchValue);
            }
        });
        setNavMenu([...navMenu]);
    }, [pathname]);

    // 네비게이션 UI
    // useState로 선언한 반응성을 가진 데이터를 기반으로 UI를 반복 호출
    const navLinks = navMenu.map((nav: Nav) => {
        return (
            <Link
                to={nav.path}
                key={nav.index}
                className={
                    nav.isActive
                        ? `${styles.nav__menu} ${styles.active}`
                        : `${styles.nav__menu} ${styles.inactive}`
                }
            >
                <small className="text-sm font-medium leading-none text-black">
                    {nav.label}
                </small>
            </Link>
        );
    });

    return <nav className={styles.nav}>{navLinks}</nav>;
}

export { Nav };
