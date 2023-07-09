const blob = new Blob(
  [
    `

  `,
  ],
  {
    type: "text/javascript",
  }
);
// Note: window.webkitURL.createObjectURL() in Chrome 10+.
export const worker = new Worker(window.URL.createObjectURL(blob));
