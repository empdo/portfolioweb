import { useEffect, useRef } from "react";

interface Circle {
  x: number;
  y: number;
  r: number;
  shouldGrow: boolean;
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
    if (c != circle && c.r + 1.5 > distance(c.x, c.y, circle.x, circle.y)) {
      ret = false;
    }
  });
  return ret;
};

const addCircle = (radius: number) => {
  const maxIt = 300;

  for (let i = 0; i <= maxIt; i++) {
    let x = getRandomFloat(-1, 1);
    const y =
      getRandomFloat(-1, 1) * Math.sqrt(1 - x * x) * (radius - 3) + radius;
    x = x * (radius - 3) + radius;

    const circle: Circle = {
      x,
      y,
      r: 0,
      shouldGrow: true,
    };

    if (validPos(circle)) {
      circles.push(circle);
      break;
    }

    if (i == maxIt) {
      return true;
    }
  }
  return false;
};

const Animation = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let done = false;

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

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    context.scale(dpr * 2, dpr * 2);
    context.lineWidth = 0.5;
    canvas.addEventListener("click", onClick, false);


    return () => {};
  }, []);

  let frameCount = 0;
  useEffect(() => {
    const interval = setInterval(() => {
      const render = () => {
        frameCount++;
        if (context != null) {
          draw(context, frameCount);
        }
      };
      render();
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const onClick = (e: MouseEvent) => {
    if (!e || !canvas) {
        return;
    }
    const x = e.clientX - canvas.offsetLeft - canvas.clientLeft;
    const y = e.clientY - canvas.offsetTop - canvas.clientTop;

    circles = circles.filter((circle) => {
        const d = distance(x, y, circle.x, circle.y);
        
        return d > 50;
    })

    done = false;
  }

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    if (done) return;
    const radius = 75;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.strokeStyle = "white";

    const growMultiplier = 1;
    const interval = 40 * growMultiplier - Math.floor(frameCount / 10)

    if (frameCount % interval == 0 || interval < 1) {
        done = addCircle(radius);
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
        c.r += (0.3 * growMultiplier) / Math.max(0.01 * c.r * c.r, 0.5);
      }

      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
      ctx.stroke();
    });
  };
  return <canvas className={"mx-6"} style={{ width: "300px" , height: "300px"}} ref={canvasRef} />;
};

export default Animation;
