import React, { useState } from "react";
import Loader from "./Loader";
import { Document, Page, pdfjs } from "react-pdf";
import ControlPanel from "./ControlPanel";
import MultipleFileUploads from './MultipleFileUploads';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const PDFReader = () => {
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [pickedFile, setPickedFile] = useState("");

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  const onFileChange = (e) => {
    const value = e.target.files[0];
    const encodedUrl = URL.createObjectURL(value);
    setPickedFile(encodedUrl);
  };

  return (
    <div>
      <input name="pickedFile" type="file" onChange={onFileChange} />
      {/* <Loader isLoading={isLoading} /> */}
      <section
        id="pdf-section"
        className="d-flex flex-column align-items-center w-100"
      >
          <ControlPanel
            scale={scale}
            setScale={setScale}
            numPages={numPages}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            file={pickedFile}
            // file="/assets/docs/file-sample-1.pdf"
          />
        <Document
          // file="/assets/docs/file-sample-1.pdf"
          file={pickedFile}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>
      </section>
      <MultipleFileUploads />
    </div>
  );
};

export default PDFReader;
