import { useState } from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import ControlPanel from "./ControlPanel";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MAX_COUNT = 5;

function MultipleFileUploads() {

	const [uploadedFiles, setUploadedFiles] = useState([])
    const [fileLimit, setFileLimit] = useState(false);
    const [scale, setScale] = useState(1.0);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        // setIsLoading(false);
      }
    const handleUploadFiles = files => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false;
        files.some((file) => {
            // if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
            //     if (uploaded.length === MAX_COUNT) setFileLimit(true);
            //     if (uploaded.length > MAX_COUNT) {
            //         alert(`You can only add a maximum of ${MAX_COUNT} files`);
            //         setFileLimit(false);
            //         limitExceeded = true;
            //         return true;
            //     }
            // }
        })
        if (!limitExceeded) setUploadedFiles(uploaded)

    }

    const handleFileEvent =  (e) => {
        const value= e.target.files;
        const chosenFiles = Array.prototype.slice.call(value)
        handleUploadFiles(chosenFiles);
    }

    return (
		<div>

			<input id='fileUpload' type='file' multiple
					accept='application/pdf, image/png'
                    onChange={handleFileEvent}
                    disabled={fileLimit}
			/>
            
            <section
                id="pdf-section"
                className="d-flex flex-column align-items-center w-100"
            >
				{uploadedFiles.map((file,index) => (
                    <div key={index} className="d-flex flex-column align-items-center w-100" >

                                        
                        <ControlPanel
                            scale={scale}
                            setScale={setScale}
                            numPages={numPages}
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                            file={file}
                            // file="/assets/docs/file-sample-1.pdf"
                        /> 
                        <Document
                            // file="/assets/docs/file-sample-2.pdf"
                            file={file}
                            onLoadSuccess={onDocumentLoadSuccess}
                            >
                        
                            <Page pageNumber={pageNumber} scale={scale} />
                        </Document>
                        {console.log(file)}
                    </div>
                ))}

            </section>
		</div>
	);
}

export default MultipleFileUploads;