export default function AboutTemplate() {
  return (
    <section className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-brand-gray mb-6">About Our App</h1>
      <p className="text-brand-gray text-lg leading-relaxed mb-4">
        Aplikasi ini merupakan katalog produk yang memungkinkan pengguna untuk
        menelusuri berbagai item, melakukan pencarian berdasarkan kategori atau
        nama, serta melihat detail setiap produk secara lengkap.
      </p>
      <p className="text-brand-gray text-lg leading-relaxed mb-6">
        Data produk utama berasal dari <strong>DummyJSON API</strong>. Selain
        itu, pengguna juga dapat menambahkan produk secara lokal yang akan
        disimpan di <code>localStorage</code> sehingga tetap tersedia meski
        halaman direfresh.
      </p>

      <div className="border-t pt-6 mt-6">
        <h2 className="text-xl font-semibold text-brand-gray mb-2">
          Hubungi Customer Service
        </h2>
        <p className="text-brand-gray text-lg">
          Jika ada pertanyaan, saran, atau kendala saat menggunakan aplikasi,
          silakan hubungi kami melalui email:
        </p>
        <a
          href="mailto:cs@productcatalogue.com"
          className="text-brand-yellow hover:underline font-medium"
        >
          cs@productcatalogue.com
        </a>
      </div>
    </section>
  );
}
