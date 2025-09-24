  export const formatFileSize = (sizeInMB: number) => {
    if (sizeInMB < 1) {
      return `${Math.round(sizeInMB * 1000)}KB`;
    }
    return `${sizeInMB.toFixed(1)}MB`;
  };