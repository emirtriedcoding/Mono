"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useCallback } from "react";

import { Masonry } from "react-plock";
import { Skeleton } from "../ui/skeleton";
import { Download, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Image {
  id: string;
  url: string;
  key: string;
}

const Gallery = () => {
  const queryClient = useQueryClient();

  const { data: images, isLoading } = useQuery<Image[]>({
    queryKey: ["gallery"],
    queryFn: () => axios.get("/api/gallery").then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (imageId: string) => axios.delete(`/api/gallery/${imageId}`),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["gallery"],
      });
      toast.success("تصویر با موفقیت حذف شد", {
        id: "deleteImage",
      });
    },
  });

  const handleDelete = useCallback(
    (imageId: string) => {
      toast.loading("در حال پاک کردن تصویر ...", {
        id: "deleteImage",
      });
      mutation.mutate(imageId);
    },
    [mutation]
  );

  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-5 gap-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-[350px] w-full" />
        ))}
      </div>
    );
  }

  return (
    <Masonry
      items={images || []}
      config={{
        columns: [1, 3, 5],
        gap: [24, 12, 5],
        media: [0, 0, 0],
      }}
      render={(item) => (
        <div className="relative group" key={item.id}>
          <img
            src={item.url}
            style={{ width: "100%", height: "auto", borderRadius: "15px" }}
            className="group-hover:opacity-80 transition-all duration-300 ease-in-out cursor-pointer"
          />
          <span className="absolute cursor-pointer transition top-3 right-3 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300 ease-in-out">
            <a href={item.url} download>
              <Download strokeWidth={1} size={20} />
            </a>
          </span>
          <span
            onClick={() => handleDelete(item.id)}
            className="absolute cursor-pointer transition top-10 right-3 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-500 ease-in-out"
          >
            <Trash2 strokeWidth={1} size={20} />
          </span>
        </div>
      )}
    />
  );
};

export default Gallery;
