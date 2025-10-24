# 🚀 Quick Start - BRANIMULAI

## Instalasi & Jalankan

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Buka di browser
http://localhost:3000
```

## Navigasi Aplikasi

### 1️⃣ Halaman Beranda
- URL: `/`
- Menampilkan UMKM yang sudah **approved**
- Search bar: Cari berdasarkan nama
- Filter: Semua, Makanan, Minuman, Jasa, Kerajinan
- Klik card UMKM → Lihat detail

### 2️⃣ Halaman Detail UMKM
- Galeri foto produk
- Deskripsi lengkap
- Alamat & peta (placeholder)
- Tombol WhatsApp & Telepon
- Tombol kembali ke beranda

### 3️⃣ Halaman Admin
- Klik tombol **Admin** di navbar
- Badge merah = ada UMKM pending ⭐

#### Tambah UMKM Baru
1. Isi form di panel kiri
2. Klik "Tambah UMKM"
3. UMKM masuk ke status **Pending**

#### Kelola UMKM
**Tab Pending** (UMKM menunggu approval)
- Klik "Setujui" → UMKM tampil di beranda
- Klik "Tolak" → UMKM masuk ke tab Ditolak

**Tab Disetujui** (UMKM yang approved)
- UMKM ini tampil di beranda
- Bisa dihapus dengan tombol delete

**Tab Ditolak** (UMKM yang rejected)
- UMKM ini TIDAK tampil di beranda
- Bisa di-approve kembali
- Bisa dihapus

## Struktur File Utama

```
app/
├── layout.tsx     ← Root layout
└── page.tsx       ← Main page (home)

components/
├── HomePage.tsx   ← Beranda (hanya approved)
├── AdminPage.tsx  ← Admin panel (approval system)
├── DetailPage.tsx ← Detail UMKM
└── Navbar.tsx     ← Navigation (dengan badge)

lib/
├── types.ts       ← Interfaces (UMKM dengan status)
└── mockData.ts    ← Data dummy (semua approved)
```

## Fitur Approval System ⭐

### Alur Kerja
```
Tambah UMKM
    ↓
[Status: Pending] → Badge muncul di Admin button
    ↓
Admin Review
    ↓
Setujui? → [Status: Approved] → Tampil di beranda ✅
    ↓
Tolak?   → [Status: Rejected] → Tidak tampil ❌
```

### Status UMKM
- **Pending**: Menunggu approval (warna kuning)
- **Approved**: Disetujui & tampil di beranda (warna hijau)
- **Rejected**: Ditolak & tidak tampil (warna merah)

## Kustomisasi

### Ubah Warna Tema
Edit `/styles/globals.css`:
```css
@theme {
  --color-primary: #16a34a; /* Ganti dengan warna pilihan */
}
```

### Tambah Kategori
Edit `/lib/types.ts`:
```typescript
export type CategoryFilter = 
  "Semua" | "Makanan" | "Minuman" | "Jasa" | "Kerajinan" | "Baru";
```

### Google Maps API
1. Dapatkan API key dari Google Cloud Console
2. Buat file `.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
   ```
3. Edit `/components/DetailPage.tsx`, uncomment bagian iframe

## Build untuk Production

```bash
# Build aplikasi
npm run build

# Test production build
npm start

# Deploy ke Vercel
vercel deploy
```

## Troubleshooting

### Port 3000 sudah digunakan?
```bash
npm run dev -- -p 3001
```

### Error "Module not found"?
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors?
```bash
npm run type-check
```

## Testing Approval Flow

1. Buka halaman **Admin**
2. Tambah UMKM baru via form
3. Lihat UMKM masuk ke tab **Pending**
4. Lihat badge merah muncul di button Admin (angka 1)
5. Klik **Setujui** pada UMKM
6. UMKM pindah ke tab **Disetujui**
7. Badge hilang (jika tidak ada pending lagi)
8. Buka halaman **Beranda**
9. UMKM yang disetujui tampil di grid ✅

## Dokumentasi Lengkap

- **README.md** - Dokumentasi utama & features
- **MIGRATION.md** - Penjelasan konversi React → Next.js
- **DEPLOYMENT.md** - Panduan deploy (Vercel/VPS/Docker)
- **STRUCTURE.md** - Struktur aplikasi detail
- **QUICK_START.md** - File ini

## Demo Credentials

Tidak ada sistem login (untuk saat ini).
Semua orang bisa akses halaman Admin.

💡 **Tip**: Untuk produksi, tambahkan authentication!

## Next Steps

1. ✅ Aplikasi sudah jalan
2. 🔄 Ganti mock data dengan database
3. 🔐 Tambah authentication untuk admin
4. 📤 Setup image upload (Cloudinary/Supabase Storage)
5. 🗺️ Integrasi Google Maps
6. 🚀 Deploy ke Vercel

---

**Framework**: Next.js 14 + TypeScript  
**Styling**: Tailwind CSS v4  
**UI Components**: shadcn/ui  
**Status**: ✅ Ready to Use!

Selamat menggunakan BRANIMULAI! 🎉
