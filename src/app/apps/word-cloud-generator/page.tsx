"use client";

import { useState, useMemo } from "react";
import ReactWordcloud from "react-wordcloud";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { removeStopwords } from "stopword";

type WordCloudOptions = {
  rotations: number;
  rotationAngles: [number, number];
  fontSizes: [number, number];
};

const EXAMPLE_TEXTS = {
  shakespeare: `To be, or not to be, that is the question:
Whether 'tis nobler in the mind to suffer
The slings and arrows of outrageous fortune,
Or to take Arms against a Sea of troubles,
And by opposing end them: to die, to sleep
No more; and by a sleep, to say we end
The heart-ache, and the thousand natural shocks
That flesh is heir to? 'Tis a consummation
Devoutly to be wished. To die, to sleep,
To sleep, perchance to Dream; aye, there's the rub,
For in that sleep of death, what dreams may come,
When we have shuffled off this mortal coil,
Must give us pause. There's the respect
That makes calamity of so long life:
For who would bear the whips and scorns of time,
The oppressor's wrong, the proud man's contumely,
The pangs of dispriz'd love, the law's delay,
The insolence of office, and the spurns
That patient merit of the unworthy takes,
When he himself might his quietus make
With a bare bodkin?`,

  loremIpsum: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.`,

  programming: `JavaScript Python TypeScript React Angular Vue Node Express MongoDB SQL Database Frontend Backend API REST GraphQL Docker Kubernetes Cloud Computing Web Development Programming Coding Software Engineering Git GitHub DevOps Agile Scrum HTML CSS Sass Bootstrap TailwindCSS Redux NextJS Webpack Babel Testing Jest Cypress CI/CD Microservices AWS Azure Google Cloud Serverless Functions Machine Learning Data Science Algorithms Data Structures Object-Oriented Programming Functional Programming Version Control Code Review Debug Testing Security Performance Optimization Mobile Development iOS Android React Native Flutter Cross-Platform Development User Interface User Experience Design Patterns Architecture Clean Code Documentation API Integration Database Design NoSQL Authentication Authorization HTTPS SSL Encryption Cache Redis Elasticsearch Scalability Load Balancing Monitoring Logging Error Handling Responsive Design Progressive Web Apps Accessibility SEO TypeScript Interfaces Generics Decorators async await Promises JavaScript Modules npm yarn package management Component Libraries State Management Hooks Context API Virtual DOM Server-Side Rendering Static Site Generation Headless CMS GraphQL Queries Mutations Subscriptions WebSockets Real-Time Data Streaming Analytics Metrics Code Quality Linting Formatting`,

  nature: `Trees mountains rivers oceans forests lakes wildlife animals birds flowers plants ecosystem environment nature conservation biodiversity sustainable green earth climate weather seasons rain sun clouds sky landscape garden park wilderness adventure explore discover rainforest jungle desert savanna grassland tundra coral reef wetland valley glacier volcano island beach coast shoreline waterfall stream brook creek tributary watershed ecosystem habitat flora fauna species endangered protected sanctuary reserve national park conservation biology ecology environmental science sustainability renewable energy carbon footprint climate change global warming greenhouse effect ozone layer pollution conservation recycling biodegradable organic natural resources wildlife preservation endangered species habitat restoration ecosystem management environmental protection land conservation water conservation energy efficiency solar wind hydroelectric geothermal biomass sustainable agriculture organic farming permaculture agroforestry biodiversity hotspot species richness ecological balance food web food chain predator prey symbiosis adaptation evolution natural selection migration hibernation photosynthesis decomposition nutrient cycle water cycle carbon cycle nitrogen cycle ecosystem services biodiversity loss habitat fragmentation invasive species native species endemic species keystone species indicator species umbrella species flagship species migration corridors wildlife corridors habitat connectivity landscape ecology conservation genetics population dynamics community ecology ecosystem resilience environmental restoration ecological restoration habitat management wildlife management conservation planning environmental impact assessment sustainable development green infrastructure nature-based solutions ecosystem-based adaptation`,
};

export default function WordCloudGenerator() {
  const [text, setText] = useState("");
  const [fontMin, setFontMin] = useState(20);
  const [fontMax, setFontMax] = useState(100);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [shape, setShape] = useState<"circle" | "square" | "rectangle">("circle");

  const words = useMemo(() => {
    if (!text) return [];

    // Split text into words and remove punctuation
    const wordsArray = text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/);

    // Remove stopwords (common words like "the", "is", "at", etc.)
    const filteredWords = removeStopwords(wordsArray);

    // Count word frequency
    const wordCount = filteredWords.reduce((acc: Record<string, number>, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});

    // Convert to format required by react-wordcloud
    return Object.entries(wordCount).map(([text, value]) => ({
      text,
      value,
    }));
  }, [text]);

  const options: WordCloudOptions = {
    rotations: shape === "circle" ? 2 : 0,
    rotationAngles: [0, 360],
    fontSizes: [fontMin, fontMax],
  };

  const getShapeDimensions = (): [number, number] => {
    switch (shape) {
      case "circle":
        return [600, 600];
      case "square":
        return [600, 600];
      case "rectangle":
        return [800, 400];
    }
  };

  const getContainerDimensions = () => {
    switch (shape) {
      case "circle":
        return { width: 600, height: 600 };
      case "square":
        return { width: 600, height: 600 };
      case "rectangle":
        return { width: 800, height: 400 };
    }
  };

  const downloadImage = () => {
    const svg = document.querySelector(".word-cloud-container svg") as SVGElement;
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const dimensions = getShapeDimensions();

    canvas.width = dimensions[0];
    canvas.height = dimensions[1];

    const img = new Image();
    const blob = new Blob([svgStr], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      if (!ctx) return;
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      const a = document.createElement("a");
      a.download = "wordcloud.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  console.log(getShapeDimensions());

  return (
    <div className="min-h-screen p-4 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Word Cloud Generator</h1>
        <p className="text-gray-600 mb-4">
          Transform your text into beautiful word cloud visualizations. Perfect for presentations, social media, and
          data visualization.
        </p>
        <div className="text-sm text-gray-500">
          Create stunning word clouds from any text • Customize colors and shapes • Export as high-quality PNG images
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <Card className="p-6 space-y-4">
          <div>
            <Label htmlFor="text">Input Text</Label>
            <Textarea
              id="text"
              className="h-32"
              placeholder="Enter your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="shape">Shape</Label>
            <select
              id="shape"
              className="w-full p-2 border rounded"
              value={shape}
              onChange={(e) => setShape(e.target.value as "circle" | "square" | "rectangle")}
            >
              <option value="circle">Circle</option>
              <option value="square">Square</option>
              <option value="rectangle">Rectangle</option>
            </select>
          </div>

          <div>
            <Label htmlFor="background">Background Color</Label>
            <Input
              id="background"
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
          </div>

          <div>
            <Label>Font Size Range</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  type="number"
                  value={fontMin}
                  onChange={(e) => setFontMin(Number(e.target.value))}
                  min={10}
                  max={fontMax}
                />
                <span className="text-xs text-gray-500">Min</span>
              </div>
              <div>
                <Input
                  type="number"
                  value={fontMax}
                  onChange={(e) => setFontMax(Number(e.target.value))}
                  min={fontMin}
                  max={200}
                />
                <span className="text-xs text-gray-500">Max</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Try an Example</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={() => setText(EXAMPLE_TEXTS.shakespeare)}>
                Shakespeare
              </Button>
              <Button variant="outline" size="sm" onClick={() => setText(EXAMPLE_TEXTS.loremIpsum)}>
                Lorem Ipsum
              </Button>
              <Button variant="outline" size="sm" onClick={() => setText(EXAMPLE_TEXTS.programming)}>
                Programming
              </Button>
              <Button variant="outline" size="sm" onClick={() => setText(EXAMPLE_TEXTS.nature)}>
                Nature
              </Button>
            </div>
          </div>

          <Button onClick={downloadImage} disabled={words.length === 0} className="w-full">
            Download as PNG
          </Button>
        </Card>

        <Card className="p-6">
          <div
            className="word-cloud-container"
            style={{
              backgroundColor,
              ...getContainerDimensions(),
              margin: "0 auto",
            }}
          >
            {words.length > 0 ? (
              <ReactWordcloud minSize={getShapeDimensions()} words={words} options={options} />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                Enter some text to generate a word cloud
              </div>
            )}
          </div>
        </Card>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">What is a Word Cloud?</h3>
          <p className="text-gray-600">
            A word cloud (also known as a tag cloud or text cloud) is a visual representation of text data where the
            size of each word indicates its frequency or importance. Word clouds are perfect for quickly conveying the
            most prominent terms in a body of text, making them ideal for presentations, reports, and social media
            content.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Use Cases</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Analyze survey responses and feedback</li>
            <li>• Visualize key topics in documents</li>
            <li>• Create engaging social media content</li>
            <li>• Summarize research findings</li>
            <li>• Design creative presentations</li>
            <li>• Generate artistic text visualizations</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Features</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Multiple shape options (circle, square, rectangle)</li>
            <li>• Customizable colors and font sizes</li>
            <li>• Automatic stopword removal</li>
            <li>• High-quality PNG export</li>
            <li>• Real-time preview</li>
            <li>• Mobile-friendly interface</li>
          </ul>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Tips for Better Word Clouds</h3>
          <ul className="space-y-2 text-gray-600">
            <li>1. Use longer texts for more diverse results</li>
            <li>2. Adjust font sizes for better readability</li>
            <li>3. Choose contrasting colors for visibility</li>
            <li>4. Consider your target shape based on usage</li>
            <li>5. Remove irrelevant words before generating</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">How It Works</h3>
          <p className="text-gray-600">
            Our word cloud generator processes your text by removing common words (stop words) and counting word
            frequencies. The size of each word is proportional to how often it appears in the text. The layout algorithm
            ensures optimal placement while maintaining readability. You can customize the appearance using our
            intuitive controls and export the final result as a high-quality image.
          </p>
        </Card>
      </div>
    </div>
  );
}
