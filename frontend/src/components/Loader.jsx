const Loader = ({
  message = "Loading...",
  fullScreen = true,
  size = "large",
}) => {
  const spinnerSize = {
    small: "h-8 w-8 border-2",
    medium: "h-12 w-12 border-4",
    large: "h-16 w-16 border-4",
  };

  return (
    <div
      className={`${
        fullScreen ? "fixed inset-0 bg-black/40" : "w-full h-full"
      } flex items-center justify-center z-50`}
    >
      <div className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-center">
        {/* Spinner */}

        <div
          className={`
            ${spinnerSize[size]}
            rounded-full
            border-blue-600
            border-t-transparent
            animate-spin
          `}
        ></div>

        {/* Loading Text */}

        <h2 className="mt-5 text-lg font-semibold text-gray-700">{message}</h2>

        <p className="text-sm text-gray-500 mt-2">Please wait...</p>
      </div>
    </div>
  );
};

export default Loader;
