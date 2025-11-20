import React, { createContext, useContext, useState } from "react";
import MessageSuccessModal from "@/components/Modal/MessageSuccess";
import MessageErrorModal from "@/components/Modal/MessageError";
import MessageInfoModal from "@/components/Modal/MessageInfo";

type ModalType = "success" | "error" | "info" | null;

type ModalState = { open: ModalType; message: string; subMessage?: string; onAction?: () => void,onClose?: () => void };

type ModalContextType = {
  modal: ModalState;
  setModal: (modal: ModalState) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState<ModalState>({ open: null, message: "", subMessage: "" });

  const ModalComponent = {
    success: MessageSuccessModal,
    error: MessageErrorModal,
    info: MessageInfoModal,
  }[modal.open || "success"];

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
      {modal.open && (
        <ModalComponent
          onAction={modal.onAction}
          message={modal.message}
          subMessage={modal.subMessage}
          visible
          handleCloseModal={() => {
            setModal({ open: null, message: "" });
            modal.onClose?.();
          }}
        />
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
