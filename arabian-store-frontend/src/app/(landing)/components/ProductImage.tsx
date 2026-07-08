import Image from 'next/image';

export function ProductImage() {
  return (
    <div className="flex-[1.2] flex justify-center items-center">
      <div className="relative w-full max-w-[650px] bg-white rounded-sm shadow-sm p-[10px] border border-gray-200">
        <Image 
          src="/sukkari.webp" 
          alt="Sukkari Rutab Image" 
          width={1000}
          height={1000}
          className="w-full h-auto object-cover"
          priority
        />
      </div>
    </div>
  );
}
