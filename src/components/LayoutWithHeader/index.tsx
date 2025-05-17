import sytles from "./styles.module.scss";

import { Outlet } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { signOut } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import CustomDialog from "../CustomDialog";

const LayoutWithHeader = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const error = await signOut();
    if (!error) {
      navigate("/signup");
    }
  };

  return (
    <>
      <header className={sytles.header}>
        <CustomDialog />
        <h1 className="logo">Small Stacks</h1>
        <nav className="headerNav">
          <ul>
            <li onClick={handleSignOut}>
              <LuLogOut />
            </li>
          </ul>
        </nav>
      </header>
      <Outlet /> {/* 子ルートをここにレンダリング */}
    </>
  );
};

export default LayoutWithHeader;
