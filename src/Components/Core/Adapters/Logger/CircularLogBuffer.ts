class CircularLogBuffer {
  private list: string[] = [];
  private logsTotal: number = 0;
  private capacity: number = 500;

  private readIndex: number = 0;
  private writeIndex: number = 0;

  public writeLog(logMessage: string): void {
    this.list[this.writeIndex] = `${this.logsTotal} + ${logMessage}`;

    const elementIsOverwritten =
      this.logsTotal !== 0 && this.writeIndex === this.readIndex;
    if (elementIsOverwritten) {
      this.readIndex = (this.readIndex + 1) % this.capacity;
    }
    this.writeIndex = (this.writeIndex + 1) % this.capacity;
    this.logsTotal += 1;
  }

  public readLog(): string[] {
    return this.list;
  }

  isEmpty(): boolean {
    return this.logsTotal === 0;
  }
  getLogsTotal(): number {
    return this.logsTotal;
  }
}

export default CircularLogBuffer;
