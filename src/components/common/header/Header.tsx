import styles from "./header.module.scss";
import {
    Button,
    Separator,
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/";
import { BookMarked } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    return (
        <header className={styles.header}>
            <div className={styles[`header__logo-box`]}>
                <Link to={"/"}>
                    <img
                        src="src/assets/logo.svg"
                        alt=""
                        className={styles[`header__logo-box__logo`]}
                    />
                </Link>
            </div>
            <div className={styles[`header__user-box`]}>
                {/* 북마크 */}
                <Button
                    variant={"secondary"}
                    onClick={() => navigate("/bookmark")}
                >
                    <BookMarked />
                    북마크
                </Button>
                <Separator orientation="vertical" className="mx-1 h-10" />
                {/* 아바타 */}
                <Avatar>
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                    ></AvatarImage>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {/* 유저닉네임 & 이메일주소 */}
                <div className="flex items-center gap-1">
                    <small className="text-base font-medium leading-none">
                        yena ryu
                    </small>
                    &#65372;
                    <small className="text-base font-medium leading-none">
                        yena0773
                    </small>
                </div>
            </div>
        </header>
    );
}

export { Header };
