"use client";

import { UMKM } from "../lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin, Phone } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface UMKMCardProps {
  umkm: UMKM;
  onViewDetail: (id: string) => void;
}

export function UMKMCard({ umkm, onViewDetail }: UMKMCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onViewDetail(umkm.id)}>
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={umkm.photos[0]}
          alt={umkm.name}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
          {umkm.category}
        </Badge>
      </div>
      
      <CardHeader className="pb-3">
        <h3>{umkm.name}</h3>
      </CardHeader>
      
      <CardContent className="pb-3">
        <p className="text-muted-foreground line-clamp-2 mb-3">
          {umkm.description}
        </p>
        <div className="flex items-start gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p className="line-clamp-1">{umkm.address}</p>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button
        className="w-full bg-primary hover:bg-green-700"
        onClick={(x: React.MouseEvent<HTMLButtonElement>) => {
          x.stopPropagation();
          onViewDetail(umkm.id);
        }}
      >
          Lihat Detail
        </Button>
      </CardFooter>
    </Card>
  );
}