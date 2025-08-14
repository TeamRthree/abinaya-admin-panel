import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    const isLoggedIn = localStorage.getItem("adminToken"); // check login
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-white via-[#fceffb] to-[#ffe3ec] flex items-center justify-center px-4">
      <div className="text-center backdrop-blur-md bg-white/70 border border-white/40 shadow-xl rounded-xl p-10 max-w-2xl w-full animate-fadeIn">
        <div className="cursor-pointer mb-8">
          <h1 className="text-xl font-bold text-[#3A405B]">
            Dr. M. H. Abinaya
          </h1>
          <p className="text-sm text-[#FF56A6]">
            Fertility | Obstetrics | Gynaecology
          </p>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome to Admin Panel
        </h1>
        <p className="text-lg text-gray-500 mb-6">
          Manage videos, testimonials, and gallery with ease.
        </p>
        <button
          onClick={handleEnter}
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-3 rounded-full font-medium transition-all shadow-md hover:shadow-lg"
        >
          Enter Admin Panel
        </button>
      </div>
    </div>
  );
};

export default Welcome;
