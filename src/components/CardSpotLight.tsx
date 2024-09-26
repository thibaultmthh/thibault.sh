"use client";

import { CubeIcon, FileTextIcon, GlobeIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import Modal from "./Modal"; // You'll need to create this component
import Button from "./Button";

interface CardSpotlightProps {
  title: string;
  year: string;
  status: "In Progress" | "Finished" | "Discontinued";
  link?: string;
  description: string;
  type: "personal" | "client";
  projectType: "website" | "app" | "other";
  myImplication?: string; // New optional prop
  moreInfo?: React.ReactNode;
}

const ProjectIcon: React.FC<{ projectType: CardSpotlightProps["projectType"] }> = ({ projectType }) => {
  console.log({ projectType });

  switch (projectType) {
    case "website":
      return <GlobeIcon className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500 mr-2" />;
    case "app":
      return <CubeIcon className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500 mr-2" />;
    default:
      return <FileTextIcon className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500 mr-2" />;
  }
};

export default function CardSpotlight({
  title,
  year,
  status,
  link,
  description,
  type,
  projectType,
  myImplication,
  moreInfo,
}: CardSpotlightProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const statusColors = {
    "In Progress": "bg-blue-500",
    Finished: "bg-green-500",
    Discontinued: "bg-red-500",
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border border-orange-200 bg-white p-6 sm:p-8 shadow-lg flex flex-col h-full`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,166,0,.1), transparent 40%)`,
        }}
      />
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          <ProjectIcon projectType={projectType} />
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              type === "client" ? "bg-orange-200 text-orange-800" : "bg-gray-200 text-gray-800"
            }`}
          >
            {type === "client" ? "Client" : "Personal"}
          </span>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      <h3 className="mb-2 text-lg sm:text-xl font-semibold text-orange-600">{title}</h3>
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs text-gray-500">{year}</span>
        {moreInfo && (
          <button
            onClick={openModal}
            className="flex items-center text-sm text-orange-600 hover:text-orange-700 focus:outline-none"
          >
            <InfoCircledIcon className="w-4 h-4 mr-1" />
            <span>Learn More</span>
          </button>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      {type === "client" && myImplication && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-orange-500 mb-1">My Implication:</h4>
          <p className="text-sm text-gray-600">{myImplication}</p>
        </div>
      )}
      <div className="flex justify-end space-x-2 items-center mt-auto">
        <Button icon={<FileTextIcon />} href={link} onClick={link ? undefined : openModal}>
          {link ? "View Project" : "Learn More"}
        </Button>
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{moreInfo}</div>
        </Modal>
      )}
    </div>
  );
}
