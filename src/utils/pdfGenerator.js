import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// Configuration for PDF generation
const PDF_CONFIG = {
  format: "a4",
  unit: "mm",
  orientation: "portrait",
  margins: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  }
};

/**
 * Generates a PDF from a React component
 * @param {HTMLElement} element - The DOM element to convert to PDF
 * @param {string} filename - The name of the PDF file (without extension)
 * @returns {Promise<void>}
 */
export const generatePDF = async (element, filename = "resume") => {
  try {
    // Create loading indicator
    const loadingIndicator = document.createElement("div");
    loadingIndicator.className = "fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50";
    loadingIndicator.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-xl flex items-center space-x-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M117.2,85.18a12,12,0,0,0-12.7,1.45l-40,32a12,12,0,0,0,0,18.74l40,32A12,12,0,0,0,124,160V96A12,12,0,0,0,117.2,85.18Z"/><path d="M173.2,85.18a12,12,0,0,0-12.7,1.45l-40,32a12,12,0,0,0,0,18.74l40,32A12,12,0,0,0,180,160V96A12,12,0,0,0,173.2,85.18Z"/></svg>
        <span class="text-gray-700">Generating PDF...</span>
      </div>
    `;
    document.body.appendChild(loadingIndicator);

    // Configure html2canvas options
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Enable CORS for images
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    });

    // Get canvas dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Initialize PDF document
    const pdf = new jsPDF({
      orientation: PDF_CONFIG.orientation,
      unit: PDF_CONFIG.unit,
      format: PDF_CONFIG.format
    });

    // Convert canvas to image
    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    // Calculate number of pages needed
    let heightLeft = imgHeight;
    let position = 0;
    let page = 1;

    // Add first page
    pdf.addImage(imgData, "JPEG", 
      PDF_CONFIG.margins.left, 
      PDF_CONFIG.margins.top, 
      imgWidth - (PDF_CONFIG.margins.left + PDF_CONFIG.margins.right), 
      imgHeight
    );
    heightLeft -= pageHeight;

    // Add subsequent pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 
        PDF_CONFIG.margins.left, 
        position + PDF_CONFIG.margins.top, 
        imgWidth - (PDF_CONFIG.margins.left + PDF_CONFIG.margins.right), 
        imgHeight
      );
      heightLeft -= pageHeight;
      page++;
    }

    // Save the PDF
    pdf.save(`${filename}.pdf`);

    // Remove loading indicator
    document.body.removeChild(loadingIndicator);

    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    showErrorNotification();
    return false;
  }
};

/**
 * Shows an error notification when PDF generation fails
 */
const showErrorNotification = () => {
  const notification = document.createElement("div");
  notification.className = "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in";
  notification.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="132" x2="128" y2="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="172" r="16"/></svg>
    <span>Failed to generate PDF. Please try again.</span>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add("animate-fade-out");
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
};

/**
 * Validates and sanitizes the filename for PDF export
 * @param {string} filename - The proposed filename
 * @returns {string} - Sanitized filename
 */
export const sanitizeFilename = (filename) => {
  // Remove invalid characters and trim
  let sanitized = filename
    .replace(/[^a-z0-9-_\s]/gi, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();

  // Ensure filename is not empty
  if (!sanitized) {
    sanitized = "resume";
  }

  return sanitized;
};

/**
 * Prepares the resume element for PDF generation by applying necessary styles
 * @param {HTMLElement} element - The resume element to prepare
 * @returns {HTMLElement} - The prepared element
 */
export const prepareElementForPDF = (element) => {
  // Create a deep clone of the element
  const clone = element.cloneNode(true);
  
  // Apply print-specific styles
  clone.style.width = "210mm"; // A4 width
  clone.style.margin = "0";
  clone.style.padding = PDF_CONFIG.margins.top + "mm " + 
                       PDF_CONFIG.margins.right + "mm " + 
                       PDF_CONFIG.margins.bottom + "mm " + 
                       PDF_CONFIG.margins.left + "mm";
  
  // Ensure all images are loaded
  const images = clone.getElementsByTagName("img");
  const imagePromises = Array.from(images).map(img => {
    if (img.complete) {
      return Promise.resolve();
    }
    return new Promise(resolve => {
      img.onload = resolve;
      img.onerror = resolve;
    });
  });

  return {
    element: clone,
    waitForImages: () => Promise.all(imagePromises)
  };
};

/**
 * Main function to handle resume PDF generation
 * @param {HTMLElement} resumeElement - The resume element to convert
 * @param {string} filename - The desired filename
 * @returns {Promise<boolean>} - Success status
 */
export const downloadResumeAsPDF = async (resumeElement, filename = "resume") => {
  try {
    // Sanitize filename
    const sanitizedFilename = sanitizeFilename(filename);
    
    // Prepare element for PDF generation
    const { element, waitForImages } = prepareElementForPDF(resumeElement);
    
    // Wait for all images to load
    await waitForImages();
    
    // Generate and download PDF
    const success = await generatePDF(element, sanitizedFilename);
    
    return success;
  } catch (error) {
    console.error("Error in downloadResumeAsPDF:", error);
    showErrorNotification();
    return false;
  }
};