import { useEffect, useState } from "react";
import { signIn, signUp } from "../../api/auth";
import styles from "./styles.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const user = useAuth(); // 現在のユーザー情報を取得
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("User is logged in:");
      // ユーザー情報がある場合はカレンダー画面に遷移
      navigate("/calender");
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (isSignIn) {
      signIn({ email, password });
    } else {
      signUp({ email, password });
    }
  };

  const toggleView = () => {
    setIsSignIn((prev) => !prev);
  };

  return (
    <div className={styles.signIn}>
      <h1 className="logo">Small Stacks</h1>
      <div className="signInForm">
        <h2>{isSignIn ? "Sign in" : "Sign up"}</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            <span>Email Addres</span>
            <input type="email" name="email" required />
          </label>
          <label htmlFor="password">
            <span>Password</span>
            <input type="password" name="password" required />
          </label>
          <button type="submit">{isSignIn ? "Sign in" : "Sign up"}</button>
          {isSignIn ? (
            <p className="toggleText">
              Don't have an account?
              <span className="link" onClick={toggleView}>
                Sign up
              </span>
            </p>
          ) : (
            <p className="toggleText">
              Already have an account?
              <span className="link" onClick={toggleView}>
                Sign in
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
