import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";

import { verifyToken } from "../../utils/verifyToken";
import { Navigate } from "react-router-dom";
import { logout, useCurrentToken } from "../../redux/feature/auth/auth.slice";
import { JwtPayload } from "jwt-decode";


type TProtectedRoute = {
    children: ReactNode;
    role?: string | undefined;
  };

  interface CustomJwtPayload extends JwtPayload {
    role?: string;
}
  
  const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
    const token = useAppSelector(useCurrentToken);
  
    let user: CustomJwtPayload | null = null;
  
    if (token) {
      user = verifyToken(token) as CustomJwtPayload;
    }
  
    const dispatch = useAppDispatch();
  
    if (role !== undefined && role !== user?.role ) {
      dispatch(logout());
      return <Navigate to="/login" replace={true} />;
    }
    if (!token) {
      return <Navigate to="/login" replace={true} />;
    }
  
    return children;
  };
  
  export default ProtectedRoute;