import { ThreeDots } from "react-loader-spinner";

export default function Loader() {
  return (
    <ThreeDots
      visible={true}
      height="60"
      width="60"
      color="#4d72a9"
      radius="9"
      ariaLabel="three-dots-loading"
    />
  );
}
