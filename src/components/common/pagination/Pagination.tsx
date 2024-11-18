import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui";

interface PaginationFooterProps {
    total: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

function PaginationFooter({
    total,
    currentPage,
    onPageChange,
}: PaginationFooterProps) {
    const range = 3; // 현재 페이지 앞뒤로 표시할 페이지 수
    const pages: number[] = []; // 페이지 번호 리스트

    // 첫 페이지, 마지막 페이지를 포함한 동적 페이지 생성
    for (let i = 1; i <= total; i++) {
        if (
            i === 1 || // 항상 첫 페이지
            i === total || // 항상 마지막 페이지
            (i >= currentPage - range && i <= currentPage + range) // 현재 페이지 주변
        ) {
            pages.push(i);
        } else if (
            (i === currentPage - range - 1 && i > 1) || // 앞쪽 생략
            (i === currentPage + range + 1 && i < total) // 뒤쪽 생략
        ) {
            pages.push(-1); // -1은 "..."을 나타냄
        }
    }

    return (
        <Pagination className="page__container__footer">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) onPageChange(currentPage - 1);
                        }}
                    />
                </PaginationItem>
                {pages.map((page, index) =>
                    page === -1 ? ( // 생략된 부분은 "..."으로 표시
                        <span key={index} className="px-2">
                            ...
                        </span>
                    ) : (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href="#"
                                isActive={page === currentPage}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange(page);
                                }}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < total)
                                onPageChange(currentPage + 1);
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export { PaginationFooter };
