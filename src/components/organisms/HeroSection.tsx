import { Link } from 'react-router-dom';
export default function HeroSection() {
  return (
    <>
      {/* Hero */}
      <div>
        <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
          {/* End Announcement Banner */}
          {/* Title */}
          <div className="mx-auto mt-5 max-w-2xl text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Temukan Produk Lokal Terbaik
            </h1>
          </div>
          {/* End Title */}
          <div className="mx-auto mt-5 max-w-3xl text-center">
            <p className="text-muted-foreground text-xl">
              Platform yang menghubungkan UMKM dengan pelanggan digital.
            </p>
          </div>
          {/* Buttons */}
          <div className="mt-8 flex justify-center gap-3">
            <Link to={'/products'}>
              <button className="cursor-pointer">Lihat Product</button>
            </Link>
          </div>
          {/* End Buttons */}
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
