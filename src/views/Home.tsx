import { useCallback, useEffect, useState } from "react";
import { ImageCardType } from "@/types";

import { Header, Nav, PaginationFooter } from "@/components/common";
import { ImageCard } from "@/components/home";
import { SearchBar } from "@/components/ui";
import { useToast } from "@/hooks/use-toast";
import { pageAtom, searchValueAtom, fetchApi } from "@/stores";
import { useAtom } from "jotai";

function HomePage() {
    //pagination 페이지 관리
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handlePageChange = (page: number) => {
        setCurrentPage(page); // 페이지 상태 업데이트
    };

    //search-bar 검색
    const [inputValue, setInputValue] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
    //엔터 눌렀을때 동작
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setInputValue("");
            setSearchValue(inputValue);
            console.log(searchValue);
        }
    };

    //toast
    const { toast } = useToast();

    const [searchValue, setSearchValue] = useAtom(searchValueAtom);
    //사진 데이터 저장
    const [images, setImages] = useState([]);
    const [page] = useAtom(pageAtom);

    const fetchImage = useCallback(async () => {
        try {
            const res = await fetchApi(searchValue, currentPage); //index.ts에서 return된 res가 담김 //page>currentPage로 페이지 변경 시 데이터 새로 로드

            if (res.status === 200 && res.data) {
                setImages(res.data.results);
                //API 응답에 따라 총 페이지 수 업데이트
                if (res.data.total_pages) {
                    setTotalPages(res.data.total_pages); // 응답의 총 페이지 수
                }
                toast({
                    title: "API 호출 성공!",
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Unsplash API 호출 실패!",
                    description:
                        "API 호출을 위한 필수 파라미터 값을 체크해보세요",
                });
            }
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }, [searchValue, currentPage, toast]);

    useEffect(() => {
        fetchImage();
    }, [fetchImage]); //fetchImage, currentPage가 변경될때마다 실행

    return (
        <div className="page">
            <div className="page__container">
                <Header />
                <Nav />

                {/* 메인 이미지 */}
                <div className="page__container__wallpaper">
                    <img src="src/assets/images/wallpaper.png" alt="bg-image" />
                    <div className="search-box">
                        <h1 className="scroll-m-20 text-4xl text-white font-extrabold tracking-tight">
                            프로젝트 02 : 오픈API를 활용한 이미지 검색 사이트
                            만들기
                        </h1>
                        <div className="flex flex-col w-full mt-5 mb-3">
                            <h4 className="scroll-m-20 text-md text-white font-semibold traking-tight">
                                인터넷 시각자료 출처입니다.
                                <br />
                                모든 지역에 있는 크리에이터들의 지원을 받습니다.
                            </h4>
                        </div>
                        {/* 검색창 컴포넌트 */}
                        <SearchBar
                            placeholder="원하는 이미지를 검색하세요."
                            onInput={handleChange}
                            value={inputValue}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>

                {/* 카드 형태 */}
                <div className="page__container__card-group">
                    {images.map((image: ImageCardType) => {
                        return <ImageCard data={image} />;
                    })}
                </div>
                <PaginationFooter
                    total={totalPages} // 동적으로 업데이트된 총 페이지 수
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}

export default HomePage;
