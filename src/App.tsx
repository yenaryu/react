import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { Provider } from "jotai";

// 생성한 페이지 컴포넌트 불러오기
import HomePage from "./views/Home";
import BookmarkPage from "./views/Bookmark";

function App() {
    return (
        <Provider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/search/:id" element={<HomePage />}></Route>
                    <Route path="/bookmark" element={<BookmarkPage />}></Route>
                </Routes>
                <Toaster />
            </BrowserRouter>
        </Provider>
    );
}

export default App;
