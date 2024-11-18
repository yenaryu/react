import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui";
import {
    Heart,
    FolderOpen,
    ClipboardPenLine,
    AlignLeft,
    Bookmark,
} from "lucide-react";
import { Pin } from "lucide-react";
import { ImageCardType } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface Props {
    data: ImageCardType;
}

function ImageCard({ data }: Props) {
    const { toast } = useToast();
    const addBookmark = (imageData: ImageCardType) => {
        console.log(imageData);

        // 1. 로컬스토리지에서 bookmark 데이터 가져오기
        const getLocalStorage = localStorage.getItem("bookmark");
        let bookmarks: ImageCardType[] = [];

        if (getLocalStorage) {
            try {
                bookmarks = JSON.parse(getLocalStorage);
            } catch (error) {
                console.error("Error parsing localStorage:", error);
                bookmarks = [];
            }
        }

        const imageExists =
            bookmarks.findIndex(
                (item: ImageCardType) => item.id === imageData.id
            ) > -1;

        if (imageExists) {
            toast({
                title: "로컬스토리지에 해당 데이터가 이미 저장되어있습니다.",
                variant: "destructive",
            });
        } else {
            bookmarks.push(imageData);
            localStorage.setItem("bookmark", JSON.stringify(bookmarks));
            toast({
                title: "로컬스토리지에 올바르게 저장되었습니다.",
            });
        }
    };

    return (
        <div className="card-list cursor-pointer w-64 h-64 space-y-3">
            <div className="card-list__header">
                {/* 버튼 클릭 시 팝업 */}
                <Dialog>
                    <DialogTrigger asChild className="relative">
                        <Button
                            size={"icon"}
                            className="absolute top-6 right-3 z-10 bg-neutral-500 bg-opacity-50 hover:bg-opacity-50"
                        >
                            <FolderOpen className="h-5 w-5"></FolderOpen>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>이미지 상세정보</DialogTitle>
                            <DialogDescription>
                                선택한 이미지의 상세정보를 확인하세요.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex flex-col items-center space-x-2 gap-3">
                            <img
                                src={data.urls.full}
                                alt={data.alt_description}
                                className="w-full  rounded-xl h-80"
                            />
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-2">
                                    <Avatar>
                                        <AvatarImage
                                            src={data.user.profile_image.small}
                                            alt="@shadcn"
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <small className="text-sm font-medium leading-none">
                                        {data.user.username}
                                    </small>
                                </div>
                                <Bookmark
                                    className="cursor-pointer"
                                    onClick={() => addBookmark(data)}
                                />
                            </div>

                            <div className="flex flex-col w-full gap-2 ">
                                <div className="flex items-center text-sm">
                                    <Pin className="h-4 w-4 mt-[2px] mr-1 min-w-4" />
                                    {data.alternative_slugs.ko
                                        .split("-")
                                        .filter((word) =>
                                            /^[가-힣]+$/.test(word)
                                        )
                                        .join(" ")}
                                </div>
                                <div className="flex items-center text-sm">
                                    <ClipboardPenLine className="h-4 w-4 mt-[2px] mr-1 min-w-4" />
                                    {data.alt_description}
                                </div>
                                <div className="flex items-center text-sm">
                                    <AlignLeft className="h-4 w-4 mt-[2px] mr-1 min-w-4 " />
                                    {data.description
                                        ? data.description
                                        : "등록된 묘사 및 설명글이 없습니다"}
                                </div>
                            </div>
                            <div className="flex items-center justify-end w-full gap-4">
                                <div className="flex items-center gap-1 text-sm">
                                    <p className="flex items-center gap-1 text-sm">
                                        <span className="leading-7">
                                            게시일:
                                        </span>
                                        {data.created_at.split("T")[0]}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                    <Heart
                                        className="h-[14px] w-[14px] m-[2px] text-rose-600"
                                        fill="#e11d48"
                                    />
                                    {data.likes
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <img
                src={data.urls.small}
                alt={data.alt_description}
                className="w-[278px] h-[178px] rounded-xl object-cover"
            />
            <div>
                <p className="text-sm font-semibold mb-6">
                    {data.alt_description
                        ? data.alt_description
                        : "등록된 묘사 및 설명글이 없습니다."}
                </p>
            </div>
            <div className="flex items-center justify-between w-full">
                <p className="flex items-center gap-1 text-sm">
                    <span className="leading-7">게시일:</span>
                    {data.created_at.split("T")[0]}
                </p>

                <p className="flex items-center gap-1 text-sm">
                    <Heart
                        className="h-[14px] w-[14px] m-[2px] text-rose-600"
                        fill="#e11d48"
                    />
                    {data.likes
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
            </div>
        </div>
    );
}

export { ImageCard };
