# BRANIMULAI - Direktori UMKM

Aplikasi direktori UMKM yang dibangun dengan Next.js 14 dan Tailwind CSS dengan tema warna hijau.

---

## 📚 Dokumentasi

**Baru pertama kali?** → Mulai dari [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)

**Lihat semua dokumentasi:** → [INDEX.md](INDEX.md)

| Dokumen | Deskripsi |
|---------|-----------|
| [QUICK_START.md](QUICK_START.md) | ⚡ Quick start guide |

---

## Fitur Utama

### 1. Halaman Beranda
- Menampilkan seluruh UMKM yang telah disetujui dalam bentuk grid
- Search bar untuk mencari UMKM berdasarkan nama
- Filter berdasarkan kategori (Makanan, Minuman, Jasa, Kerajinan)
- Hanya menampilkan UMKM dengan status "approved"

### 2. Halaman Detail UMKM
- Informasi lengkap UMKM (nama, deskripsi, alamat)
- Peta interaktif (placeholder - memerlukan Google Maps API key)
- Galeri foto produk
- Kontak WhatsApp dan telepon
- Tombol kembali ke beranda

### 3. Halaman Admin
- **Form Tambah UMKM Baru**
  - UMKM baru otomatis berstatus "pending"
  - Form lengkap dengan validasi
  
- **Sistem Persetujuan**
  - Tab Pending: UMKM yang menunggu persetujuan
  - Tab Disetujui: UMKM yang sudah approved dan ditampilkan di beranda
  - Tab Ditolak: UMKM yang ditolak
  - Tombol Setujui/Tolak untuk mengelola UMKM

- **Statistik Real-time**
  - Jumlah UMKM per status (pending, approved, rejected)
  - Jumlah UMKM per kategori (untuk yang approved)
  - Badge notifikasi di navbar untuk UMKM pending

- **Fitur Manajemen**
  - Delete UMKM yang sudah approved atau rejected
  - Re-approve UMKM yang sebelumnya ditolak

## Teknologi

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Notifications**: Sonner (Toast)
- **Language**: TypeScript

## Struktur Folder

```
├── app/
│   ├── layout.tsx          # Root layout dengan metadata
│   └── page.tsx            # Main page (entry point)
├── components/
│   ├── AdminPage.tsx       # Halaman admin dengan sistem approval
│   ├── DetailPage.tsx      # Halaman detail UMKM
│   ├── HomePage.tsx        # Halaman beranda dengan filter
│   ├── Navbar.tsx          # Navigation bar dengan badge notifikasi
│   ├── UMKMCard.tsx        # Card komponen untuk UMKM
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── types.ts            # TypeScript interfaces
│   └── mockData.ts         # Data dummy untuk demo
└── styles/
    └── globals.css         # Global styles & Tailwind config
```

## Instalasi dan Penggunaan

### 1. Install Dependencies

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

### 2. Jalankan Development Server

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### 3. Build untuk Production

```bash
npm run build
npm start
```

## Konfigurasi

### Google Maps API (Opsional)

Untuk mengaktifkan peta interaktif di halaman detail UMKM:

1. Dapatkan Google Maps API key dari [Google Cloud Console](https://console.cloud.google.com/)
2. Buka file `/components/DetailPage.tsx`
3. Ganti `YOUR_API_KEY_HERE` dengan API key Anda
4. Uncomment bagian iframe di dalam komponen

### Mengubah Tema Warna

Warna utama (hijau) dapat diubah di file `/styles/globals.css`:

```css
@theme {
  --color-primary: #16a34a;  /* Ubah nilai ini */
}
```

## Fitur Approval System

1. **Menambah UMKM Baru**: 
   - Masuk ke halaman Admin
   - Isi form dengan lengkap
   - UMKM akan masuk ke status "pending"

2. **Menyetujui UMKM**:
   - Buka tab "Pending" di halaman Admin
   - Klik tombol "Setujui" pada UMKM yang ingin disetujui
   - UMKM akan muncul di beranda dan pindah ke tab "Disetujui"

3. **Menolak UMKM**:
   - Buka tab "Pending" di halaman Admin
   - Klik tombol "Tolak" pada UMKM yang ingin ditolak
   - UMKM akan pindah ke tab "Ditolak"

4. **Re-approve UMKM yang Ditolak**:
   - Buka tab "Ditolak"
   - Klik tombol "Setujui" untuk mengembalikan ke status approved

5. **Badge Notifikasi**:
   - Badge merah di tombol Admin menunjukkan jumlah UMKM pending
   - Hilang otomatis saat semua UMKM sudah di-review

## Integrasi Database (Roadmap)

Saat ini aplikasi menggunakan mock data. Untuk integrasi dengan database:

1. Setup Supabase atau database pilihan Anda
2. Buat tabel `umkm` dengan kolom sesuai interface di `lib/types.ts`
3. Implementasikan API routes di `/app/api/`
4. Ganti state management dengan fetching data dari API

## Catatan Penting

- Aplikasi ini menggunakan client-side rendering untuk semua halaman
- Data disimpan di state (hilang saat refresh) - gunakan database untuk produksi
- Peta menggunakan placeholder - perlu Google Maps API untuk produksi
- Semua komponen utama sudah responsive

## Lisensi

MIT

## Kontak

Untuk pertanyaan atau dukungan, silakan hubungi tim developer.