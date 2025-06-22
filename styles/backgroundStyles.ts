
export interface BackgroundStyle {
  name: string;
  imageData: string | null; // base64 encoded image data string, or null for no background
}

// Valid, simple 50x50px base64 encoded PNGs
const subtleOverlay = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABYSURBVGhD7c5BDQAACAOw+Vf9D08+A6ERBEGQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBAHtgAEjzgAc2pxGAAAAAElFTkSuQmCC';
const fadedArtisticTexture = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABkSURBVGhD7c4xCQAgDACx/0v7RxJCAx0Gz51LIIKAQIBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECDQEHi8DLj0RkU3yQAAAABJRU5ErkJggg==';
const techGridBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACDSURBVGhD7c7BCYAwEANB//+nPQ0VIATL9k6eAxyCCIIgCIIgCIJgQBAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRDcZgcfAYYlC3zZTAAAAABJRU5ErkJggg==';

export const backgroundOptions: BackgroundStyle[] = [
  {
    name: "None",
    imageData: null,
  },
  {
    name: "Subtle Gray Pattern",
    imageData: subtleOverlay, 
  },
  {
    name: "Faded Blue Wash",
    imageData: fadedArtisticTexture,
  },
  {
    name: "Simple Tech Grid",
    imageData: techGridBase64,
  }
];
