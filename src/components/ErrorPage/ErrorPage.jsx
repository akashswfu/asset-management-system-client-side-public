import { Link } from "react-router-dom";
import { FaRegFaceSadCry } from "react-icons/fa6";

const ErrorPage = () => {
  return (
    <div className="flex h-screen flex-col justify-center items-center py-16">
      <FaRegFaceSadCry className="w-40 h-40 text-yellow-500" />
      <div className="max-w-md text-center">
        <h2 className="mb-8 font-extrabold text-9xl text-yellow-500">
          <span className="sr-only">Error</span>
          {status || 404}
        </h2>
      </div>
      <Link to="/">
        <button className="btn btn-danger">Back to Home </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
