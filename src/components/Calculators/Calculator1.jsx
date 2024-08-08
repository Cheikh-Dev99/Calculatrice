import React, { useRef, useEffect, useState } from "react";
import { btns, BTN_ACTIONS } from "./btnConfig";
import "../../index.css";

const Calculator = () => {
  const btnsRef = useRef(null);
  const expRef = useRef(null);

  const [expression, setExpression] = useState("");

  useEffect(() => {
    const btns = Array.from(btnsRef.current.querySelectorAll("button"));
    btns.forEach((e) => (e.style.height = e.offsetWidth + "px"));
  }, []);

  const btnClick = (item) => {
    const expDiv = expRef.current;

    if (item.action === BTN_ACTIONS.THEME) {
      document.body.classList.toggle("dark");
    }

    if (item.action === BTN_ACTIONS.ADD) {
      addAnimSpan(item.display);

      const oper = item.display !== "x" ? item.display : "*";
      setExpression(expression + oper);
    }

    if (item.action === BTN_ACTIONS.DELETE) {
      expDiv.parentNode.querySelector("div:last-child").innerHTML = "";
      expDiv.innerHTML = "";

      setExpression("");
    }

    if (item.action === BTN_ACTIONS.CALC) {
      if (expression.trim().length <= 0) return;

      expDiv.parentNode.querySelector("div:last-child").remove();

      const cloneNode = expDiv.cloneNode(true);
      expDiv.parentNode.appendChild(cloneNode);

      const transform = `translateY(${
        -(expDiv.offsetHeight + 10) + "px"
      }) scale(0.4)`;

      try {
        let res = eval(expression);

        setExpression(res.toString());
        setTimeout(() => {
          cloneNode.style.transform = transform;
          expDiv.innerHTML = "";
          addAnimSpan(Math.floor(res * 100000000) / 100000000);
        }, 200);
      } catch {
        setTimeout(() => {
          cloneNode.style.transform = transform;
          cloneNode.innerHTML = "Syntax err";
        }, 200);
      } finally {
        console.log("calc complete");
      }
    }
  };

  const addAnimSpan = (content) => {
    const expDiv = expRef.current;
    const span = document.createElement("span");

    span.innerHTML = content;
    span.style.opacity = "0";
    expDiv.appendChild(span);

    const width = span.offsetWidth + "px";
    span.style.width = "0";

    setTimeout(() => {
      span.style.opacity = "1";
      span.style.width = width;
    }, 100);
  };

  return (
    <div className="calculator px-5 h-screen w-[350px] h-[600px] overflow-hidden rounded-3xl bg-gray-100 shadow-md flex flex-col justify-end dark:bg-main">
      <div className="calculator__result relative text-right flex flex-col items-end justify-end mb-16">
        <div
          ref={expRef}
          className="-mb-10 calculator__result__exp text-[3.5rem] leading-[1] transform-origin-bottom-right transition-transform duration-300 text-main dark:text-white "
        ></div>
        <div className="calculator__result__exp absolute right-0"></div>
      </div>
      <div ref={btnsRef} className="calculator__btns grid grid-cols-4 gap-2.5">
        {btns.map((item, index) => (
          <button
            key={index}
            className={`${item.class} border-0 outline-0 rounded-[10px] text-[1.25rem] font-medium bg-transparent text-[#6d6d6d] dark:text-white`}
            onClick={() => btnClick(item)}
          >
            {item.display}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;