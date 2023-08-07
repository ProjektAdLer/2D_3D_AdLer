class FileExporter {
  private fileName: string = "AdLerLog.txt";
  private fileType: string = "text/plain";

  exportLog(logString: string): void {
    this.generateFile(logString);
  }

  generateFile(fileContent: string): void {
    let blob = new Blob([fileContent], { type: this.fileType });
    let saveFile = new File([blob], this.fileName);
    const url = URL.createObjectURL(saveFile);
    const atag = document.createElement("a");
    atag.setAttribute("href", url);
    atag.setAttribute("download", this.fileName);
    atag.click();
  }
}

export default FileExporter;
