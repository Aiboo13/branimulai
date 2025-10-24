import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./components/HomePage";
import { DetailPage } from "./components/DetailPage";
import { AdminPage } from "./components/AdminPage";
import { UMKM } from "./lib/types";
import { initialUMKMData } from "./lib/mockData";
import { Toaster } from "./components/ui/sonner";

type Page = "home" | "detail" | "admin";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedUMKMId, setSelectedUMKMId] = useState<string | null>(null);
  const [umkmList, setUmkmList] = useState<UMKM[]>(initialUMKMData);

  const handleNavigate = (page: "home" | "admin") => {
    setCurrentPage(page);
    setSelectedUMKMId(null);
  };

  const handleViewDetail = (id: string) => {
    setSelectedUMKMId(id);
    setCurrentPage("detail");
  };

  const handleBack = () => {
    setCurrentPage("home");
    setSelectedUMKMId(null);
  };

  const handleAddUMKM = (umkmData: Omit<UMKM, "id" | "createdAt">) => {
    const newUMKM: UMKM = {
      ...umkmData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setUmkmList([...umkmList, newUMKM]);
  };

  const handleDeleteUMKM = (id: string) => {
    setUmkmList(umkmList.filter((umkm) => umkm.id !== id));
  };

  const handleApproveUMKM = (id: string) => {
    setUmkmList(umkmList.map((umkm) => 
      umkm.id === id ? { ...umkm, status: "approved" as const } : umkm
    ));
  };

  const handleRejectUMKM = (id: string) => {
    setUmkmList(umkmList.map((umkm) => 
      umkm.id === id ? { ...umkm, status: "rejected" as const } : umkm
    ));
  };

  const selectedUMKM = selectedUMKMId
    ? umkmList.find((umkm) => umkm.id === selectedUMKMId)
    : null;

  const pendingCount = umkmList.filter((umkm) => umkm.status === "pending").length;

  return (
    <div className="min-h-screen">
      <Navbar
        currentPage={currentPage === "detail" ? "home" : currentPage}
        onNavigate={handleNavigate}
        pendingCount={pendingCount}
      />
      
      {currentPage === "home" && (
        <HomePage umkmList={umkmList} onViewDetail={handleViewDetail} />
      )}
      
      {currentPage === "detail" && selectedUMKM && (
        <DetailPage umkm={selectedUMKM} onBack={handleBack} />
      )}
      
      {currentPage === "admin" && (
        <AdminPage
          umkmList={umkmList}
          onAddUMKM={handleAddUMKM}
          onDeleteUMKM={handleDeleteUMKM}
          onApproveUMKM={handleApproveUMKM}
          onRejectUMKM={handleRejectUMKM}
        />
      )}

      <Toaster position="top-right" />
    </div>
  );
}