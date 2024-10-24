// 'use client';

// import { AlertCircle, CheckCircle2, Pause, Play, Upload } from 'lucide-react';
// import { useRef, useState } from 'react';

// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// export function FileUpload() {
//   const [coverImage, setCoverImage] = useState<string | null>(null);
//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [uploadStatus, setUploadStatus] = useState<
//     'idle' | 'uploading' | 'success'
//   >('idle');
//   const [isPlaying, setIsPlaying] = useState(false);

//   const imageInputRef = useRef<HTMLInputElement>(null);
//   const videoInputRef = useRef<HTMLInputElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file && file.type.startsWith('image/')) {
//       const reader = new FileReader();
//       reader.onload = (e) => setCoverImage(e.target?.result as string);
//       reader.readAsDataURL(file);
//       setError(null);
//     } else {
//       setError('Please select a valid image file.');
//     }
//   };

//   const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file && file.type.startsWith('video/')) {
//       setVideoFile(file);
//       setError(null);
//       setIsPlaying(false);
//     } else {
//       setError('Please select a valid video file.');
//     }
//   };

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     if (!coverImage || !videoFile) {
//       setError('Please upload both a cover image and a welcome video.');
//       return;
//     }
//     setUploadStatus('uploading');
//     // Simulating an upload process
//     setTimeout(() => {
//       setUploadStatus('success');
//       // Here you would typically send the files to your server
//       console.log('Cover Image:', coverImage);
//       console.log('Video File:', videoFile);
//     }, 2000);
//   };

//   const toggleVideoPlay = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   return (
//     <Card className='mx-auto w-full max-w-md'>
//       <CardHeader>
//         <CardTitle>Upload Files</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className='space-y-4'>
//           <div>
//             <Button
//               type='button'
//               variant='outline'
//               className='relative h-[200px] w-full overflow-hidden'
//               onClick={() => imageInputRef.current?.click()}
//             >
//               {coverImage ? (
//                 // eslint-disable-next-line @next/next/no-img-element
//                 <img
//                   src={coverImage}
//                   alt='Cover'
//                   className='absolute inset-0 h-full w-full object-cover'
//                 />
//               ) : (
//                 <div className='flex h-full flex-col items-center justify-center'>
//                   <Upload className='mb-2 h-8 w-8' />
//                   <span>Upload Cover Image</span>
//                 </div>
//               )}
//             </Button>
//             <input
//               ref={imageInputRef}
//               type='file'
//               accept='image/*'
//               onChange={handleImageUpload}
//               className='hidden'
//             />
//           </div>

//           <div className='relative'>
//             <Button
//               type='button'
//               variant='outline'
//               className='relative h-[200px] w-full overflow-hidden'
//               onClick={() =>
//                 videoFile ? toggleVideoPlay() : videoInputRef.current?.click()
//               }
//             >
//               {videoFile ? (
//                 <video
//                   ref={videoRef}
//                   className='absolute inset-0 h-full w-full object-cover'
//                   onEnded={() => setIsPlaying(false)}
//                   controls
//                 >
//                   <source src={videoFile} type={videoFile.type} />
//                   <track
//                     kind='captions'
//                     src='path_to_captions.vtt'
//                     srcLang='en'
//                     label='English captions'
//                     default
//                   />
//                   Your browser does not support the video tag.
//                 </video>
//               ) : (
//                 <div className='flex h-full flex-col items-center justify-center'>
//                   <Upload className='mb-2 h-8 w-8' />
//                   <span>Upload Welcome Video</span>
//                 </div>
//               )}
//             </Button>
//             {videoFile && (
//               <Button
//                 type='button'
//                 variant='secondary'
//                 size='icon'
//                 className='absolute bottom-2 right-2 rounded-full'
//                 onClick={toggleVideoPlay}
//               >
//                 {isPlaying ? (
//                   <Pause className='h-4 w-4' />
//                 ) : (
//                   <Play className='h-4 w-4' />
//                 )}
//               </Button>
//             )}
//             <input
//               ref={videoInputRef}
//               type='file'
//               accept='video/*'
//               onChange={handleVideoUpload}
//               className='hidden'
//             />
//           </div>

//           {error && (
//             <div className='flex items-center text-red-500'>
//               <AlertCircle className='mr-2' size={16} />
//               <span>{error}</span>
//             </div>
//           )}

//           <Button
//             type='submit'
//             disabled={uploadStatus === 'uploading'}
//             className='w-full'
//           >
//             {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload Files'}
//           </Button>

//           {uploadStatus === 'success' && (
//             <div className='flex items-center text-green-500'>
//               <CheckCircle2 className='mr-2' size={16} />
//               <span>Files uploaded successfully!</span>
//             </div>
//           )}
//         </form>
//       </CardContent>
//     </Card>
//   );
// }
