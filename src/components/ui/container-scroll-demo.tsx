"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function ProductShowcaseScroll() {
  return (
    <div className="flex flex-col overflow-hidden pb-[200px] md:pb-[400px] pt-[200px] md:pt-[600px] px-2">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-2xl font-semibold text-white dark:text-white md:text-4xl">
              See the Platform in Action <br />
              <span className="text-3xl md:text-[4rem] font-bold mt-1 leading-none bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Scroll to Explore
              </span>
            </h1>
          </>
        }
      >
        <img
          src="/screenshots/analytics.png"
          alt="Arios Voxa Executive Intelligence"
          className="mx-auto rounded-2xl object-cover h-full w-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
