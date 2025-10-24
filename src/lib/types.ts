export interface UMKM {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  photos: string[];
  phone?: string;
  whatsapp?: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
}

export type CategoryFilter = "Semua" | "Makanan" | "Minuman" | "Jasa" | "Kerajinan";