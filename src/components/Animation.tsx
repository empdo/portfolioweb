import { CipherCCM, randomInt } from "crypto";
import { disconnect } from "process";
import { useEffect, useRef } from "react";

interface Circle {
  x: number;
  y: number;
  r: number;
  shouldGrow: boolean;
}

const circles: Circle[] = [];

function getRandomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
const distance = (x1: number, y1: number, x2: number, y2: number) =>
  Math.hypot(x2 - x1, y2 - y1);


const shouldSpawnCircle = (circle: Circle) : boolean => {
    let ret = true;
    circles.forEach(c => {
        if (c != circle && c.r > distance(c.x, c.y, circle.x, circle.y)) {
            ret = false;
        }
    });
    return ret;
}

const Animation = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
        return;
    }

    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    context.scale(dpr * 2, dpr* 2);

    let frameCount = 0;
    let animationFrameId: number;
    const render = () => {
      frameCount++;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.strokeStyle = "white";
      ctx.beginPath();

      //draw outercircle
      ctx.arc(75, 75, 74, 0, 2 * Math.PI);
      ctx.stroke();

      if (frameCount % 10 == 0) {

      let x = getRandomFloat(-1, 1);
      const y = getRandomFloat(-1, 1) * Math.sin(Math.acos(x)) * 74 + 75;
      x = x * 74 + 75;
      const circle: Circle = { x, y, r: 1, shouldGrow: true };
        
      if (shouldSpawnCircle(circle) ) {
        circles.push(circle);
      }
      }

      circles.forEach((c) => {
        if (c.shouldGrow) {

            //check collision
            circles.forEach((_c) => {
            if (c != _c && _c.r + c.r  +1> distance(c.x, c.y, _c.x, _c.y)) {
                c.shouldGrow = false;
                _c.shouldGrow = false;
            }
            });
        }

        //check edges
        if (c.r > 74 - distance(c.x, c.y, 75, 75)) {
          c.shouldGrow = false;
        }

        if (c.shouldGrow) {
          c.r += 0.1;
        }

        ctx.moveTo(c.x + c.r, c.y);
        ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
        ctx.stroke();
      });
  };
  return <canvas style={{ height: "500px" }} ref={canvasRef} />;
};

export default Animation;
