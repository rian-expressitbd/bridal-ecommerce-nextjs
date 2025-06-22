import { useBusiness } from "@/hooks/useBusiness";
import Image from "next/image";

const Logo = () => {
  const { businessData } = useBusiness();

  if (!businessData || typeof businessData === undefined) return null;

  const businessName = businessData.businessName;
  const logoUrl = businessData.logo.optimizeUrl || businessData.logo.secure_url;

  return (
    <>
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt='Logo'
          width={100}
          height={100}
          className='h-16 w-auto'
          onError={() => <h1 className='text-2xl font-bold'>{businessName}</h1>}
        />
      ) : (
        <h1 className='text-2xl font-bold'>{businessName}</h1>
      )}
    </>
  );
};

export default Logo;
