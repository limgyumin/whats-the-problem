import { useCallback, useRef } from "react";
import { uploadImage } from "lib/image";
import { IUploadResult } from "types/upload/upload.result";
import { useToasts } from "react-toast-notifications";

const useUpload = () => {
  const { addToast } = useToasts();

  const imageRef = useRef<HTMLInputElement>(null);

  const initImageHandler = useCallback((): void => {
    imageRef.current.value = "";
  }, [imageRef]);

  const uploadHandler = useCallback(
    async (files: FileList): Promise<string> => {
      try {
        if (!files || !files.length) return;

        const file: File = files[0];

        const { data }: IUploadResult = await uploadImage(file);
        const url: string = data.files[0];
        initImageHandler();

        return url;
      } catch (error) {
        addToast("이미지를 업로드하는 중에 오류가 발생했어요...", {
          appearance: "error",
        });
      }
    },
    [addToast, initImageHandler]
  );

  return {
    imageRef,
    uploadHandler,
  };
};

export default useUpload;
