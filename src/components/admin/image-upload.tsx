"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ImageSquare, Trash, UploadSimple, WarningCircle } from "@phosphor-icons/react";

const MAX_BYTES = 12 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/gif"];
// Every image is saved at this exact 16:9 size, matching the frame the site
// shows it in, so nothing gets cropped unexpectedly after upload.
const OUT_W = 1280;
const OUT_H = 720;

type Mode = "fill" | "fit";

function draw(
  canvas: HTMLCanvasElement,
  img: ImageBitmap,
  mode: Mode,
  zoom: number,
  cx: number,
  cy: number,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const W = canvas.width;
  const H = canvas.height;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);

  if (mode === "fit") {
    const s = Math.min(W / img.width, H / img.height);
    const w = img.width * s;
    const h = img.height * s;
    ctx.drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
    return;
  }

  const s = Math.max(W / img.width, H / img.height) * zoom;
  const vw = W / s;
  const vh = H / s;
  ctx.drawImage(img, cx * img.width - vw / 2, cy * img.height - vh / 2, vw, vh, 0, 0, W, H);
}

function clampCenter(img: ImageBitmap, zoom: number, cx: number, cy: number) {
  const s = Math.max(OUT_W / img.width, OUT_H / img.height) * zoom;
  const halfX = OUT_W / s / 2 / img.width;
  const halfY = OUT_H / s / 2 / img.height;
  return {
    cx: Math.min(1 - halfX, Math.max(halfX, cx)),
    cy: Math.min(1 - halfY, Math.max(halfY, cy)),
  };
}

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

  const [source, setSource] = useState<{ bitmap: ImageBitmap; fileName: string } | null>(null);
  const [mode, setMode] = useState<Mode>("fill");
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState({ cx: 0.5, cy: 0.5 });

  const inputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);
  const dragStart = useRef<{ x: number; y: number; cx: number; cy: number } | null>(null);

  useEffect(() => {
    if (source && previewRef.current) {
      draw(previewRef.current, source.bitmap, mode, zoom, center.cx, center.cy);
    }
  }, [source, mode, zoom, center]);

  const move = useCallback(
    (dxImgFraction: number, dyImgFraction: number) => {
      if (!source) return;
      setCenter((c) => clampCenter(source.bitmap, zoom, c.cx + dxImgFraction, c.cy + dyImgFraction));
    },
    [source, zoom],
  );

  async function openEditor(file: File | undefined) {
    if (!file) return;
    setError("");
    if (!ACCEPTED.includes(file.type)) {
      setError("Use a JPG, PNG, WebP, or GIF image.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("That image is over 12 MB. Choose a smaller one.");
      return;
    }
    try {
      const bitmap = await createImageBitmap(file);
      setSource({ bitmap, fileName: file.name });
      setMode("fill");
      setZoom(1);
      setCenter({ cx: 0.5, cy: 0.5 });
    } catch {
      setError("That image couldn't be opened. Try a different file.");
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function closeEditor() {
    source?.bitmap.close();
    setSource(null);
  }

  async function confirmAndUpload() {
    if (!source) return;
    setError("");
    setUploading(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = OUT_W;
      canvas.height = OUT_H;
      draw(canvas, source.bitmap, mode, zoom, center.cx, center.cy);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/webp", 0.85),
      );
      if (!blob) throw new Error("encode");

      const baseName = source.fileName.replace(/\.[^.]+$/, "") || "image";
      const body = new FormData();
      body.append("file", new File([blob], `${baseName}.webp`, { type: "image/webp" }));

      const res = await fetch("/api/upload", { method: "POST", body });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        setError(data.error ? `Upload failed: ${data.error}` : "The upload failed. Try again.");
        return;
      }
      setUrl(data.url);
      closeEditor();
    } catch {
      setError("The upload failed. Check your connection and try again.");
    } finally {
      setUploading(false);
    }
  }

  const lowRes = source ? source.bitmap.width < 800 : false;

  return (
    <div>
      <span className="mb-1 block text-sm font-medium text-card-foreground">{label}</span>
      <input type="hidden" name={name} value={url} />

      {source ? (
        <div className="rounded-md border border-border bg-background p-3">
          <canvas
            ref={previewRef}
            width={640}
            height={360}
            tabIndex={mode === "fill" ? 0 : -1}
            aria-label="Image preview. In fill mode, drag or use the arrow keys to reposition."
            className={`aspect-video w-full max-w-lg touch-none rounded-md border border-border ${
              mode === "fill" ? "cursor-grab active:cursor-grabbing" : ""
            }`}
            onPointerDown={(e) => {
              if (mode !== "fill") return;
              e.currentTarget.setPointerCapture(e.pointerId);
              dragStart.current = { x: e.clientX, y: e.clientY, cx: center.cx, cy: center.cy };
            }}
            onPointerMove={(e) => {
              const start = dragStart.current;
              if (!start || !source) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const s = Math.max(OUT_W / source.bitmap.width, OUT_H / source.bitmap.height) * zoom;
              const outPerCss = OUT_W / rect.width;
              const dx = ((e.clientX - start.x) * outPerCss) / s / source.bitmap.width;
              const dy = ((e.clientY - start.y) * outPerCss) / s / source.bitmap.height;
              setCenter(
                clampCenter(source.bitmap, zoom, start.cx - dx, start.cy - dy),
              );
            }}
            onPointerUp={() => {
              dragStart.current = null;
            }}
            onKeyDown={(e) => {
              if (mode !== "fill") return;
              const step = 0.03;
              if (e.key === "ArrowLeft") move(-step, 0);
              else if (e.key === "ArrowRight") move(step, 0);
              else if (e.key === "ArrowUp") move(0, -step);
              else if (e.key === "ArrowDown") move(0, step);
              else return;
              e.preventDefault();
            }}
          />

          <fieldset className="mt-3">
            <legend className="text-xs font-medium text-muted-foreground">How should it fit?</legend>
            <div className="mt-1 flex flex-wrap gap-4 text-sm text-card-foreground">
              <label className="flex cursor-pointer items-center gap-1.5">
                <input
                  type="radio"
                  name={`${name}-mode`}
                  checked={mode === "fill"}
                  onChange={() => setMode("fill")}
                  className="cursor-pointer accent-[var(--color-primary)]"
                />
                Fill the frame (crop edges)
              </label>
              <label className="flex cursor-pointer items-center gap-1.5">
                <input
                  type="radio"
                  name={`${name}-mode`}
                  checked={mode === "fit"}
                  onChange={() => setMode("fit")}
                  className="cursor-pointer accent-[var(--color-primary)]"
                />
                Fit the whole image
              </label>
            </div>
          </fieldset>

          {mode === "fill" ? (
            <div className="mt-3 max-w-lg">
              <label htmlFor={`${name}-zoom`} className="text-xs font-medium text-muted-foreground">
                Zoom
              </label>
              <input
                id={`${name}-zoom`}
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={zoom}
                onChange={(e) => {
                  const z = Number(e.target.value);
                  setZoom(z);
                  setCenter((c) => clampCenter(source.bitmap, z, c.cx, c.cy));
                }}
                className="w-full cursor-pointer accent-[var(--color-primary)]"
              />
              <p className="text-xs text-muted-foreground">
                Drag the picture (or use the arrow keys) to choose what stays in view.
              </p>
            </div>
          ) : (
            <p className="mt-3 text-xs text-muted-foreground">
              The whole picture is shown on a white background. Best for logos and posters with text.
            </p>
          )}

          {lowRes && (
            <p className="mt-3 flex items-center gap-1 text-xs text-amber-800">
              <WarningCircle size={14} weight="fill" aria-hidden="true" />
              This image is small ({source.bitmap.width}px wide) and may look blurry. A wider
              picture (1200px or more) looks sharper.
            </p>
          )}

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={confirmAndUpload}
              disabled={uploading}
              className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-semibold text-[var(--color-on-primary)] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {uploading ? "Uploading…" : "Use this image"}
            </button>
            <button
              type="button"
              onClick={closeEditor}
              disabled={uploading}
              className="cursor-pointer rounded-md border border-border px-4 py-2 text-sm font-medium text-card-foreground hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : url ? (
        <div className="flex items-start gap-4 rounded-md border border-border bg-background p-3">
          {/* eslint-disable-next-line @next/next/no-img-element -- blob host varies */}
          <img src={url} alt="Selected cover" className="aspect-video w-40 rounded-md object-cover" />
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex cursor-pointer items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-card-foreground hover:bg-muted"
            >
              <UploadSimple size={16} aria-hidden="true" />
              Replace image
            </button>
            <button
              type="button"
              onClick={() => setUrl("")}
              className="flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/10"
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
            openEditor(e.dataTransfer.files[0]);
          }}
          className={`flex w-full cursor-pointer flex-col items-center gap-2 rounded-md border-2 border-dashed px-4 py-8 text-sm transition-colors ${
            dragging ? "border-primary bg-primary/5" : "border-border hover:bg-muted"
          }`}
        >
          <ImageSquare size={28} className="text-primary" aria-hidden="true" />
          <span className="font-medium text-card-foreground">
            Drag an image here, or click to choose
          </span>
          <span className="text-xs text-muted-foreground">
            JPG, PNG, WebP or GIF, up to 12 MB. You can adjust the framing next.
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => openEditor(e.target.files?.[0])}
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
