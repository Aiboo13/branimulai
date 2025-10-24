"use client";

import { useState } from "react";
import { UMKM, CategoryFilter } from "../lib/types";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Trash2, Plus, CheckCircle, XCircle, Clock } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface AdminPageProps {
  umkmList: UMKM[];
  onAddUMKM: (umkm: Omit<UMKM, "id" | "createdAt">) => void;
  onDeleteUMKM: (id: string) => void;
  onApproveUMKM: (id: string) => void;
  onRejectUMKM: (id: string) => void;
}

export function AdminPage({ umkmList, onAddUMKM, onDeleteUMKM, onApproveUMKM, onRejectUMKM }: AdminPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Makanan" as string,
    description: "",
    address: "",
    lat: "",
    lng: "",
    photoUrl: "",
    phone: "",
    whatsapp: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.address || !formData.lat || !formData.lng || !formData.photoUrl) {
      toast.error("Mohon lengkapi semua field yang wajib diisi");
      return;
    }

    const newUMKM: Omit<UMKM, "id" | "createdAt"> = {
      name: formData.name,
      category: formData.category,
      description: formData.description,
      address: formData.address,
      coordinates: {
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng),
      },
      photos: [formData.photoUrl],
      phone: formData.phone || undefined,
      whatsapp: formData.whatsapp || undefined,
      status: "pending",
    };

    onAddUMKM(newUMKM);
    
    // Reset form
    setFormData({
      name: "",
      category: "Makanan",
      description: "",
      address: "",
      lat: "",
      lng: "",
      photoUrl: "",
      phone: "",
      whatsapp: "",
    });

    toast.success("UMKM berhasil ditambahkan! Menunggu persetujuan.");
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus "${name}"?`)) {
      onDeleteUMKM(id);
      toast.success("UMKM berhasil dihapus");
    }
  };

  const handleApprove = (id: string, name: string) => {
    onApproveUMKM(id);
    toast.success(`"${name}" telah disetujui dan ditampilkan di beranda`);
  };

  const handleReject = (id: string, name: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menolak "${name}"?`)) {
      onRejectUMKM(id);
      toast.error(`"${name}" telah ditolak`);
    }
  };

  const pendingUMKM = umkmList.filter((u) => u.status === "pending");
  const approvedUMKM = umkmList.filter((u) => u.status === "approved");
  const rejectedUMKM = umkmList.filter((u) => u.status === "rejected");

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8">Panel Admin</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Form Add UMKM */}
          <Card>
            <CardHeader>
              <h2>Tambah UMKM Baru</h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nama UMKM *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Warung Makan Bu Yanti"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Kategori *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Makanan">Makanan</SelectItem>
                      <SelectItem value="Minuman">Minuman</SelectItem>
                      <SelectItem value="Jasa">Jasa</SelectItem>
                      <SelectItem value="Kerajinan">Kerajinan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Deskripsi *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Ceritakan tentang UMKM Anda..."
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Alamat *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Jl. Contoh No. 123, Jakarta"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lat">Latitude *</Label>
                    <Input
                      id="lat"
                      type="number"
                      step="any"
                      value={formData.lat}
                      onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                      placeholder="-6.2088"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lng">Longitude *</Label>
                    <Input
                      id="lng"
                      type="number"
                      step="any"
                      value={formData.lng}
                      onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                      placeholder="106.8456"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="photoUrl">URL Foto *</Label>
                  <Input
                    id="photoUrl"
                    type="url"
                    value={formData.photoUrl}
                    onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                    placeholder="https://example.com/photo.jpg"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="081234567890"
                  />
                </div>

                <div>
                  <Label htmlFor="whatsapp">WhatsApp (dengan kode negara)</Label>
                  <Input
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="6281234567890"
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah UMKM
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h2>Statistik</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <Clock className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                      <p className="text-yellow-900">{pendingUMKM.length}</p>
                      <p className="text-yellow-700">Pending</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <p className="text-green-900">{approvedUMKM.length}</p>
                      <p className="text-green-700">Disetujui</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                      <XCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
                      <p className="text-red-900">{rejectedUMKM.length}</p>
                      <p className="text-red-700">Ditolak</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <p className="text-muted-foreground mb-3">Per Kategori (Disetujui):</p>
                    {["Makanan", "Minuman", "Jasa", "Kerajinan"].map((cat) => {
                      const count = approvedUMKM.filter((u) => u.category === cat).length;
                      return (
                        <div key={cat} className="flex justify-between items-center mb-2">
                          <span>{cat}</span>
                          <Badge variant="secondary">{count}</Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <h4 className="text-green-800 mb-2">Petunjuk Penggunaan</h4>
                <ul className="text-green-700 space-y-1 list-disc list-inside">
                  <li>Isi semua field yang bertanda *</li>
                  <li>UMKM baru berstatus "Pending"</li>
                  <li>Setujui UMKM untuk ditampilkan</li>
                  <li>Format WhatsApp: 62 + nomor tanpa 0</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs for Different Status */}
        <Card>
          <CardHeader>
            <h2>Kelola UMKM</h2>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="pending">
                  Pending ({pendingUMKM.length})
                </TabsTrigger>
                <TabsTrigger value="approved">
                  Disetujui ({approvedUMKM.length})
                </TabsTrigger>
                <TabsTrigger value="rejected">
                  Ditolak ({rejectedUMKM.length})
                </TabsTrigger>
              </TabsList>

              {/* Pending Tab */}
              <TabsContent value="pending">
                {pendingUMKM.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nama</TableHead>
                          <TableHead>Kategori</TableHead>
                          <TableHead>Alamat</TableHead>
                          <TableHead>Tanggal</TableHead>
                          <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingUMKM.map((umkm) => (
                          <TableRow key={umkm.id}>
                            <TableCell>{umkm.name}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{umkm.category}</Badge>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">{umkm.address}</TableCell>
                            <TableCell>
                              {new Date(umkm.createdAt).toLocaleDateString('id-ID')}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleApprove(umkm.id, umkm.name)}
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Setujui
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleReject(umkm.id, umkm.name)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Tolak
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Tidak ada UMKM yang menunggu persetujuan
                  </div>
                )}
              </TabsContent>

              {/* Approved Tab */}
              <TabsContent value="approved">
                {approvedUMKM.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nama</TableHead>
                          <TableHead>Kategori</TableHead>
                          <TableHead>Alamat</TableHead>
                          <TableHead>Tanggal</TableHead>
                          <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {approvedUMKM.map((umkm) => (
                          <TableRow key={umkm.id}>
                            <TableCell>{umkm.name}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{umkm.category}</Badge>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">{umkm.address}</TableCell>
                            <TableCell>
                              {new Date(umkm.createdAt).toLocaleDateString('id-ID')}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(umkm.id, umkm.name)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Belum ada UMKM yang disetujui
                  </div>
                )}
              </TabsContent>

              {/* Rejected Tab */}
              <TabsContent value="rejected">
                {rejectedUMKM.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nama</TableHead>
                          <TableHead>Kategori</TableHead>
                          <TableHead>Alamat</TableHead>
                          <TableHead>Tanggal</TableHead>
                          <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rejectedUMKM.map((umkm) => (
                          <TableRow key={umkm.id}>
                            <TableCell>{umkm.name}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{umkm.category}</Badge>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">{umkm.address}</TableCell>
                            <TableCell>
                              {new Date(umkm.createdAt).toLocaleDateString('id-ID')}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleApprove(umkm.id, umkm.name)}
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Setujui
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDelete(umkm.id, umkm.name)}
                                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Tidak ada UMKM yang ditolak
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}