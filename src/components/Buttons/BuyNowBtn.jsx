import { useRouter } from "next/router";

export default function BuyNowBtn() {
  const router = useRouter();
  const handleBuyNow = (e) => {
    e.preventDefault();
    router.push("/checkout");
  };
  return (
    <button className="btn btn-primary" onClick={handleBuyNow}>
      Buy Now
    </button>
  );
}
