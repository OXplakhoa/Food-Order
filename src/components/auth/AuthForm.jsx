import React from "react";
import "./AuthForm.css";
import { Form, Link, useSearchParams, useActionData } from "react-router-dom";

const AuthForm = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const data = useActionData(); // Lấy dữ liệu trả về từ action

  return (
    <div className={`container ${isLogin ? "" : "active"}`} id="container">
      <div className="form-container sign-up">
        <Form method="post">
          <h1>Tạo tài khoản</h1>
          <span>Sử dụng gmail để đăng ký</span>
          {data?.error && !isLogin && <p className="error">{data.error}</p>}
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Mật khẩu" required />
          <button type="submit">Đăng ký</button>
        </Form>
      </div>

      <div className="form-container sign-in">
        <Form method="post">
          <h1>Đăng nhập</h1>
          <span>Sử dụng gmail để đăng nhập</span>
          {data?.error && isLogin && <p className="error">{data.error}</p>}
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Mật khẩu" required />
          <button type="submit">Đăng nhập</button>
        </Form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Chào mừng quay trở lại!</h1>
            <p>Đăng nhập để sử dụng</p>
            <Link to="?mode=login" className="toggle-btn">Đăng nhập</Link>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Chào bạn!</h1>
            <p>Đăng ký để sử dụng</p>
            <Link to="?mode=signup" className="toggle-btn">Đăng ký</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
