import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsGrid1X2, BsFillImageFill, BsFolder } from "react-icons/bs";
import { FaShapes, FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import { IoDuplicateOutline } from "react-icons/io5";
import { TfiText } from "react-icons/tfi";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RxTransparencyGrid } from "react-icons/rx";

import Header from "../main_design_components/DesignHeader";
import MyImages from "../main_design_components/MyImages";
import Projects from "../main_design_components/Projects";
import BackgroundImages from "../main_design_components/BackgroundImages";
import CreateComponent from "../main_design_components/CreateComponent";

import api from "../utils/api";

const MainDesign = () => {
  const [selectItem, setSelectItem] = useState("");
  const { design_id } = useParams();
  const [state, setState] = useState("");
  const [current_component, setCurrentComponent] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");
  const [rotate, setRotate] = useState(0);
  const [left, setLeft] = useState("");
  const [top, setTop] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [opacity, setOpacity] = useState("");
  const [zIndex, setzIndex] = useState("");

  const [padding, setPadding] = useState("");
  const [fontSize, setFontSize] = useState("");
  const [weight, setWeight] = useState("");
  const [text, setText] = useState("");
  const [fontStyle, setFontStyle] = useState("");

  const [templateTitle, setTemplateTitle] = useState("");
  const [radius, setRadius] = useState(0);

  const [show, setShow] = useState({
    status: true,
    name: "",
  });

  const [components, setComponents] = useState([
    {
      name: "main_frame",
      type: "rect",
      id: Math.floor(Math.random() * 100 + 1),
      height: 450,
      width: 650,
      z_index: 1,
      color: "#fff",
      image: "",
      setCurrentComponent: (a) => setCurrentComponent(a),
    },
  ]);

  const setElements = (type, name) => {
    setState(type);
    setShow({
      state: false,
      name,
    });
  };

  const moveElement = (id, currentInfo) => {
    setCurrentComponent(currentInfo);
    let isMoving = true;

    const currentDiv = document.getElementById(id);

    const mouseMove = ({ movementX, movementY }) => {
      setSelectItem("");
      const getStyle = window.getComputedStyle(currentDiv);
      const left = parseInt(getStyle.left);
      const top = parseInt(getStyle.top);
      if (isMoving) {
        currentDiv.style.left = `${left + movementX}px`;
        currentDiv.style.top = `${top + movementY}px`;
      }
    };

    const mouseUp = (e) => {
      setSelectItem(currentInfo.id);
      isMoving = false;
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      setLeft(parseInt(currentDiv.style.left));
      setTop(parseInt(currentDiv.style.top));
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
    currentDiv.ondragstart = function () {
      return false;
    };
  };

  const resizeElement = (id, currentInfo) => {
    setCurrentComponent(currentInfo);

    let isMoving = true;

    const currentDiv = document.getElementById(id);

    const mouseMove = ({ movementX, movementY }) => {
      const getStyle = window.getComputedStyle(currentDiv);
      const width = parseInt(getStyle.width);
      const height = parseInt(getStyle.height);
      if (isMoving) {
        currentDiv.style.width = `${width + movementX}px`;
        currentDiv.style.height = `${height + movementY}px`;
      }
    };

    const mouseUp = (e) => {
      isMoving = false;
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      setWidth(parseInt(currentDiv.style.width));
      setHeight(parseInt(currentDiv.style.height));
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
    currentDiv.ondragstart = function () {
      return false;
    };
  };

  const rotateElement = (id, currentInfo) => {
    setCurrentComponent(currentInfo);

    const target = document.getElementById(id);

    const mouseMove = ({ movementX, movementY }) => {
      const getStyle = window.getComputedStyle(target);

      const trans = getStyle.transform;

      const values = trans.split("(")[1].split(")")[0].split(",");

      const angle = Math.round(
        Math.atan2(values[1], values[0]) * (180 / Math.PI)
      );

      let deg = angle < 0 ? angle + 360 : angle;

      if (movementX) {
        deg = deg + movementX;
      }
      target.style.transform = `rotate(${deg}deg)`;
    };
    const mouseUp = (e) => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);

      const getStyle = window.getComputedStyle(target);
      const trans = getStyle.transform;
      const values = trans.split("(")[1].split(")")[0].split(",");
      const angle = Math.round(
        Math.atan2(values[1], values[0]) * (180 / Math.PI)
      );
      let deg = angle < 0 ? angle + 360 : angle;
      setRotate(deg);
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);

    target.ondragstart = function () {
      return false;
    };
  };

  const removeComponent = (id) => {
    const temp = components.filter((c) => c.id !== id);
    setCurrentComponent("");
    setComponents(temp);
  };
  const duplicate = (current) => {
    if (current) {
      setComponents([...components, { ...current, id: Date.now() }]);
    }
  };

  const remove_background = () => {
    const com = components.find((c) => c.id === current_component.id);
    const temp = components.filter((c) => c.id !== current_component.id);
    com.image = "";
    setImage("");
    setComponents([...temp, com]);
  };

  const opacityHandle = (e) => {
    setOpacity(parseFloat(e.target.value));
  };

  const createShape = (name, type) => {
    setCurrentComponent("");
    const id = Date.now();
    const style = {
      id: id,
      name: name,
      type,
      left: 10,
      top: 10,
      opacity: 1,
      width: 200,
      height: 150,
      rotate,
      z_index: 2,
      color: "#3c3c3d",
      setCurrentComponent: (a) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement,
    };
    setSelectItem(id);
    setCurrentComponent(style);
    setComponents([...components, style]);
  };

  const add_text = (name, type) => {
    setCurrentComponent("");
    const id = Date.now();
    const style = {
      id: id,
      name: name,
      type,
      left: 250,
      top: 200,
      opacity: 1,
      rotate,
      z_index: 10,
      padding: 6,
      fontSize: 22,
      fontStyle: "Arial",
      italic: false,
      underline: false,
      title: "Edit Text",
      weight: 400,
      color: "#3c3c3d",
      setCurrentComponent: (a) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement,
    };

    setWeight("");
    setFontSize("");
    setFontStyle("");
    setSelectItem(id);
    setCurrentComponent(style);
    setComponents([...components, style]);
  };

  const add_image = (img) => {
    setCurrentComponent("");
    const id = Date.now();
    const style = {
      id: id,
      name: "image",
      type: "image",
      left: 10,
      top: 10,
      opacity: 1,
      width: 200,
      height: 150,
      rotate,
      z_index: 2,
      radius: 0,
      image: img,
      setCurrentComponent: (a) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement,
    };

    setSelectItem(id);
    setCurrentComponent(style);
    setComponents([...components, style]);
  };

  useEffect(() => {
    if (current_component) {
      const index = components.findIndex((c) => c.id === current_component.id);
      const temp = components.filter((c) => c.id !== current_component.id);
      if (current_component.name !== "text") {
        components[index].width = width || current_component.width;
        components[index].height = height || current_component.height;
        components[index].rotate = rotate || current_component.rotate;
      }
      if (current_component.name === "text") {
        components[index].fontSize = fontSize || current_component.fontSize;
        components[index].fontStyle = fontStyle || current_component.fontStyle;
        components[index].italic = current_component.italic;
        components[index].underline = current_component.underline;
        components[index].padding = padding || current_component.padding;
        components[index].weight = weight || current_component.weight;
        components[index].title = text || current_component.title;
      }
      if (current_component.name === "image") {
        components[index].radius = radius || current_component.radius;
      }

      if (current_component.name === "main_frame" && image) {
        components[index].image = image || current_component.image;
      }
      components[index].color = color || current_component.color;

      if (current_component.name !== "main_frame") {
        components[index].left = left || current_component.left;
        components[index].top = top || current_component.top;
        components[index].opacity = opacity || current_component.opacity;
        components[index].z_index = zIndex || current_component.z_index;
      }
      setComponents([...components]);
      setColor("");
      setWidth("");
      setHeight("");
      setTop("");
      setLeft("");
      setRotate(0);
      setOpacity("");
      setzIndex("");
      setText("");
      setPadding("");
      setFontSize("");
      setWeight("");
      setFontStyle("");
    }
  }, [
    color,
    image,
    left,
    top,
    width,
    height,
    opacity,
    zIndex,
    padding,
    fontSize,
    fontStyle,
    weight,
    text,
    radius,
    rotate,
    current_component.italic,
    current_component.underline,
  ]);

  useEffect(() => {
    const get_design = async () => {
      try {
        const { data } = await api.get(`/api/designs/user-design/${design_id}`);
        // console.log(data);
        const { design } = data;
        // console.log(design[0].templateTitle);
        setTemplateTitle(design[0].templateTitle);
        for (let i = 0; i < design.length; i++) {
          design[i].setCurrentComponent = (a) => setCurrentComponent(a);
          design[i].moveElement = moveElement;
          design[i].resizeElement = resizeElement;
          design[i].rotateElement = rotateElement;
          design[i].remove_background = remove_background;
        }
        setComponents(design);
      } catch (error) {
        console.log(error);
      }
    };
    get_design();
  }, [design_id]);

  return (
    <div className="min-w-screen h-screen bg-white">
      <Header
        components={components}
        templateTitle={templateTitle}
        design_id={design_id}
      />
      <div className="flex h-[calc(100%-60px)] w-screen">
        <div className="w-[80px] bg-[#18191B] z-50 h-full text-gray-400 overflow-y-auto">
          <div
            onClick={() => setElements("project", "projects")}
            className={`${
              show.name === "projects" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <BsFolder />
            </span>
            <span className="text-xs font-medium">Other Projects</span>
          </div>

          <div
            onClick={() => setElements("shape", "shape")}
            className={`${
              show.name === "shape" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <FaShapes />
            </span>
            <span className="text-xs font-medium">Shapes</span>
          </div>

          <div
            onClick={() => setElements("image", "uploadImage")}
            className={`${
              show.name === "uploadImage" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <BsFillImageFill />
            </span>
            <span className="text-xs font-medium">Uploads</span>
          </div>

          <div
            onClick={() => setElements("text", "text")}
            className={`${
              show.name === "text" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <TfiText />
            </span>
            <span className="text-xs font-medium">Text</span>
          </div>

          <div
            onClick={() => setElements("background", "background")}
            className={`${
              show.name === "background" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <RxTransparencyGrid />
            </span>
            <span className="text-xs font-medium">Templates</span>
          </div>
        </div>
        <div className="h-full w-[calc(100%-75px)]">
          <div
            className={`${
              show.status ? "p-0 -left-[350px]" : "px-8 left-[75px] py-5"
            } bg-[#252627] h-full fixed transition-all w-[350px] z-30 duration-700`}
          >
            <div
              onClick={() => setShow({ name: "", status: true })}
              className="flex absolute justify-center items-center bg-[#252627] w-[20px] -right-2 text-slate-300 top-[40%] cursor-pointer h-[100px] rounded-full"
            >
              <MdKeyboardArrowLeft />
            </div>
            {state === "shape" && (
              <div className="grid grid-cols-3 gap-6">
                <div
                  onClick={() => createShape("shape", "rect")}
                  className="h-[90px] bg-[#9d9da0] cursor-pointer"
                ></div>
                <div
                  onClick={() => createShape("shape", "circle")}
                  className="h-[90px] bg-[#9d9da0] cursor-pointer rounded-full"
                ></div>
                <div
                  onClick={() => createShape("shape", "triangle")}
                  style={{ clipPath: "polygon(50% 0,100% 100%,0 100%)" }}
                  className="h-[90px] bg-[#9d9da0] cursor-pointer"
                ></div>
              </div>
            )}
            {state === "image" && <MyImages add_image={add_image} />}
            {state === "text" && (
              <div>
                <div className="grid grid-cols-1 gap-2">
                  <div
                    onClick={() => add_text("text", "title")}
                    className="w-full h-[40px] flex justify-center items-center bg-purple-500 rounded-sm text-white mb-3"
                  >
                    <h2>Add a Text</h2>
                  </div>
                </div>
              </div>
            )}

            {state === "project" && (
              <Projects type="main" design_id={design_id} />
            )}
            {state === "background" && (
              <BackgroundImages type="background" setImage={setImage} />
            )}
          </div>

          <div className="w-full flex h-full">
            <div
              className={`flex justify-center relative items-center h-full bg-black ${
                !current_component
                  ? "w-full"
                  : "w-[calc(100%-250px)] overflow-hidden"
              }`}
            >
              <div className="m-w-[650px] m-h-[480px] flex justify-center items-center overflow-hidden">
                <div
                  id="main_design"
                  className="w-auto relative h-auto overflow-hidden select-none"
                  // title={}
                >
                  {components.map((c, i) => (
                    <CreateComponent
                      selectItem={selectItem}
                      setSelectItem={setSelectItem}
                      key={i}
                      info={c}
                      current_component={current_component}
                      removeComponent={removeComponent}
                    />
                  ))}
                </div>
              </div>
            </div>
            {current_component && (
              <div className="h-full w-[250px] text-gray-300 bg-[#252627] px-3 py-2">
                <div className="flex gap-6 flex-col items-start h-full px-3 justify-start pt-4">
                  {current_component.name !== "main_frame" && (
                    <div className="flex justify-start items-center gap-5">
                      <div
                        onClick={() => removeComponent(current_component?.id)}
                        className="w-[30px] flex justify-center items-center rounded-md cursor-pointer h-[30px] bg-slate-700 hover:bg-slate-800"
                      >
                        <FaTrash />
                      </div>
                      <div
                        onClick={() => duplicate(current_component)}
                        className="w-[30px] flex justify-center items-center rounded-md cursor-pointer h-[30px] bg-slate-700 hover:bg-slate-800"
                      >
                        <IoDuplicateOutline />
                      </div>
                    </div>
                  )}
                  <div className="flex gap-4 justify-start items-start">
                    <span>Color : </span>
                    <label
                      className="w-[30px] h-[30px] cursor-pointer rounded-sm"
                      style={{
                        background: `${
                          current_component.color &&
                          current_component.color !== "#fff"
                            ? current_component.color
                            : "gray"
                        }`,
                      }}
                      htmlFor="color"
                    ></label>
                    <input
                      onChange={(e) => setColor(e.target.value)}
                      type="color"
                      className="invisible"
                      id="color"
                    />
                  </div>
                  {current_component.name === "main_frame" &&
                    current_component.image && (
                      <div>
                        <button
                          className="p-[6px] bg-slate-700 text-white rounded-sm"
                          onClick={remove_background}
                        >
                          Remove background
                        </button>
                      </div>
                    )}

                  {current_component.name !== "main_frame" && (
                    <div className="flex gap-6 flex-col">
                      <div className="flex gap-1 justify-start items-start">
                        <span className="text-md w-[70px]">Opacity : </span>
                        <input
                          onChange={opacityHandle}
                          className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                          type="number"
                          step={0.1}
                          min={0.1}
                          max={1}
                          value={current_component.opacity}
                        />
                      </div>
                      <div className="flex gap-1 justify-start items-start">
                        <span className="text-md w-[70px]">Z-Index : </span>
                        <input
                          onChange={(e) => setzIndex(parseInt(e.target.value))}
                          className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                          type="number"
                          step={1}
                          value={current_component.z_index}
                        />
                      </div>
                      {current_component.name === "image" && (
                        <div className="flex gap-1 justify-start items-start">
                          <span className="text-md w-[70px]">Radius : </span>
                          <input
                            onChange={(e) =>
                              setRadius(parseInt(e.target.value))
                            }
                            className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                            type="number"
                            step={1}
                            value={current_component.radius}
                          />
                        </div>
                      )}
                      {current_component.name === "text" && (
                        <>
                          <div className="flex gap-1 justify-start items-start">
                            <span className="text-md w-[70px]">Padding : </span>
                            <input
                              onChange={(e) =>
                                setPadding(parseInt(e.target.value))
                              }
                              className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                              type="number"
                              step={1}
                              value={current_component.padding}
                            />
                          </div>
                          <div className="flex gap-1 justify-start items-start">
                            <span className="text-md w-[72px]">
                              Font style :{" "}
                            </span>
                            <select
                              onChange={(e) => setFontStyle(e.target.value)}
                              className="border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                              value={current_component.fontStyle}
                            >
                              <option value="Arial">Arial</option>
                              <option value="Verdana">Verdana</option>
                              <option value="Helvetica">Helvetica</option>
                              <option value="Times New Roman">
                                Times New Roman
                              </option>
                              <option value="Georgia">Georgia</option>
                              <option value="Courier New">Courier New</option>
                              <option value="Tahoma">Tahoma</option>
                              <option value="Geneva">Geneva</option>
                              <option value="Palatino">Palatino</option>
                              <option value="Comic Sans MS">
                                Comic Sans MS
                              </option>
                              <option value="Impact">Impact</option>
                              <option value="Trebuchet MS">Trebuchet MS</option>
                              <option value="Arial Black">Arial Black</option>
                              <option value="Rockwell">Rockwell</option>
                            </select>
                          </div>
                          <div className="flex gap-1 justify-start items-start">
                            <span className="text-md w-[72px]">
                              Font size :{" "}
                            </span>
                            <input
                              onChange={(e) =>
                                setFontSize(parseInt(e.target.value))
                              }
                              className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                              type="number"
                              step={1}
                              value={current_component.fontSize}
                            />
                          </div>
                          <div className="flex gap-1 justify-start items-start">
                            <span className="text-md w-[70px]">Weight : </span>
                            <input
                              onChange={(e) =>
                                setWeight(parseInt(e.target.value))
                              }
                              className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                              type="number"
                              step={100}
                              min={100}
                              max={900}
                              value={current_component.weight}
                            />
                          </div>
                          <div className="flex gap-1 justify-start items-start">
                            <input
                              type="checkbox"
                              onChange={(e) => {
                                setCurrentComponent((prevState) => ({
                                  ...current_component,
                                  italic: !prevState.italic,
                                }));
                              }}
                              checked={current_component.italic}
                              id="italic-checkbox"
                            />
                            <label htmlFor="italic-checkbox">Italic</label>
                          </div>
                          <div className="flex gap-1 justify-start items-start">
                            <input
                              type="checkbox"
                              onChange={(e) => {
                                setCurrentComponent((prevState) => ({
                                  ...current_component,
                                  underline: !prevState.underline,
                                }));
                              }}
                              checked={current_component.underline}
                              id="underline-checkbox"
                            />
                            <label htmlFor="underline-checkbox">
                              Underline
                            </label>
                          </div>

                          <div className="flex gap-2 flex-col justify-start items-start">
                            <input
                              onChange={(e) =>
                                setCurrentComponent({
                                  ...current_component,
                                  title: e.target.value,
                                })
                              }
                              className="border border-gray-700 bg-transparent outline-none p-2 rounded-md"
                              type="text"
                              value={current_component.title}
                            />
                            <button
                              onClick={() => setText(current_component.title)}
                              className="px-4 py-2 bg-purple-500 text-xs text-white rounded-sm"
                            >
                              Add
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDesign;
