import { useImperativeHandle, useRef } from "react";
import sytles from "./styles.module.scss";
import { createPortal } from "react-dom";

type Props = {
  ref: React.Ref<{
    showModal: () => void;
    close: () => void;
  }>;
};

const CustomDialog: React.FC<Props> = ({ ref }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      showModal: () => {
        if (dialogRef.current) {
          dialogRef.current.showModal();
        }
      },
      close: () => {
        if (dialogRef.current) {
          dialogRef.current.close();
        }
      },
    }),
    []
  );

  return (
    <>
      {createPortal(
        <dialog ref={dialogRef}>
          aaaaa
          <button
            onClick={() => {
              if (dialogRef.current) {
                dialogRef.current.close();
              }
            }}
          >
            close
          </button>
        </dialog>,
        document.body
      )}
    </>
  );
};

export default CustomDialog;
