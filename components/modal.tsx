"use client";

import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

export function Modal({
  children,
  title,
  onClose,
  className = "",
}: {
  children: ReactNode;
  title: string;
  onClose: () => void;
  className?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = useRef(onClose);

  useEffect(() => { close.current = onClose; }, [onClose]);

  useEffect(() => {
    const element = dialog.current;
    const active = document.activeElement as HTMLElement | null;
    element?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = previous;
      active?.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      aria-label={title}
      className={`modal ${className}`}
      onCancel={(event) => { event.preventDefault(); close.current(); }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close.current();
      }}
    >
      <div className="modal-inner">
        <button className="icon-button modal-close" onClick={onClose} aria-label="Cerrar ventana"><X size={22} /></button>
        {children}
      </div>
    </dialog>
  );
}
