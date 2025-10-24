"use client";

import { UMKM } from "../lib/types";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, MapPin, Phone, MessageCircle, Map } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface DetailPageProps {
  umkm: UMKM;
  onBack: () => void;
}

export function DetailPage({ umkm, onBack }: DetailPageProps) {
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY_HERE&q=${umkm.coordinates.lat},${umkm.coordinates.lng}&zoom=15`;
  
  const handleWhatsApp = () => {
    if (umkm.whatsapp) {
      window.open(`https://wa.me/${umkm.whatsapp}`, '_blank');
    }
  };

  const handleCall = () => {
    if (umkm.phone) {
      window.location.href = `tel:${umkm.phone}`;
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <div className="bg-primary text-white py-6">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-white hover:bg-green-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-white mb-2">{umkm.name}</h1>
              <Badge className="bg-white text-primary">
                {umkm.category}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo Gallery */}
            <Card>
              <CardHeader>
                <h3>Galeri Foto</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {umkm.photos.map((photo, index) => (
                    <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
                      <ImageWithFallback
                        src={photo}
                        alt={`${umkm.name} - Foto ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <h3>Tentang UMKM</h3>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{umkm.description}</p>
              </CardContent>
            </Card>

            {/* Map */}
            <Card>
              <CardHeader>
                <h3>Lokasi</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p>{umkm.address}</p>
                  </div>
                  
                  {/* Map Placeholder */}
                  <div className="relative w-full h-64 bg-muted rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-green-50 to-green-100">
                      <Map className="w-12 h-12 text-primary" />
                      <div className="text-center px-4">
                        <p className="text-muted-foreground mb-2">
                          Koordinat: {umkm.coordinates.lat}, {umkm.coordinates.lng}
                        </p>
                        <p className="text-muted-foreground">
                          Untuk menampilkan peta interaktif, tambahkan Google Maps API key
                        </p>
                      </div>
                    </div>
                    {/* Uncomment when you have Google Maps API key */}
                    {/* <iframe
                      src={googleMapsUrl}
                      className="w-full h-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    /> */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3>Informasi Kontak</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {umkm.phone && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handleCall}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {umkm.phone}
                  </Button>
                )}
                {umkm.whatsapp && (
                  <Button
                    className="w-full justify-start bg-green-500 hover:bg-green-600 text-white"
                    onClick={handleWhatsApp}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat WhatsApp
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3>Detail Tambahan</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-muted-foreground">Kategori</p>
                  <p>{umkm.category}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Bergabung Sejak</p>
                  <p>{new Date(umkm.createdAt).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}