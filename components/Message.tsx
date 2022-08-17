export default function Message() {
  const lines = [
    ["red", "green", "red", "green", "red"],
    ["red", "green", "red", "green", "red"],
    ["red", "green", "white", "green", "red"],
    ["red", "green", "red", "green", "red"],
    ["red", "green", "red", "green", "red"],
  ];
  return (
    <div className="my-8 flex ">
      <div className="mr-3">
        {lines.map((row, rowIndex) => (
          <div key={rowIndex} className="flex ">
            {row.map((color, colorIndex) => (
              <div
                key={colorIndex}
                style={{ backgroundColor: color }}
                className="w-4 h-4 sm:w-5 sm:h-5  border-violet-300 hover:border  "
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-between sm:justify-start">
        <p className="text-white sm:mb-4">Awnsown website, bla bla bla</p>
        <div className="sm:flex ">
          <p className="text-neutral-400 text-right ">Thibault M. </p>
          <span className="hidden sm:block text-neutral-500 mx-4"> / </span>
          <span className="hidden sm:block text-neutral-400"> 12/12/2020</span>
        </div>
      </div>
    </div>
  );
}
