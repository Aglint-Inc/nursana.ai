import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { CameraOff, MicOff } from "lucide-react";
import React from "react";

function AllowCameraPermission() {
  return (
    <div>
      <div className="mt-10 flex flex-col items-center">
        <div className="text-3xl font-light mb-10 mx-auto">
          <span className="font-medium">Nursera</span>
          <span className="font-light text-purple-500">.ai</span>
        </div>
        <h1 className="text-4xl font-medium text-center mb-2 ">
          Allow camrea and mic to start the interview
        </h1>
        <p className="text-center text-muted-foreground mb-10 max-w-xl">
        If you encounter any issues, check your browser’s settings or permissions and ensure 
        that both the camera and microphone are allowed. 
        </p>
      </div>
      <AspectRatio ratio={16 / 9}>
        <div className="mb-8 overflow-hidden mx-auto w-[600px] h-full bg-gray-800 rounded-lg flex flex-col gap-4 text-center p-6 items-center justify-center">
            <div className="flex gap-4">
                <div className="w-12 h-12 rounded-md text-white bg-red-500 flex items-center justify-center">
                <CameraOff/>
                </div>
                <div className="w-12 h-12 rounded-md text-white bg-red-500 flex items-center justify-center">
                <MicOff/>
                </div>
            
            </div>
    <p className="text-white text-lg font-medium">Refresh the page after adjusting 
    the permissions.</p>
        </div>
      </AspectRatio>
    </div>
  );
}

export default AllowCameraPermission;
