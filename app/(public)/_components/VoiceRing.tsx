import React, { useEffect, useRef } from 'react';

import { type WavRecorder, type WavStreamPlayer } from '@/audio/index';

function VoiceRing({
  wavRecorderRef,
  wavStreamPlayerRef,
}: {
  wavRecorderRef: React.MutableRefObject<WavRecorder>;
  wavStreamPlayerRef: React.MutableRefObject<WavStreamPlayer>;
}) {
  const clientCanvasRef = useRef<HTMLCanvasElement>(null);
  const serverCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let isLoaded = true;

    const wavRecorder = wavRecorderRef.current;
    const clientCanvas = clientCanvasRef.current;
    const clientCtx: CanvasRenderingContext2D | null = null;

    const wavStreamPlayer = wavStreamPlayerRef.current;
    const serverCanvas = serverCanvasRef.current;
    const serverCtx: CanvasRenderingContext2D | null = null;

    const render = () => {
      if (isLoaded) {
        const drawCircularBars = (
          canvas: HTMLCanvasElement | null,
          ctx: CanvasRenderingContext2D | null,
          getFrequencies: () => { values: Float32Array },
          color: string,
        ) => {
          if (canvas) {
            if (!canvas.width || !canvas.height) {
              canvas.width = canvas.offsetWidth;
              canvas.height = canvas.offsetHeight;
            }
            ctx = ctx || canvas.getContext('2d');
            if (ctx) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              const result = getFrequencies();
              const centerX = canvas.width / 2;
              const centerY = canvas.height / 2;
              const radius = Math.min(centerX, centerY) * 0.9;
              const barCount = result.values.length;
              const angleStep = (2 * Math.PI) / barCount;

              for (let i = 0; i < barCount; i++) {
                const value = result.values[i];
                const angle = i * angleStep;
                const barHeight = value * 10; // Adjust multiplier for visual effect
                const x1 = centerX + Math.cos(angle) * radius;
                const y1 = centerY + Math.sin(angle) * radius;
                const x2 = centerX + Math.cos(angle) * (radius + barHeight);
                const y2 = centerY + Math.sin(angle) * (radius + barHeight);

                ctx.strokeStyle = color;
                ctx.lineWidth = 2; // Adjust line width for visual effect
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
              }
            }
          }
        };

        drawCircularBars(
          clientCanvas,
          clientCtx,
          () =>
            // @ts-ignore
            wavRecorder.recording
              ? wavRecorder.getFrequencies('voice')
              : { values: new Float32Array([0]) },
          '#0099ff',
        );

        drawCircularBars(
          serverCanvas,
          serverCtx,
          () =>
            // @ts-ignore
            wavStreamPlayer.analyser
              ? wavStreamPlayer.getFrequencies('voice')
              : { values: new Float32Array([0]) },
          '#009900',
        );

        window.requestAnimationFrame(render);
      }
    };
    render();

    return () => {
      isLoaded = false;
    };
  }, []);

  return (
    <div className='flex space-x-4'>
      <div className='flex-1'>
        <canvas
          ref={serverCanvasRef}
          className='h-32 w-full rounded-md bg-gray-100'
        />
        <span>Aglint Ai</span>
      </div>
      <div className='flex-1'>
        <canvas
          ref={clientCanvasRef}
          className='h-32 w-full rounded-md bg-gray-100'
        />
        <span>User</span>
      </div>
    </div>
  );
}

export default VoiceRing;
