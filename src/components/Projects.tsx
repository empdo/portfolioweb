import { useEffect, useRef } from "react";

interface Ball {
  x: number;
  y: number;
  r: number;
  sx: number | null;
  sy: number | null;
  shouldMove: boolean;
}

const distance = (x1: number, y1: number, x2: number, y2: number) =>
  Math.hypot(x2 - x1, y2 - y1);


const PojectAnim = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  let canvas: HTMLCanvasElement | null;
  let context: CanvasRenderingContext2D | null;

  let mx: number | null, my: number | null = null;

  const balls: Ball[] = [];

  const addBall = () => {
    const ball: Ball = { x: Math.random() * 300, y: Math.random() * 200, r: Math.random() * 25, sx: null, sy: null , shouldMove: true};

    ball.sx = ball.x;
    ball.sy = ball.y;

    balls.push(ball);


  }

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

    canvas.addEventListener("mousemove", (i) => mouseMove(i));

    return () => { };
  }, []);

  const mouseMove = (e: MouseEvent) => {
    if (!canvas || !context) return;

    const transform = context.getTransform();

    const invertedScaleX = 1 / transform.a;
    const invertedScaleY = 1 / transform.d;

    mx = e.clientX * invertedScaleX - canvas.clientLeft;
    my = e.clientY * invertedScaleY - canvas.clientTop;

  };

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

  addBall();
  addBall();
  addBall();
  addBall();
  addBall();
  addBall();
  addBall();
  addBall();

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.strokeStyle = "white";

    balls.forEach(ball => {

      balls.forEach((b: Ball) => {
        if (mx && my && ball.sx && ball.sy) {

          const xtemp = (mx  - ball.x) * 0.001;
          const ytemp = (my  - ball.y) * 0.001;


          ball.x = ball.sx + Math.min(xtemp, Math.sign(xtemp) * 10);
          ball.y = ball.sy + Math.min(ytemp, Math.sign(ytemp) * 10);

        }
      });


      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
      ctx.stroke();

    });


  };
  return <canvas className={"mx-6 w-full h-screen absolute z-10 top-0"} ref={canvasRef} />;
};


const Project = (props: { name: string; url: string; description: string, tecs: string[] }) => {
  return (
    <div className="flex min-h-md w-full max-w-xs flex-col items-start rounded-xl bg-gradient-to-r from-slate-800 via-gray-800 to-violet-900 p-5 shadow-2xl bg-200% hover:animate-scrollbg">
      <div className={"flex w-full flex-row items-center pb-3"}>
        <h2 className={"text-2xl font-medium text-white"}>{props.name}</h2>
        <span className={"flex-grow"} />
        <a href={props.url} target={"_blank"} rel={"noreferrer"}>
          <svg
            className={"h-7 fill-violet-100 hover:fill-violet-300"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 496 512"
          >
            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
          </svg>
        </a>
      </div>
      <p className={"text-lg text-gray-200"}>{props.description}</p>
      <span className={"flex-grow"} />
      <div className="bottom-0 flex flex-row gap-5">
        {props.tecs.map((content) => <p key={content} className={"text-xl text-violet-300"}>{content}</p>)}
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <div className={"flex flex-col content-start items-center relative z-0"}>
      <h1 className={"text-5xl font-semibold text-gray-300 pb-12 z-0"} id="projects">
        My projects
      </h1>
      <div
        className={
          " flex min-h-screen flex-wrap content-start items-center justify-center gap-12 p-10 pt-0 z-0"
        }
      >
        <Project
          name="Portfolio"
          url="https://github.com/empdo/multiplayergame"
          description='This website, a personal portfolio for showing my work and blog posts'
          tecs={["React", "Nextjs"]}
        />
        <Project
          name="Multiplayer game"
          url="https://github.com/empdo/multiplayergame"
          description='A multiplayergame made in unity, created for a highschool thesis with the focus on the network somehtig.'
          tecs={["Unity"]}
        />
        <Project
          name="Mind game"
          url="https://github.com/empdo/mindgame"
          description='A web based version of the card game "The mind". (not finished)'
          tecs={["React", "SQL"]}
        />
        <Project
          name="Message app"
          url="https://github.com/empdo/message_api"
          description="A web based message app."
          tecs={["React", "SQL"]}
        />
        <Project
          name="Dotfiles"
          url="https://github.com/empdo/dotfiles"
          description="Not a project, but something to share."
          tecs={["lua", "init?"]}
        />
      </div>
      <PojectAnim />
    </div>

  );
};

export default Projects;
