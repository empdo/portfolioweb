import { CipherCCM, randomInt } from "crypto";
import { disconnect } from "process";
import { useEffect, useRef } from "react";

interface Circle {
  x: number;
  y: number;
  r: number;
  shouldGrow: boolean;
  lifetime: number;
}

let circles: Circle[] = [];

function getRandomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
const distance = (x1: number, y1: number, x2: number, y2: number) =>
  Math.hypot(x2 - x1, y2 - y1);

const validPos = (circle: Circle): boolean => {
  let ret = true;
  circles.forEach((c) => {
    if (c != circle && c.r + 3 > distance(c.x, c.y, circle.x, circle.y)) {
      ret = false;
    }
  });
  return ret;
};

const Animation = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let done = false;
  const maxIt = 150;

  let canvas: HTMLCanvasElement | null;
  let context: CanvasRenderingContext2D | null;

  useEffect(() => {
    canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    context.scale(dpr * 2, dpr * 2);
    context.lineWidth = 0.5;

    return () => {};
  }, []);

  let frameCount = 0;
  let animationFrameId: number;
  useEffect(() => {
    const interval = setInterval(() => {
      const render = () => {
        frameCount++;
        if (context != null) {
          draw(context, frameCount);
        }
      };
      render();
    }, 20);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    if (done) return;
    const radius = 75;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle = "white";
    ctx.beginPath();

    //draw outercircle
    ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
    ctx.stroke();

    for (let i = 0; i <= maxIt; i++) {
      let x = getRandomFloat(-1, 1);
      const y = getRandomFloat(-1, 1) * Math.sqrt(1 - x * x) * radius + radius;
      x = x * 72 + 75;

      const circle: Circle = {
        x,
        y,
        r: 1,
        shouldGrow: true,
        lifetime: frameCount + Math.random() * 400,
      };

      if (validPos(circle)) {
        circles.push(circle);
        break;
      }

      if (i == maxIt) {
        //TODO: wait 10sec, then remove every buble on some interval of
        done = true;
      }
    }

    circles.forEach((c) => {
      if (c.shouldGrow) {
        //check collision
        circles.forEach((_c) => {
          if (c != _c && _c.r + c.r + 1 > distance(c.x, c.y, _c.x, _c.y)) {
            c.shouldGrow = false;
            _c.shouldGrow = false;
          }
        });
      }

      //check edges
      if (c.r > radius - 2 - distance(c.x, c.y, radius, radius)) {
        c.shouldGrow = false;
      }

      if (c.shouldGrow) {
        c.r += 0.8;
      }

      ctx.moveTo(c.x + c.r, c.y);
      ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
      ctx.stroke();
    });
  };
  return <canvas style={{ height: "500px" }} ref={canvasRef} />;
};

export default Animation;
