import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';

export function Uploader() {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Do something with the files
        console.log(acceptedFiles);
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    return (
        <Card
            {...getRootProps()}
            className={cn(
                "relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64",
                isDragActive ? 'border-primary bg-primary/10 border-solid' : "border-border hover:border-primary"
            )}
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here</p>
            ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
            )}

            <CardContent
                {...getRootProps()}
                className={cn(
                    "flex items-center justify-center h-full w-full p-4",
                    isDragActive ? 'border-primary bg-primary/10 border-solid' : "border-border hover:border-primary"
                )}
            >
                <input {...getInputProps()} />
            </CardContent>
        </Card>
    )
}