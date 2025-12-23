"use client";
import Tabs from "@/components/Tabs";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#4A4A4A] flex justify-center py-16">
      <div className="w-full max-w-4xl bg-white rounded-2xl px-12 py-10">
        <Tabs />
      </div>
    </main>
  );
}
