import Image from "next/image";

type ModalType = {
  setIsModal: (value: boolean) => void;
  url: string;
}

const ModalBox: React.FC<ModalType> = ({ setIsModal, url }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-7xl">
        <Image width={500} height={500} className="object-contain h-[500px]" src={
          // Base 64 image of the url
          url
        } alt="Image" />
      </div>
      <button
        className="my-5 w-auto px-8 h-10 bg-orange-500 text-white rounded-full shadow hover:shadow-lg font-semibold"
        onClick={() => setIsModal(false)}
      >
        Close
      </button>
    </div>
  );
};

export default ModalBox;