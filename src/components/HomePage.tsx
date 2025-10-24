"use client";

import { useState } from "react";
import { UMKM, CategoryFilter } from "../lib/types";
import { UMKMCard } from "./UMKMCard";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

interface HomePageProps {
  umkmList: UMKM[];
  onViewDetail: (id: string) => void;
}

const categories: CategoryFilter[] = ["Semua", "Makanan", "Minuman", "Jasa", "Kerajinan"];

export function HomePage({ umkmList, onViewDetail }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("Semua");

  // Filter hanya UMKM yang sudah di-approve
  const approvedUMKM = umkmList.filter((umkm) => umkm.status === "approved");

  const filteredUMKM = approvedUMKM.filter((umkm) => {
    const matchesSearch = umkm.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Semua" || umkm.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-white mb-4">Direktori UMKM Lokal</h1>
          <p className="text-green-50 mb-8 max-w-2xl mx-auto">
            Temukan dan dukung UMKM lokal di sekitar Anda. Jelajahi berbagai produk dan layanan dari pengusaha lokal.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Cari nama UMKM..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-white border-0"
            />
          </div>
        </div>
      </div>

      {/* Filter & Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-primary hover:bg-green-700" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-muted-foreground mb-4">
          Menampilkan {filteredUMKM.length} UMKM
        </p>

        {/* UMKM Grid */}
        {filteredUMKM.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUMKM.map((umkm) => (
              <UMKMCard key={umkm.id} umkm={umkm} onViewDetail={onViewDetail} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Tidak ada UMKM yang ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
}