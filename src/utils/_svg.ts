export default function getSvg(
  title: string,
  author: string,
  pfp: string
): string {
  const svg = `
 <svg width="331" height="186" viewBox="0 0 331 186" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    .author {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    .text {
      font: 12px Helvetica;
      color: #646D7A;
      height: 430px;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      max-width: 300px;
      margin-top: 20px;
    }

    .displayName {
      font: 600 16px;
      font-family: monospace;
      color: #FFFFFF;
      margin-left: 6px;
    }
  </style>
  <rect x="1" y="1" width="329" height="184" rx="7" fill="#0E0E10" />
  <rect x="1" y="1" width="329" height="184" rx="7" stroke="url(#paint0_linear_1_2)" stroke-width="2" />
  <foreignObject x="16" y="16" width="1040" height="480">
    <div class="author" xmlns="http://www.w3.org/1999/xhtml">
      <img src="${pfp}" alt="pfp" style="width: 24px; border-radius: 50%;" />
      <div class="displayName" xmlns="http://www.w3.org/1999/xhtml">
        ${author}
      </div>
    </div>

    <div class="text" xmlns="http://www.w3.org/1999/xhtml">
     ${title}
    </div>
  </foreignObject>
  <g clip-path="url(#clip0_1_2)">
    <path fill-rule="evenodd" clip-rule="evenodd"
      d="M295.546 21.3676C295.311 20.7018 295.794 20 296.489 20H300.311C300.735 20 301.112 20.2699 301.253 20.6718L304.428 29.6215C304.504 29.8434 304.504 30.0893 304.428 30.3173L302.519 35.6978C302.201 36.5976 300.953 36.5976 300.635 35.6978L295.546 21.3676ZM287.071 21.3977C286.812 20.7258 287.295 20 288.001 20H292.389C292.801 20 293.166 20.252 293.319 20.6419L296.812 29.5915C296.906 29.8314 296.906 30.1014 296.812 30.3473L294.615 35.9678C294.279 36.8256 293.09 36.8256 292.754 35.9678L287.071 21.3977ZM304.127 20C303.421 20 302.938 20.7258 303.197 21.3976L308.88 35.9678C309.216 36.8256 310.405 36.8256 310.741 35.9678L312.938 30.3473C313.032 30.1013 313.032 29.8314 312.938 29.5915L309.445 20.6418C309.292 20.2519 308.927 20 308.515 20H304.127Z"
      fill="white" />
  </g>
  <defs>
    <linearGradient id="paint0_linear_1_2" x1="165.5" y1="0" x2="165.5" y2="186" gradientUnits="userSpaceOnUse">
      <stop stop-color="#7F7F7F" />
      <stop offset="1" stop-color="#303030" stop-opacity="0" />
    </linearGradient>
    <clipPath id="clip0_1_2">
      <rect width="26" height="16.6111" fill="white" transform="translate(287 20)" />
    </clipPath>
  </defs>
</svg>
  `;

  return svg;
}
