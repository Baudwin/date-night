"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Flower2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function RomanticStorySite() {

  useEffect(() => {
  const savedAnswer = localStorage.getItem("herAnswer");
  if (savedAnswer === "yes") {
    setFinalChoice("yes");
  }
}, []);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

const toggleMusic = () => {
  if (!audioRef.current) return;

  if (isPlaying) {
    audioRef.current.pause();
    setIsPlaying(false);
  } else {
    if (!hasStarted) {
      audioRef.current.currentTime = 52;
      setHasStarted(true);
    }
    audioRef.current.play();
    setIsPlaying(true);
  }
};


  const pages = useMemo(
    () => [
      {
        id: "greeting",
        title: "",
        lines: [
          { type: "hero", text: "Hello." },
          { type: "hero", text: "Mhoro." },
          { type: "hero", text: "Olá." },
          {
            type: "body",
            text: "I made a little something for you… just because you're special and I felt like you deserved it.",
          },
        ],
      },
      {
        id: "homes",
        title: "Your origin.",
        lines: [
          {
            type: "body",
            text: "I think it’s really beautiful how you carry two homes in you — Mozambique, where you were born, and Zimbabwe, where your roots are.",
          },
          {
            type: "body",
            text: "It somehow makes you feel even more unique… like you belong to more than one place.",
          },
        ],
      },
      {
        id: "languages",
        title: "Knowing three languages is a huge flex.",
        lines: [
          {
            type: "body",
            text: "The fact that you speak Shona, Portuguese, and English is honestly so attractive.",
          },
          {
            type: "body",
            text: "I would love to hear you switch between all three languages at the same time lol.",
          },
          {
            type: "body",
            text: "I’m definitely learning a few words, so I don’t embarrass myself around you 😅",
          },
        ],
      },
      {
        id: "travel",
        title: "A traveler’s spirit.",
        image:"/my-pic.jpg",
        lines: [
          {
            type: "body",
            text: "Its no doubt that you have a traveler’s spirit, the kind of person who gets excited just thinking about new places, new streets, and new sunsets.",
          },
          {
            type: "body",
            text: "And the fact you’ve already been to France… that’s such a vibe.",
          },
          {
            type: "body",
            text: "Honestly, I hope one day we get to travel somewhere together, even if it’s just a small trip at first.",
          },
        ],
      },
      {
        id: "movie",
        title: "Your favorite movie genre.",
        lines: [
          {
            type: "body",
            text: "Ndinoda kuti unofarira mafirimu erudo.",
          },
          {
            type: "body",
            text: "Chimwe chinhu pamusoro peizvi chinonyaradza ... Iwe uchiri kutenda murudo rwakapfava.",
          },
          {
            type: "body",
            text: `Uye iwe uchiti yaunofarira ndeye "To All The Boys I’ve Loved Before" zvakaita kuti zvese zvinyatsonzwika.`,
          },
          {
            type: "body",
            text: "Handisati ndachiona zvisati zvaitika… asi ndichaona. Ndinoda kunzwisisa kuti sei uchidiwa nazvo.",
          },
        ],
      },
      {
        id: "date",
        title: "Your perfect date.",
        lines: [
          {
            type: "body",
            text: "You told me your perfect date is simple — a nice restaurant… and then going home to watch a movie.",
          },
          {
            type: "body",
            text: "I think that’s my favorite kind of date too. Calm. Warm. Just good vibes.",
          },
          {
            type: "body",
            text: "If you ever want to do that sometime… I’d love to take you.",
          },
        ],
      },
        {
      id: "answer",
      title: "",
      lines: [],
    },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [finalChoice, setFinalChoice] = useState<null | "yes" | "later">(null);

  const page = pages[index];
  const total = pages.length;

  const goNext = () => {
    setDirection(1);
    setIndex((i) => Math.min(i + 1, total - 1));
  };

  const goBack = () => {
    setDirection(-1);
    setIndex((i) => Math.max(i - 1, 0));
  };

  const isFirst = index === 0;
  const isLast = index === total - 1;

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? 14 : -14,
      filter: "blur(6px)",
    }),
    center: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? -14 : 14,
      filter: "blur(6px)",
    }),
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-rose-50 via-neutral-50 to-amber-50 text-neutral-900">
      {/* 🎵 Audio element */}
      <audio ref={audioRef} loop>
        {/* Put your file inside /public and replace the name below */}
        <source src="/your-song.mp3" type="audio/mpeg" />
      </audio>

      {/* 🎵 Floating Music Button */}
      <div className="absolute top-7 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={toggleMusic}
          className="rounded-full bg-white/80 backdrop-blur px-4 py-2 text-sm shadow-md hover:scale-105 transition"
        >
          {isPlaying ? "🎶 Pause music" : "🎵 Play music"}
        </button>
      </div>

      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-10">
        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <span className="text-rose-400">🌸</span>
            <span className="font-medium">For you</span>
          </div>
          <div className="text-sm text-neutral-500">
            {index + 1} / {total}
          </div>
        </div>

        {/* Card */}
        <div className="flex flex-1 items-center">
          <Card className="w-full rounded-3xl border-neutral-200/60 bg-white/70 shadow-xl shadow-rose-100/40 backdrop-blur">
            <CardContent className="p-7 sm:p-10">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={page.id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-6"
                >
                  {page.title ? (
                    <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
                      {page.title}
                    </h1>
                  ) : null}

 
                  <div className="space-y-4">
                    {page.lines.map((l, idx) => {
                      if (l.type === "hero") {
                        return (
                          <motion.p
                            key={idx}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.06 * idx, duration: 0.3 }}
                            className="text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900"
                          >
                            {l.text}
                          </motion.p>
                        );
                      }
                      return (
                        <motion.p
                          key={idx}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.06 * idx, duration: 0.3 }}
                          className="text-base sm:text-lg leading-relaxed text-neutral-700"
                        >
                          {l.text}
                        </motion.p>
                      );
                    })}
                  </div>


            {page.id === "travel" && (
      <div className="mt-6 overflow-hidden rounded-2xl">
        <Image
          src="/my-pic.jpg" 
          alt="Travel memory"
          width={300}
          height={200}
          className=" object-cover rounded-2xl"
        />
      </div>
)}

            {page.id === "date" ? (
            <div className="pt-2 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              
              <Button
                className="rounded-2xl bg-pink-50 shadow py-2"
                  onClick={() => {
                setFinalChoice("yes");
                localStorage.setItem("herAnswer", "yes");
                goNext();
              }}
              >
                  {finalChoice === "yes" ? (
                <p className="text-black ">
                  Yes again 😊
                </p>
              ): <p className="text-black">Yes I'd love to 😊</p> }
 
                
              </Button>

              <Button
                variant="secondary"
                className="rounded-2xl"
                onClick={() => {
                  setFinalChoice("later");
                  goNext()
                }}
              >
                No, sorry
              </Button>

       <div className="">
        {finalChoice === "yes" && (
                
        <p className="text-sm text-rose-500">
          I still remember you said YES earlier..
        </p>
      )}
          </div>    

            </div>

          ) : null}

    {page.id === "answer" ? (
  <div className="pt-2 space-y-3">
    {finalChoice === "yes" ? (
      <>
         <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 mb-4">
                      She said yes!!
                    </h1>
        <p className="text-lg font-medium text-neutral-800">
          That honestly made my day 🙂
        
        </p>
        <p className="text-neutral-600">
         I promise it’s going to be something special.
        </p>
      </>
    ) : finalChoice === "later" ? (
      <>
        <p className="text-lg font-medium text-neutral-800">
          No pressure 🤍
        </p>
        <p className="text-neutral-600">
          Either way… I’m really happy I met you.
        </p>
        <p className="text-neutral-500">
          And I hope this made you smile, even just a little.
        </p>
      </>
    ) : null}
  </div>
) : null}


                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="ghost"
            className="rounded-2xl"
            onClick={goBack}
            disabled={isFirst}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

{page.id !== "date" && page.id !== "answer" && (
  <Button
    className="rounded-2xl"
    onClick={goNext}
  >
    Turn the page
    <ChevronRight className="ml-2 h-4 w-4" />
  </Button>

  
)}

{page.id === "answer" && (
  <Button
    variant="ghost"
    className="rounded-2xl"
    onClick={() => {
      setDirection(1);
      setIndex(0);
      // setFinalChoice(null);
    }}
  >
    Start over
  </Button>
)}


        </div>

        <div className="mt-8 text-center text-xs text-neutral-400">
          made with love by Baudwin ✨
        </div>
      </div>
    </div>
  );
}
