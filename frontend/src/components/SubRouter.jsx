import { Route, Routes } from "react-router-dom";
import FooterBanner from "./layout/Footer";
import Banner from "./layout/Header";
import MainPage from "../pages/Home/MainPage";
import TalkBoard from "../pages/Talk/TalkBoard";
import WritePage from "../pages/Talk/WritePage";
import DetailPage from "../pages/Talk/DetailPage";
import Meeting from "../pages/Talk/Meeting";
import Mypage from "../pages/MyPage/MyPage";
import LoginPage from "../pages/Login/LoginPage";
import Edit from "../pages/Talk/EditPage";
import SignupPage from '../pages/Login/SignupPage';
import ReadPage from "../pages/Read/ReadPage";
import WriteReviewPage from "../pages/Read/WriteReviewPage";
import EditReviewPage from "../pages/Read/EditReviewPage"; 
import AdminPage from "../pages/Admin/AdminPage";
import NotFound from "../pages/NotFound/NotFound"

export default function SubRouter() {
  return (
    <div className="container">
      <Banner />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/read/edit/:id" element={<EditReviewPage />} />
          <Route path="/read" element={<ReadPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/talk" element={<TalkBoard />}></Route>
          <Route path="/talk/write" element={<WritePage />}></Route>
          <Route path="/talk/:id" element={<DetailPage />} />
          <Route path="/talk/meeting/:id" element={<Meeting />} />
          <Route path="/talk/meeting/edit/:id" element={<Edit />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/read/write" element={<WriteReviewPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      <FooterBanner />
    </div>
  );
}
