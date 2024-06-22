"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { Download, MessageCircle, MoveRight, Twitter } from "lucide-react";
import html2canvas from "html2canvas";
import Link from "next/link";

export function PoemForm() {

  const [title, setTitle] = useState("");
  const [poem, setPoem] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const queryData = queryParams.get("data");

    // If there is no query data, then redirect to not found page
    if (!queryData) {
      window.location.href = "/not-found";
    }

    if (queryData) {
      try {
        const deserializedData = JSON.parse(decodeURIComponent(queryData));
        const titleMatch = deserializedData.match(/"title": "([^"]+)"/);
        const title = titleMatch ? titleMatch[1] : "";
        const poemMatch = deserializedData.match(/"poem": "([^"]+)"/);
        const poem = poemMatch ? poemMatch[1] : "";
        const descriptionMatch = deserializedData.match(/"description": "([^"]+)"/);
        const description = descriptionMatch ? descriptionMatch[1] : "";
        setTitle(title);
        setPoem(poem);
        setDescription(description);
      } catch (error) {
        console.error("Error parsing query data", error);
      }
    }
  }, []);

  const [hue, setHue] = useState(2);

  const themeChange = (theme: string) => {
    switch (theme) {
      case "gray":
        setHue(1);
        break;
      case "orange":
        setHue(2);
        break;
      case "blue":
        setHue(3);
        break;
      case "green":
        setHue(5);
        break;
      case "purple":
        setHue(4);
        break;
      default:
        setHue(2);
        break;
    }
  };

  const [titleError, setTitleError] = useState('');

  const handleTitleChange = (e:
    React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const inputValue = e.target.value;
    let words = inputValue.split(' ').filter(Boolean);
    let isOverLimit = false;

    if (words.length > 5) {
      isOverLimit = true;
      setTitleError('Title must be no more than 5 words.');
    } else if (inputValue.length > 26) {
      isOverLimit = true;
      setTitleError('Title must be no more than 26 characters.');
    } else {
      setTitleError('');
    }

    if (!isOverLimit) {
      setTitle(inputValue);
    }
  };

  const [authorName, setAuthorName] = useState('Poemic');
  const [authorNameError, setAuthorNameError] = useState('');

  const handleAuthorNameChange = (e:
    React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    // If its more than 20 characters, don't update the state
    if (e.target.value.length > 30) {
      setAuthorNameError('Author name must be less than 30 characters.');
    }
    else if (e.target.value.length === 0) {
      setAuthorNameError('Author name must be more than 3 characters.');
    }
    else {
      setAuthorNameError('');
      setAuthorName(e.target.value);
    }
  };

  const convertDivToImage = async () => {
    const poemWriteUp = document.getElementById('poem-image');
    if (poemWriteUp) {
      const canvas = await html2canvas(poemWriteUp);
      const image = canvas.toDataURL('image/png');
      return image;
    }
  }

  const downloadAsImage = () => {
    convertDivToImage().then((image) => {
      const link = document.createElement('a');
      link.href = image || '';
      link.download = `${title}.png`;
      link.click();
    });
  }

  const shareToWhatsapp = async () => {
    // Send the poem with the title and the description in nice format to whatsapp
    const poemText = `Title - ${title}\n\n${poem}\n\n- ${authorName}\n\nDescription - ${description}`;
    const url = `https://wa.me/?text=${encodeURIComponent(poemText)}`;
    window.open(url, '_blank');
  };

  const moveToHome = () => {
    window.location.href = '/';
  }


  return (
    <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2 gap-12 py-10 px-2 md:px-20 w-full">
      <div className="flex flex-col gap-4 justify-center">
        <div className="bg-gradient-to-br from-orange-200/60 to-orange-500/10 backdrop-blur-2xl sm:px-8 px-4 rounded-md py-8">
          <h2 className="text-2xl font-bold mb-8 literata">What your image says </h2>
          <div className="space-y-5">
            <div className="flex flex-col text-left justify-start gap-2">
              <span className="font-medium">Title:</span>
              <Input type="text" placeholder="Poem Title" className="w-full via-slate-100 bg-gradient-to-b from-slate-100 to-orange-200"
                value={title}
                onChange={handleTitleChange}
              />

              {titleError && <div className="text-red-500 text-sm">{titleError}</div>}
            </div>

            <div className="flex flex-col text-left justify-start gap-2">
              <span className="font-medium">Description:</span>
              <Textarea
                value={description}
                readOnly
                className="w-full h-40 resize-none bg-gradient-to-b from-slate-100 via-slate-100 to-orange-200"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Theme:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="w-6 h-6 rounded-full bg-orange-500 hover:ring-2 hover:ring-orange-500"
                  onClick={() => themeChange("orange")}
                />
                <button
                  type="button"
                  className="w-6 h-6 rounded-full bg-blue-500 hover:ring-2 hover:ring-blue-500"
                  onClick={() => themeChange("blue")}
                />
                <button
                  type="button"
                  className="w-6 h-6 rounded-full bg-green-500 hover:ring-2 hover:ring-green-500"
                  onClick={() => themeChange("green")}
                />
                <button
                  type="button"
                  className="w-6 h-6 rounded-full bg-purple-500 hover:ring-2 hover:ring-purple-500"
                  onClick={() => themeChange("purple")}
                />
                <button
                  type="button"
                  className="w-6 h-6 rounded-full bg-gray-700 hover:ring-2 hover:ring-gray-700"
                  onClick={() => themeChange("gray")}
                />
              </div>
            </div>
            <div className="flex flex-col text-left justify-start gap-2">
              <span className="font-medium">Author:</span>
              <Input type="text" placeholder="Your Name" value={authorName} className="w-full via-slate-100 bg-gradient-to-b from-slate-100 to-orange-200" onChange={
                handleAuthorNameChange
              } />

              {authorNameError && <div className="text-red-500 text-sm">{authorNameError}</div>}
            </div>

            <div className="flex flex-wrap justify-start items-center gap-4">
              <Button
                className="bg-orange-500 text-white hover:bg-orange-600"
                onClick={downloadAsImage}
              >
                Download <Download size={18} className="ml-2" />
              </Button>

              <Button
                className="bg-green-500 text-white hover:bg-green-600"
                onClick={shareToWhatsapp}
              >
                Whatsapp <MessageCircle size={18} className="ml-2" />
              </Button>

              <Button onClick={moveToHome} className="bg-blue-500 text-white hover:bg-blue-600">
                New Poem <MoveRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex justify-center">
        <div id="poem-image" className="bg-transparent rounded-md">
          <Image
            src={
              `/poem-bg-${hue}.webp`
            }
            alt="Poem Background"
            width={500}
            height={500}
            className="w-[450px] h-[650px] sm:h-[640px] rounded-md"
          />
          <div
            className="text-black text-center pt-9 sm:pt-12 px-4 sm:px-8 absolute top-0 sm:w-[450px] h-[640px]"
            id="poem-write-up"
          >
            <h2 className="text-3xl mb-6 quinine">
              {title || "Poem Title"}
            </h2>

            <TextGenerateEffect words={poem || "Got no poem for you... So sorry !!.. try again :("} />

            <h3 className="mt-4 text-right font-semibold literata">
              - {authorName}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
