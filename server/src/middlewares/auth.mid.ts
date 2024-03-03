import { HTTP_UNAUTHORIZED } from "../constants/http_status";
import { verify } from "jsonwebtoken";

export default (req: any, res: any, next: any) => {
  // getting tokens from headers. We will set it on interceptors
  const token = req.headers.access_token as string;

  //   if token has no value
  if (!token) return res.status(HTTP_UNAUTHORIZED).send();

  try {
    // ! 100% -> ITS NOT UNDEFINED
    const decodedUser = verify(token, process.env.JWT_SECRET!);
    console.log("Decoded User:", decodedUser); // Debugging statement
    req.user = decodedUser;
  } catch (error) {
    console.error("Authentication Error:", error); // Debugging statement

    res.status(HTTP_UNAUTHORIZED).send();
  }
  //   Middleware inside the pipeline
  return next();
};
