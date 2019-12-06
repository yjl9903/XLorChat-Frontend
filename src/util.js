const MAX_FILE_SIZE = 1024 * 1024 * 10;

function bytesToMegabytes(bytes) {
  const value = bytes * Math.pow(10, -6);
  return value;
}

// Checks mime type
function checkMimetype(signature) {
  const signatures = [
    "89504E47", // image/png
    "47494638", // image/gif
    "FFD8FFDB", // image/jpeg
    "FFD8FFE0",
    "FFD8FFE1",
    "FFD8FFE2",
    "FFD8FFE3",
    "FFD8FFE8",
    "3C3F786D", // svg/xml
    "3C737667"
  ];
  return signatures.includes(signature);
}

// Gets mime type signature
function getMimeTypeSignature(data) {
  const uint = new Uint8Array(data);
  let bytes = [];
  uint.forEach(byte => {
    bytes.push(byte.toString(16));
  });
  return bytes.join("").toUpperCase();
}

// Gets mime type signature
export function fileToBase64(file, errfn) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader(),
      readerBase64 = new FileReader(),
      blob = file.slice(0, 4);
    reader.readAsArrayBuffer(blob);
    reader.onloadend = e => {
      let isValidMimeType = checkMimetype(
        getMimeTypeSignature(e.target.result)
      );
      let flag = false;
      if (
        bytesToMegabytes(file.size) >
        bytesToMegabytes(MAX_FILE_SIZE)
      ) {
        flag = true;
        errfn('图片过大');
      }
      if (isValidMimeType === false) {
        flag = true;
        errfn('图片格式不支持');
      }
      if (flag > 0) {
        return;
      } else {
        readerBase64.readAsDataURL(file);
      }
    };
    readerBase64.onloadend = () => {
      let res = readerBase64.result;
      resolve(res);
    };
    reader.onerror = error => reject(error);
    readerBase64.onerror = error => reject(error);
  });
}