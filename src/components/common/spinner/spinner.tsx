import { ClipLoader } from "react-spinners";

export const Spinner = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
      <ClipLoader size={30} color="#4B5563" />
    </div>
  );
};
