"use client";

import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { ImageSquare, Trash, UploadSimple, WarningCircle } from "@phosphor-icons/react";

const MAX_BYTES = 8 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export function ImageUpload({
  name,
  label,
  initialUrl,
}: {
  name: string;
  label: string;
  initialUrl?: string | null;
}) {
  const [url, setUrl] = useState(initialUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError("");

    if (!ACCEPTED.includes(file.type)) {
      setError("Use a JPG, PNG, WebP, or GIF image.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("That image is over 8 MB. Choose a smaller one.");
      return;
    }

    setUploading(true);
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });
      setUrl(blob.url);
    } catch {
      setError("The upload failed. Check your connection and try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <span className="mb-1 block text-sm font-medium text-card-foreground">{label}</span>
      <input type="hidden" name={name} value={url} />

      {url ? (
        <div className="flex items-start gap-4 rounded-md border border-border bg-background p-3">
          {/* eslint-disable-next-line @next/next/no-img-element -- blob host varies */}
          <img src={url} alt="Selected cover" className="h-24 w-40 rounded-md object-cover" />
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="flex cursor-pointer items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-card-foreground hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
            >
              <UploadSimple size={16} aria-hidden="true" />
              {uploading ? "Uploading…" : "Replace image"}
            </button>
            <button
              type="button"
              onClick={() => setUrl("")}
              disabled={uploading}
              className="flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Trash size={16} aria-hidden="true" />
              Remove image
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFile(e.dataTransfer.files[0]);
          }}
          disabled={uploading}
          className={`flex w-full cursor-pointer flex-col items-center gap-2 rounded-md border-2 border-dashed px-4 py-8 text-sm transition-colors disabled:cursor-not-allowed ${
            dragging ? "border-primary bg-primary/5" : "border-border hover:bg-muted"
          }`}
        >
          <ImageSquare size={28} className="text-primary" aria-hidden="true" />
          <span className="font-medium text-card-foreground">
            {uploading ? "Uploading…" : "Drag an image here, or click to choose"}
          </span>
          <span className="text-xs text-muted-foreground">JPG, PNG, WebP or GIF, up to 8 MB</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      <p role="status" aria-live="polite" className="mt-1 min-h-4 text-xs text-destructive">
        {error && (
          <span className="flex items-center gap-1">
            <WarningCircle size={12} weight="fill" aria-hidden="true" />
            {error}
          </span>
        )}
      </p>
    </div>
  );
}
