import { Link } from 'react-router-dom';
export default function HeroSection() {
  return (
    <>
      <div>
        <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
          <div className="mx-auto mt-5 max-w-2xl text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-brand-gray">
              Demo aplikasi katalog produk menggunakan DummyJSON API
            </h1>
          </div>
          <div className="mx-auto mt-5 max-w-3xl text-center">
            <p className="  text-xl text-brand-gray">
              Jelajahi, cari, dan kelola produk secara interaktif!
            </p>
          </div>
          <div className="mt-8 flex justify-center gap-3">
            <Link to={'/products'}>
              <button className="cursor-pointer btn bg-brand-yellow text-brand-gray">
                Lihat Product
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
