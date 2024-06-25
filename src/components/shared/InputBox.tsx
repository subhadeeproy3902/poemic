"use client";

import { useRef, useState } from "react";
import { Trash, MoveRight } from "lucide-react";
import { Button } from "../ui/button";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import ModalBox from "../ui/modal";
import api from "@/lib/api";
import { toast } from "sonner";
import { useFormContext } from "@/context/formContext";
import { useRouter } from "next/navigation";

type ImageData = {
  url: string;
}

export function InputBox() {
  const placeholders = ["Your image has a verse hidden in it"];
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const [imageIsThere, setImageIsThere] = useState<boolean>(false);
  const [isPoem, setPoem] = useState<string>("");
  const { formData, updateForm } = useFormContext();
  const router = useRouter();

  const [mainImage, setMainImage] = useState<string>("" as string);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateForm("text", e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.text || formData.images.length === 0) {
      toast.warning('Missing form data');
    } else {
      const generatePoemPromise = async () => {
        try {
          const prompt: string = `Using the provided images and text, write a rhyming poem with the following specifications:
            - Title: Create an engaging title for the poem.
            - Poem: Write a 4 paragraph poem, each line strictly containing 6 to 7 words.
            Key Points:
            - The title should not be more than 26 character long and more than 5 words.
            - The poem should be engaging and creative.
            - The poem should be rhyming.
            - The poem should be well-structured.
            - The poem must be of 4 paragraphs, each line strictly containing 6 to 7 words.
            Return the result as a JSON object with the following structure:
            {
              "title": "Your Poem Title",
              "poem": "First paragraph of the poem.\nSecond paragraph of the poem.\nThird paragraph of the poem.",
              "description": "A brief description of the poem in 150 to 200 words."
            }`;

          const poem = await api.generate(prompt + formData.text, formData.images);
          setPoem(poem);
          return poem;
        } catch (error) {
          throw new Error('Error generating poem');
        }
      };

      toast.promise(generatePoemPromise(), {
        loading: 'Redirecting',
        success: (data) => {
          router.push(`/poem?data=${encodeURIComponent(JSON.stringify(data))}`);
          return "Success";
        },
        error: (error) => {
          return 'Error generating poem';
        },
      });
    }
  };

  const openFileExplorer = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setMainImage(URL.createObjectURL(files[0]));
      const newImageData: ImageData[] = [];
      const readers = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();

          readers.push(new Promise<void>((resolve) => {
            reader.onload = () => {
              const base64 = (reader.result as string).split(',')[1];
              newImageData.push({ url: base64 as string });
              resolve();
            };
            reader.readAsDataURL(file);
          }));
        } else {
          toast.error("Please select an image file.");
        }
      }

      Promise.all(readers).then(() => {
        setImageData(newImageData);
        setImageIsThere(true);
        // {0: {url: "base64"}}
        updateForm("images", newImageData.map((image) => image.url));
      });
    }
  };

  const removeFile = () => {
    setImageData([]);
    updateForm("images", []);
    setImageIsThere(false);
  };

  const [isModal, setIsModal] = useState<boolean>(false);
  const viewImage = () => {
    setIsModal(true);
  };

  return (
    <div className="flex flex-col justify-center mt-4 items-center px-4">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />

      {!imageIsThere ? (
        <Button
          className="bg-gradient-to-tr from-amber-500 via-orange-500 to-orange-600 my-12 shadow-2xl shadow-orange-500 rounded-xl hover:scale-110 transition-all duration-200 ease-in-out literata text-md flex flex-row items-center gap-2 py-5 px-4"
          style={{ boxShadow: "0 0 40px #f97316" }}
          onClick={openFileExplorer}
        >
          Add Image <MoveRight size={24} className="mt-1" />
        </Button>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center sm:flex-row gap-6 my-12">
            <Button
              className="bg-transparent border-2 border-red-500 flex justify-center items-center gap-2 rounded-lg text-red-600 text-md hover:bg-red-500 hover:text-white tansition-all ease-in-out duration-200"
              onClick={removeFile}
            >
              Remove <Trash size={20} />
            </Button>

            <Button
              className="bg-transparent border-2 border-orange-200 px-12 flex justify-center rounded-full items-center gap-2 text-md hover:scale-105 bg-gradient-to-bl from-amber-200 via-orange-300 text-orange-800 literata font-semibold shadow-lg shadow-orange-300 to-orange-400 transition-all ease-in-out duration-300"
              onClick={viewImage}
            >
              View Image
            </Button>

            {isModal && (
              <>
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="bg-transparent p-6 rounded-lg relative">
                    <ModalBox setIsModal={setIsModal} url={
                      mainImage
                    } />
                  </div>
                </div>
                <div
                  className="fixed inset-0 bg-black opacity-50 z-40"
                  onClick={() => setIsModal(false)}
                ></div>
              </>
            )}
          </div>
        </>
      )}

      <input
        type="file"
        // Accept image files only except webp
        accept="image/png, image/jpeg, image/jpg"
        ref={inputFileRef}
        className="hidden"
        onChange={
          handleFileSelection
        }
      />
    </div>
  );
}
